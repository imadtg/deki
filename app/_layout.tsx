import { Slot } from "expo-router";
import React from "react";
import Header from "@/components/Header";
import { StatusBar } from "react-native";

export default function HomeLayout() {
  return (
    <>
      <Header style={{ paddingTop: StatusBar.currentHeight || 0}}/>
      <Slot />
    </>
  );
}
