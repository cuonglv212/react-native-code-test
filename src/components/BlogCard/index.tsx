import React, {memo} from "react";

import {MotiView} from "moti";
import {TouchableOpacity, Text, StyleSheet} from "react-native";

import {BlogType} from "../../screens/Blogs";
import {color} from "../../styles/color";
import {Image} from "../index";

type Props = {
    blog: BlogType;
    onPress: () => void;
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginTop: 20,
		borderRadius: 10,
		backgroundColor: color.white,
		shadowColor: "#000",
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		alignSelf: "center",
	},
	image: {
		width: "100%",
		height: 120,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	text: {
		marginVertical: 5,
		fontFamily: "Roboto-Bold",
		marginHorizontal: 12,
		color: "grey",
	},
	textContent: {
	}
});

const BlogCard = ({ blog, onPress }: Props) => {
	return (
		<MotiView
			from={{
				opacity: 0,
				scale: 0.5,
			}}
			animate={{
				opacity: 1,
				scale: 1,
			}}
			transition={{
				type: "timing",
				duration: 1000,
				// delay: 3000,
			}}
			exit={{
				opacity: 0,
				scale: 0.9,
			}}
		>
			<TouchableOpacity onPress={onPress} style={styles.container}>
				<Image
					resizeMode="cover"
					source={{
						uri: blog.imageUrl,
					}}
					style={styles.image}
				/>
				<Text style={styles.text}>{blog.title}</Text>
			</TouchableOpacity>
		</MotiView>
	);
};

export default memo(BlogCard);
