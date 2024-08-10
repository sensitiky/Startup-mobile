import React from "react";
import useFonts from "./hooks/fonts";
import MyStack from "./Router";

export default function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return <MyStack />;
}