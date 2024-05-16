import { createSlice } from '@reduxjs/toolkit'
import { Color, Size } from '../../models/model'

export interface BasketState {
    type: {
        id: number;
        name: string;
    }
    product: Color;
    size: Size;
}

const initialState: BasketState[] = []

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
      addProduct: (state, action) => {
        const isItemAlreadyExists = (newItem: BasketState): boolean => {
            return state.some(item =>
                item.type.id === newItem.type.id &&
                item.product.id === newItem.product.id &&
                item.size.id === newItem.size.id
            );
        }

        if (!isItemAlreadyExists(action.payload)) {
            state.push(action.payload);
        } 
      },
      removeProduct: (state, action) => {
        state.splice(action.payload, 1)
      }
    },
})

export const { addProduct, removeProduct } = basketSlice.actions

export default basketSlice.reducer