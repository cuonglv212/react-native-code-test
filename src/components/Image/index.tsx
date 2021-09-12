import React, {useState} from 'react';
import {View, Image, StyleSheet, ImageProps, ActivityIndicator} from 'react-native';

const styles = StyleSheet.create({
    container: {
    },
    loading: {position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}
});

interface Interface extends ImageProps{

}

const DisplayAnImageWithStyle = (props: Interface) => {
    const [isLoading, setLoading] = useState<boolean>(true);
    return (
        <View style={styles.container}>
            {isLoading && <ActivityIndicator style={styles.loading} size={'large'}/>}
            <Image
                onLoadEnd={()=> setLoading(false)}
                {...props}/>
        </View>
    );
}

export default DisplayAnImageWithStyle;
