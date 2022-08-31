import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { urlFor } from '../sanity'
import { ArrowLeftIcon, LocationMarkerIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/solid'
import { ChevronRightIcon } from 'react-native-heroicons/outline'
import DishRow from '../components/DishRow'
import BasketBar from '../components/BasketBar'
import { useDispatch, useSelector } from 'react-redux'
import { addToRestaurant } from '../src/reducer/restaurantSlice'


const RestaurantScreen = () => {
    const Navigation = useNavigation();
    const dispatch = useDispatch()

    // const route = useRoute()
    const { params: {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
    } } = useRoute()

    useEffect(() => {
        dispatch(addToRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        }))
    }, [])

    useLayoutEffect(() => {
        Navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <>
            <ScrollView className="relative flex flex-col">
                <View className="relative">
                    <Image
                        source={{ uri: imgUrl ? urlFor(imgUrl).url() : null }}
                        className="w-full h-60 bg-gray-300 p-4"
                    />
                    <TouchableOpacity
                        onPress={() => Navigation.goBack()}
                        className="absolute top-10 left-5 bg-gray-200 rounded-full w-8 h-8 p-2">
                        <ArrowLeftIcon size={18} color="#00CCBB" />
                    </TouchableOpacity>
                </View>

                <View className="bg-white pb-10">
                    <View className="px-4 pt-4">
                        <Text className="text-3xl font-bold">{title}</Text>
                        <View className="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <StarIcon color="green" size={22} opacity={0.5} />
                                <Text className="text-xs text-green-500">
                                    <Text className="text-green-500">{rating}</Text> . {genre}
                                </Text>
                            </View>

                            <View className="flex-row items-center space-x-1">
                                <LocationMarkerIcon color="gray" size={22} opacity={0.5} />
                                <Text className="text-xs text-gray-500">
                                    <Text className="text-gray-500">Nearby . {address}</Text>
                                </Text>
                            </View>

                            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
                        </View>

                        <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
                            <QuestionMarkCircleIcon color="gray" size={22} opacity={0.5} />
                            <Text className="pl-2 flex-1 text-md font-bold">
                                Have a food already?
                            </Text>
                            <ChevronRightIcon color="#00CCBB" size={22} opacity={0.5} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
                        {dishes.map((dish) => (
                            <DishRow
                                key={dish._id}
                                id={dish._id}
                                name={dish.name}
                                description={dish.short_description}
                                price={dish.price}
                                image={dish.image}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
            <BasketBar />
        </>
    )
}

export default RestaurantScreen