import React, { useState } from 'react';
import TourStep from './TourStep';

const pasos = [
  {
    id: 'btn-comando',
    selector: '#btn-centro-de-comando',
    titulo: 'Panel de análisis',
    descripcion: 'Desde esta sección podés gestionar tus investigaciones: revisar casos activos, consultar los que ya resolviste y ver tu progreso general en el nivel.',
    ventana: 'desktop',
  },
  {
    id: 'whatsapp',
    selector: '#btn-whatsapp',
    titulo: 'Sección WhatsApp',
    descripcion: 'Acá podes revisar los mensajes que te vayan llegando de diversas fuentes.',
    ventana: 'whatsapp',
  },
  {
    id: 'ia-asistente',
    selector: '#btn-ia-asistente',
    titulo: 'IA Asistente',
    descripcion: 'Interactuá con la IA para obtener consejos sobre el caso y herramientas de análisis.',
    ventana: 'ai',
  },
  {
    id: 'btn-analisis-metadatos',
    selector: '#btn-analisis-metadatos',
    titulo: 'Análisis de Metadatos',
    descripcion: 'Esta herramienta te permite examinar los metadatos ocultos en archivos multimedia para detectar manipulaciones.',
    ventana: 'ai',
  },
  {
    id: 'btn-deteccion-imagenes',
    selector: '#btn-deteccion-imagenes',
    titulo: 'Detección de Imágenes Generadas por IA',
    descripcion: 'Usá esta herramienta para verificar si una imagen fue creada o modificada por inteligencia artificial.',
    ventana: 'ai',
  },
  {
    id: 'btn-analisis-facial',
    selector: '#btn-analisis-facial',
    titulo: 'Análisis Facial',
    descripcion: 'Con esta opción podés detectar expresiones faciales sospechosas o incoherentes en un rostro.',
    ventana: 'ai',
  },
  {
    id: 'btn-sincronizacion',
    selector: '#btn-sincronizacion',
    titulo: 'Sincronización Audio-Video',
    descripcion: 'Detectá posibles desajustes entre el audio y el video, útil para evidenciar manipulaciones.',
    ventana: 'ai',
  },
  {
    id: 'timer-del-juego',
    selector: '#timer-del-juego',
    titulo: 'Timer',
    descripcion: 'Acá podés ver el tiempo restante que te queda para poder resolver los casos. ¡El tiempo corre!',
    ventana: 'desktop',
  },
];

const Tour = ({ onFinish, setActiveWindow }) => {
  const [index, setIndex] = useState(0);

  const pasoActual = pasos[index];

  // Cambiar ventana al cargar cada paso (si corresponde)
  React.useEffect(() => {
    if (pasoActual?.ventana && typeof setActiveWindow === 'function') {
      setActiveWindow(pasoActual.ventana);
    }
  }, [index, pasoActual?.ventana, setActiveWindow]);

  const siguiente = () => {
    if (index < pasos.length - 1) {
      setIndex(index + 1);
    } else {
      finalizar();
    }
  };

  const anterior = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const finalizar = () => {
    if (onFinish) onFinish();
  };

  if (!pasoActual) return null;

  return (
    <TourStep
      key={pasoActual.id}
      targetSelector={pasoActual.selector}
      text={{
        titulo: pasoActual.titulo,
        descripcion: pasoActual.descripcion,
      }}
      onNext={siguiente}
      onPrev={anterior}
      onFinish={finalizar}
      isLastStep={index === pasos.length - 1}
      isFirstStep={index === 0}
    />
  );
};

export default Tour;
