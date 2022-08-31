import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    restaurant: {
        id: null,
        imgUrl: null,
        title: null,
        rating: null,
        genre: null,
        address: null,
        short_description: null,
        dishes: null,
        long: null,
        lat: null,
    },
}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        addToRestaurant: (state, action) => {
            state.restaurant = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToRestaurant } = restaurantSlice.actions
export const selectRestaurant = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer