import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Carousel';
import Footer from './Footer';
import './index.css'

import arcdetriomphe from './assets/videos/napoleon00.mp4'

const importAll = (r) => r.keys().map(r); //Função para importar todos as imagens

const importImages = importAll(require.context('./assets/images/napoleao', false, /\.(jpg)$/)); //Importo todas as imagens jpg

const images = importImages.reduce((lista,image)=>{
  lista.push(
    {
      src:image.default,
      type:"image/jpg"
    }
  );
  return lista
},[]);

const video = {src:arcdetriomphe,type:"video/mp4"};

const medias = [...images,video];

const listaSlides = medias.map(({src,type},index) =>{
  //Crio os slides que serão apresentados e guardo num array
  if (type==="image/jpg"){
    return <img src={src} className="slide" key={index} alt={`napoleon${index+1} fate`}/>
  } else if (type==="video/mp4"){
    return (
    <video autoPlay>
      <source src={src} className="slide" type={type} key={index}/>
      Your browser does not support the video tag.
    </video>
    )
  } else {
    return null
  }
});


ReactDOM.render(
    <>
      <Carousel interval={1000} direction='random' slides={listaSlides} />
      <Footer/>
    </>,
  document.getElementById('root')
);
