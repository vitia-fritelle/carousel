import './Carousel.css';
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

const Carousel = ({interval, direction}) => {
  //Elemento de slider Carousel

  const [position,setPosition] = useState(0);

  const previousPosition = () => {
    //Função para andar para trás no Carousel
    setPosition(position===0?num_medias:position-1);
  }

  const nextPosition = () => {
    //Função para andar para frente no Carousel
    setPosition(position===num_medias?0:position+1);
  }

  return (
    <div className='slider'>
      {interval && 
      <HandlingSetInterval 
      interval={interval} 
      next={nextPosition} 
      prev={previousPosition} 
      position={position} 
      setPosition={setPosition}
      direction={direction}/>
      }
      <ArrowLeft previous={previousPosition}/>
      <ArrowRight next={nextPosition}/>
      <PlotSlides position={position} slides={listaSlides}/>
      <PlotDotIndicator 
      position={position} 
      setPosition={setPosition} 
      slides={medias}/>
    </div>
  )
}

const HandlingSetInterval = ({next,prev,position,setPosition,interval,direction='up'}) => {
  //Elemento utilizado para manipular a aplicação do Hook ou não
  //Também é utilizado para adicionar algumas funcionalidades a mais 
  //de como percorrer o Carousel
  const [flag,setFlag] = useState(0);
  
  const flagBearer = () =>{
    //Função para levantar ou abaixar a flag
    if(position===0) setFlag(0);
    else if (position===num_medias) setFlag(1);
  }

  const upDownPosition = () => {
    //Função para andar para frente e para trás no Carousel
    if (flag===0) {
      next();
    } else if (flag===1) {
      prev();
    }
  }

  const getRandomIntInclusive = () => {
    //Função que escolhe um número aleatório entre min e max inclusive
    const min = Math.ceil(0);
    const max = Math.floor(num_medias);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomPosition = () => {
    //Função para andar aleatoriamento no Carousel
    setPosition(getRandomIntInclusive);
  }

  const directions = {
    //Usando factory aqui
    'up':next,
  'down':prev,
  'updown':upDownPosition,
  'random':randomPosition
  };

  useEffect(() => {
    (direction==='updown') && flagBearer();
    const timer = setInterval(directions[direction], interval);
    return () => {clearInterval(timer);}
  })
  return null
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

const PlotSlides = ({position,slides}) => slides[position]
  //Elemento para imprimir os slides na tela
  //Caso queira trocar o interior dos slides, 
  //devo mexer aqui e fazer provavelmente um novo .map
  

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
    {slides.map((_,index) => 
    <DotIndicator 
    num={index} 
    position={position} 
    setPosition={setPosition} 
    key={index}/>)}
  </div>

export default Carousel