import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeFromBasket: (state, action) => {
            let indexItems = state.items.findIndex((item) => item.id === action.payload.id)
            let newBasketState = [...state.items];
            if (indexItems >= 0) {
                newBasketState.splice(indexItems, 1)
            } else {
                console.warn("found no items!!")
            }
            state.items = newBasketState
        },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemsWithID = (state, id) => {
    return state.basket.items?.filter((item) => item.id === id)
};
export const selectBasketTotal = (state) => {
    return state.basket.items?.reduce((total, item) => {
        return total += total + item.price;
    }, 0)
}


export default basketSlice.reducer