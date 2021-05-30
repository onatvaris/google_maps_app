import { RouteProp, } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { MainNavigatorParamsList } from '../Navigations/types'
import { emailChanged, passwordChanged, userNameChaned } from '../Redux'
import { RootState } from '../Redux/Reducers'
type Props = {
    navigation: StackNavigationProp<MainNavigatorParamsList, 'Login'>
    route: RouteProp<MainNavigatorParamsList, 'Login'>
}
const Login: React.FC<Props> = ({ route, navigation }) => {
    console.log(`route`, route)
    console.log(`navigation`, navigation)
    const { email, password } = useSelector((state: RootState) => state.userResponse)
    const dispatch = useDispatch();

    const registerAction = () => {
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'null value',
                position: 'bottom',
                visibilityTime: 1000
            });
        } else {
            navigation.navigate('Welcome')
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image source={require('../Assets/logo_googleMap.jpeg')} resizeMode='contain' />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>GOOGLE MAKER</Text>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    onChangeText={text => dispatch(emailChanged(text))}
                />
                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    onChangeText={text => dispatch(passwordChanged(text))}
                />
                <TouchableOpacity style={styles.button}
                    onPress={() => registerAction()}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text
                    onPress={() => navigation.navigate('Register')}
                    style={styles.bottomText}>Register if you don't have an account</Text>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )
}

export default Login

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
        borderRadius: 10
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
