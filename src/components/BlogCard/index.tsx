import React from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import {BlogType} from "../../screens/Blogs";
import {screenSize} from "../../styles";
import {color} from "../../styles/color";
import {Image} from "../index";

type Props = {
    blog: BlogType;
    onPress: () => void;
};

export default function Header({ blog, onPress }: Props) {
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
        <Text style={styles.text}>{blog.author}</Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
