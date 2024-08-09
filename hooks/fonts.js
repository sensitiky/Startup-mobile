import * as Font from "expo-font";
import { useState, useEffect } from "react";

const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "BebasNeue-Regular": require("../assets/fonts/BebasNeue-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  return fontsLoaded;
};

export default useFonts;
