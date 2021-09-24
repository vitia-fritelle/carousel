import './Caroussel.css';
import {useState} from 'react';
import {FcNext, FcPrevious} from 'react-icons/fc';
import {VscCircleFilled, VscCircleOutline} from 'react-icons/vsc'
import arcdetriomphe from './assets/videos/napoleon00.mp4'

const importAll = (r) => r.keys().map(r); //Função para importar todos as imagens

const importImages = importAll(require.context('./assets/images', false, /\.(jpg)$/)); //Importo todas as imagens jpg

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

export const Caroussel = () => {

  const [position,setPosition] = useState(0);

  const nextPosition = () => {
    //Função para andar para frente no Caroussel
    setPosition(position===num_medias?0:position+1);
  }

  const previousPosition = () => {
    //Função para andar para trás no Caroussel
    setPosition(position===0?num_medias:position-1);
  }

  const DotIndicator = ({num, setPosition}) => {
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

  const PlotSlides = () =>
    //Elemento para imprimir os slides na tela
    medias.map(({src,type},index) =>{
      if (index===position){
        if (type==="image/jpg"){
          return <img src={src} className="slide" key={index} alt={`napoleon${index+1} fate`}/>
        } else {
          return (
          <video controls>
            <source src={src} className="slide" type={type} key={index}/>
            Your browser does not support the video tag.
          </video>
          )
        }
      } else {
        return null
      }})

  const PlotDotIndicator = () =>
    //Elemento para imprimir os pontos na tela
    <div className="indicator">
      {medias.map((_,index) => <DotIndicator num={index} setPosition={setPosition} />)}
    </div>

  return (
    <div className='slider'>
      <FcPrevious className="arrow left" onClick={previousPosition}/>
      <FcNext className="arrow right" onClick={nextPosition}/>
      <PlotSlides/>
      <PlotDotIndicator/>
    </div>
  )
}



