import React from 'react';
import {StackActions, NavigationContainerRef} from '@react-navigation/native';

export const navigationRef: React.RefObject<NavigationContainerRef<any>> = React.createRef();

export function navigate(name: string, params?: object) {
  const {current}: any = navigationRef;
  current?.navigate(name, params);
}

export function push(name: string, params?: object | undefined) {
  const {current}: any = navigationRef;
  current?.dispatch(StackActions.push(name, params));
}

export function replace(name: string, params?: object) {
  const {current}: any = navigationRef;
  current?.dispatch(StackActions.replace(name, params));
}

export function goBack() {
  const {current}: any = navigationRef;
  current?.goBack();
}

export function getCurrentRoute() {
  const {current}: any = navigationRef;
  return current?.getCurrentRoute();
}
