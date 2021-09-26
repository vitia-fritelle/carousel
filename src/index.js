import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Carousel';
import Footer from './Footer';
import './index.css'

ReactDOM.render(
    <>
      <Carousel interval={1000} direction='random' />
      <Footer/>
    </>,
  document.getElementById('root')
);
