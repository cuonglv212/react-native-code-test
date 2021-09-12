import React from "react";
import {View, Image, ScrollView, StyleSheet} from "react-native";
import {Header} from "../../components";
import moment from "moment";
import {Layout, Text} from "@ui-kitten/components";


type Props = {
    navigation: any;
    route: {
        params: any;
    };
};

export default function Blog({ navigation, route: { params } }: Props) {
    const { blog } = params;

    return (
        <Layout>
            <Header
                title={'BLOG DETAIL'}
                name="arrow-ios-back-outline"
                onPress={() => navigation.goBack()}
            />
            <Image
                source={{ uri: blog.imageUrl }}
                style={styles.image}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollview}
            >
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
                    <View style={{ margin: 150 }} />
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 250,
    },
    scrollview: {
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
