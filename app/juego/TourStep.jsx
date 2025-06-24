import React, { useEffect, useState } from 'react';

const TourStep = ({ targetSelector, text, onNext, onPrev, onFinish, isLastStep, isFirstStep }) => {
  const [targetRect, setTargetRect] = useState(undefined);

  useEffect(() => {
    const el = document.querySelector(targetSelector);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [targetSelector]);

  if (typeof targetRect === 'undefined') {
    return <></>;
  }

  const spacing = 12;
  const tooltipWidth = 340;
  const tooltipHeight = 180;

  let top = targetRect.bottom + spacing + window.scrollY;
  let left = targetRect.left + window.scrollX;
  let arrowPosition = 'top';

  if (left + tooltipWidth > window.innerWidth - 20) {
    left = window.innerWidth - tooltipWidth - 20;
  }

  if (top + tooltipHeight > window.innerHeight + window.scrollY - 20) {
    top = targetRect.top - tooltipHeight - spacing + window.scrollY;
    arrowPosition = 'bottom';
  }

  return (
    <>
    {/* Highlight */}
    <div style={{
      position: 'absolute',
      top: targetRect.top + window.scrollY - 5,
      left: targetRect.left + window.scrollX - 5,
      width: targetRect.width + 10,
      height: targetRect.height + 10,
      borderRadius: '10px',
      /*border: '3px solid #00337b',*/
      backgroundColor: 'rgba(0, 112, 243, 0.1)',
      zIndex: 1000,
      pointerEvents: 'none',
      /*boxShadow: '0 0 30px rgba(0, 112, 243, 0.6)',*/
    }} />

    {/* Tooltip */}
    <div style={{
      position: 'absolute',
      top,
      left,
      background: 'linear-gradient(145deg, #111827, #111827)',
      padding: '1.2rem 1.5rem',
      borderRadius: '16px',
      border: '2px solid #111827',
      /*boxShadow: '0 0 20px #0070f3, 0 0 10px rgba(0, 0, 0, 0.8)',*/
      zIndex: 1001,
      maxWidth: tooltipWidth,
      fontFamily: '"Orbitron", sans-serif',
      color: '#eee',
      textShadow: '0 0 2px #000',
    }}>
      {/* Flecha */}
      <div style={{
        position: 'absolute',
        top: arrowPosition === 'top' ? -8 : 'unset',
        bottom: arrowPosition === 'bottom' ? -8 : 'unset',
        left: 20,
        width: 0,
        height: 0,
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderBottom: arrowPosition === 'top' ? '8px solid #0070f3' : 'none',
        borderTop: arrowPosition === 'bottom' ? '8px solid #0070f3' : 'none',
      }} />

      <h3 style={{
        margin: '0 0 0.5rem 0',
        fontSize: '1.1rem',
        color: '#fff',
        letterSpacing: '0.05rem',
      }}>{text.titulo}</h3>

      <p style={{
        margin: 0,
        fontSize: '0.95rem',
        color: '#ccc',
        lineHeight: '1.4rem',
      }}>{text.descripcion}</p>

      {/* Controles */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.2rem', gap: '0.5rem' }}>
        <button onClick={onFinish} style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '6px 12px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontFamily: 'sans-serif',
          fontSize: '0.7rem',
          fontWeight: 'bold',
        }}>
          Finalizar Tour
        </button>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!isFirstStep && (
            <button onClick={onPrev} style={{
              backgroundColor: '#1e293b',
              color: '#ccc',
              padding: '6px 14px',
              border: '1px solid #3b82f6',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: '"Orbitron", sans-serif',
            }}>
              Atrás
            </button>
          )}

          {!isLastStep && (
            <button onClick={onNext} style={{
              backgroundColor: '#00b3ff',
              color: '#000',
              padding: '6px 14px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 'bold',
            }}>
              Siguiente
            </button>
          )}

          {isLastStep && (
            <button onClick={onFinish} style={{
              backgroundColor: '#0070f3',
              color: '#fff',
              padding: '6px 14px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 'bold',
            }}>
              Finalizar
            </button>
          )}
        </div>
      </div>
    </div>
  </>
  );
};

export default TourStep;
