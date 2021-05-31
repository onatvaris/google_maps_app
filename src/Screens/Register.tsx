import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View, } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Toast, { BaseToast } from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux'
import { MainNavigatorParamsList } from '../Navigations/types'
import { RootState, registerAction } from '../Redux'
import validateEmail from '../Helpers/checkEmail'
type Props = {
    navigation: StackNavigationProp<MainNavigatorParamsList, 'Register'>
    route: RouteProp<MainNavigatorParamsList, 'Register'>
}

const Register: React.FC<Props> = ({ navigation, route, children }) => {
    const [Password, setPassword] = useState('')
    const [Email, setEmail] = useState('')
    const dispatch = useDispatch();


    const registerButtonPress = () => {
        const user = [{
            email: Email,
            password: Password,
        }]
        if (!Email || !Password || !validateEmail(Email)) {
            Toast.show({
                type: 'error',
                text1: 'V',
                position: 'bottom',
                visibilityTime: 1000
            });
        } else {
            dispatch(registerAction({ email: Email, password: Password }))
            navigation.navigate('Welcome')
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image source={require('../Assets/logo_googleMap.jpeg')} resizeMode='contain' />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>GOOGLE MAKER</Text>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.button}
                    onPress={() => registerButtonPress()}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <Text
                    onPress={() => navigation.navigate('Login')}
                    style={styles.bottomText}>If you are already a member, login</Text>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    logoContainer: {
        height: hp('30%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        height: hp('70%'),
        alignItems: 'center',
        paddingTop: 30
    },
    input: {
        borderWidth: 1,
        marginVertical: 10,
        width: wp('87%'),
        paddingLeft: 15,
        borderRadius: 10,
        height: 40
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    button: {
        width: wp('50%'),
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        borderRadius: 10,
        backgroundColor: '#2794cf'
    },
    buttonText: {
        fontSize: 17,
        color: '#ffff'
    },
    bottomText: {
        marginTop: 20,
        color: '#03a5fc',
    }
})
