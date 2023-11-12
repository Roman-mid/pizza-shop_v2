import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PizzaInCartType, addPizza } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";
import { PizzaBlockType } from "../redux/slices/pizzasSlice";


const pizzaTypes = ['Slim', 'Traditional'];

const PizzaBlock: React.FC<PizzaBlockType> = ({ id, name, imageUrl, types, sizes, price }) => {
  const dispatch = useDispatch();
  
  const cartItem = useSelector((state: RootState) => state.itemsInCart.pizzas.find((obj) => obj.id === id));
  const addedPizza = cartItem ? cartItem.countId : 0;


  const [pizzaTypeActive, setPizzaTypeActive] = React.useState(types[0]);
  const [pizzaSizeActive, setPizzaSizeActive] = React.useState(0);

  const onPizzaType = (ind: number) => setPizzaTypeActive(ind);
  const onPizzaSize = (ind: number) => setPizzaSizeActive(ind);


  const onAddPizza = () => {
    const pizza: PizzaInCartType = {
      id,
      name, 
      price: price[pizzaSizeActive],
      imageUrl,
      type: pizzaTypes[pizzaTypeActive],
      size: sizes[pizzaSizeActive],
      count: 0,
      countId: 0
    }
    dispatch(addPizza(pizza))
  };

  return (
   <div className="pizza-block-wrapper">
     <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map(type => <li 
            key={type} 
            className={type === pizzaTypeActive ? 'active' : ''}
            onClick={() => onPizzaType(type)}
            >
              {pizzaTypes[type]}
            </li>)}
        </ul>
        <ul>
            {sizes.map((size, ind) => <li 
              key={size}
              className={ind === pizzaSizeActive ? 'active' : ''}
              onClick={() => onPizzaSize(ind)}
            >
              {size} cm
            </li>)}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <p className="pizza-block__price">{price[pizzaSizeActive]} £</p>
        <div className="button button--outline button--add" onClick={onAddPizza}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add to cart</span>
          {addedPizza > 0 && <i>{addedPizza}</i>}  
        </div>
      </div>
    </div>
   </div>
  );
}

export default PizzaBlock;
