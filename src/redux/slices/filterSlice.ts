import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum SortPropertuEnum {
    RATING_DESK = 'rating',
    RATING_ASK = '-rating',
    PRICE_DESK = 'price',
    PRICE_ASK = '-price',
    NAME_DESK = 'name',
    NAME_ASK = '-name',

}

export type SortType = {
    name: string; 
    sortProperty: SortPropertuEnum;
};

export interface FilterSliceType {
    searchValue: string;
    categoryId: number;
    sortType: SortType;
};

const initialState: FilterSliceType = {
    searchValue: '',
    categoryId: 0,
    sortType: {
        name: 'Popular: max-min', 
        sortProperty: SortPropertuEnum.RATING_DESK //'rating'
    }
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSortType(state, action: PayloadAction<SortType>) {
            state.sortType = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceType>) {
            state.categoryId = Number(action.payload.categoryId);
            state.sortType = action.payload.sortType;
        }
    }
});

export const { setCategoryId, setSortType, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;