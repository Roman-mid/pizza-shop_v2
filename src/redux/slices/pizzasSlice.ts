import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type SearchPizzaParams = {
    category: string;
    sortBy: string;
    order: string;
};

export type PizzaBlockType = {
    id: number;
    name: string;
    imageUrl: string;
    types: number[];
    sizes: number[];
    price: number[];
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
};

interface PizzaSliceType {
    pizzas: PizzaBlockType[];
    status: Status;
};

const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params: SearchPizzaParams) => {
        const { category, sortBy, order } = params;
        const response = await fetch(`https://64f21e6d0e1e60602d24c3bb.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`);
        const json = await response.json() as PizzaBlockType[];
        return json;
    }
);

const initialState: PizzaSliceType = {
    pizzas: [],
    status: Status.LOADING
};

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<PizzaBlockType[]>) {
            state.pizzas = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.pizzas = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.pizzas = [];
            state.status = Status.ERROR;
        });
      },
});

export const { setPizzas } = pizzasSlice.actions;
export { fetchPizzas }
export default pizzasSlice.reducer;