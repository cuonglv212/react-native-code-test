import React from "react";
import { StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import mapping from "./mapping.json";
import { useFonts } from "expo-font";
import MainNavigator from "./src/navigation/MainNavigator";
import {EvaIconsPack} from "@ui-kitten/eva-icons";

const App = () => {
  const [loaded, error] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ApplicationProvider
      {...eva}
      theme={eva.light}
      customMapping={{ ...eva.mapping, ...mapping }}
    >
      <IconRegistry icons={EvaIconsPack} />
      <MainNavigator />
    </ApplicationProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
  },
});
