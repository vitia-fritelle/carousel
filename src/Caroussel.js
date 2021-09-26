import './Caroussel.css';
import {useEffect, useState} from 'react';
import {FcNext, FcPrevious} from 'react-icons/fc';
import {VscCircleFilled, VscCircleOutline} from 'react-icons/vsc'
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

const num_medias = medias.length-1;

const Caroussel = ({interval}) => {
  //Elemento de slider Caroussel

  const [position,setPosition] = useState(0);

  const previousPosition = () => {
    //Função para andar para trás no Caroussel
    setPosition(position===0?num_medias:position-1);
  }

  const nextPosition = () => {
    //Função para andar para frente no Caroussel
    setPosition(position===num_medias?0:position+1);
  }

  const HandlingSetInterval = () => {
      useEffect(() => {
        const timer = setInterval(nextPosition, interval);
        return () => {clearInterval(timer);}
      })
      return null
  }
  
  return (
    <div className='slider'>
      {interval && <HandlingSetInterval/>}
      <ArrowLeft previous={previousPosition}/>
      <ArrowRight next={nextPosition}/>
      <PlotSlides position={position} slides={medias}/>
      <PlotDotIndicator position={position} setPosition={setPosition} slides={medias}/>
    </div>
  )
}

const ArrowLeft = ({previous}) => {
  //Elemento de flecha para esquerda
  return (
    <FcPrevious className="arrow left" onClick={previous}/>
  )
}

const ArrowRight = ({next}) => {
  //Elemento de flecha para direita
  return (
    <FcNext className="arrow right" onClick={next}/>
  )
}

const PlotSlides = ({position,slides}) =>
  //Elemento para imprimir os slides na tela
  slides.map(({src,type},index) =>{
    if (index===position){
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
    } else {
      return null
    }})

const DotIndicator = ({num,position,setPosition}) => {
  //Elemento que imprime os dots e adiciona a funcionalidade setSlide
  const setSlide = () => {
    //Função para selecionar o slide pelos dots
    setPosition(num);
  }
  if (num===position){
    return <VscCircleFilled className="dots"/>
  }else {
    return <VscCircleOutline className="dots" onClick={setSlide}/>
  }
}

const PlotDotIndicator = ({position,setPosition,slides}) =>
  //Elemento para imprimir os pontos na tela
  <div className="indicator">
    {slides.map((_,index) => <DotIndicator num={index} position={position} setPosition={setPosition} key={index}/>)}
  </div>

export default Caroussel