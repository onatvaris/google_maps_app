import React from 'react'
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack'
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    MainNavigatorParamsList, TabNavigatorParamsList,
} from './types'
import Register from '../Screens/Register'
import Login from '../Screens/Login'
import Welcome from '../Screens/Welcome'
import Profile from '../Screens/Profile'
import { Text, TextBase } from 'react-native';
import Markes from '../Screens/Markes';


// In order to type the below route for the screen options,
// send the type arguement when creating the navigator
const MainStack = createStackNavigator<MainNavigatorParamsList>()
const TabStack = createBottomTabNavigator<TabNavigatorParamsList>()

export const Router: React.FC = () => {
    const { Navigator, Screen } = MainStack

    return (
        <Navigator initialRouteName='Welcome'>
            <Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Screen name="Profile" component={Profile} />
            <Screen name="Markes" component={Markes} />
        </Navigator>
    )
}





