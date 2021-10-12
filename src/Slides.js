import arcdetriomphe from './assets/videos/napoleon00.mp4'
import {useEffect, useRef} from 'react';

// Função para importar todos as imagens
const importAll = (r) => r.keys().map(r); 

// Importo todas as imagens jpg
const importImages = importAll(require.context('./assets/images/napoleao',
                                               false,
                                               /\.(jpg)$/)); 
// Coloco as imagens num objeto
const images = importImages.reduce((lista,image) => {
  lista.push(
    {
      src: image.default,
      type: "image/jpg"
    }
  );
  return lista
},[]);
// Coloco o vídeo num objeto
const video = {src:arcdetriomphe,type:"video/mp4"};
// Coloco as mídias num array
const medias = [...images,video];

const Video = ({src, type, index, isAutoPlay}) => {
  
  const playRef = useRef();

  useEffect(() => {
    if (isAutoPlay && playRef.current) {
      playRef.current.play();
    }
  }, [isAutoPlay]);
  return (
    <>
      <video className="slide" ref={playRef}>
        <source src={src} type={type} key={index}/>
        Your browser does not support the video tag.
      </video>
    </>
  )
}

// Crio os slides que serão apresentados e guardo num array

const listaSlides = medias.map(({src,type},index) => {

  if (type === "image/jpg"){
    return <img 
            src={src} 
            className="slide" 
            key={index} 
            alt={`napoleon${index+1} fate`}/>
  } else if (type === "video/mp4"){
    return (<Video 
             src={src} 
             type={type} 
             index={index} 
             isAutoPlay={false}/>
    )
  } else {
    return null
  }
});

export default listaSlides;