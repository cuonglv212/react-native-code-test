import React, {useCallback, useEffect, useState} from "react";

import {Layout, Text} from "@ui-kitten/components";
import moment from "moment";
import { MotiView } from "moti";
import {View, ScrollView, StyleSheet} from "react-native";

import {Header, Image} from "../../components";
import {
	getIdentifier,
	removeIdentifier, saveIdentifier,
	schedulePushNotification,
	cancelScheduledNotificationAsync
} from "../../utils/notifications";


type Props = {
    navigation: any;
    route: {
        params: any;
    };
};

export default function Blog({ navigation, route: { params } }: Props) {
	const { blog } = params;
	const [identifier, setIdentifier] = useState("");

	const getNotificationIdentifier = useCallback(async () => {
		let identifier = await getIdentifier(blog.title);
		console.log("getIdentifier identifier", identifier);
		if (!identifier) {
			identifier = await schedulePushNotification({
				title: "This Article is still waiting to come back",
				body: blog.title,
				data: { data: JSON.stringify(blog) }
			});
			console.log("identifier", identifier);
			await saveIdentifier({
				id: blog.title,
				identifier
			});
			setIdentifier(identifier);
		} else {
			setIdentifier(identifier);
		}
	}, [blog]);

	const clearNotification = useCallback(async () => {
		if (identifier) {
			console.log("clearNofitication", identifier);
			setIdentifier("");
			await removeIdentifier(blog.title);
			await cancelScheduledNotificationAsync(identifier);
		}
	}, [identifier]);

	useEffect(() => {
		getNotificationIdentifier();
	}, []);

	return (
		<MotiView
			from={{ translateY: -100 }}
			animate={{ translateY: 0 }}
			transition={{ type: "timing", duration: 900 }}
		>
			<Layout>
				<Header
					title={"BLOG DETAIL"}
					name="arrow-back-outline"
					onPress={() => navigation.goBack()}
				/>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={styles.scrollview}
					onScroll={event => {
						const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
						const percent = parseInt(String(((contentOffset.y + layoutMeasurement.height) / contentSize.height * 100)), 10);
						if (percent >= 70) {
							clearNotification();
						}
					}}
				>
					<Image
						source={{ uri: blog.imageUrl }}
						style={styles.image}
					/>
					<View
						style={{
							padding: 20,
						}}
					>
						<Text style={styles.title}>
							{blog.title.trim().toUpperCase()}
						</Text>
						<Text style={styles.author}>{blog.author}</Text>
						<Text style={styles.date}>
							{moment(blog.datePublished).format("MMMM Do YYYY")}
						</Text>
						<Text style={styles.content}>{blog.content}</Text>
					</View>
				</ScrollView>
			</Layout>
		</MotiView>
	);
}

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 250,
	},
	scrollview: {
		marginBottom: 20
	},
	contentBox: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	title: {
		fontFamily: "Roboto-Bold",
		fontSize: 18,
	},
	author: {
		fontSize: 13,
		color: "grey",
	},
	date: {
		fontSize: 13,
		color: "grey",
		textAlign: "right",
		marginBottom: 10,
	},
	content: {
		fontSize: 15,
		letterSpacing: 0.5,
		lineHeight: 20,
		textAlign: "justify",
	},
});
