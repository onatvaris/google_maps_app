import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, Platform, StyleSheet, Text, TouchableOpacity, View, Image, Alert, Modal, TextInput } from 'react-native'
import MapView, { Callout, LatLng, Marker, Polyline, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region, } from 'react-native-maps';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FloatingAction } from "react-native-floating-action";
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setMarkeAction } from '../Redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainNavigatorParamsList } from '../Navigations/types';

const actions = [
    {
        text: "Profil",
        name: "bt_accessibility",
        position: 1,
        icon: require("../Assets/icon_profile.png"),

    },
    {
        text: "Konum işaretle",
        name: "marker",
        position: 2,
        icon: require("../Assets/icon_location.png"),

    },
];
type Props = {
    navigation: StackNavigationProp<MainNavigatorParamsList, 'Welcome'>
}
const Welcome: React.FC<Props> = ({ navigation }) => {
    const [coord, setCoord] = useState<LatLng>();
    const [modalVisible, setModalVisible] = useState(false);
    const [locationSelecet, setLocationSelecet] = useState()
    const [callout, setCallout] = useState('')
    const markes = useSelector((state: RootState) => state.markeResponse.marke)
    const dispatch = useDispatch()
    const map = useRef<MapView>(null);
    const [region, setRegion] = useState({
        latitude: 41.155563,
        longitude: 27.811736,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const coordDolmabahce = {
        latitude: 41.1557623407,
        longitude: 27.8130511846,
    };

    Geolocation.watchPosition(
        (position) => {
            setCoord(position.coords);
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            useSignificantChanges: true,
            timeout: 1000
        },
    );

    const onRegionChange = (changedRegion: Region) => {
        console.log("a")
        setRegion(changedRegion);
    };

    const zoomDelta = 0.0009;
    const onZoom = (zoomSign: number) => {
        const zoomedRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta - zoomDelta * zoomSign,
            longitudeDelta: region.longitudeDelta - zoomDelta * zoomSign,
        };
        setRegion(zoomedRegion);
        map.current!.animateToRegion(zoomedRegion);
    };
    const onZoomIn = () => onZoom(5);
    const onZoomOut = () => onZoom(-5);

    const SaveMarkePress = () => {
        console.log(`locationSelecet`, locationSelecet)
        if (locationSelecet === '1') {
            console.log(`coord`, coord)
            dispatch(setMarkeAction({
                latitude: coord?.latitude,
                longitude: coord?.longitude,
                callout
            }))
            setModalVisible(false)
        }
        if (locationSelecet === '2') {
            // haritada belirtilen konumu kaydet
            console.log(`regionbb`, region)
            dispatch(setMarkeAction({
                latitude: region?.latitude,
                longitude: region?.longitude,
                callout
            }))
            console.log(`state`, markes)
            setModalVisible(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView
                ref={map}
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                // başlangıç noktası
                initialRegion={region}
                onRegionChange={onRegionChange}>
                {markes?.map((v, i, a) => {
                    return (
                        <Marker
                            coordinate={{
                                latitude: Number(v.latitude),
                                longitude: Number(v.longitude),
                            }}
                            key={i}>
                            <Callout>
                                <View>
                                    <Text>
                                        {v.callout}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>)
                })}
                {coord !== undefined &&
                    <Marker coordinate={coord} >
                        {/* bulunduğumuz konum */}
                        <Image
                            source={require('../Assets/icon_userLocation.png')}
                            style={{ width: 27, height: 26 }}
                            resizeMode="contain" />
                    </Marker>}
                {/* haritada gösterdiğimiz konum */}
                <Marker coordinate={region} />
            </MapView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onZoomIn}>
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>
                <View style={styles.spacer} />
                <TouchableOpacity style={styles.button} onPress={onZoomOut}>
                    <Text style={[styles.text, { fontWeight: 'bold', fontSize: 16 }]}>-</Text>
                </TouchableOpacity>
            </View>
            <FloatingAction
                position={'left'}
                actions={actions}
                onPressItem={name => {
                    if (name === 'marker') {
                        setModalVisible(true)
                    } else {
                        navigation.navigate('Profile')
                    }
                }}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <RNPickerSelect
                            style={{
                                inputAndroid: { color: 'black' },
                                inputIOSContainer: { padding: 20 }
                            }}
                            onValueChange={(value) => setLocationSelecet(value)}
                            items={[
                                { label: 'mark my own location', value: '1' },
                                { label: 'mark the location on the map', value: '2' },
                            ]}
                        />
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                leave a note
                            </Text>
                            <TextInput
                                style={{
                                    width: wp('53%'),
                                    borderBottomWidth: 1,
                                    height: 40,
                                    paddingLeft: 14,
                                    marginTop: 10
                                }}
                                placeholder='Note...'
                                onChangeText={(text) => setCallout(text)}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={styles.modalButton}>
                                    <Text style={{ color: '#fff' }}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => SaveMarkePress()}
                                    style={styles.modalButton}>
                                    <Text style={{ color: '#fff' }}>Save Marke</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    )
}

export default Welcome

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        end: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: 12,
    },
    button: {},
    text: {
        textAlign: 'center',
    },
    spacer: {
        marginVertical: 4,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        height: hp('33%'),
        width: wp('65%'),

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalButton: {
        backgroundColor: '#2a52bf',
        marginTop: 15,
        width: wp('23%'),
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5,

    }
})
