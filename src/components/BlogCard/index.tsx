import React from "react";
import {TouchableOpacity, Image, Text, StyleSheet} from "react-native";
import {BlogType} from "../../screens/Blogs";
import {screenSize} from "../../styles";

type Props = {
    blog: BlogType;
    onPress: () => void;
};

export default function BackButton({ blog, onPress }: Props) {
    return (
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
    );
}

const styles = StyleSheet.create({
    container: {
        width: screenSize.width * 0.8,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: "center",
    },
    image: {
        width: "100%",
        height: screenSize.width * 0.4,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    text: {
        marginVertical: 15,
        fontFamily: "Roboto-Bold",
        marginHorizontal: 12,
        color: "grey",
    },
});
