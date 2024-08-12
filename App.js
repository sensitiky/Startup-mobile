import React from "react";
import useFonts from "./app/src/hooks/fonts";
import MyStack from "./app/src/routes/Router";
import { registerRootComponent } from "expo";

function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return <MyStack />;
}

registerRootComponent(App);

export default App;