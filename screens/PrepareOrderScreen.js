import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PrepareOrderScreen = () => {
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("DeliveryScreen")
        }, 3000)
    }, [])
    return (
        <SafeAreaView className="bg-[#00ccbb] flex-1 justify-center items-center">
            <Animatable.Image
                source={require("../assets/giphy.gif")}
                animation="zoomInUp"
                iterationCount={1}
                className="w-96 h-96 rounded-full"
            />
            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                className="text-lg mt-10 text-white font-bold text-center"
            >
                Waiting for Restaurant to accept your order!
            </Animatable.Text>
            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                className="text-lg text-white font-bold text-center"
            >
                <Progress.Circle size={40} indeterminate={true} fill="#00000000" color="white" />
            </Animatable.Text>

        </SafeAreaView>


    )
}

export default PrepareOrderScreen