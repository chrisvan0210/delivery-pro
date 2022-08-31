import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../src/reducer/restaurantSlice';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketTotal } from '../src/reducer/basketSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter'






const BasketScreen = () => {
    const [groupBasket, setGroupBasket] = useState({})
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems)
    const basketTotalPrice = useSelector(selectBasketTotal)
    const dispatch = useDispatch()

    useEffect(() => {
        const groupItems = items?.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item)
            return results;
        }, {});
        setGroupBasket(groupItems)
    }, [items])

    console.log("res", restaurant)

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-gray-100 ">
                <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xs">
                    <View>
                        <View>
                            <Text className="text-lg font-bold text-center">Your Basket</Text>
                        </View>
                        <Text className="text-center text-gray-400">
                            {restaurant.title}
                        </Text>
                        <TouchableOpacity
                            onPress={navigation.goBack}
                            className="rounded-full bg-gray-100 absolute top-3 right-5"
                        >
                            <XCircleIcon size={25} color="#00ccbb" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                    <Image
                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTwYD-OYfhLR7EA1DJlccK0eel7tP6jFfo_w&usqp=CAU" }}
                        className="h-7 w-7 bg-gray-300 rounded-full"
                    />
                    <Text className="flex-1">Delivery</Text>
                    <TouchableOpacity>
                        <Text className="text-[#00ccbb]">Change</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className="divide-y divide-gray-200">
                    {Object.entries(groupBasket).map(([key, items]) => {
                        return (
                            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                                <Text className="text-[#00ccbb]">x {items.length}</Text>
                                <Image
                                    source={{ uri: urlFor(items[0]?.image).url() }}
                                    className="h-12 w-12 rounded-full"
                                />
                                <Text className="flex-1">{items[0]?.name}</Text>
                                <Text>
                                    <Currency quantity={items[0]?.price} currency="VND" pattern='##,### !' />
                                </Text>
                                <TouchableOpacity>
                                    <Text
                                        className="text-[#00ccbb] text-xs"
                                        onPress={() => dispatch(removeFromBasket({ id: key }))}
                                    >
                                        Remove
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text
                                        className="text-[#00ccbb] text-xs"
                                        onPress={() => dispatch(addToBasket(items[0]))}
                                    >
                                        Add
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>

                <View className="p-5 bg-white mt-5 space-y-4">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Subtotal</Text>
                        <Text className="text-gray-400">
                            <Currency quantity={basketTotalPrice} currency="VND" pattern='##,### !' />
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Subtotal</Text>
                        <Text className="text-gray-400">Delivery Fee
                            <Currency quantity={10000} currency="VND" pattern='##,### !' />
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text >Order Total</Text>
                        <Text className="font-bold">
                            <Currency quantity={basketTotalPrice + 10000} currency="VND" pattern='##,### !' />
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PrepareOrderScreen")}
                        className="rounded-lg bg-[#00ccbb] p-4">
                        <Text className="text-center text-white text-lg font-bold">Place Order</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default BasketScreen