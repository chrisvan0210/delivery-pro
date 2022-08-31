import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Currency from 'react-currency-formatter';
import { urlFor } from '../sanity';
import { PlusCircleIcon, MinusCircleIcon } from 'react-native-heroicons/solid';

import { useSelector, useDispatch } from 'react-redux'
import { removeFromBasket, addToBasket, selectBasketItems, selectBasketItemsWithID } from '../src/reducer/basketSlice'

const DishRow = ({ id, name, description, price, image }) => {
    const [isPressed, setIsPressed] = useState(false)

    const items = useSelector((state) => selectBasketItemsWithID(state, id))
    const dispatch = useDispatch()


    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, image }))
    }
    const removeItemToBasket = () => {
        if (!items.length > 0) return;
        dispatch(removeFromBasket({ id }))
    }

    return (
        <TouchableOpacity
            onPress={() => setIsPressed(true)}
            className={`relative bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}>
            <View className="flex-row">
                <View className="flex-1 pr-2 ">
                    <Text className="text-lg-1">{name}</Text>
                    <Text className="text-gray-400">{description}</Text>
                    <Text>
                        <Currency quantity={parseInt(price)} currency="VND" pattern="##,### !" />
                    </Text>
                </View>
                <View>
                    <Image
                        source={{ uri: image ? urlFor(image).url() : null }}
                        className="h-20 w-20 bg-gray-300 p-4"
                    />
                </View>
            </View>
            {isPressed && (
                <View>
                    <View className="flex-row items-center space-x-2">
                        <TouchableOpacity
                            disabled={!items.length > 0}
                            onPress={() => removeItemToBasket()}
                        >
                            <MinusCircleIcon size={40} color={`${items.length > 0 ? "#00CCBB" : "#999"}`} />
                        </TouchableOpacity>
                        <Text className={`text-lg font-bold ${isPressed ? "text-green-500" : "text-gray-500"}`}>{items.length}</Text>
                        <TouchableOpacity onPress={() => addItemToBasket()}>
                            <PlusCircleIcon size={40} color="#00CCBB" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default DishRow