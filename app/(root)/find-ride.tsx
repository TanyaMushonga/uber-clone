import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";

const FindRide = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  return (
    <RideLayout>
      <Text>FindRide</Text>
    </RideLayout>
  );
};

export default FindRide;
