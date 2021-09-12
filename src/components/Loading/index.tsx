import LottieView from "lottie-react-native";
import React from "react";

const renderLoading = ({isLoading}: {isLoading: boolean}) => {
    if (isLoading)
        return(
        <LottieView
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute', top: 0, bottom: 0, right: 0, left: 0,
                    zIndex: 10
                }}
                autoPlay
                loop
                source={require('../../../assets/890-loading-animation.json')}
            />
        );
    return null;
};

export default renderLoading;
