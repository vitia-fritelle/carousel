import React from 'react';
import ReactDOM from 'react-dom';
import Caroussel from './Caroussel';
import Footer from './Footer';
import './index.css'

ReactDOM.render(
    <>
      <Caroussel interval={1000}/>
      <Footer/>
    </>,
  document.getElementById('root')
);
