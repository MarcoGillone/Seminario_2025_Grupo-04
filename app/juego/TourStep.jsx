"use client"

import { useEffect, useState } from "react"

const TourStep = ({ targetSelector, text, onNext, onPrev, onFinish, isLastStep, isFirstStep }) => {
  const [targetRect, setTargetRect] = useState(undefined)

  useEffect(() => {
    const el = document.querySelector(targetSelector)
    if (el) {
      const rect = el.getBoundingClientRect()
      setTargetRect(rect)
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [targetSelector])

  if (typeof targetRect === "undefined") {
    return <></>
  }

  const spacing = 12
  const tooltipWidth = 340
  const tooltipHeight = 180

  let top = targetRect.bottom + spacing + window.scrollY
  let left = targetRect.left + window.scrollX
  let arrowPosition = "top"

  if (left + tooltipWidth > window.innerWidth - 20) {
    left = window.innerWidth - tooltipWidth - 20
  }

  if (top + tooltipHeight > window.innerHeight + window.scrollY - 20) {
    top = targetRect.top - tooltipHeight - spacing + window.scrollY
    arrowPosition = "bottom"
  }

  // Coordenadas del elemento destacado con padding
  const highlightPadding = 8
  const highlightTop = targetRect.top + window.scrollY - highlightPadding
  const highlightLeft = targetRect.left + window.scrollX - highlightPadding
  const highlightWidth = targetRect.width + highlightPadding * 2
  const highlightHeight = targetRect.height + highlightPadding * 2

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
          height: highlightTop,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 999,
          pointerEvents: "none",
        }}
      />

      {/* Sección inferior */}
      <div
        style={{
          position: "fixed",
          top: highlightTop + highlightHeight,
          left: 0,
          width: "100vw",
          height: `calc(100vh - ${highlightTop + highlightHeight - window.scrollY}px)`,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 999,
          pointerEvents: "none",
        }}
      />

      {/* Sección izquierda */}
      <div
        style={{
          position: "fixed",
          top: highlightTop - window.scrollY,
          left: 0,
          width: highlightLeft,
          height: highlightHeight,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 999,
          pointerEvents: "none",
        }}
      />

      {/* Sección derecha */}
      <div
        style={{
          position: "fixed",
          top: highlightTop - window.scrollY,
          left: highlightLeft + highlightWidth,
          width: `calc(100vw - ${highlightLeft + highlightWidth}px)`,
          height: highlightHeight,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 999,
          pointerEvents: "none",
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
          backgroundColor: "rgba(0, 112, 243, 0.1)",
          border: "2px solid rgba(0, 112, 243, 0.5)",
          zIndex: 1000,
          pointerEvents: "none",
          boxShadow: "0 0 20px rgba(0, 112, 243, 0.3)",
        }}
      />

      {/* Tooltip */}
      <div
        style={{
          position: "absolute",
          top,
          left,
          background: "linear-gradient(145deg, #111827, #1f2937)",
          padding: "1.2rem 1.5rem",
          borderRadius: "16px",
          border: "2px solid #374151",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
          zIndex: 1001,
          maxWidth: tooltipWidth,
          fontFamily: '"Orbitron", sans-serif',
          color: "#eee",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Flecha */}
        <div
          style={{
            position: "absolute",
            top: arrowPosition === "top" ? -8 : "unset",
            bottom: arrowPosition === "bottom" ? -8 : "unset",
            left: 20,
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: arrowPosition === "top" ? "8px solid #374151" : "none",
            borderTop: arrowPosition === "bottom" ? "8px solid #374151" : "none",
          }}
        />

        <h3
          style={{
            margin: "0 0 0.5rem 0",
            fontSize: "1.1rem",
            color: "#fff",
            letterSpacing: "0.05rem",
            fontWeight: "bold",
          }}
        >
          {text.titulo}
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: "0.95rem",
            color: "#d1d5db",
            lineHeight: "1.4rem",
          }}
        >
          {text.descripcion}
        </p>

        {/* Controles */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1.2rem",
            gap: "0.5rem",
          }}
        >
          <button
            onClick={onFinish}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "8px 14px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: '"Orbitron", sans-serif',
              fontSize: "0.8rem",
              fontWeight: "bold",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#b91c1c")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc2626")}
          >
            Finalizar Tour
          </button>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {!isFirstStep && (
              <button
                onClick={onPrev}
                style={{
                  backgroundColor: "#374151",
                  color: "#d1d5db",
                  padding: "8px 16px",
                  border: "1px solid #6b7280",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: "0.8rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#4b5563"
                  e.target.style.color = "#fff"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#374151"
                  e.target.style.color = "#d1d5db"
                }}
              >
                Atrás
              </button>
            )}

            {!isLastStep && (
              <button
                onClick={onNext}
                style={{
                  backgroundColor: "#0ea5e9",
                  color: "#fff",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0284c7")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#0ea5e9")}
              >
                Siguiente
              </button>
            )}

            {isLastStep && (
              <button
                onClick={onFinish}
                style={{
                  backgroundColor: "#059669",
                  color: "#fff",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#047857")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#059669")}
              >
                Finalizar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default TourStep
