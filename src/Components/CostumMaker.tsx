import React, { useRef, useState } from 'react'
import { Text, View, Animated, StyleSheet, Dimensions } from 'react-native'
import { Callout } from 'react-native-maps'
import { Marker, Region } from 'react-native-maps'
import { Marke } from '../Redux/Types'

interface CostumMakerProps {
    item: Marke
    index: number
    scrollAnimation: any
}

const OUTER_CARD_WIDTH = Dimensions.get('window').width;
const CostumMaker: React.FunctionComponent<CostumMakerProps> = ({ item, index, scrollAnimation }) => {
    const { callout, latitude, longitude, delta } = item
    const [region, setRegion] = useState({
        latitude,
        longitude,
        latitudeDelta: delta,
        longitudeDelta: delta,
    });
    let inputRange = useRef([
        (index - 1) * OUTER_CARD_WIDTH,
        index * OUTER_CARD_WIDTH,
        (index + 1) * OUTER_CARD_WIDTH,
    ]);
    // return (
    //     <Marker
    //         coordinate={region}>
    //         <View
    //             style={{
    //                 backgroundColor: 'rgba(130,4,150, 0.9)',
    //                 justifyContent: 'center',
    //                 alignItems: 'center'
    //             }}>
    //             <View style={{ height: 50, width: 50 }}>
    //                 <Text>asdf</Text>
    //             </View>
    //         </View>
    //     </Marker>
    // )
    return (
        <Marker
            key={index}
            coordinate={region}>
            <Animated.View
                style={[
                    styles.markerWrap,
                    {
                        opacity: scrollAnimation.interpolate({
                            inputRange: inputRange.current,
                            outputRange: [0.5, 1, 0.5],
                            extrapolate: 'clamp',
                        }),
                    },
                ]}
            >
                <Animated.View
                    style={[
                        styles.ring,
                        {
                            transform: [
                                {
                                    scale: scrollAnimation.interpolate({
                                        inputRange: inputRange.current,
                                        outputRange: [1, 1.5, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                />
                <View style={styles.marker} />
            </Animated.View>
            <Callout tooltip style={{ width: 160 }}>
                <View style={styles.calloutCard}>
                    <Text style={styles.name}>{callout}</Text>
                </View>
                <View style={styles.triangle} />
            </Callout>
        </Marker>
    );
}



export default CostumMaker


const styles = StyleSheet.create({
    markerWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: 75,
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(130,4,150, 0.9)',
    },
    ring: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'rgba(130,4,150, 0.3)',
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'rgba(130,4,150, 0.5)',
    },
    calloutCard: {
        backgroundColor: 'rgba(0,0,0,0.65)',
        borderRadius: 6,
        padding: 5,
        width: 160,
    },
    name: {
        fontSize: 15,
        marginBottom: 2,
        color: 'white',
        textAlign: "center",
        fontFamily: 'Montserrat-SemiBold',
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftWidth: 10,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'rgba(0,0,0,0.65)',
        borderLeftColor: 'transparent',
        alignSelf: 'center',
        transform: [{ rotate: '180deg' }],
        top: -2,
    },
});
