import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Carousel';
import Footer from './Footer';
import listaSlides from './Slides';

ReactDOM.render(
    <>
      <Carousel 
       interval={1000} 
       direction='updown' 
       slides={listaSlides}/>
      <Footer/>
    </>,
  document.getElementById('root')
);
