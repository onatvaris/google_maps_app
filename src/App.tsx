import { NavigationContainer } from '@react-navigation/native'
import React, { ReactNode, useEffect } from 'react'
import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import { Router } from './Navigations/Router'
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './Redux/Reducers';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux';
import { PersistGate } from 'redux-persist/integration/react';




const App: () => ReactNode = () => {

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission()
    }
  }, [])


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
