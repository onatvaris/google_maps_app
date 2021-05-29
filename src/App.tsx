import { NavigationContainer } from '@react-navigation/native'
import React, { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Router from './Navigations/Router'
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './Redux/Reducers';
import { Provider } from 'react-redux';
import { store } from './Redux';


const App: () => ReactNode = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
