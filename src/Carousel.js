import './Carousel.css';
import {useEffect, useState} from 'react';
import {FcNext, FcPrevious} from 'react-icons/fc';
import {VscCircleFilled, VscCircleOutline} from 'react-icons/vsc'

const Carousel = ({interval, direction='up', slides}) => {

  //Elemento de slider Carousel

  const num_slides = slides.length-1;

  const [position,setPosition] = useState(0);
  const [flag,setFlag] = useState(0);
  const [hovering,setHovering] = useState(false);

  const previousPosition = () => {
    //Função para andar para trás no Carousel
    setPosition(position === 0?num_slides:position-1);
  }

  const nextPosition = () => {
    //Função para andar para frente no Carousel
    setPosition(position === num_slides?0:position+1);
  }

  const upDownPosition = () => {
    //Função para andar para frente e para trás no Carousel
    if (!flag) {
      nextPosition();
    } else {
      previousPosition();
    }
  }

  const randomPosition = () => {
    //Função para andar aleatoriamento no Carousel
    const getRandomIntInclusive = () => {
      //Função que escolhe um número aleatório entre min e max inclusive
      const min = Math.ceil(0);
      const max = Math.floor(num_slides);
      return Math.floor(Math.random() * (max-min+1)) + min;
    }
    setPosition(getRandomIntInclusive);
  }

  const action = {
    'up':nextPosition,
    'down':previousPosition,
    'updown':upDownPosition,
    'random':randomPosition
  }

  useEffect(() => {

    const flagBearer = () =>{

      //Função para levantar ou abaixar a flag
      if (!position){
        setFlag(0);
      } 
      else if (position === num_slides){
        setFlag(1);
      } 
    };
    (direction === 'updown') && flagBearer();
  },[position])

  const useKeyPress = (targetKey) => {

    //Hook personalizado para detectar a tecla pressionada
    const [keyPressed, setKeyPressed] = useState(false);
  
    const downHandler = ({key}) => {
      if (key === targetKey) {setKeyPressed(true);}
    }
  
    const upHandler = ({key}) => {
      if (key === targetKey) {setKeyPressed(false);}
    };
  
    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
  
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    });
  
    return keyPressed;
  };

  const rightPress = useKeyPress("ArrowRight");
  const leftPress = useKeyPress("ArrowLeft");

  useEffect(() => {
    if (rightPress){
      nextPosition();
    }
    else if (leftPress){
      previousPosition();
    }
  },[rightPress,leftPress]);
  
  return (
    <div 
     className='slider' 
     onMouseEnter={() => setHovering(true)} 
     onMouseLeave={() => setHovering(false)} >
      {interval && <HandlingSetInterval 
                    interval={interval} 
                    action={action[direction]}
                    onHover={hovering}/>}
      <ArrowLeft previous={previousPosition}/>
      <ArrowRight next={nextPosition}/>
      <PlotSlides position={position} slides={slides}/>
      <PlotDotIndicator 
      position={position} 
      setPosition={setPosition} 
      slides={slides}/>
    </div>
  )
}

const HandlingSetInterval = ({interval,action,onHover}) => {

  // Elemento utilizado para controlar
  // a troca de slide automática
  useEffect(() => {
    const timer = !onHover && setInterval(action, interval);
    return () => {clearInterval(timer);}
  })
  return null
}

const ArrowLeft = ({previous}) => <FcPrevious 
                                   className="arrow left" 
                                   onClick={previous}/>

  // Elemento de flecha para esquerda

const ArrowRight = ({next}) => <FcNext 
                                className="arrow right" 
                                onClick={next}/>

  // Elemento de flecha para direita
    
const PlotSlides = ({position,slides}) => slides[position]

  // Elemento para imprimir os slides na tela
  
const DotIndicator = ({num,position,setPosition}) => {

  // Elemento que imprime os dots e adiciona a funcionalidade setSlide

  const setSlide = () => {setPosition(num);}

  // Função para selecionar o slide pelos dots
  if (num === position){
    return <VscCircleFilled className="dots"/>
  }else{
    return <VscCircleOutline className="dots" onClick={setSlide}/>
  }
}

const PlotDotIndicator = ({position,setPosition,slides}) =>

  // Elemento para imprimir os pontos na tela
  <div className="indicator">
    {slides.map((_,index) => 
    <DotIndicator 
    num={index} 
    position={position} 
    setPosition={setPosition} 
    key={index}/>)}
  </div>

export default Carousel