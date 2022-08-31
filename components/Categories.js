import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoriesCard from './CategoriesCard'
import sanityClient from "../sanity"

const Categories = () => {
    const [categories, seCategories] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "category"]{
            ...,
        }`).then(data => {
            seCategories(data)
        })
    }, [])

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10
            }}
        >
            {categories?.map(category => (
                <CategoriesCard
                    key={category._id}
                    id={category._id}
                    title={category.name}
                    imgUrl={category.image}
                />
            ))}

        </ScrollView>
    )
}

export default Categories