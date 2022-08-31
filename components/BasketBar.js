import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../src/reducer/basketSlice'
import Currency from 'react-currency-formatter';
import { useNavigation } from '@react-navigation/native';


const BasketBar = () => {
    const basketPrice = useSelector(selectBasketTotal);
    const itemsAmount = useSelector(selectBasketItems);
    const navigation = useNavigation()

    if (itemsAmount.length <= 0) return null;
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Basket")}
            className="fixed bottom-6 w-full px-3 flex-row justify-center">
            <View className="flex-row w-full justify-between bg-[#00ccbb] p-5 rounded-lg text-white">
                <Text className="text-white font-bold basis-1/3">{itemsAmount.length}</Text>
                <Text className="text-white font-bold basis-1/3">View Basket</Text>
                <Text className="text-white font-bold basis-1/3 text-right">
                    <Currency quantity={Math.floor(basketPrice)} currency="VND" pattern="##,### !" />
                </Text>

            </View>
        </TouchableOpacity>
    )
}

export default BasketBar