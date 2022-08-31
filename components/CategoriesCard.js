import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'



const CategoriesCard = ({ id, imgUrl, title }) => {
    return (
        <View className="relative mx-1">
            <Image
                source={{ uri: imgUrl ? urlFor(imgUrl).url() : null }}
                className="h-20 w-20 rounded" />
            <Text className="absolute bottom-0.5 text-green-900 font-bold drop-shadow-lg shadow-black">
                {title}
            </Text>
        </View>
    )
}

export default CategoriesCard

 // style={styles.text}
// const styles = StyleSheet({
//     text: {
//         filter: "drop-shadow('2px 4px 6px black')"
//     }
// })