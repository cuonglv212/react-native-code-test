import React, {useContext, useEffect, useState} from "react";
import {ActivityIndicator, FlatList} from "react-native";
import {Header, BlogCard, Loading} from "../../components";
import { Layout } from "@ui-kitten/components";
import { CommonStyle } from "../../styles";
import * as blogData from "../../data/blogData.json";
import {navigate} from "../../navigation";
import _ from "lodash";
import {ContextData} from "../../context";
import {SCREENS} from "../../constant";
import {cancelAllPushNotification} from "../../utils/notifications";

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

let onEndReachedCalledDuringMomentum = true;
export default function Blogs( props : Props) {
    // @ts-ignore
    const allBlog = _.chunk<BlogType>(blogData.blogs, 5);
    const [page, setPage] = useState<number>(0);
    const [data, setData] = useState<BlogType[]>([]);
    const [isLoadMore, setLoadMore] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);


    const { isLight, setLightMode, isLogin, setLogin } = useContext(ContextData);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setData(allBlog[0]);
        }, 400);
    }, []);

    const onLoadMore = () => {
        if (!onEndReachedCalledDuringMomentum) {
            onEndReachedCalledDuringMomentum = true;
            setLoadMore(true);
            setTimeout(() => {
                setPage(page + 1);
                setData(data.concat(allBlog[page + 1]));
                setLoadMore(false)
            }, 300);
        }
    };

    const onSignOut = async () => {
        setLogin(false);
        await cancelAllPushNotification();
        alert("Logout success!");
    };

    return (
        <Layout style={CommonStyle.layout}>
            <Loading isLoading={isLoading} />
            <Header
                name={isLogin ? "log-out-outline" : "log-in-outline"}
                onPress={() =>
                    !isLogin ? navigate('LoginScreen') : onSignOut()
                }
                title={'BLOGS'}
                nameRight={isLight ? "toggle-left-outline" : "toggle-right-outline"}
                onPressRight={() => setLightMode(!isLight)}
            />
            <FlatList
                style={{marginHorizontal: 25}}
                windowSize={11}
                updateCellsBatchingPeriod={10}
                maxToRenderPerBatch={10}
                initialNumToRender={10}
                removeClippedSubviews={true}
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={true}
                renderItem={({ item, index }) => {
                    return (
                        <BlogCard
                            blog={item}
                            onPress={() =>
                                isLogin ?
                                navigate(SCREENS.BlogDetailScreen, {
                                    blog: item,
                                }) : navigate(SCREENS.LoginScreen)
                            }
                        />
                    );
                }}
                ListFooterComponent={isLoadMore ? <ActivityIndicator size={"large"} style={{ margin: 20 }} /> : null}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0}
                onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
            />
        </Layout>
    );
}
