import './Caroussel.css';
import {useState} from 'react';
import {FcNext, FcPrevious} from 'react-icons/fc';
import {VscCircleFilled, VscCircleOutline} from 'react-icons/vsc'

const importAll = (r) => r.keys().map(r); //Função para importar todos as imagens

const images = importAll(require.context('./assets/images', false, /\.(jpg)$/)); //Importo todas as imagens jpg
const num_imgs = images.length-1

export const Caroussel = () => {

  const [position,setPosition] = useState(0);

  const nextPosition = () => {
    //Função para andar para frente no Caroussel
    setPosition(position===num_imgs?0:position+1);
  }

  const previousPosition = () => {
    //Função para andar para trás no Caroussel
    setPosition(position===0?num_imgs:position-1);
  }

  return (
    <div className='slider'>
      <FcPrevious className="arrow left" onClick={previousPosition}/>
      <FcNext className="arrow right" onClick={nextPosition}/>
      {images.map((image,index) =>{
        if (index===position){
          return <img src={image.default} key = {index} alt={`napoleon${index+1} fate`}/>
        } else {
          return null
        }})
      }
      {images.map((_,index) => {
        if (index===position){
          return <VscCircleFilled/>
        }else {
          return <VscCircleOutline/>
        }
        })
      }
    </div>
  )
}



