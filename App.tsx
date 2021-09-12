import React, { useEffect, useState} from "react";
import { Platform, StyleSheet} from "react-native";
import * as eva from "@eva-design/eva";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import mapping from "./mapping.json";
import { useFonts } from "expo-font";
import MainNavigator from "./src/navigation/MainNavigator";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {ContextData} from "./src/context";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import firebase from "firebase";
import {registerForPushNotificationsAsync} from "./src/utils/notifications";
import * as Notifications from 'expo-notifications';
import * as blogData from "./src/data/blogData.json";
import {navigate} from "./src/navigation";
import {SCREENS} from "./src/constant";
const firebaseConfig = {
  apiKey: "AIzaSyArH2jzINa2DgXrIK3uGoNwURQNc6uta60",
  authDomain: "stayr-34812.firebaseapp.com",
  projectId: "stayr-34812",
  storageBucket: "stayr-34812.appspot.com",
  messagingSenderId: "853030024768",
  appId: "1:853030024768:web:f62a5c904eb5a23c6bd1a5",
  measurementId: "G-XCRT6EEE8P"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const App = () => {
  const [loaded, error] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
  useEffect(() => {
    registerForPushNotificationsAsync(Platform.OS).then(() => {
      console.log('registered')
    })
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      // const getId = response.notification.request.content.body
      // @ts-ignore
      const item = blogData.blogs[0]
      navigate(SCREENS.BlogDetailScreen, {blog: item})
    });
    return () => {
      // Clean up the event listeners
      subscription.remove()
    };
  }, []);

  const [isLogin, setLogin] = useState<boolean>(false)
  const [isLight, setTheme] = useState<boolean>(false)
  const onSetTheme = (_isLight: boolean) => {
    setTheme(_isLight);
  };
  const onSetLogin = (_isLogin: boolean) => {
    setLogin(_isLogin);
  };
  const value = { isLogin, setLogin: onSetLogin, isLight, setLightMode: onSetTheme };

  if (!loaded) {
    return null;
  }

  return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <SafeAreaProvider>
        <ContextData.Provider value={value}>
          <StatusBar style={isLight ? "dark" : "light"}/>
          <ApplicationProvider
              {...eva}
              theme={isLight ? eva.light : eva.dark}
              customMapping={{ ...eva.mapping, ...mapping }}
          >
            <SafeAreaView style={{flex: 1, backgroundColor: isLight ? '#FFFFFF' : '#222B45'}}>
              <MainNavigator/>
            </SafeAreaView>
          </ApplicationProvider>
        </ContextData.Provider>
        </SafeAreaProvider>
      </>
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
