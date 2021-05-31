import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Region } from 'react-native-maps'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux'
import { Marke } from '../Redux/Types'

interface Props {

}

const Profile: React.FC<Props> = () => {
    const { email, } = useSelector((state: RootState) => state.userResponse)
    const { marke } = useSelector((state: RootState) => state.markeResponse)

    type marker = {
        callout?: string
        latitude?: number
        longitude?: number
    }

    const renderItem = ({ item }: { item: marker }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={{ marginRight: 10 }}>Note: {item.callout} </Text>
                <Image
                    source={require('../Assets/icon_location.png')}
                />
            </TouchableOpacity>
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
                <Text style={{ alignSelf: 'center', fontSize: 24, fontWeight: 'bold' }}>PROFIL</Text>
                <View style={styles.contentTopContainer}>
                    <Text style={{
                        fontSize: 16,
                        borderBottomWidth: 1,
                        width: wp('70%'),
                        alignSelf: 'center'
                    }} >Email: {email}</Text>
                    <TouchableOpacity
                        style={styles.button}>
                        <Text style={{ color: 'white' }}>Change Password</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.6 }}>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 19
                    }}>Marker List</Text>
                    <FlatList
                        data={marke}
                        renderItem={renderItem}
                        style={{
                            padding: 15
                        }}
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
        backgroundColor: '#705E59',
        flex: 1,
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55,
        paddingTop: 15
    },
    contentTopContainer: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center'
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
    }
})
