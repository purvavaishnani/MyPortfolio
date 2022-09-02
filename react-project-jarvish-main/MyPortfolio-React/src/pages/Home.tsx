import React, { useContext } from 'react';
import ColorContext from '../context/ColorContext';
import LanguageContext from '../context/LanguageContext';

type Props = {};

const Home = (props: Props) => {
  const lang = useContext(LanguageContext);
  const col = useContext(ColorContext);
  return (
    <div className='page-style'>
      Home {col} {lang}
    </div>
  );
};

export default Home;
