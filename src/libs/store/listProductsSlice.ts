import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFIlterCard {
  id: number;
  name: string;
}

export type TDisplayType = "list" | "grid";

interface IProduct {
  id: number;
  thumbnail: string;
  title: string;
  price: string;
  discount_price?: string;
  images?: string[];
  slug: string;
}

interface IProductState {
  isLoading: boolean;
  products: IProduct[];
  total: number;
  filters: IFIlterCard[];
  displayType: TDisplayType;
  in_cart: number[];
}

const initialState: IProductState = {
  isLoading: true,
  products: [],
  total: 0,
  filters: [],
  displayType: "list",
  in_cart: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsAction(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    getTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setFilters(state, action: PayloadAction<IFIlterCard[]>) {
      state.filters = action.payload;
    },
    setDisplayType(state, action: PayloadAction<TDisplayType>) {
      state.displayType = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    addToCart(state, action: PayloadAction<number[] | number>) {
      if (Array.isArray(action.payload)) {
        action.payload.forEach((id) => {
          if (!state.in_cart.includes(id)) {
            state.in_cart = state.in_cart.concat(id);
          }
        });
      } else {
        if (!state.in_cart.includes(action.payload)) {
          state.in_cart = state.in_cart.concat(action.payload);
        }
      }
    },
    clearCart(state) {
      state.in_cart = [];
    }
  },
});

export const {
  getProductsAction,
  setFilters,
  setDisplayType,
  getTotal,
  setIsLoading,
  addToCart,
  clearCart,
} = productsSlice.actions;

export default productsSlice.reducer;
