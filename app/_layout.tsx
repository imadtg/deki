import { Slot } from "expo-router";
import React from "react";
import Header from "@/components/Header";
import { StatusBar } from "react-native";

export default function HomeLayout() {
  return (
    <>
      <StatusBar />
      <Header />
      <Slot />
    </>
  );
}
