import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CarDetails = ({ navigation, route }) => {
    const { regNo } = route.params;
    alert(regNo)
    return (
        <View>
            <Text>CarDetails</Text>
        </View>
    )
}

export default CarDetails

const styles = StyleSheet.create({})