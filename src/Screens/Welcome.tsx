import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, Platform, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import MapView, { Callout, LatLng, Marker, Polyline, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region, } from 'react-native-maps';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FloatingAction } from "react-native-floating-action";
const actions = [
    {
        text: "Profil",
        name: "bt_accessibility",
        position: 1,
        icon: require("../Assets/icon_profile.png"),

    },
    {
        text: "Konumumu işaretle",
        name: "bt_language",
        position: 2,
        icon: require("../Assets/icon_location.png"),

    },
];



const Welcome = () => {
    const [coord, setCoord] = useState<LatLng>();
    const map = useRef<MapView>(null);
    const [region, setRegion] = useState({
        latitude: 41.155563,
        longitude: 27.811736,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const coordDolmabahce = {
        latitude: 41.156593,
        longitude: 27.811499,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    Geolocation.getCurrentPosition(
        (c) =>
            setCoord({
                latitude: c.coords.latitude,
                longitude: c.coords.longitude,
            }),
        (error) => console.log(error),
        {
            enableHighAccuracy: true,
        },
    );

    Geolocation.watchPosition(
        (position) => {
            console.log(position);
            setCoord(position.coords);
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
        },
    );

    const onRegionChange = (changedRegion: Region) => {
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView
                ref={map}
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                // başlangıç noktası
                initialRegion={region}
                onRegionChange={onRegionChange}>
                <Marker coordinate={coordDolmabahce}>
                    <Callout>
                        <View>
                            <Text>Dolmabahçe sarayı</Text>
                        </View>
                    </Callout>
                </Marker>
                {coord !== undefined &&
                    <Marker coordinate={coord} >
                        <Image
                            source={require('../Assets/icon_userLocation.png')}
                            style={{ width: 27, height: 26 }}
                            resizeMode="contain" />
                    </Marker>}
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
                    console.log(`selected button: ${name}`);
                }}
            />
        </SafeAreaView>
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
})
