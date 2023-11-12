import React from 'react'

type CategoriesType = {
  categoryId: number;
  categoriesName: string[];
  onClickCategoty: (ind: number) => void;
};

// const categoriesName = ['All', 'Meat', 'Vegetarians', 'Grill', 'Spicy', 'Mixed'];

const Categories: React.FC<CategoriesType> = React.memo( ({categoryId, categoriesName, onClickCategoty }) => {

  const [catgoriesOpen, setCategoriesOpen] = React.useState(false);

  React.useEffect(() => {

    const toggleCategories = (e: any) => {
      if (!e.target.classList.contains('categories__span')) {
        setCategoriesOpen(false)
      }
    };

    document.addEventListener('click', toggleCategories );

    return () => {
      document.removeEventListener('click', toggleCategories );
    }
  }, []);

  const categoriesBtn = categoriesName.map((name, ind) => {
      return <li
        key={ind}
        className={categoryId === ind ? 'active' : ''}
        onClick={() => onClickCategoty(ind)}
      >
        {name}
      </li>
  });

  return (
    <div className="categories">
      <div className="categories-mobile">
        <svg
          style={catgoriesOpen ? {'transform': 'rotate(0deg)'} : {}}
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
        <b>Category:</b>
        <span className="categories__span" onClick={() => setCategoriesOpen(!catgoriesOpen)}>{categoriesName[categoryId]}</span>
      </div>
      <ul style={catgoriesOpen ? {'display': 'block'} : {}}>{categoriesBtn}</ul>
    </div>
  )
});

export default Categories;