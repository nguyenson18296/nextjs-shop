import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IFIlterCard {
    id: number;
    name: string;
}

export type TDisplayType = 'list' | 'grid';

interface IProduct {
    id: number;
    thumbnail: string;
    title: string;
    price: string;
    discount_price: string;
}

interface IProductState {
    isLoading: boolean;
    products: IProduct[],
    total: number;
    filters: IFIlterCard[],
    displayType: TDisplayType
}

const initialState: IProductState = {
    isLoading: true,
    products: [],
    total: 0,
    filters: [],
    displayType: 'list'
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProductsAction(state, action: PayloadAction<IProduct[]>) {
            state.products = action.payload;
        },
        getTotal(state, action: PayloadAction<number>) {
            state.total = action.payload;
        },
        setFilters(state, action: PayloadAction<IFIlterCard[]>) {
            state.filters = action.payload
        },
        setDisplayType(state, action: PayloadAction<TDisplayType>) {
            state.displayType = action.payload
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        }
    }
})

export const { getProductsAction, setFilters, setDisplayType, getTotal, setIsLoading } = productsSlice.actions;

export default productsSlice.reducer
