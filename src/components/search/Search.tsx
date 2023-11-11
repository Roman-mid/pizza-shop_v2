import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {

  const dispatch = useDispatch();
  const searchValue: any = useSelector<any>(state => state.filter.searchValue);
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setValue('');
    dispatch(setSearchValue(''));

    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1500),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.search}>
        <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
            <path d="M 27 9 C 17.075 9 9 17.075 9 27 C 9 36.925 17.075 45 27 45 C 31.129213 45 34.9263 43.587367 37.966797 41.240234 L 51.048828 54.322266 C 51.952828 55.226266 53.418266 55.226266 54.322266 54.322266 C 55.226266 53.418266 55.226266 51.952828 54.322266 51.048828 L 41.240234 37.966797 C 43.587367 34.9263 45 31.129213 45 27 C 45 17.075 36.925 9 27 9 z M 27 13 C 34.719 13 41 19.281 41 27 C 41 34.719 34.719 41 27 41 C 19.281 41 13 34.719 13 27 C 13 19.281 19.281 13 27 13 z"></path>
        </svg>
        <input 
          ref={inputRef}
          value={value} 
          onChange={onChangeInput}
          placeholder='Search...'
          name="name-pizza"
          
        />
        {searchValue && <svg 
            className={styles.clearIcon} 
            onClick={onClickClear}
            xmlns="http://www.w3.org/2000/svg" 
            x="0px" y="0px" 
            width="100" 
            height="100" 
            viewBox="0 0 50 50"
            >
            <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
        </svg>}
    </div>
  )
};

export default Search;