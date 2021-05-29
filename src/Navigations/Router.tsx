import React from 'react'
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack'
import {
    MainNavigatorParamsList,
} from './types'
import Register from '../Screens/Register'
import Login from '../Screens/Login'
import Welcome from '../Screens/Welcome'


// In order to type the below route for the screen options,
// send the type arguement when creating the navigator
const MainStack = createStackNavigator<MainNavigatorParamsList>()


const Router: React.FC = () => {
    const { Navigator, Screen } = MainStack

    return (
        <Navigator headerMode="none" screenOptions={{ headerShown: false }} initialRouteName='Register'>
            <Screen name="Register" component={Register} />
            <Screen name="Welcome" component={Welcome} />
            <Screen name="Login" component={Login} />
        </Navigator>
    )
}


export default Router
