import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { ClassAttributes, MutableRefObject, useEffect, useRef, useState } from 'react'
import { Animated, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Region } from 'react-native-maps'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import CostumMaker from '../Components/CostumMaker'
import { MainNavigatorParamsList } from '../Navigations/types'
import { RootState } from '../Redux'
import { Marke } from '../Redux/Types'
import { flatlistHeight } from '../Utils/constans'
import { data } from '../Utils/myJsonFile0'

const request = require('request');
interface MarkesProps {
    navigation: StackNavigationProp<MainNavigatorParamsList, 'Markes'>
    route: RouteProp<MainNavigatorParamsList, 'Markes'>
}
export interface ListItem {
    city: string
    country: string
    countryCode: string
    firstname: string
    lastname: string
}

const Markes: React.FC<MarkesProps> = ({ route, navigation }) => {
    const { marke } = useSelector((state: RootState) => state.markeResponse)
    let flatlistRef = useRef<FlatList<any>>(null);
    let text = useRef<MutableRefObject<any>>();
    const [mapIndex, setMapIndex] = useState(0)
    // const { index } = route.params
    let scrollAnimation = useRef(new Animated.Value(0)).current;
    let _map = useRef<MapView>(null);
    const [region, setRegion] = useState({
        latitude: marke[0].latitude,
        longitude: marke[0].longitude,
        latitudeDelta: marke[0].delta,
        longitudeDelta: marke[0].delta
    });



    useEffect(() => {
        const { delta, latitude, longitude } = marke[mapIndex]
        _map.current?.animateToRegion({
            latitude, longitude,
            latitudeDelta: delta,
            longitudeDelta: delta
        })

    }, [mapIndex])

    const onRegionChange = (changedRegion: Region) => {
        setRegion(changedRegion);
    };

    const RenderMarker = (item: Marke, index: number) => {
        return <CostumMaker item={item} index={index} key={index}
            scrollAnimation={scrollAnimation} />
    }



    const renderList = ({ item, index }: { item: Marke, index: number }) => {
        const { callout } = item
        return (
            <View
                style={{
                    height: flatlistHeight,
                    width: wp('66%'),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text
                    style={{ fontSize: 17, fontWeight: 'bold' }}>
                    Note:  {callout}
                </Text>
            </View>
        )
    }

    const onPressLeft = () => {
        if ((!mapIndex) || (mapIndex < 0)) return
        let newIndex = mapIndex - 1;
        setMapIndex(newIndex)
        flatlistRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }

    const onPressRight = () => {
        if (mapIndex >= (marke.length - 1)) return; // son field ta
        let newIndex = mapIndex + 1;
        setMapIndex(newIndex)
        flatlistRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flex: 1, }}>
                <MapView
                    ref={_map}
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 1, }}
                    // başlangıç noktası
                    initialRegion={region}>
                    {marke.map(RenderMarker)}
                </MapView >
            </View>
            <View
                style={styles.buttonContainer}>
                <TouchableOpacity onPress={onPressLeft} style={styles.flatbutton}>
                    <Image
                        style={styles.iconImage}
                        source={require('../Assets/chevron_left.png')}
                    />
                </TouchableOpacity>
                <FlatList
                    initialNumToRender={marke.length}
                    ref={flatlistRef}
                    horizontal
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: scrollAnimation,
                                    },
                                },
                            },
                        ],
                        { useNativeDriver: false, },
                    )}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false} // doğru olduğunda yatay kaydırma göstergesi gösterilir
                    snapToAlignment="center"
                    keyExtractor={(item, index) => index.toString()}
                    data={marke}
                    renderItem={renderList}
                />
                <TouchableOpacity onPress={onPressRight} style={styles.flatbutton}>
                    <Image
                        style={styles.iconImage}
                        source={require('../Assets/chevron_right.png')}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        height: flatlistHeight,
        width: wp('100%'),
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row'
    },
    flatbutton: {
        height: flatlistHeight,
        width: wp('17%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconImage: {
        height: 35,
        width: 35,
        resizeMode: 'contain'
    },
})

export default Markes
