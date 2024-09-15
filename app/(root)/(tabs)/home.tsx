import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { Ride } from "@/types/type";
import app from "@/firebase.config";
import { getDatabase, ref, onValue } from "firebase/database";

interface parkings {
  address: string;
  coordinates: any;
  occupied: boolean;
}

const Home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const emailPrefix = user?.emailAddresses[0].emailAddress.split("@")[0];
  const firstFive = emailPrefix?.slice(0, 5);
  const lastFive = emailPrefix?.slice(-8);
  const result = `${firstFive}...${lastFive}`;

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const {
    data: recentRides,
    loading,
    error,
  } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  };

  const [data, setData] = useState<parkings[]>([]);
  let coordinatesArray: {
    address: string;
    coordinates: any;
    occupied: boolean;
  }[] = [];
  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase(app);
      const dbRef = ref(db);
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          console.log("Fetching data from Firebase");
          const data = snapshot.val();
          const dataArray = Object.keys(data).map((key) => data[key]);
          const formattedData: parkings[] = dataArray.map((item) => {
            const datetime = item.datetime;
            const deviceId = item.device_id;
            const spots = item.spots
              .filter((spot: parkings) => !spot.occupied)
              .map((spot: parkings) => {
                return {
                  address: spot.address,
                  coordinates: spot.coordinates,
                  occupied: spot.occupied,
                };
              });

            spots.forEach((spot: parkings) => {
              coordinatesArray.push(spot.coordinates);
              console.log(
                `Address: ${spot.address}, Coordinates: ${JSON.stringify(
                  spot.coordinates
                )}`
              );
            });
            console.log(coordinatesArray);
            return {
              address: "", // Add a default value for address
              coordinates: {}, // Add a default value for coordinates
              occupied: false, // Add a default value for occupied
              datetime,
              deviceId,
              spots,
            };
          });
          setData(formattedData); // Set the state with the new data
          console.log("data", data);
        } else {
          console.log("No data available");
        }
      });
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="capitalize text-xl font-JakartaExtraBold">
                Welcome {user?.firstName || result}
                👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Free available parking spaces
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
