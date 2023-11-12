import React from "react";
import { setSortType, SortPropertuEnum } from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";


type SortNamesType = {
  name: string;
  sortProperty: SortPropertuEnum
};

const sortNames: SortNamesType[]  = [
  {name: 'Popular: max-min', sortProperty: SortPropertuEnum.RATING_DESK },//'rating'
  {name: 'Popular: min-max', sortProperty: SortPropertuEnum.RATING_ASK },// '-rating'
  {name: 'Price: max-min', sortProperty: SortPropertuEnum.PRICE_DESK },// 'price'
  {name: 'Price: min-max', sortProperty: SortPropertuEnum.PRICE_ASK },// '-price'
  {name: 'Alphabet: Z-A', sortProperty: SortPropertuEnum.NAME_DESK },// 'name'
  {name: 'Alphabet: A-Z', sortProperty: SortPropertuEnum.NAME_ASK }// '-name'
];



const Sort: React.FC = React.memo(() => {

  const [activeSort, setActiveSort] = React.useState(false);

  const dispatch = useDispatch();
  const sortType: any  = useSelector<any>(state => state.filter.sortType);

  const onClickSort = (obj: SortNamesType) => {
    dispatch(setSortType(obj))
  };

  React.useEffect(() => {

    const toggleSort = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (! target.classList.contains('sort__span')) {
        setActiveSort(false);
      }
    };
    
    document.addEventListener('click', toggleSort );

    return () => {
      document.removeEventListener('click', toggleSort );
    }

  }, []);

  const sortItems = sortNames.map((obj, ind) => {
    return <li 
      key={ind}
      className={obj.sortProperty === sortType.sortProperty ? 'active' : ''}
      onClick={() => onClickSort(obj)}
    >
      {obj.name}
    </li>
  });

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          style={activeSort ? {'transform': 'rotate(0deg)'} : {}}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort pizzas:</b>
        <span 
          className="sort__span" 
          onClick={() => setActiveSort(!activeSort)}
        >
          {sortType.name}
        </span>
      </div>
      {activeSort && 
      <div className="sort__popup">
        <ul>
          {sortItems}
        </ul>
      </div>}
    </div>
  )
});

export { sortNames };
export default Sort;
