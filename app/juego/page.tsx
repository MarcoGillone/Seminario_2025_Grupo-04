"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  Mail,
  MessageCircle,
  Bot,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Send,
  Paperclip,
  Video,
  ImageIcon,
  Zap,
  Target,
  Phone,
  MoreVertical,
  Smile,
  Mic,
  Camera,
  Plus,
  Skull,
  Scale,
  Monitor,
  Coffee,
  FileText,
  Headphones,
  Volume2,
  VolumeX,
  Trophy,
  Star,
  Shield,
  Gamepad2,
  Sparkles,
} from "lucide-react"

interface MediaCase {
  id: string
  type: "image" | "video"
  title: string
  source: string
  description: string
  isDeepfake: boolean
  difficulty: "easy" | "medium" | "hard" | "expert" | "master"
  hints: string[]
  mediaUrl: string
  realImageUrl?: string
  level: number
  xpReward: number
  complexity: string[]
}

interface Email {
  id: string
  from: string
  subject: string
  content: string
  timestamp: string
  hasAttachment: boolean
  caseId?: string
  isRead: boolean
  priority: "normal" | "urgent" | "legal"
}

interface WhatsAppMessage {
  id: string
  from: string
  fromName: string
  content: string
  timestamp: string
  isOwn: boolean
  caseId?: string
  avatar: string
  messageType: "text" | "image" | "urgent"
  isRead: boolean
  targetContact?: string
}

interface WhatsAppContact {
  id: string
  name: string
  avatar: string
  lastSeen: string
  isOnline: boolean
}

interface BossAppearance {
  isVisible: boolean
  mood: "normal" | "angry" | "furious"
  message: string
  duration: number
}

interface PlayerStats {
  level: number
  xp: number
  xpToNext: number
  rank: string
  accuracy: number
  streak: number
  maxStreak: number
}

const whatsappContacts: WhatsAppContact[] = [
  {
    id: "boss",
    name: "Roberto Martínez (Jefe)",
    avatar: "RM",
    lastSeen: "en línea",
    isOnline: true,
  },
  {
    id: "source1",
    name: "Fuente Anónima",
    avatar: "FA",
    lastSeen: "hace 2 min",
    isOnline: true,
  },
  {
    id: "colleague",
    name: "María García (Colega)",
    avatar: "MG",
    lastSeen: "hace 5 min",
    isOnline: false,
  },
  {
    id: "tech",
    name: "Soporte Técnico",
    avatar: "ST",
    lastSeen: "hace 1 hora",
    isOnline: false,
  },
  {
    id: "lawyer",
    name: "Bufete Legal Sánchez",
    avatar: "BL",
    lastSeen: "hace 3 horas",
    isOnline: false,
  },
]

const initialCases: MediaCase[] = [
  {
    id: "case1",
    type: "image",
    title: "Cristiano Ronaldo promociona la controversial Herbalife",
    source: "Redes Sociales",
    description: "Cristiano Ronaldo promociona la controversial Herbalife. Acusada de ser una estafa piramidal.",
    isDeepfake: false,
    difficulty: "medium",
    hints: [
      "Observa las sombras y la iluminación inconsistente",
      "Revisa la calidad de imagen alrededor del rostro",
      "Los bordes del cabello parecen artificiales",
    ],
    mediaUrl: "img/CR7 Herbalife.jpg",
    realImageUrl: "img/CR7 Herbalife.jpg",
    xpReward: 100,
    complexity: ["Iluminación básica", "Bordes simples"],
    level: 1,
  },
  {
    id: "case2",
    type: "image",
    title: "CEO haciendo declaraciones controvertidas",
    source: "Redes sociales",
    description:
      "Video viral de un CEO de empresa tecnológica haciendo declaraciones que contradicen su posición pública",
    isDeepfake: true,
    difficulty: "hard",
    hints: [
      "El movimiento de los labios no sincroniza perfectamente",
      "Micro-expresiones faciales inconsistentes",
      "Calidad de audio superior a la del video",
    ],
    mediaUrl: "img/Trump IA.jpg",
    realImageUrl: "img/Trump IA.jpg",
    xpReward: 100,
    complexity: ["Iluminación básica", "Bordes simples"],
    level: 1,
  },
  {
    id: "case3",
    type: "image",
    title: "Guillermo Francella protagonizara una nueva pelicula de Rambo",
    source: "Agencia de noticias",
    description: "Foto filtrada de Guillermo Francella donde lo podemos ver protagonizando una nueva pelicula de Rambo",
    isDeepfake: true,
    difficulty: "easy",
    hints: [
      "La iluminación es consistente en toda la imagen",
      "No hay artefactos digitales visibles",
      "Metadatos de la cámara son coherentes",
    ],
    mediaUrl: "img/Francella_Rambo.jpg",
    realImageUrl: "img/Francella_Rambo.jpg",
    xpReward: 100,
    complexity: ["Iluminación básica", "Bordes simples"],
    level: 1,
  },
]

const difficultyColors = {
  easy: "bg-green-500",
  medium: "bg-yellow-500",
  hard: "bg-orange-500",
  expert: "bg-red-500",
  master: "bg-purple-500",
}

const rankTitles = [
  "Novato Periodista",
  "Investigador Junior",
  "Analista Experto",
  "Periodista Senior anti Deepfakes",
  "Especialista Elite en Verificación",
  "Maestro Verificador de Contenido Digital",
]

const bossMessages = [
  "Alex, necesito esos análisis YA! ⏰",
  "La competencia nos está pisando los talones 😤",
  "¿Cuánto tiempo más necesitas? El director está preguntando...",
  "URGENTE: Tenemos que publicar en 30 minutos!",
  "¿Ya verificaste las imágenes? No podemos permitirnos errores!",
  "Alex, responde por favor. Esto es crítico! 🚨",
  "Si no tenemos esto listo, perdemos la exclusiva",
  "¿Estás ahí? Necesito una actualización AHORA",
  "Tiempo límite: 15 minutos para el primer análisis",
  "Alex, esto puede definir tu carrera. ¡Concéntrate!",
  "¡ALEX! ¿Dónde están los resultados? 😡",
  "El director quiere verte en su oficina...",
  "Esto es inaceptable. Demasiados errores.",
]

export default function DeepfakeNewsroom() {
  const [showIntroduction, setShowIntroduction] = useState(true)
  // Calcular tiempo base según nivel de dificultad
  const calculateTimeByLevel = (level: number): number => {
    const baseTimes = {
      1: 1800, // Nivel 1: 30 minutos (era 1 hora)
      2: 1650, // Nivel 2: 27.5 minutos (era 55 min)
      3: 1500, // Nivel 3: 25 minutos (era 50 min)
      4: 1350, // Nivel 4: 22.5 minutos (era 45 min)
      5: 1200, // Nivel 5: 20 minutos (era 40 min)
      6: 1050, // Nivel 6: 17.5 minutos (era 35 min)
      7: 900, // Nivel 7: 15 minutos (era 30 min)
      8: 750, // Nivel 8: 12.5 minutos (era 25 min)
      9: 600, // Nivel 9: 10 minutos (era 20 min)
      10: 450, // Nivel 10+: 7.5 minutos (era 15 min)
    }

    return baseTimes[Math.min(level, 10) as keyof typeof baseTimes] || 450
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeByLevel(1)) // 1 hora en segundos (3600)
  const [currentCase, setCurrentCase] = useState<MediaCase | null>(null)
  const [emails, setEmails] = useState<Email[]>([])
  const [whatsappMessages, setWhatsappMessages] = useState<WhatsAppMessage[]>([])
  const [selectedContact, setSelectedContact] = useState<string>("boss")
  const [mediaCases, setMediaCases] = useState<MediaCase[]>(initialCases)
  const [solvedCases, setSolvedCases] = useState<string[]>([])
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [penalties, setPenalties] = useState(0)
  const [aiResponse, setAiResponse] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [activeWindow, setActiveWindow] = useState<string>("desktop")
  const [bossMessageIndex, setBossMessageIndex] = useState(0)
  const [lastBossMessage, setLastBossMessage] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [gameOverReason, setGameOverReason] = useState("")
  const [bossAppearance, setBossAppearance] = useState<BossAppearance>({
    isVisible: false,
    mood: "normal",
    message: "",
    duration: 0,
  })
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notifications, setNotifications] = useState<string[]>([])
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    level: 1,
    xp: 0,
    xpToNext: 500,
    rank: rankTitles[0],
    accuracy: 100,
    streak: 0,
    maxStreak: 0,
  })
  const [showVictory, setShowVictory] = useState(false)
  const [caseCounter, setCaseCounter] = useState(4)

  // Generar nuevos casos dinámicamente
  const generateNewCase = (level: number): MediaCase => {
    const difficulties: Array<"easy" | "medium" | "hard" | "expert" | "master"> =
      level <= 2
        ? ["easy", "medium"]
        : level <= 4
          ? ["medium", "hard"]
          : level <= 6
            ? ["hard", "expert"]
            : ["expert", "master"]

    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)]

    const caseTemplates = [
      {
        type: "image" as const,
        titles: [
          "Ministro en reunión secreta",
          "Empresario en evento privado",
          "Activista en manifestación",
          "Científico en laboratorio",
          "Artista en estudio de grabación",
        ],
        sources: ["Filtración interna", "Paparazzi", "Redes sociales", "Fuente confidencial"],
        descriptions: [
          "Imagen comprometedora que podría cambiar la opinión pública",
          "Fotografía que contradice declaraciones oficiales",
          "Evidencia visual de actividades no reportadas",
          "Documento gráfico de eventos controvertidos",
        ],
      },
      {
        type: "video" as const,
        titles: [
          "Declaraciones no autorizadas",
          "Confesión en privado",
          "Negociación secreta",
          "Admisión de culpabilidad",
          "Conversación comprometedora",
        ],
        sources: ["Grabación filtrada", "Vigilancia", "Testimonio anónimo", "Hackeo"],
        descriptions: [
          "Video que muestra comportamiento contradictorio",
          "Grabación de conversación privada reveladora",
          "Evidencia audiovisual de irregularidades",
          "Material que podría ser manipulado digitalmente",
        ],
      },
    ]

    const template = caseTemplates[Math.floor(Math.random() * caseTemplates.length)]
    const isDeepfake = Math.random() > 0.5

    const complexityByDifficulty = {
      easy: ["Iluminación básica", "Bordes simples"],
      medium: ["Sincronización labial", "Texturas faciales"],
      hard: ["Micro-expresiones", "Artefactos de compresión", "Metadatos alterados"],
      expert: ["IA generativa avanzada", "Manipulación temporal", "Deepfake de alta calidad"],
      master: ["Tecnología de última generación", "Múltiples capas de manipulación", "Evidencia forense compleja"],
    }

    const xpRewards = {
      easy: 100,
      medium: 200,
      hard: 350,
      expert: 500,
      master: 750,
    }

    const newCase: MediaCase = {
      id: `case${caseCounter}`,
      type: template.type,
      title: template.titles[Math.floor(Math.random() * template.titles.length)],
      source: template.sources[Math.floor(Math.random() * template.sources.length)],
      description: template.descriptions[Math.floor(Math.random() * template.descriptions.length)],
      isDeepfake,
      difficulty,
      level,
      xpReward: xpRewards[difficulty],
      complexity: complexityByDifficulty[difficulty],
      hints: generateHints(difficulty, isDeepfake),
      mediaUrl: `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(template.titles[0])}`,
      realImageUrl: `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(template.titles[0])}`,
    }

    return newCase
  }

  const generateHints = (difficulty: string, isDeepfake: boolean): string[] => {
    const deepfakeHints = {
      easy: [
        "Observa inconsistencias en la iluminación",
        "Revisa los bordes del rostro",
        "Busca artefactos de compresión",
      ],
      medium: ["Analiza la sincronización labial", "Examina las micro-expresiones", "Verifica la coherencia temporal"],
      hard: [
        "Busca artefactos de IA generativa",
        "Analiza patrones de píxeles anómalos",
        "Revisa metadatos de creación",
      ],
      expert: [
        "Detecta manipulación de redes neuronales",
        "Analiza frecuencias espectrales",
        "Busca marcas de agua digitales",
      ],
      master: ["Utiliza análisis forense avanzado", "Detecta patrones de GAN", "Analiza coherencia biométrica"],
    }

    const authenticHints = {
      easy: ["La iluminación es consistente", "No hay artefactos digitales", "Metadatos coherentes"],
      medium: ["Sincronización natural", "Expresiones auténticas", "Calidad uniforme"],
      hard: ["Patrones de compresión naturales", "Coherencia biométrica", "Ausencia de manipulación"],
      expert: ["Firma digital auténtica", "Análisis espectral limpio", "Coherencia forense completa"],
      master: ["Verificación criptográfica", "Análisis de blockchain", "Certificación de origen"],
    }

    return isDeepfake
      ? deepfakeHints[difficulty as keyof typeof deepfakeHints]
      : authenticHints[difficulty as keyof typeof authenticHints]
  }

  // Generar certificado PDF
  const generateCertificate = () => {
    const certificateData = {
      name: "Juan Carlos Rodríguez",
      course: "Especialista en Detección de Deepfakes",
      level: playerStats.rank,
      accuracy: playerStats.accuracy,
      casesResolved: solvedCases.length,
      maxStreak: playerStats.maxStreak,
      date: new Date().toLocaleDateString("es-ES"),
      score: score,
    }

    // Crear contenido del PDF
    const pdfContent = `
      CERTIFICADO DE BUENAS PRÁCTICAS
      
      Especialista en Detección de Deepfakes
      
      Se certifica que:
      ${certificateData.name}
      
      Ha completado exitosamente el programa de entrenamiento en detección de contenido manipulado digitalmente, demostrando:
      
      • Nivel alcanzado: ${certificateData.level}
      • Precisión: ${certificateData.accuracy}%
      • Casos resueltos: ${certificateData.casesResolved}
      • Racha máxima: ${certificateData.maxStreak}
      • Puntuación final: ${certificateData.score}
      
      Este certificado acredita las competencias necesarias para la verificación profesional de contenido digital y la detección de manipulaciones mediante inteligencia artificial.
      
      Fecha de emisión: ${certificateData.date}
      
      NewsRoom Academy
      Centro de Excelencia en Verificación Digital
    `

    // Crear y descargar el archivo
    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Certificado_Deepfake_Periodismo_${certificateData.name.replace(" ", "_")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Inicializar emails
  useEffect(() => {
    const initialEmails: Email[] = [
      {
        id: "email1",
        from: "fuente.anonima@protonmail.com",
        subject: "🎯 MISIÓN: Material comprometedor",
        content:
          "Sen, adjunto material que requiere análisis inmediato. Su misión: verificar autenticidad antes de publicar. El futuro de la verdad está en sus manos.",
        timestamp: "10:30",
        hasAttachment: true,
        caseId: "case1",
        isRead: false,
        priority: "normal",
      },
      {
        id: "email2",
        from: "comando.central@newsroom.com",
        subject: "⚡ OPERACIÓN: Deadline crítico",
        content:
          "Juan Carlos, necesitamos los resultados del análisis ASAP. La competencia ya está trabajando en esto. ¡No podemos perder esta batalla!",
        timestamp: "09:15",
        hasAttachment: false,
        isRead: false,
        priority: "urgent",
      },
      {
        id: "email3",
        from: "aliados.reuters@news.com",
        subject: "✅ INTEL: Material verificado",
        content:
          "JuanCa, adjuntamos material ya verificado por nuestro equipo. Pueden proceder con confianza. +100 XP por análisis correcto.",
        timestamp: "08:45",
        hasAttachment: true,
        caseId: "case3",
        isRead: false,
        priority: "normal",
      },
    ]
    setEmails(initialEmails)
  }, [])

  // Inicializar mensajes de WhatsApp
  useEffect(() => {
    const initialMessages: WhatsAppMessage[] = [
      {
        id: "wa1",
        from: "boss",
        fromName: "Roberto Martínez (Jefe)",
        content:
          "🎮 ¡Bienvenido al Centro de Operaciones, Juan Carlos Tienes varios casos urgentes que analizar hoy. ¡Que comience la misión!",
        timestamp: "09:00",
        isOwn: false,
        avatar: "RM",
        messageType: "text",
        isRead: true,
      },
      {
        id: "wa2",
        from: "source1",
        fromName: "Fuente Anónima",
        content: "🕵️ Tengo algo que te va a interesar... Nivel de amenaza: ALTO 👀",
        timestamp: "10:45",
        isOwn: false,
        caseId: "case2",
        avatar: "FA",
        messageType: "text",
        isRead: false,
      },
      {
        id: "wa3",
        from: "colleague",
        fromName: "María García (Colega)",
        content: "💪 ¿Cómo vas con la misión? Si necesitas backup, avísame. ¡Somos un equipo!",
        timestamp: "10:50",
        isOwn: false,
        avatar: "MG",
        messageType: "text",
        isRead: false,
      },
    ]
    setWhatsappMessages(initialMessages)
  }, [])

  // Verificar victoria
  useEffect(() => {
    if (solvedCases.length >= 10 && wrongAnswers.length <= 2 && !isGameOver) {
      setShowVictory(true)
      setIsGameOver(true)
      setGameOverReason("victory")
    }
  }, [solvedCases.length, wrongAnswers.length, isGameOver])

  // Aparición del jefe
  const showBoss = (mood: "normal" | "angry" | "furious", message: string, duration = 5000) => {
    setBossAppearance({
      isVisible: true,
      mood,
      message,
      duration,
    })

    setTimeout(() => {
      setBossAppearance((prev) => ({ ...prev, isVisible: false }))
    }, duration)
  }

  // Verificar game over por penalizaciones
  useEffect(() => {
    if (penalties >= 20 && !isGameOver) {
      setIsGameOver(true)
      setGameOverReason("fired")
      showBoss("furious", "¡MISIÓN FALLIDA! Has sido relevado del servicio.", 8000)
    }
  }, [penalties, isGameOver])

  // ===== SISTEMA DE TEMPORIZADOR =====
  // Controla el tiempo límite de la misión (1 hora = 3600 segundos)
  // El temporizador cuenta hacia atrás y termina el juego cuando llega a 0
  useEffect(() => {
    if (isGameOver) return // No ejecutar si el juego ya terminó

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer) // Detener el temporizador
          if (!isGameOver) {
            setIsGameOver(true)
            setGameOverReason("timeout") // Razón: tiempo agotado
            showBoss("angry", "⏰ ¡Tiempo agotado! La misión ha fallado.", 6000)
          }
          return 0
        }
        return prev - 1 // Decrementar un segundo
      })
    }, 1000) // Ejecutar cada 1000ms (1 segundo)

    return () => clearInterval(timer) // Limpiar el temporizador al desmontar
  }, [isGameOver])

  // ===== FUNCIÓN PARA FORMATEAR EL TIEMPO =====
  // Convierte segundos a formato HH:MM:SS para mostrar en pantalla
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600) // Calcular horas
    const minutes = Math.floor((seconds % 3600) / 60) // Calcular minutos
    const secs = seconds % 60 // Calcular segundos restantes
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // ===== SISTEMA DE GENERACIÓN DE CASOS =====
  // Genera nuevos casos dinámicamente de 3 en 3 cuando el jugador completa casos
  const triggeredLevels = useRef<Set<number>>(new Set())

  useEffect(() => {
    const uniqueAttempts = new Set([...solvedCases, ...wrongAnswers])
    const totalAttempts = uniqueAttempts.size

    // Generar 3 nuevos casos cada 3 casos completados (resueltos o fallados)
    if (totalAttempts > 0 && totalAttempts % 3 === 0) {
      const level = Math.floor(totalAttempts / 3) + 1

      if (!triggeredLevels.current.has(level)) {
        // Generar 3 casos nuevos del mismo nivel
        const newCases:any[] = []
        for (let i = 0; i < 3; i++) {
          const newCase = generateNewCase(level)
          newCase.id = `case${caseCounter + i}` // Asegurar IDs únicos
          newCases.push(newCase)
        }

        setMediaCases((prev) => [...prev, ...newCases])
        setCaseCounter((prev) => prev + 3) // Incrementar contador por 3

        setNotifications((prev) => [...prev, `🆕 ¡3 nuevos casos desbloqueados! Nivel ${level}`])
        setTimeout(() => {
          setNotifications((prev) => prev.slice(1))
        }, 5000)

        triggeredLevels.current.add(level)
      }
    }
  }, [solvedCases, wrongAnswers, caseCounter])

  const handleCaseDecision = (caseId: string, userDecision: boolean) => {
    if (isGameOver) return

    const case_ = mediaCases.find((c) => c.id === caseId)
    if (!case_) return

    const isCorrect = userDecision === case_.isDeepfake

    if (isCorrect) {
      setSolvedCases((prev) => [...prev, caseId])
      setScore((prev) => prev + case_.xpReward)

      // Actualizar stats del jugador
      setPlayerStats((prev) => {
        const newXp = prev.xp + case_.xpReward
        const newStreak = prev.streak + 1

        // Calcular nivel basado en total de intentos (cada 3 respuestas = 1 nivel)
        const totalAttempts = solvedCases.length + wrongAnswers.length + 1
        const newLevel = Math.floor(totalAttempts / 3) + 1
        const newRank = rankTitles[Math.min(newLevel - 1, rankTitles.length - 1)]

        // ===== AJUSTE DE TIEMPO POR NIVEL =====
        // Si subió de nivel, ajustar el tiempo restante
        if (newLevel > prev.level) {
          const newTimeLimit = calculateTimeByLevel(newLevel)
          const currentProgress = (calculateTimeByLevel(prev.level) - timeLeft) / calculateTimeByLevel(prev.level) // Progreso actual (0-1)
          const adjustedTime = Math.max(150, newTimeLimit - newTimeLimit * currentProgress) // Mínimo 2.5 minutos

          setTimeLeft(Math.floor(adjustedTime))

          // Notificar cambio de tiempo
          setNotifications((prevNotifs) => [
            ...prevNotifs,
            `⏰ ¡Nivel ${newLevel}! Tiempo ajustado: ${formatTime(Math.floor(adjustedTime))}`,
          ])
          setTimeout(() => {
            setNotifications((prevNotifs) => prevNotifs.slice(1))
          }, 6000)
        }

        return {
          ...prev,
          xp: newXp,
          streak: newStreak,
          maxStreak: Math.max(prev.maxStreak, newStreak),
          level: newLevel,
          rank: newRank,
          accuracy: Math.round(((solvedCases.length + 1) / (solvedCases.length + wrongAnswers.length + 1)) * 100),
        }
      })

      showBoss("normal", `🎉 ¡Excelente trabajo! +${case_.xpReward} XP. Racha: ${playerStats.streak + 1}`, 3000)

      const congratsMessage: WhatsAppMessage = {
        id: `boss_congrats_${Date.now()}`,
        from: "boss",
        fromName: "Roberto Martínez (Jefe)",
        content: `🏆 ¡MISIÓN COMPLETADA! "${case_.title}" - Recompensa: ${case_.xpReward} XP 🎯`,
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        isOwn: false,
        avatar: "RM",
        messageType: "text",
        isRead: false,
      }

      setTimeout(() => {
        setWhatsappMessages((prev) => [...prev, congratsMessage])
      }, 1000)
    } else {
      setWrongAnswers((prev) => [...prev, caseId])
      setPenalties((prev) => prev + 10)
      setScore((prev) => Math.max(0, prev - 50))

      // Resetear racha
      setPlayerStats((prev) => ({
        ...prev,
        streak: 0,
        accuracy: Math.round((solvedCases.length / (solvedCases.length + wrongAnswers.length + 1)) * 100),
      }))
    }

    setAiResponse(
      isCorrect
        ? `✅ ¡CORRECTO! ${case_.isDeepfake ? "Era un deepfake" : "Era contenido auténtico"}. +${case_.xpReward} XP`
        : `❌ INCORRECTO. ${case_.isDeepfake ? "Era un deepfake" : "Era contenido auténtico"}. Penalización: -50 puntos. Racha perdida.`,
    )
  }

  const openCase = (caseId: string) => {
    const case_ = mediaCases.find((c) => c.id === caseId)
    if (case_) {
      setCurrentCase(case_)
      setActiveWindow("analysis")
    }
  }

  const markEmailAsRead = (emailId: string) => {
    setEmails((prev) => prev.map((email) => (email.id === emailId ? { ...email, isRead: true } : email)))
  }

  const sendWhatsAppMessage = () => {
    if (!newMessage.trim() || isGameOver) return

    const newMsg: WhatsAppMessage = {
      id: `wa${Date.now()}`,
      from: "me",
      fromName: "Tú",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      avatar: "AR",
      messageType: "text",
      isRead: true,
      targetContact: selectedContact,
    }

    setWhatsappMessages((prev) => [...prev, newMsg])
    setNewMessage("")
  }

  const getContactMessages = (contactId: string) => {
    return whatsappMessages.filter((msg) => msg.from === contactId || (msg.isOwn && msg.targetContact === contactId))
  }

  const getUnreadCount = (contactId: string) => {
    return whatsappMessages.filter((msg) => msg.from === contactId && !msg.isRead).length
  }

  const restartGame = () => {
    setTimeLeft(calculateTimeByLevel(1)) // Reiniciar con tiempo del nivel 1
    setShowIntroduction(true) // Mostrar introducción nuevamente
    setCurrentCase(null)
    setMediaCases(initialCases)
    setSolvedCases([])
    setWrongAnswers([])
    setScore(0)
    setPenalties(0)
    setAiResponse("")
    setNewMessage("")
    setActiveWindow("desktop")
    setBossMessageIndex(0)
    setLastBossMessage(0)
    setIsGameOver(false)
    setGameOverReason("")
    setShowVictory(false)
    setBossAppearance({ isVisible: false, mood: "normal", message: "", duration: 0 })
    setNotifications([])
    setCaseCounter(4)
    triggeredLevels.current.clear() // IMPORTANTE: Limpiar los niveles activados
    setPlayerStats({
      level: 1,
      xp: 0,
      xpToNext: 500,
      rank: rankTitles[0],
      accuracy: 100,
      streak: 0,
      maxStreak: 0,
    })
  }

  // ===== PANTALLA DE INTRODUCCIÓN =====
  if (showIntroduction) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <Card className="max-w-4xl w-full relative z-10 border-blue-500 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="mx-auto mb-4">
              <Shield className="w-20 h-20 animate-pulse" />
            </div>
            <CardTitle className="text-4xl font-bold">🎮 MISIÓN: DEEPFAKE NEWSROOM</CardTitle>
            <CardDescription className="text-lg text-blue-100">
              Centro de Operaciones Anti-Desinformación
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-8">
            {/* Briefing de la Misión */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border-2 border-red-200">
              <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2 text-xl">
                <AlertTriangle className="w-6 h-6" />🚨 BRIEFING URGENTE
              </h3>
              <p className="text-red-700 font-medium leading-relaxed">
                <strong>Agente Juan Carlos Rodríguez</strong>, la desinformación digital ha alcanzado niveles críticos.
                Tu misión es analizar contenido multimedia y determinar si es auténtico o manipulado mediante IA.
                <span className="text-red-800 font-bold"> El futuro de la verdad está en tus manos.</span>
              </p>
            </div>

            {/* Objetivos de la Misión */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <Target className="w-6 h-6" />🎯 OBJETIVOS PRINCIPALES
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Resolver 10+ casos correctamente</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Mantener 90%+ de precisión</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Completar antes del tiempo límite</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Máximo 2 errores críticos</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-800 flex items-center gap-2">
                    <Clock className="w-6 h-6" />⏰ SISTEMA DE TIEMPO
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <p className="text-yellow-800 font-bold text-center text-lg">
                      TIEMPO INICIAL: {formatTime(calculateTimeByLevel(1))}
                    </p>
                  </div>
                  <div className="space-y-2 text-yellow-700 text-sm">
                    <p>
                      <strong>⚠️ ADVERTENCIA:</strong> El tiempo se reduce con cada nivel
                    </p>
                    <p>
                      <strong>📈 Nivel 1-3:</strong> 30-25 minutos
                    </p>
                    <p>
                      <strong>🔥 Nivel 4-6:</strong> 22.5-17.5 minutos
                    </p>
                    <p>
                      <strong>💀 Nivel 7+:</strong> 15-7.5 minutos
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Consecuencias */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2 text-xl">
                <Skull className="w-6 h-6" />⚡ CONDICIONES DE FALLO
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-red-800 font-bold">TIEMPO AGOTADO</p>
                  <p className="text-red-600 text-sm">Misión fallida</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <XCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-orange-800 font-bold">20 ERRORES</p>
                  <p className="text-orange-600 text-sm">Relevado del servicio</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-yellow-800 font-bold">BAJA PRECISIÓN</p>
                  <p className="text-yellow-600 text-sm">Pérdida de credibilidad</p>
                </div>
              </div>
            </div>

            {/* Herramientas Disponibles */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2 text-xl">
                <Bot className="w-6 h-6" />
                🛠️ ARSENAL DISPONIBLE
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center">
                  <Mail className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-blue-700 text-sm font-medium">Centro de Intel</p>
                </div>
                <div className="text-center">
                  <MessageCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-green-700 text-sm font-medium">Comunicaciones</p>
                </div>
                <div className="text-center">
                  <Bot className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-purple-700 text-sm font-medium">IA Asistente</p>
                </div>
                <div className="text-center">
                  <Eye className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                  <p className="text-orange-700 text-sm font-medium">Laboratorio</p>
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => setShowIntroduction(false)}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg py-4"
                size="lg"
              >
                <Shield className="w-6 h-6 mr-2" />🚀 INICIAR MISIÓN
              </Button>
              <Button
                onClick={() => (window.location.href = "/")}
                variant="outline"
                className="px-8 py-4 border-2 border-gray-300 hover:bg-gray-50"
                size="lg"
              >
                ← Volver al Menú
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="text-center text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
              <p>
                <strong>📋 NOTA:</strong> Este es un entorno de entrenamiento. Los casos presentados son ficticios y con
                fines educativos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isGameOver && gameOverReason !== "victory") {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920&text=Game+Over+Background')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <Card className="max-w-2xl w-full relative z-10 border-red-500 shadow-2xl">
          <CardHeader className="text-center bg-red-600 text-white rounded-t-lg">
            <div className="mx-auto mb-4">
              {gameOverReason === "fired" ? <Skull className="w-16 h-16" /> : <Clock className="w-16 h-16" />}
            </div>
            <CardTitle className="text-3xl">
              {gameOverReason === "fired" ? "🚫 MISIÓN FALLIDA" : "⏰ TIEMPO AGOTADO"}
            </CardTitle>
            <CardDescription className="text-lg text-red-100">
              {gameOverReason === "fired"
                ? "Has sido relevado del servicio por múltiples errores críticos"
                : "Se acabó el tiempo para completar la misión"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-bold text-red-800 mb-2">Consecuencias de la Misión:</h3>
              <ul className="text-red-700 space-y-1">
                {gameOverReason === "fired" ? (
                  <>
                    <li>• Operación terminada</li>
                    <li>• Credenciales revocadas</li>
                    <li>• Acceso denegado al sistema</li>
                    <li>• Reentrenamiento requerido</li>
                  </>
                ) : (
                  <>
                    <li>• Casos sin resolver: {mediaCases.length - solvedCases.length}</li>
                    <li>• Oportunidad perdida</li>
                    <li>• Competencia tomó la delantera</li>
                  </>
                )}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Casos Resueltos</p>
                <p className="text-2xl font-bold text-green-600">{solvedCases.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Errores Cometidos</p>
                <p className="text-2xl font-bold text-red-600">{wrongAnswers.length}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Puntuación Final</p>
              <p className="text-3xl font-bold">{score} XP</p>
              <p className="text-sm text-gray-500">
                Nivel {playerStats.level} - {playerStats.rank}
              </p>
            </div>

            <Button onClick={restartGame} className="w-full" size="lg">
              🔄 Reintentar Misión
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay para efectos */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Aparición del jefe */}
      {bossAppearance.isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md mx-4 border-4 border-blue-500 animate-pulse">
            <div className="text-center">
              <img
                src={
                  bossAppearance.mood === "furious" || bossAppearance.mood === "angry"
                    ? "/placeholder.svg?height=150&width=150&text=😡+Boss"
                    : "/placeholder.svg?height=150&width=150&text=😊+Boss"
                }
                alt="Jefe"
                className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-gray-300"
              />
              <h2 className="text-xl font-bold mb-2 text-gray-800">🎮 Comandante Roberto Martínez</h2>
              <p
                className={`text-lg ${
                  bossAppearance.mood === "furious"
                    ? "text-red-600 font-bold"
                    : bossAppearance.mood === "angry"
                      ? "text-orange-600 font-semibold"
                      : "text-blue-600"
                }`}
              >
                {bossAppearance.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notificaciones */}
      <div className="fixed top-4 right-4 z-40 space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg shadow-lg max-w-sm animate-slide-in"
          >
            <p className="text-sm">{notification}</p>
          </div>
        ))}
      </div>

      {/* Escritorio del periodista */}
      <div className="relative z-10 min-h-screen p-4">
        {/* Monitor/Pantalla principal */}
        <div className="max-w-7xl mx-auto">
          <Card className="bg-gray-900 border-gray-700 shadow-2xl">
            {/* Barra superior del monitor */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-3 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <Gamepad2 className="w-5 h-5 text-blue-400 ml-2" />
                <span className="text-white text-sm font-bold">🎮 DEEPFAKE ANALYST - Juan Carlos Rodriguez</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-bold">Nivel {playerStats.level}</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-600 px-3 py-1 rounded-full">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-bold">{playerStats.xp} XP</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="text-white hover:bg-gray-700"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                {/* ===== DISPLAY DEL TEMPORIZADOR ===== */}
                {/* Muestra el tiempo restante en formato HH:MM:SS con color rojo para urgencia */}
                <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-mono font-bold">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Pantalla principal */}
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-[600px] p-4">
              {/* Barra de tareas */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 mb-4 flex items-center justify-between border border-white/20">
                <div className="flex items-center gap-2">
                  <Button
                    variant={activeWindow === "desktop" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveWindow("desktop")}
                    className="text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Monitor className="w-4 h-4 mr-1" />🎯 Centro de Comando
                  </Button>
                  <Button
                    variant={activeWindow === "email" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveWindow("email")}
                    className="text-white"
                  >
                    <Mail className="w-4 h-4 mr-1" />📧 Mail ({emails.filter((e) => !e.isRead).length})
                  </Button>
                  <Button
                    variant={activeWindow === "whatsapp" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveWindow("whatsapp")}
                    className="text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />💬 Whatsapp
                    {whatsappMessages.filter((m) => !m.isRead).length > 0 && (
                      <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs animate-bounce">
                        {whatsappMessages.filter((m) => !m.isRead).length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={activeWindow === "ai" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveWindow("ai")}
                    className="text-white"
                  >
                    <Bot className="w-4 h-4 mr-1" />🤖 IA Asistente
                  </Button>
                  <Button
                    variant={activeWindow === "analysis" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveWindow("analysis")}
                    className="text-white"
                  >
                    <Eye className="w-4 h-4 mr-1" />🔍 Laboratorio
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-2 bg-green-600 px-3 py-1 rounded-full">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-bold">{score} Puntos</span>
                  </div>
                  <div className="flex items-center gap-2 bg-yellow-600 px-3 py-1 rounded-full">
                    <Target className="w-4 h-4" />
                    <span className="text-sm font-bold">Racha: {playerStats.streak}</span>
                  </div>
                  {penalties > 0 && (
                    <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full animate-pulse">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-bold">Errores: {penalties}/20</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contenido de las ventanas */}
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl min-h-[500px] border border-white/30">
                {activeWindow === "desktop" && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                        <Shield className="w-8 h-8 text-blue-600" />🎮 Centro de Comando - Misiones Activas
                      </h2>
                      <div className="flex items-center gap-4">
                        <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500">
                          {playerStats.rank}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Progreso al siguiente nivel</p>
                          <Progress value={(playerStats.xp % 500) / 5} className="w-32" />
                          <p className="text-xs text-gray-500">{playerStats.xp % 500}/500 XP</p>
                        </div>
                      </div>
                    </div>

                    {/* Alerta de peligro */}
                    {penalties >= 10 && penalties < 20 && (
                      <Card className="mb-6 border-red-500 bg-gradient-to-r from-red-50 to-orange-50 animate-pulse">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 text-red-800">
                            <AlertTriangle className="w-6 h-6" />
                            <span className="font-bold text-lg">
                              ⚠️ ALERTA CRÍTICA: Estás cerca de ser relevado del servicio. Errores: {penalties}/20
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Estadísticas del jugador */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg transition-all">
                        <CardContent className="p-4 text-center">
                          <AlertTriangle className="w-10 h-10 text-yellow-600 mx-auto mb-2" />
                          <p className="text-3xl font-bold text-yellow-600">{mediaCases.length - solvedCases.length}</p>
                          <p className="text-sm text-yellow-700 font-semibold">🎯 Misiones Pendientes</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all">
                        <CardContent className="p-4 text-center">
                          <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
                          <p className="text-3xl font-bold text-green-600">{solvedCases.length}</p>
                          <p className="text-sm text-green-700 font-semibold">✅ Misiones Completadas</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200 hover:shadow-lg transition-all">
                        <CardContent className="p-4 text-center">
                          <XCircle className="w-10 h-10 text-red-600 mx-auto mb-2" />
                          <p className="text-3xl font-bold text-red-600">{wrongAnswers.length}</p>
                          <p className="text-sm text-red-700 font-semibold">❌ Errores Críticos</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:shadow-lg transition-all">
                        <CardContent className="p-4 text-center">
                          <Target className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                          <p className="text-3xl font-bold text-blue-600">{playerStats.accuracy}%</p>
                          <p className="text-sm text-blue-700 font-semibold">🎯 Precisión</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Casos/Misiones */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mediaCases.map((case_) => (
                        <Card
                          key={case_.id}
                          className={`cursor-pointer transition-all hover:shadow-xl hover:scale-105 transform ${
                            solvedCases.includes(case_.id)
                              ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-green-200"
                              : wrongAnswers.includes(case_.id)
                                ? "bg-gradient-to-br from-red-50 to-pink-50 border-red-300 shadow-red-200"
                                : "hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border-gray-200"
                          }`}
                          onClick={() => openCase(case_.id)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={case_.type === "image" ? "default" : "secondary"}
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                >
                                  {case_.type === "image" ? (
                                    <ImageIcon className="w-3 h-3 mr-1" />
                                  ) : (
                                    <Video className="w-3 h-3 mr-1" />
                                  )}
                                  {case_.type}
                                </Badge>
                                <Badge className={`${difficultyColors[case_.difficulty]} text-white`}>
                                  Nivel {case_.level}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                {solvedCases.includes(case_.id) && <CheckCircle className="w-5 h-5 text-green-600" />}
                                {wrongAnswers.includes(case_.id) && <XCircle className="w-5 h-5 text-red-600" />}
                                <span className="text-xs font-bold text-purple-600">+{case_.xpReward} XP</span>
                              </div>
                            </div>
                            <CardTitle className="text-sm font-bold">{case_.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <img
                                src={case_.realImageUrl || case_.mediaUrl}
                                alt={case_.title}
                                className="w-full h-32 object-cover rounded border-2 border-gray-200"
                              />
                              <p className="text-xs text-gray-600">{case_.description}</p>
                              <div className="flex justify-between items-center">
                                <Badge variant="outline" className="text-xs font-semibold">
                                  {case_.difficulty.toUpperCase()}
                                </Badge>
                                <span className="text-xs text-gray-500 font-medium">{case_.source}</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {case_.complexity.map((comp, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {comp}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {activeWindow === "email" && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      <Mail className="w-6 h-6 text-blue-600" />📧 Centro de Inteligencia
                      {emails.some((e) => e.priority === "legal") && (
                        <Badge variant="destructive" className="ml-2 animate-pulse">
                          <Scale className="w-3 h-3 mr-1" />
                          LEGAL
                        </Badge>
                      )}
                    </h2>
                    <ScrollArea className="h-96">
                      <div className="space-y-3">
                        {emails.map((email) => (
                          <Card
                            key={email.id}
                            className={`cursor-pointer transition-all hover:shadow-lg ${
                              !email.isRead
                                ? email.priority === "legal"
                                  ? "bg-gradient-to-r from-red-100 to-pink-100 border-red-300 animate-pulse"
                                  : email.priority === "urgent"
                                    ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
                                    : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
                                : ""
                            }`}
                            onClick={() => {
                              markEmailAsRead(email.id)
                              if (email.caseId) openCase(email.caseId)
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-8 h-8">
                                    <AvatarFallback
                                      className={
                                        email.priority === "legal"
                                          ? "bg-red-600 text-white"
                                          : email.priority === "urgent"
                                            ? "bg-yellow-600 text-white"
                                            : "bg-blue-600 text-white"
                                      }
                                    >
                                      {email.from.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-sm">{email.from}</p>
                                    <p className="text-xs text-gray-500">{email.timestamp}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {email.priority === "legal" && <Scale className="w-4 h-4 text-red-600" />}
                                  {email.priority === "urgent" && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                                  {email.hasAttachment && <Paperclip className="w-4 h-4 text-gray-400" />}
                                  {!email.isRead && <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />}
                                </div>
                              </div>
                              <h3 className="font-bold mb-1">{email.subject}</h3>
                              <p className="text-sm text-gray-600 whitespace-pre-line">{email.content}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {activeWindow === "whatsapp" && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[500px]">
                      {/* Lista de contactos */}
                      <Card className="lg:col-span-1">
                        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <MessageCircle className="w-5 h-5" />💬 Comunicaciones Seguras
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <ScrollArea className="h-[400px]">
                            {whatsappContacts.map((contact) => (
                              <div
                                key={contact.id}
                                className={`p-4 border-b cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all ${
                                  selectedContact === contact.id
                                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                                    : ""
                                }`}
                                onClick={() => setSelectedContact(contact.id)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <Avatar className="w-12 h-12">
                                      <AvatarFallback
                                        className={`${
                                          contact.id === "lawyer"
                                            ? "bg-red-600 text-white"
                                            : contact.id === "boss"
                                              ? "bg-blue-600 text-white"
                                              : "bg-green-600 text-white"
                                        }`}
                                      >
                                        {contact.avatar}
                                      </AvatarFallback>
                                    </Avatar>
                                    {contact.isOnline && (
                                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <p className="font-medium text-sm">{contact.name}</p>
                                      {getUnreadCount(contact.id) > 0 && (
                                        <Badge variant="destructive" className="px-2 py-0 text-xs animate-bounce">
                                          {getUnreadCount(contact.id)}
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-500">{contact.lastSeen}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </ScrollArea>
                        </CardContent>
                      </Card>

                      {/* Chat */}
                      <Card className="lg:col-span-2">
                        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback
                                  className={`${
                                    selectedContact === "lawyer"
                                      ? "bg-red-700 text-white"
                                      : selectedContact === "boss"
                                        ? "bg-blue-700 text-white"
                                        : "bg-green-700 text-white"
                                  }`}
                                >
                                  {whatsappContacts.find((c) => c.id === selectedContact)?.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">
                                  {whatsappContacts.find((c) => c.id === selectedContact)?.name}
                                </CardTitle>
                                <p className="text-sm text-green-100">
                                  {whatsappContacts.find((c) => c.id === selectedContact)?.lastSeen}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
                                <Phone className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
                                <Video className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0 flex flex-col h-[400px]">
                          {/* Mensajes */}
                          <ScrollArea className="flex-1 p-4 bg-gradient-to-br from-gray-50 to-green-50">
                            <div className="space-y-2">
                              {getContactMessages(selectedContact).map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                                  <div
                                    className={`max-w-xs p-3 rounded-lg cursor-pointer relative transition-all hover:scale-105 ${
                                      msg.isOwn
                                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                                        : msg.messageType === "urgent"
                                          ? "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-300 animate-pulse"
                                          : "bg-white text-gray-800 shadow-md border border-gray-200"
                                    }`}
                                    onClick={() => msg.caseId && openCase(msg.caseId)}
                                  >
                                    {msg.messageType === "urgent" && (
                                      <AlertTriangle className="w-4 h-4 text-red-600 absolute top-1 right-1 animate-bounce" />
                                    )}
                                    <p className="text-sm font-medium">{msg.content}</p>
                                    <div className="flex items-center justify-between mt-1">
                                      <p className={`text-xs ${msg.isOwn ? "text-green-100" : "text-gray-500"}`}>
                                        {msg.timestamp}
                                      </p>
                                      {msg.isOwn && (
                                        <div className="flex">
                                          <CheckCircle className="w-3 h-3 text-green-200" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>

                          {/* Input de mensaje */}
                          <div className="p-4 bg-white border-t border-gray-200">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Input
                                placeholder="Escribe un mensaje..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && sendWhatsAppMessage()}
                                className="flex-1 border-green-200 focus:border-green-400"
                              />
                              <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                                <Smile className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                                <Paperclip className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                                <Camera className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                                <Mic className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={sendWhatsAppMessage}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeWindow === "ai" && (
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      <Bot className="w-6 h-6 text-blue-600" />🤖 Asistente IA - DeepDetect Pro
                    </h2>
                    <div className="space-y-4">
                      {aiResponse && (
                        <div
                          className={`p-4 rounded-lg border-2 ${
                            aiResponse.includes("✅")
                              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300"
                              : "bg-gradient-to-r from-red-50 to-pink-50 border-red-300"
                          }`}
                        >
                          <p className="text-sm font-bold">{aiResponse}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Zap className="w-5 h-5 text-blue-600" />
                              🛠️ Herramientas de Análisis
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start hover:bg-blue-50 border-blue-200">
                              <Eye className="w-4 h-4 mr-2" />🔍 Análisis de Metadatos
                            </Button>
                            <Button
                              onClick={() => {
                                window.open("https://undetectable.ai/es/ai-image-detector", "_blank")
                              }}
                              variant="outline"
                              className="w-full justify-start hover:bg-purple-50 border-purple-200"
                            >
                              <Zap className="w-4 h-4 mr-2" />⚡ Detección de Artefactos
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start hover:bg-green-50 border-green-200"
                            >
                              <Target className="w-4 h-4 mr-2" />🎯 Análisis Facial
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start hover:bg-orange-50 border-orange-200"
                            >
                              <Video className="w-4 h-4 mr-2" />🎬 Sincronización Audio-Video
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-green-600" />💡 Consejos del Experto
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="text-sm space-y-2 text-gray-700">
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Revisa inconsistencias en iluminación
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Observa bordes borrosos o pixelados
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                Analiza sincronización audio-video
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                Busca artefactos de compresión
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                Verifica coherencia temporal
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                Examina micro-expresiones faciales
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      {wrongAnswers.length > 0 && (
                        <Card className="border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50">
                          <CardHeader>
                            <CardTitle className="text-yellow-800 flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5" />
                              ⚠️ Recomendaciones Especiales
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-yellow-700 text-sm font-medium">
                              Has cometido algunos errores en tu misión. Te recomiendo tomarte más tiempo para analizar
                              cada caso. Usa las herramientas de análisis y revisa las pistas antes de tomar una
                              decisión final.
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                )}

                {activeWindow === "analysis" && (
                  <div className="p-6">
                    {currentCase ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-blue-200">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              {currentCase.type === "image" ? (
                                <ImageIcon className="w-5 h-5 text-blue-600" />
                              ) : (
                                <Video className="w-5 h-5 text-purple-600" />
                              )}
                              🔍 {currentCase.title}
                            </CardTitle>
                            <CardDescription className="font-medium">{currentCase.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <img
                                src={currentCase.realImageUrl || currentCase.mediaUrl}
                                alt={currentCase.title}
                                className="w-full rounded-lg border-2 border-gray-300 shadow-lg"
                              />

                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="outline" className="font-semibold">
                                  📍 Fuente: {currentCase.source}
                                </Badge>
                                <Badge className={`${difficultyColors[currentCase.difficulty]} text-white font-bold`}>
                                  {currentCase.difficulty.toUpperCase()}
                                </Badge>
                                <Badge className="bg-purple-600 text-white font-bold">+{currentCase.xpReward} XP</Badge>
                              </div>

                              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                <h4 className="font-bold text-blue-800 mb-2">🧩 Complejidad del Caso:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {currentCase.complexity.map((comp, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {comp}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {wrongAnswers.includes(currentCase.id) && (
                                <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-lg animate-pulse">
                                  <p className="text-red-800 text-sm font-bold">
                                    ❌ Ya analizaste este caso incorrectamente. Revisa las pistas antes de intentar de
                                    nuevo.
                                  </p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Shield className="w-5 h-5 text-purple-600" />🎯 Laboratorio de Análisis
                            </CardTitle>
                            <CardDescription className="font-medium">
                              ¿Es este contenido auténtico o un deepfake?
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {!solvedCases.includes(currentCase.id) ? (
                                <div className="grid grid-cols-2 gap-4">
                                  <Button
                                    onClick={() => handleCaseDecision(currentCase.id, false)}
                                    className="h-24 flex flex-col gap-2 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
                                    disabled={wrongAnswers.includes(currentCase.id)}
                                  >
                                    <CheckCircle className="w-10 h-10" />
                                    <span>✅ AUTÉNTICO</span>
                                  </Button>
                                  <Button
                                    onClick={() => handleCaseDecision(currentCase.id, true)}
                                    className="h-24 flex flex-col gap-2 bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
                                    disabled={wrongAnswers.includes(currentCase.id)}
                                  >
                                    <XCircle className="w-10 h-10" />
                                    <span>❌ DEEPFAKE</span>
                                  </Button>
                                </div>
                              ) : (
                                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" />
                                  <p className="font-bold text-green-800 text-lg">🎉 ¡Misión Completada!</p>
                                  <p className="text-sm text-green-600 mt-1 font-medium">
                                    {currentCase.isDeepfake ? "Era un deepfake" : "Era contenido auténtico"}
                                  </p>
                                  <Badge className="mt-2 bg-green-600 text-white">
                                    +{currentCase.xpReward} XP Ganados
                                  </Badge>
                                </div>
                              )}

                              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <h4 className="font-bold mb-3 text-yellow-800 flex items-center gap-2">
                                  <Eye className="w-5 h-5" />🔍 Pistas de Análisis:
                                </h4>
                                <ul className="text-sm space-y-2 text-yellow-700">
                                  {currentCase.hints.map((hint, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                      <span className="font-medium">{hint}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {wrongAnswers.includes(currentCase.id) && (
                                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-lg">
                                  <p className="text-orange-800 text-sm font-bold">
                                    <strong>⚠️ Consecuencias del error:</strong>
                                    <br />• Penalización de -50 puntos
                                    <br />• Racha de aciertos perdida
                                    <br />• Caso bloqueado temporalmente
                                    <br />• Riesgo de relevación a 20 errores
                                  </p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-blue-200">
                        <CardContent className="text-center py-16">
                          <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-xl font-bold mb-2 text-gray-700">
                            🔍 Selecciona una misión para analizar
                          </h3>
                          <p className="text-gray-600 font-medium">
                            Ve al Centro de Redacción y haz clic en uno de los casos disponibles
                          </p>
                          <Button
                            onClick={() => setActiveWindow("desktop")}
                            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          >
                            🎯 Ir al Centro de Comando
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Elementos del escritorio físico */}
        <div className="fixed bottom-4 left-4 flex items-center gap-4 z-20">
          <Button
            onClick={() => (window.location.href = "/")}
            className="cursor-pointer bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/30 hover:scale-110 transition-transform"
          >
            <Coffee className="w-6 h-6 text-amber-600" />
          </Button>

          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/30 hover:scale-110 transition-transform"
          >
            <Headphones className="w-6 h-6 text-gray-600" />
          </Button>

          <Button className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/30 hover:scale-110 transition-transform">
            <FileText className="w-6 h-6 text-blue-600" />
          </Button>
        </div>
      </div>

      {/* Estilos CSS adicionales */}
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
