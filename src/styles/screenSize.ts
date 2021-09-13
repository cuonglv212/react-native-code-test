import { Dimensions, StatusBar, Platform } from "react-native";

const statusBarHeight =
    StatusBar.currentHeight == undefined ? 0 : StatusBar.currentHeight;
const tabHeight = Platform.OS === "ios" ? 49 : 29;

export const screenSize = {
	width: Dimensions.get("screen").width,
	height: Dimensions.get("window").height - statusBarHeight,
	tabHeight,
	statusBarHeight: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
};
