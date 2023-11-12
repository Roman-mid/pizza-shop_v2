import React from "react";
import { useSelector } from 'react-redux';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Sceleton from "../components/Sceleton";

import { setCategoryId } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import { RootState, useAppDispatch } from "../redux/store";


type PizzaBlockType = {
  id: number;
  name: string;
  imageUrl: string;
  types: number[];
  sizes: number[];
  price: number[];
};

const categoriesName = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Mixed'];


const Home: React.FC = () => {

  const dispatch = useAppDispatch();

  const { categoryId, sortType } = useSelector((state: RootState) => state.filter);
  const searchValue = useSelector((state: RootState) => state.filter.searchValue);
  const { pizzas, status }  = useSelector((state: RootState) => state.items);


  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType.sortProperty, searchValue]);

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

    dispatch(fetchPizzas({ category, sortBy, order }));
  };

  const onClickCategoty = React.useCallback((ind: number) => {
    dispatch(setCategoryId(ind));
  }, []);

  const pizzasItems = pizzas.filter((obj: PizzaBlockType) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj:PizzaBlockType) => <PizzaBlock
      key={obj.id}
      {...obj} 
    />);

  const pizzasSceleton = [...new Array(6)].map((_, ind) => {
    return <Sceleton key={ind} />;
  });
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} categoriesName={categoriesName} onClickCategoty={(ind: number) => onClickCategoty(ind)}/>
        <Sort />
      </div>
      {status === 'error' 
        ? <div className="content__error-info">
            <h2>Something went wrong 😕</h2>
            <p>Please try again later</p>
          </div>
        : <>
            <h1 className="content__title">{`${categoriesName[categoryId]} pizzas`}</h1>
            <div className="content__items">
              {status === 'loading' ? pizzasSceleton : pizzasItems}
            </div>
          </>
        }
    </div>
  )
};

export default Home;
