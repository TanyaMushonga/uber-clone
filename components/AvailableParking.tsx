import { View, Text, Image } from "react-native";
import React from "react";
import { Parking } from "@/types/type";

import { icons } from "@/constants";

const AvailableParking = ({ details }: { details: Parking }) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white rouned-lg shadow-neutral-300 mb-3">
      <View className="flex flex-col items-start justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${details.longitude},${details.latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                Samora Mashel
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                to
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AvailableParking;
