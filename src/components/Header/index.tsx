import React from "react";

import {Icon, Layout, Text} from "@ui-kitten/components";
import {StyleSheet, TouchableOpacity, View} from "react-native";

import {color} from "../../styles/color";

type Props = {
    onPress: () => void;
    name: string;
    nameRight?: string;
    onPressRight?: () => void;
    title?: string;
};

export default function Header({ onPress, name, onPressRight, nameRight, title }: Props) {
	return (
		<Layout style={styles.container}>
			<TouchableOpacity onPress={onPress}>
				<Icon style={styles.icon} fill="#8F9BB3" name={name} />
			</TouchableOpacity>
			<Text style={styles.textHeader}>{title || "Header"}</Text>
			{nameRight && <TouchableOpacity onPress={onPressRight}>
				<Icon style={styles.icon} fill="#8F9BB3" name={nameRight}/>
			</TouchableOpacity>}
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		paddingHorizontal: 15,
	},
	icon: {
		width: 24,
		height: 24,
	},
	textHeader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16
	}
});
