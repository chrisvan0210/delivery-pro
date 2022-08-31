import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClent from '../sanity'

const FeaturedRow = ({ id, title, description }) => {
    const [restaurants, setRestaurants] = useState([])


    useEffect(() => {
        sanityClent.fetch(`
        *[_type == "featured" && _id == $id]{
            ...,
            restaurants[]->{
                ...,
                dishes[]->,
                type->{name}
            }
        }[0]`, { id: id })
            .then(data => {
                setRestaurants(data?.restaurants)
            })
    }, [])
    return (
        <View>
            <View className="flex-row items-center justify-between mt-4 px-4">
                <Text className="font-bold text-lg">{title}</Text>
                <ArrowRightIcon color="#00de30" />
            </View>
            <Text className="text-xs text-gray-400 px-4">{description}</Text>

            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                className="pt-4"
            >
                {/* Restaurant Cards... */}
                {restaurants?.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl={restaurant.image}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        address={restaurant.address}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        lat={restaurant.lat}
                        long={restaurant.long}
                    />
                ))}

            </ScrollView>
        </View >
    )
}

export default FeaturedRow