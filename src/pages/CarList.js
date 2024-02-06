import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Searchbar } from 'react-native-paper';
import AxiosObj from '../AxiosObj/AxiosObj';
import { FlashList } from "@shopify/flash-list";


const CarList = ({ navigation }) => {
    const carList = [];
    const [suggestions, setSuggestions] = useState(carList);
    const [searchInput, setSearchInput] = useState();
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const [cars, setCars] = useState();
    const filterCarList = (value) => {
        setSuggestions(carList.filter((item) => item.Registration_No.toLowerCase().includes(value.toLowerCase())));
        setSearchInput(value);
    }
    const onSearchComfirm = (reg_no) => {
        navigation.navigate('carDetails', { regNo: reg_no });
    }
    const flatListData = (itemData) => {
        // filters the data list ontextchange
        return (
            <Pressable onPress={onSearchComfirm.bind(this, itemData.item.Registration_No)} android_ripple={{ color: '#ccc' }} style={styles.searchList}>
                <Text style={{ fontSize: 18, }}>{itemData.item.Registration_No}</Text>
            </Pressable>
        )
    }
    const responseCarSearchHandler = async (value) => {
        try {
            const response = await AxiosObj.get('get10Vehicle.php', {
                params: {
                    car_no: value
                }
            });
            if (response.data.error === false) { // response.data  this data is predefined
                console.log(response.data.data);
                setSuggestions(response.data.data);
            } else {
                console.log(response.data.error);
                console.log(response.data.message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const responseCarsHandler = async () => {
        try {
            const response = await AxiosObj.get('get500Vehicle.php')
            if (response.data.error === false) {
                setCars(response.data.data);
            } else {
                console.log(response.data.error);
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        responseCarsHandler();
    }, []);

    return (
        <View style={{ flex: 1 }} >
            <Searchbar value={searchInput} style={styles.searchBar} onChangeText={responseCarSearchHandler} onFocus={() => setSuggestionsVisible(true)} />
            {suggestionsVisible ? <FlashList data={suggestions} renderItem={flatListData} keyExtractor={(item) => item.Registration_No} estimatedItemSize={5} /> : null}
            <FlashList
                numColumns={2}
                data={cars}
                renderItem={(itemData) => {
                    return (
                        <Pressable onPress={onSearchComfirm.bind(this, itemData.item.Registration_No)} >
                            <Text style={{ fontSize: 20 }}>{itemData.item.Registration_No}</Text>
                        </Pressable>
                    )
                }}
                keyExtractor={(item) => item.Registration_No}
                estimatedItemSize={500} />
        </View>
    )
}

export default CarList

const styles = StyleSheet.create({
    searchList: {
        padding: 10,
        margin: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 4
    },
    searchBar: {
        borderRadius: 32,
        marginHorizontal: 7,
        marginTop: 5,
        backgroundColor: 'white'
    }
})