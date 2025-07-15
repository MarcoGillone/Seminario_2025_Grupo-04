"use client"

import { useEffect, useState } from "react"

const TourStep = ({
  targetSelector,
  text,
  onNext,
  onPrev,
  onFinish,
  isLastStep,
  isFirstStep,
  currentStep,
  totalSteps,
}) => {
  const [targetRect, setTargetRect] = useState(undefined)

  useEffect(() => {
    const findAndHighlightElement = () => {
      const el = document.querySelector(targetSelector)
      if (el) {
        const rect = el.getBoundingClientRect()
        setTargetRect(rect)
        el.scrollIntoView({ behavior: "smooth", block: "center" })
        return true
      }
      return false
    }

    // Intentar encontrar el elemento inmediatamente
    if (!findAndHighlightElement()) {
      // Si no se encuentra, intentar después de un pequeño delay
      const timeout = setTimeout(() => {
        findAndHighlightElement()
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [targetSelector])

  // Si el elemento no existe o no es visible, no mostrar el tour
  if (typeof targetRect === "undefined" || targetRect.width === 0 || targetRect.height === 0) {
    return <></>
  }

  const spacing = 12
  const tooltipWidth = 380
  const tooltipHeight = 220

  let top = targetRect.bottom + spacing + window.scrollY
  let left = targetRect.left + window.scrollX
  let arrowPosition = "top"

  // Ajustar posición del tooltip para que no se salga de la pantalla
  if (left + tooltipWidth > window.innerWidth - 20) {
    left = window.innerWidth - tooltipWidth - 20
  }

  if (top + tooltipHeight > window.innerHeight + window.scrollY - 20) {
    top = targetRect.top - tooltipHeight - spacing + window.scrollY
    arrowPosition = "bottom"
  }

  // Coordenadas del elemento destacado con padding
  const highlightPadding = 12
  const highlightTop = Math.max(0, targetRect.top + window.scrollY - highlightPadding)
  const highlightLeft = Math.max(0, targetRect.left + window.scrollX - highlightPadding)
  const highlightWidth = Math.min(targetRect.width + highlightPadding * 2, window.innerWidth - highlightLeft)
  const highlightHeight = Math.min(
    targetRect.height + highlightPadding * 2,
    window.innerHeight - (highlightTop - window.scrollY),
  )

  return (
    <>
      {/* Overlay oscuro dividido en 4 secciones para crear el "recorte" */}

      {/* Sección superior */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: Math.max(0, highlightTop - window.scrollY),
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          zIndex: 9998,
          pointerEvents: "none",
          transition: "all 0.3s ease-in-out",
        }}
      />

      {/* Sección inferior */}
      <div
        style={{
          position: "fixed",
          top: Math.max(0, highlightTop + highlightHeight - window.scrollY),
          left: 0,
          width: "100vw",
          height: `calc(100vh - ${Math.max(0, highlightTop + highlightHeight - window.scrollY)}px)`,
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          zIndex: 9998,
          pointerEvents: "none",
          transition: "all 0.3s ease-in-out",
        }}
      />

      {/* Sección izquierda */}
      <div
        style={{
          position: "fixed",
          top: Math.max(0, highlightTop - window.scrollY),
          left: 0,
          width: Math.max(0, highlightLeft),
          height: Math.min(highlightHeight, window.innerHeight),
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          zIndex: 9998,
          pointerEvents: "none",
          transition: "all 0.3s ease-in-out",
        }}
      />

      {/* Sección derecha */}
      <div
        style={{
          position: "fixed",
          top: Math.max(0, highlightTop - window.scrollY),
          left: highlightLeft + highlightWidth,
          width: `calc(100vw - ${highlightLeft + highlightWidth}px)`,
          height: Math.min(highlightHeight, window.innerHeight),
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          zIndex: 9998,
          pointerEvents: "none",
          transition: "all 0.3s ease-in-out",
        }}
      />

      {/* Highlight del elemento */}
      <div
        style={{
          position: "absolute",
          top: highlightTop,
          left: highlightLeft,
          width: highlightWidth,
          height: highlightHeight,
          borderRadius: "12px",
          backgroundColor: "rgba(0, 112, 243, 0.15)",
          border: "3px solid rgba(0, 112, 243, 0.9)",
          zIndex: 9999,
          pointerEvents: "none",
          boxShadow: "0 0 40px rgba(0, 112, 243, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)",
          animation: "tourPulse 2s infinite",
          transition: "all 0.3s ease-in-out",
        }}
      />

      {/* Tooltip */}
      <div
        style={{
          position: "absolute",
          top,
          left,
          background: "linear-gradient(145deg, #1f2937, #111827)",
          padding: "1.5rem 2rem",
          borderRadius: "16px",
          border: "2px solid #374151",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          zIndex: 10000,
          maxWidth: tooltipWidth,
          fontFamily: '"Orbitron", "Inter", sans-serif',
          color: "#f9fafb",
          backdropFilter: "blur(16px)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Indicador de progreso */}
        <div
          style={{
            position: "absolute",
            top: "-2px",
            left: "0",
            right: "0",
            height: "4px",
            backgroundColor: "#374151",
            borderRadius: "16px 16px 0 0",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(currentStep / totalSteps) * 100}%`,
              backgroundColor: "#0ea5e9",
              borderRadius: "16px 16px 0 0",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </div>

        {/* Flecha */}
        <div
          style={{
            position: "absolute",
            top: arrowPosition === "top" ? -10 : "unset",
            bottom: arrowPosition === "bottom" ? -10 : "unset",
            left: 24,
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: arrowPosition === "top" ? "10px solid #374151" : "none",
            borderTop: arrowPosition === "bottom" ? "10px solid #374151" : "none",
          }}
        />

        {/* Contador de pasos */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#0ea5e9",
              color: "#ffffff",
              padding: "4px 12px",
              borderRadius: "12px",
              fontSize: "0.75rem",
              fontWeight: "600",
            }}
          >
            Paso {currentStep} de {totalSteps}
          </div>
          <div
            style={{
              color: "#9ca3af",
              fontSize: "0.75rem",
              fontWeight: "500",
            }}
          >
            Tutorial Interactivo
          </div>
        </div>

        <h3
          style={{
            margin: "0 0 0.75rem 0",
            fontSize: "1.25rem",
            color: "#ffffff",
            fontWeight: "700",
            letterSpacing: "0.025em",
            lineHeight: "1.3",
          }}
        >
          {text.titulo}
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: "1rem",
            color: "#d1d5db",
            lineHeight: "1.5",
            marginBottom: "1.5rem",
          }}
        >
          {text.descripcion}
        </p>

        {/* Controles */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <button
            onClick={onFinish}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: '"Orbitron", sans-serif',
              fontSize: "0.875rem",
              fontWeight: "600",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#b91c1c"
              e.target.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#dc2626"
              e.target.style.transform = "translateY(0)"
            }}
          >
            Saltar Tutorial
          </button>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {!isFirstStep && (
              <button
                onClick={onPrev}
                style={{
                  backgroundColor: "#374151",
                  color: "#d1d5db",
                  padding: "10px 18px",
                  border: "1px solid #6b7280",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#4b5563"
                  e.target.style.color = "#fff"
                  e.target.style.transform = "translateY(-1px)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#374151"
                  e.target.style.color = "#d1d5db"
                  e.target.style.transform = "translateY(0)"
                }}
              >
                ← Anterior
              </button>
            )}

            {!isLastStep && (
              <button
                onClick={onNext}
                style={{
                  backgroundColor: "#0ea5e9",
                  color: "#fff",
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#0284c7"
                  e.target.style.transform = "translateY(-1px)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#0ea5e9"
                  e.target.style.transform = "translateY(0)"
                }}
              >
                Siguiente →
              </button>
            )}

            {isLastStep && (
              <button
                onClick={onFinish}
                style={{
                  backgroundColor: "#059669",
                  color: "#fff",
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#047857"
                  e.target.style.transform = "translateY(-1px)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#059669"
                  e.target.style.transform = "translateY(0)"
                }}
              >
                ¡Comenzar! 🚀
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Estilos CSS para las animaciones */}
      <style jsx>{`
        @keyframes tourPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 0 40px rgba(0, 112, 243, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
            box-shadow: 0 0 60px rgba(0, 112, 243, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.15);
          }
        }
      `}</style>
    </>
  )
}

export default TourStep
