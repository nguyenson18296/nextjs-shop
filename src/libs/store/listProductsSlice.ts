import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IFIlterCard {
    id: number;
    name: string;
}

interface IProduct {
    id: number;
    thumbnail: string;
    title: string;
    price: string;
    discount_price: string;
}

interface IProductState {
    products: IProduct[],
    filters: IFIlterCard[]
}

const initialState: IProductState = {
    products: [],
    filters: []
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProductsAction(state, action: PayloadAction<IProduct[]>) {
            state.products = action.payload;
        },
        setFilters(state, action: PayloadAction<IFIlterCard[]>) {
            state.filters = action.payload
        }
    }
})

export const { getProductsAction, setFilters } = productsSlice.actions;

export default productsSlice.reducer
