import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarList from './pages/CarList';
import CarDetails from './pages/CarDetails';
const Stack = createNativeStackNavigator();



const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTintColor: 'white', headerStyle: { backgroundColor: '#00ccff' } }}>
        <Stack.Screen name="carList" component={CarList} options={{ title: 'Vehicle List' }} />
        <Stack.Screen name="carDetails" component={CarDetails} options={{ title: 'Vehicle Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})