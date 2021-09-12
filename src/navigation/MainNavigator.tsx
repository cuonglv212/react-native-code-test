import React from 'react';
import {navigationRef} from "./index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {Login, Blogs, BlogDetail} from "../screens";
const Stack = createStackNavigator();

const DashBoardNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'BlogScreen'}
            screenOptions={{animationEnabled: false}}>
            <Stack.Screen  options={{ headerShown: false }} name={'LoginScreen'} component={Login} />
            <Stack.Screen  options={{ headerShown: false }} name={'BlogScreen'} component={Blogs} />
            <Stack.Screen  options={{ headerShown: false }} name={'BlogDetailScreen'} component={BlogDetail} />
        </Stack.Navigator>
    );
};

const RootContainer = () => (
  <NavigationContainer ref={navigationRef}>
      <DashBoardNavigator />
  </NavigationContainer>
);

export default RootContainer;
