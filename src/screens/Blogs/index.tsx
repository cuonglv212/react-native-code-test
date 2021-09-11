import React from "react";
import { FlatList, View } from "react-native";
import { BackButton, BlogCard } from "../../components";
import { Layout } from "@ui-kitten/components";
import { publiscStyle } from "../../styles";
import * as blogData from "../../data/blogData.json";
import {navigate} from "../../navigation";

export type BlogType = {
    title: string;
    content: string;
    imageUrl: string;
    author: string;
    datePublished: string;
    views: number;
};

type Props = {
    navigation: any;
    route: {
        params: any;
    };
};

export default function Blogs( props : Props) {
    // @ts-ignore
    const allBlog: BlogType[] = blogData.blogs;
    return (
        <Layout style={publiscStyle.layout}>
            <FlatList
                ListHeaderComponent={
                    <BackButton
                        name={1===1 ? "log-out-outline" : "log-in-outline"}
                        onPress={() =>
                            navigate('LoginScreen')
                        }
                    />
                }
                windowSize={11}
                updateCellsBatchingPeriod={10}
                maxToRenderPerBatch={10}
                initialNumToRender={10}
                removeClippedSubviews={true}
                data={allBlog}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={true}
                renderItem={({ item, index }) => {
                    return (
                        <BlogCard
                            blog={item}
                            onPress={() =>
                                navigate("BlogDetailScreen", {
                                    blog: item,
                                })
                            }
                        />
                    );
                }}
                ListFooterComponent={<View style={{ margin: 20 }} />}
            />
        </Layout>
    );
}
