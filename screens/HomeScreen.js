import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AdjustmentsIcon, AnnotationIcon, ChevronDownIcon, SearchIcon, UserIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity'
import Featured from '../sanity/schemas/featured';


const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        const getFeatured = async () => {
            let res = await sanityClient.fetch(`
            *[_type == "featured"]{
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->
                }
            }`);
            setFeaturedCategories(res)
        }
        getFeatured();
        return () => getFeatured;
    }, [])

    return (
        <SafeAreaView>
            {/* Header */}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTwYD-OYfhLR7EA1DJlccK0eel7tP6jFfo_w&usqp=CAU" }}
                    className="h-7 w-7 bg-gray-300 rounded-full"
                />
                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">
                        Deliver Now!
                    </Text>
                    <Text className="font-bold text-xl">
                        Current Location
                        <ChevronDownIcon size={20} color="#00de30" />

                    </Text>
                </View>
                <UserIcon size={35} color="#00de30" />
            </View>

            {/* Search */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-1">
                    <SearchIcon />
                    <TextInput
                        placeholder='Restaurant and cuisinnes'
                        keyboardType='default'

                    />
                </View>
                <AdjustmentsIcon color="#00de30" />
            </View>

            {/* Body */}
            <ScrollView className="bg-gray-100 pb-2">
                {/* Component Categories */}
                <Categories />
                {/* Featured*/}
                {featuredCategories?.map((category) => {
                    return (
                        <FeaturedRow
                            key={category._id}
                            id={category._id}
                            title={category.name}
                            description={category.short_description}
                        />
                    )
                })}
            </ScrollView>


        </SafeAreaView>
    )
}

export default HomeScreen