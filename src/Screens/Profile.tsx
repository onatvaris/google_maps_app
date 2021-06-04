import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Region } from 'react-native-maps'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import { MainNavigatorParamsList } from '../Navigations/types'
import { deleteMarkeAction, RootState } from '../Redux'
import { Marke } from '../Redux/Types'

interface Props {
    navigation: StackNavigationProp<MainNavigatorParamsList, 'Profile'>
}

const Profile: React.FC<Props> = ({ navigation }) => {
    const { email, } = useSelector((state: RootState) => state.userResponse)
    const { marke } = useSelector((state: RootState) => state.markeResponse)
    const dispatch = useDispatch()
    type marker = {
        callout?: string
        latitude: number
        longitude: number
    }
    useEffect(() => {
        console.log(marke)
        return () => {
            console.log("ttt")
        }
    }, [marke])

    const renderItem = ({ item, index }: { item: marker, index: number }) => {
        console.log(`index`, index)
        return (
            <View
                style={{
                    flexDirection: 'row',
                    padding: 10,
                    borderBottomWidth: 0.5,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <Text style={{ marginRight: 10, }}>Note: {item.callout} </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Markes', { index: index })}
                        style={styles.iconButton}>
                        <Image
                            source={require('../Assets/icon_location.png')}
                            style={{ tintColor: '#fff' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            marke.splice(index, 1)
                            dispatch(deleteMarkeAction(marke))
                        }}
                        style={styles.iconButton}>
                        <Image
                            style={{ height: 24, width: 24, tintColor: 'black' }}
                            source={require('../Assets/delete.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../Assets/Avatar18.png')}
                    style={styles.image}
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={{ alignSelf: 'center', fontSize: 24, fontWeight: 'bold' }}>PROFILE</Text>
                <View style={styles.contentTopContainer}>
                    <Text style={{
                        fontSize: 16,
                        borderBottomWidth: 1,
                        width: wp('70%'),
                        alignSelf: 'center'
                    }}>Email: {email}</Text>
                    <TouchableOpacity
                        style={styles.button}>
                        <Text style={{ color: 'white' }}>Change Password</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.7 }}>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 19,
                    }}>Marker List</Text>
                    <FlatList
                        data={marke}
                        renderItem={renderItem}
                        style={{
                            padding: 15
                        }}
                        keyExtractor={(key) => key.index}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    imageContainer: { height: hp('26%'), justifyContent: 'center', },
    contentContainer: {
        backgroundColor: 'rgba(140, 94, 86,0.8)',
        flex: 1,
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55,
        paddingTop: 15
    },
    contentTopContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        marginTop: 10,
        borderTopColor: '#fff'
    },
    image: {
        alignSelf: 'center',
        height: 200,
        width: 200,
        resizeMode: 'contain'
    },
    button: {
        backgroundColor: '#B64F4F',
        height: 45,
        width: wp('45%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 10,
    },
    iconButton: {
        marginHorizontal: 5,
        padding: 3
    }
})
