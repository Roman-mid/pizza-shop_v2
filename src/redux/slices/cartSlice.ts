import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PizzaInCartType = {
    id: number;
    name: string;
    imageUrl: string;
    type: string;
    size: number;
    price: number;
    count: number;
    countId: number;
};

interface CartSliceType {
    pizzas: PizzaInCartType[];
    price: number;
    allCount: number;
};

const totalPrice = (pizzas: PizzaInCartType[]) => {
    const price = pizzas.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    const allCount = pizzas.reduce((sum, obj) => sum + obj.count, 0);
    return { price, allCount }
};

const totalPizzasId = (state: CartSliceType, action: PayloadAction<PizzaInCartType>) => {
    const findPizzaId = state.pizzas.filter(pizza => pizza.id === action.payload.id);
    const countPizzasId = findPizzaId.reduce((sum, pizza) => sum + pizza.count, 0);

    findPizzaId.map(pizza => {
        pizza.countId = countPizzasId;

        return pizza;
    })
};

const getFindPizza = (state: CartSliceType, action: PayloadAction<PizzaInCartType>) => {
    const findPizza = state.pizzas.find(pizza => {
        return pizza.id === action.payload.id
        && pizza.type === action.payload.type 
        && pizza.size === action.payload.size
    });
    return findPizza;
};

const getPizzafromLS = () => {
    const data = localStorage.getItem('pizzasOnCart');
    const pizzas: PizzaInCartType[] = data ? JSON.parse(data) : [];
    
    const { price, allCount} = totalPrice(pizzas);

    return {
        pizzas,
        price,
        allCount,
    };
};

const { pizzas, price, allCount } = getPizzafromLS();

const initialState: CartSliceType = {
    pizzas,
    price,
    allCount
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizza(state, action: PayloadAction<PizzaInCartType>) {
            const findPizza = getFindPizza(state, action);
            
            if(findPizza) {
                findPizza.count += 1;
                totalPizzasId(state, action);
            } else {
                state.pizzas.push({ ...action.payload, count: 1, countId:  1 });
                totalPizzasId(state, action);
            };
            getPizzafromLS();
            state.allCount = totalPrice(state.pizzas).allCount;
            state.price = totalPrice(state.pizzas).price;
        },

        removePizza(state, action: PayloadAction<PizzaInCartType>) {
            state.pizzas = state.pizzas.filter(pizza => {
                return pizza.id != action.payload.id
                || pizza.type != action.payload.type 
                || pizza.size != action.payload.size
            });
            getPizzafromLS();
            totalPizzasId(state, action);
            state.allCount = totalPrice(state.pizzas).allCount;
            state.price = totalPrice(state.pizzas).price;
        },

        removeAllPizzas(state) {
            state.pizzas = [];
            state.price = 0;
            state.allCount = 0;
        },

        incCountPizza(state, action: PayloadAction<PizzaInCartType>) {
            const findPizza = getFindPizza(state, action);
            if(findPizza) {
                findPizza.count += 1;
                getPizzafromLS();
                state.allCount = totalPrice(state.pizzas).allCount;
                state.price = totalPrice(state.pizzas).price;
                totalPizzasId(state, action);
            };
        },
        
        decCountPizza(state, action: PayloadAction<PizzaInCartType>) {
            const findPizza = getFindPizza(state, action);
            if(findPizza) {
                findPizza.count -= 1;
            };
            getPizzafromLS();
            totalPizzasId(state, action);
            state.allCount = totalPrice(state.pizzas).allCount;
            state.price = totalPrice(state.pizzas).price;
        }
    }
}); 

export const { addPizza, removePizza, removeAllPizzas, incCountPizza, decCountPizza } = cartSlice.actions;
export default cartSlice.reducer;