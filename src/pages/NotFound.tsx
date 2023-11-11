
import React from 'react'
import { Link } from 'react-router-dom';

import style from '../components/NotFound.module.scss';

const NotFound: React.FC = () => {

  return (
    <div className={style.wrap}>
    <h1 >Not Found 😕</h1>
    <p>Our shop dosen't have this page</p>
    <Link to="/">
        <button>Back to shop</button>
    </Link>
    </div>
  )
};

export default NotFound;