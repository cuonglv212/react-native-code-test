import React, {useState} from "react";

export type ContextDataState = {
    isLogin: boolean;
    setLogin: (data: boolean) => void;
    isLight: boolean;
    setLightMode: (light: boolean) => void
};


const initialState: ContextDataState = {
	isLogin: false,
	setLogin: () => {},
	isLight: false,
	setLightMode: () => {},
};

export const ContextData = React.createContext(initialState);
