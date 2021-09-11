import React from 'react';
import {navigationRef} from "./index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {Login} from "../screens";
import {SafeAreaView} from "react-native";
import Blogs from "../screens/Blogs";
import Blog from "../screens/BlogDetail";
const Stack = createStackNavigator();

const DashBoardNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'SplashScreen'}
            screenOptions={{animationEnabled: false}}>
            <Stack.Screen  options={{ headerShown: false }} name={'LoginScreen'} component={Login} />
            <Stack.Screen  options={{ headerShown: false }} name={'BlogScreen'} component={Blogs} />
            <Stack.Screen  options={{ headerShown: false }} name={'BlogDetailScreen'} component={Blog} />
        </Stack.Navigator>
    );
};

const RootContainer = () => (
  <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={{flex: 1}}>
          <DashBoardNavigator />
      </SafeAreaView>
  </NavigationContainer>
);

export default RootContainer;
