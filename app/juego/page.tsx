"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import Tour from "./TourContainer"
import Briefing from "./briefing/page"
import { prompts_p1, prompts_p2, prompts_p3, prompts_p4, prompts_p5, prompts_p6, prompts_p7, prompts_p8, prompts_p9, prompts_p10  } from "./prompts";
import { noticiasFalsas } from './NoticiasFalsas'


import { Oswald, Anton, Merriweather, Roboto } from 'next/font/google'

import { NoticiasReales } from './NoticiasReales';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '700'], // podés ajustar los pesos según necesites
})

const anton = Anton({
  subsets: ['latin'],
  weight: '400', // Anton solo tiene un peso disponible
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
})

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
  Ban,
  Scale,
  Monitor,
  Trophy,
  Star,
  Download,
  Award,
  Shield,
  Gamepad2,
  Sparkles,
  Flame
} from "lucide-react"

import { Search } from "lucide-react";

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
  status?: "pending" | "solved" | "wrong"
  clues: string[]
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
  requiereRespuesta?: boolean
  vencimiento?: number
  respondido?: boolean
  respuestaCorrecta?: boolean
  expirado?: boolean
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
 const imagenesUsadas = new Set<string>()
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
/*
const prompts = [
  {
    prompt: "Hombre astronauta caminando en la luna, planeta Tierra visible al fondo, traje espacial realista, nave de fondo",
    title: "Astronauta camina en la luna en una nueva misión encubierta que no fue anunciada por ninguna agencia oficial ni registrada en medios internacionales"
  },
  {
    prompt: "Explosión nuclear en el océano, nube en hongo, barcos cercanos, escena cinematográfica",
    title: "Argentina habría desarrollado en secreto una bomba atómica y la habría detonado en el mar; Chile solicita intervención de EE.UU. ante posible tsunami"
  },
  {
    prompt: "Reunión secreta entre militares, documentos clasificados sobre la mesa, sala oscura con mapas",
    title: "Altos mandos militares se reúnen en secreto para planificar maniobras encubiertas que podrían alterar el equilibrio político de la región"
  },
  {
    prompt: "Silo de misiles activo con luces encendidas, cielo nocturno estrellado, humo saliendo",
    title: "Se filtran imágenes de un silo activo en zona restringida: estarían cargando misiles sin autorización del organismo internacional de control"
  },
  {
    prompt: "Contenedor biológico en laboratorio, etiquetas de virus, fondo borroso, guantes quirúrgicos",
    title: "Laboratorio privado trabaja en una variante de virus potencialmente letal sin supervisión sanitaria ni permisos del Ministerio de Salud"
  },
  {
    prompt: "Grupo de drones sobrevolando ciudad al anochecer, luces encendidas, estilo cinematográfico",
    title: "Una flotilla de drones sobrevuela zonas residenciales en plena noche sin aviso previo, generando pánico y sospechas de espionaje ciudadano"
  },
  {
    prompt: "Reactor nuclear averiado con humo, personal evacuando, luz de emergencia",
    title: "Avería crítica en reactor nuclear obliga evacuación urgente; autoridades niegan el hecho y aseguran que fue un simulacro interno de rutina"
  },
  {
    prompt: "Pantalla de computadora con interfaz de hackeo, gráficos complejos, manos masculinas digitando",
    title: "Capturan en video una intrusión cibernética a servidores estatales: claves gubernamentales fueron vulneradas desde una fuente desconocida"
  },
  {
    prompt: "Tanques cruzando frontera nevada, bandera extranjera, plano aéreo",
    title: "Columna de tanques de origen extranjero cruza frontera sur sin autorización; gobiernos vecinos piden explicaciones inmediatas"
  },
  {
    prompt: "Satélite militar flotando sobre América del Sur, rayos de escaneo, espacio oscuro",
    title: "Satélite militar no identificado sobrevuela América del Sur activando sistemas de escaneo; expertos creen que recopila datos sin consentimiento"
  },
  {
    prompt: "Fábrica de armas automatizada, robots ensamblando piezas, luces industriales",
    title: "Filtran video de fábrica automatizada produciendo armas avanzadas sin licencia; se sospecha que abastece a grupos paramilitares regionales"
  },
  {
    prompt: "Avión militar sin identificación aterrizando de noche, luces apagadas, vista desde drone",
    title: "Un avión de carga militar sin identificación aterriza de noche en pista clandestina; vecinos reportan movimientos extraños en la zona"
  },
  {
    prompt: "Manifestantes frente a sede gubernamental, pancartas, fuego de fondo, tensión nocturna",
    title: "Multitudinaria protesta frente al Congreso tras filtración de archivos secretos que comprometen al Poder Ejecutivo y agencias de inteligencia"
  },
  {
    prompt: "Persona encapuchada hablando a cámara, fondo negro, iluminación dramática",
    title: "Encapuchado anónimo publica video donde amenaza con revelar documentos que podrían desestabilizar a todo el gabinete presidencial"
  },
  {
    prompt: "Contenedor marítimo abriéndose con materiales extraños, cámaras de seguridad desenfocadas",
    title: "Autoridades interceptan contenedor en puerto con materiales de origen desconocido; imágenes muestran luces, símbolos y estructuras inusuales"
  },
  {
    prompt: "Glaciar derritiéndose con rapidez, nivel del mar subiendo, timelapse extremo",
    title: "Timelapse revela aceleración alarmante del deshielo en el sur: científicos alertan sobre posible subida catastrófica del nivel del mar"
  },
  {
    prompt: "Camión blindado ingresando a instalación subterránea, vigilancia extrema",
    title: "Camión militar fuertemente custodiado accede a base subterránea secreta; se especula con transporte de prototipos de tecnología bélica"
  },
  {
    prompt: "Prueba de robot soldado caminando, luz fría, ambiente industrial",
    title: "Robot bípedo armado es visto en instalaciones militares bajo prueba; filtraciones sugieren que ya ha sido desplegado en zonas de conflicto"
  },
  {
    prompt: "Pantalla de radar detectando objeto no identificado, militares reaccionando",
    title: "Fuerza aérea detecta objeto no identificado que evade radares convencionales; se baraja posibilidad de dron hipersónico experimental"
  },
  {
    prompt: "Lanzamiento de cohete desde base desértica, cielo despejado, polvo en suspensión",
    title: "Cohete de carga pesada es lanzado desde base secreta; video despierta sospechas de violación de tratados internacionales de espacio"
  }
]*/

const prompts = [
  ...prompts_p1,
  ...prompts_p2,
  ...prompts_p3,
  ...prompts_p4,
  ...prompts_p5,
  ...prompts_p6,
  ...prompts_p7,
  ...prompts_p8,
  ...prompts_p9,
  ...prompts_p10
]

// Para llevar el orden de cosnultas de las distintas Apis
let ApiOrden = 0

const obtenerParametrosPorNivel = (nivel: number) => {
  // escalar calidad con nivel
  if (nivel <= 1) {
    return { width: 512, height: 512, steps: 30, cfg_scale: 6.5, sampler: "Euler", model: "Realistic_Vision_V5.1" }
  } else if (nivel <= 2) {
    return { width: 640, height: 640, steps: 35, cfg_scale: 7.5, sampler: "Euler", model: "Realistic_Vision_V5.1" }
  } else if (nivel <= 3) {
    return {
      width: 768,
      height: 768,
      steps: 35,
      cfg_scale: 8.5,
      sampler: "DPM++ 2M Karras",
      model: "Realistic_Vision_V5.1",
    }
  } else {
    return {
      width: 896,
      height: 896,
      steps: 40,
      cfg_scale: 9.5,
      sampler: "UniPC",
      model: "realvisxlV50_v50LightningBakedvae",
    }
  }
}

function playPenaltySound() {
  const audio = new Audio("/audio/penalidad.mp3")
  audio.volume = 1
  audio.play().catch((e) => console.warn("⚠️ No se pudo reproducir el sonido de penalización:", e))
}


async function generarImagen(prompt: string, nivel: number): Promise<string> {
  const qualityParams = obtenerParametrosPorNivel(nivel)
  console.log(`Generando imagen con prompt: ${prompt}, params: ${JSON.stringify(qualityParams)}`)
  const res = await fetch("/api/generar-imagen", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      ...qualityParams, // aquí se agregan steps, cfg_scale, resolution, modelo, etc.
    }),
  })

  const data = await res.json()
  return data.url
}


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
    clues: [],
    mediaUrl: "img/CR7 Herbalife.jpg",
    realImageUrl: "img/CR7 Herbalife.jpg",
    xpReward: 100,
    complexity: ["Iluminación básica", "Bordes simples"],
    level: 1,
  },
  {
    id: "case2",
    type: "image",
    title: "Trump acusado de ser un espía ruso",
    source: "Redes sociales",
    description:
      "Foto que circula en redes sociales donde se ve a Donald Trump siendo arrestado por varios agentes de policía. La imagen ha sido compartida como evidencia de una supuesta conspiración internacional.",
    isDeepfake: true,
    difficulty: "hard",
    hints: [
      "El movimiento de los labios no sincroniza perfectamente",
      "Micro-expresiones faciales inconsistentes",
      "Calidad de audio superior a la del video",
    ],
    clues: [],
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
    clues: [],
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
  "Novato",
  "Junior",
  "Experto",
  "Senior Anti-DeepFakes",
  "Elite en Verificación",
  "Maestro Verificador de Contenido Digital",
]

const bossMessages = [
  "Juan, necesito esos análisis YA! ⏰",
  "La competencia nos está pisando los talones 😤",
  "¿Cuánto tiempo más necesitas? El director está preguntando...",
  "URGENTE: Tenemos que publicar en 30 minutos!",
  "¿Ya verificaste las imágenes? No podemos permitirnos errores!",
  "Juan, responde por favor. Esto es crítico! 🚨",
  "Si no tenemos esto listo, perdemos la exclusiva",
  "¿Estás ahí? Necesito una actualización AHORA",
  "Tiempo límite: 15 minutos para el primer análisis",
  "Juan, esto puede definir tu carrera. ¡Concéntrate!",
  "¡JUAN! ¿Dónde están los resultados? 😡",
  "El director quiere verte en su oficina...",
  "Esto es inaceptable. Demasiados errores.",
]

const motivosErrorReales = [
  "Está publicada en varios medios reconocidos.",
  "Las imágenes coinciden con las difundidas en medios confiables.",
  "No presenta indicios visuales de manipulación digital para desinformar.",
  "El lenguaje es objetivo y sin sensacionalismo.",
  "Existen registros oficiales que avalan los hechos.",
  "Expertos reconocidos han validado la información.",
  "Datos abiertos respaldan los hechos narrados.",
  "Verificada por múltiples entidades independientes.",
  "No existen contradicciones en las fuentes oficiales."
]

function tomarMotivoErrorAleatorio(pool: string[], count: number): string[] {
  const shuffled = [...pool].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export default function DeepfakeNewsroom() {
  // aca tienen que ir todos los componentes que queremos resaltar
  const [timeLeft, setTimeLeft] = useState(300) // Timer de 5 minutos
  const [currentCase, setCurrentCase] = useState<MediaCase | null>(null)
  const [emails, setEmails] = useState<Email[]>([])
  const [whatsappMessages, setWhatsappMessages] = useState<WhatsAppMessage[]>([])
  const [selectedContact, setSelectedContact] = useState<string>("boss")
  const [mediaCases, setMediaCases] = useState<MediaCase[]>([])
  const [solvedCases, setSolvedCases] = useState<string[]>([])
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [penaltiesPorErrores, setPenaltiesPorErrores] = useState(0)
  const [penaltiesPorDemora, setPenaltiesPorDemora] = useState(0)
  const [aiResponse, setAiResponse] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [activeWindow, setActiveWindow] = useState<string>("desktop")
  const [bossMessageIndex, setBossMessageIndex] = useState(0)
  const [lastBossMessage, setLastBossMessage] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [gameOverReason, setGameOverReason] = useState("")
  const [loadingInicial, setLoadingInicial] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [mostrarIntro, setMostrarIntro] = useState(true);
  const [tourYaFinalizado, setTourYaFinalizado] = useState(false)
  const [mostrarBriefing, setMostrarBriefing] = useState(true);
  const [mostrarVideoGameOver, setMostrarVideoGameOver] = useState(true);
  const [mostrarVideoVictory, setMostrarVideoVictory] = useState(true);
  const [backgroundAudio, setBackgroundAudio] = useState<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [casosYaGenerados, setCasosYaGenerados] = useState(false)

function marcarMensajesComoLeidos(contactId: string) {
  setWhatsappMessages((prev) =>
    prev.map((msg) =>
      msg.from === contactId && !msg.isRead
        ? { ...msg, isRead: true }
        : msg
    )
  )
}


  const videoFinal =
    gameOverReason === "timeout"
      ? "/videos/gameover_timeout.mp4"
      : gameOverReason === "fired"
        ? "/videos/gameover_fired.mp4"
        : "/videos/gameover_timeout.mp4";

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

  // aca se utiliza la logica de los pasos del tour
  // tour steps
  const [mostrarTour, setMostrarTour] = useState(false)
  //Tiempo extra por nivel
  const calcularTiempoExtraPorNivel = (nivel: number): number => {
    return Math.max(5, 30 - (nivel - 1) * 2) // de 30s bajando de a 2s por nivel, mínimo 5s
  }

  // Funciones de sonido
  const playSuccessSound = () => {
    if (!soundEnabled) return
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  function playWhatsAppSound() {
    const audio = new Audio("/audio/whatsapp.mp3")
    audio.volume = 0.5 // opcional
    audio.play().catch((e) => console.warn("No se pudo reproducir sonido:", e))
  }

  const playErrorSound = () => {
    if (!soundEnabled) return
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(220, audioContext.currentTime) // A3
    oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.15) // G3
    oscillator.frequency.setValueAtTime(174.61, audioContext.currentTime + 0.3) // F3

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.6)
  }

  const playLevelUpSound = () => {
    if (!soundEnabled) return
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Secuencia ascendente para level up
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25] // C4, E4, G4, C5, E5
    notes.forEach((freq, index) => {
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1)
    })

    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.8)
  }

  const responderWhatsapp = (id: string, respuesta: boolean) => {
  setWhatsappMessages((prev) =>
    prev.map((m) =>
      m.id === id ? { ...m, respondido: true, respuestaCorrecta: respuesta } : m
    )
  )

  if (respuesta) {
    setScore((prev) => prev + 10)
  } else {
    setScore((prev) => prev - 5)
  }
}


  // Titular de ultimo momento dinamico

  const mensajes = [
    "🔴 ÚLTIMO MOMENTO: Detectado intento de manipulación en imagen compartida por redes sociales. — Recordá verificar la fuente antes de compartir.",
    "🔴 ALERTA: Aumentan los casos de imágenes falsas en campañas políticas. — Prestá atención al origen del contenido.",
    "🔴 IMPORTANTE: Herramientas de IA generan contenido cada vez más realista. — Informate antes de difundir.",
    "🔴 ANÁLISIS: Algunos medios están difundiendo noticias alteradas. — Consultá múltiples fuentes.",
    "🔴 DATO CLAVE: Las imágenes virales pueden estar editadas con inteligencia artificial. — No creas todo lo que ves."
  ];

  const [indiceMensaje, setIndiceMensaje] = useState(0);

  const enviarMensajeDelJefe = (
  texto: string,
  segundosParaResponder: number = 15,
  respuestaCorrecta: boolean = true
) => {
  
  const id = `whatsapp-${Date.now()}`
  const vencimiento = Date.now() + segundosParaResponder * 1000

  const nuevoMensaje: WhatsAppMessage = {
    id,
    from: "boss",
    fromName: "Roberto Martínez (Jefe)",
    content: texto,
    timestamp: new Date().toISOString(),
    isOwn: false,
    avatar: "RM",
    messageType: "urgent",
    isRead: false,
    requiereRespuesta: true,
    vencimiento,
    respondido: false,
    respuestaCorrecta,
    expirado: false
  }

  setWhatsappMessages((prev) => [...prev, nuevoMensaje])
  playWhatsAppSound()
}



useEffect(() => {
  const interval = setInterval(() => {
    const ahora = Date.now()

    setWhatsappMessages((prev) => {
      let penalizacionAplicada = false
      const actualizados = prev.map((msg) => {
        if (
          msg.requiereRespuesta &&
          !msg.respondido &&
          !msg.expirado &&
          msg.vencimiento &&
          msg.vencimiento < ahora
        ) {
          penalizacionAplicada = true
          return { ...msg, expirado: true }
        }
        return msg
      })

      // Si al menos una penalización fue aplicada, restamos puntos
      if (penalizacionAplicada) {
        setScore((prev) => prev - 100)
        setPenaltiesPorDemora((prev) => prev + 1)
        playPenaltySound()
      }

      return actualizados
    })
  }, 1000) // cada 1 segundo

  return () => clearInterval(interval)
}, [])


  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceMensaje((prev) => {
        let nuevo;
        do {
          nuevo = Math.floor(Math.random() * mensajes.length);
        } while (nuevo === prev); // evita repetir el mismo
        return nuevo;
      });
    }, 120000); // cada 2 minutos

    return () => clearInterval(intervalo);
  }, []);

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
        sources: ["Filtración interna", "Paparazzi", "Redes sociales", "Fuente confidencial", "Foto filtrada", "Vigilancia", "Testimonio anónimo", "Hackeo"],
        descriptions: [
          "Imagen comprometedora que podría cambiar la opinión pública",
          "Fotografía que contradice declaraciones oficiales",
          "Evidencia visual de actividades no reportadas",
          "Documento gráfico de eventos controvertidos",
        ],
      },
      {
        type: "image" as const,
        titles: [
          "Declaraciones no autorizadas",
          "Confesión en privado",
          "Negociación secreta",
          "Admisión de culpabilidad",
          "Conversación comprometedora",
        ],
        sources: ["Filtración interna", "Paparazzi", "Redes sociales", "Fuente confidencial", "Foto filtrada", "Vigilancia", "Testimonio anónimo", "Hackeo"],
        descriptions: [
          "Imagen que muestra comportamiento contradictorio",
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
      id: `case_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
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
      clues: [],
      mediaUrl: `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(template.titles[0])}`,
      realImageUrl: `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(template.titles[0])}`,
    }

    return newCase
  }

// CASOS ALEATORIOS
// Consulta las Apis de noticias, si alguna devuelte error se prueba con otra.
// Si todas devuelven error (nos comimos todas las request gratis) se devuelve vacio
const apiHandlers = [
  // Api NewsApi
  async (query: string, apiKey: string, page: number) => {
    console.log("Usando NewsApi");
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&language=es&pageSize=10&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    
    // Si dio error retonra vacio
    if (data.status !== "ok" || !Array.isArray(data.articles)) {
      console.warn(`⚠️ NewsAPI devolvió advertencia: ${data.message || "estructura inválida"}`);
      return [];
    }
    // Si esta todo bien retorna la noticia
    return data.articles.map((a: any) => ({
      image: a.urlToImage,
      title: a.title,
      description: a.description
    }));
  },

  async (query: string, apiKey: string) => {
    // Api GNews
    console.log("Usando Gnews");
    const url = `https://gnews.io/api/v4/search?q=${query}&lang=es&token=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    // Si dio error retonra vacio
    if (!Array.isArray(data.articles)) {
      console.warn(`⚠️ GNews devolvió advertencia: ${data.message || "estructura inválida"}`);
      return [];
    }

    // Si esta todo bien retorna la noticia
    return data.articles.map((a: any) => ({
      image: a.image,
      title: a.title,
      description: a.description
    }));
  },

  async (query: string, apiKey: string) => {
    // Api NewsData
    console.log("Usando NewsData");
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=es&q=${query}`;
    const res = await fetch(url);
    const data = await res.json();

    // Si dio error retonra vacio
    if (!Array.isArray(data.results)) {
      console.warn(`⚠️ NewsData devolvió advertencia: ${data.message || "estructura inválida"}`);
      return [];
    }
    // Si esta todo bien retorna la noticia
    return data.results.map((a: any) => ({
      image: a.image_url,
      title: a.title,
      description: a.description
    }));
  }
];

  const ApisNoticiasKeys = [
    "2c97d461a1824274bae74e31a41df742", // NewsAPI
    "e32ee9c040ba92805d15d7379f3aceec", // GNews
    "pub_73960f1b56a349cb89fb0484090abcb9" // NewsData
  ]

// CASOS INICIALES
// Utiliza la funcion apiHandlers para traer las noticias.
// Si todas devuelven error (nos comimos todas las request gratis) se usa el Json con noticias estaticas
  const obtenerNoticiaDesdeApis = async (queries: string[]) => {
    const query = queries[Math.floor(Math.random() * queries.length)]
    const page = Math.floor(Math.random() * 5) + 1

    for (let intento = 0; intento < apiHandlers.length; intento++) {
      const i = (ApiOrden + intento) % apiHandlers.length
      try {
        const noticias = await apiHandlers[i](query, ApisNoticiasKeys[i], page)
        const validas = noticias.filter(n =>
          n.image && n.image.startsWith("http") && (n.title || n.description))

        if (validas.length > 0) {
          ApiOrden = (i + 1) % apiHandlers.length // avanzamos al próximo para la próxima llamada
          return validas[Math.floor(Math.random() * validas.length)]
        }
      } catch (error) {
        console.error(`❌ Error en API handler ${i}:`, error)
      }
    }

    // Si todas las APIs fallaron
    console.warn("⚠️ Todas las APIs fallaron. Usando noticia local.");

    // Filtrá las que no se usaron todavia
    const disponibles = NoticiasReales.filter(n =>
      n.image &&
      n.image.startsWith("http") &&
      !imagenesUsadas.has(n.image)
    );

    if (disponibles.length === 0) {
      console.warn("⚠️ No quedan noticias locales sin repetir. Usando cualquiera.");
      return NoticiasReales[Math.floor(Math.random() * NoticiasReales.length)];
    }

    // Toma una noticia que no se haya usado
    const seleccionada = disponibles[Math.floor(Math.random() * disponibles.length)];
    imagenesUsadas.add(seleccionada.image); // Agrega a la lista de usadas
    return seleccionada;
  }

  const agregarCasosAleatorios = async (nivel: number) => {
    const nuevosCasos: MediaCase[] = []
    const queries = [
        "argentina", "milei", "guerra", "ucrania", "rusia", "nasa", "elon musk", "luna", "inteligencia artificial",
        "bitcoin", "inflación", "crisis energética", "cambio climático", "siria", "iran", "eeuu", "israel", "hamas",
        "tecnología", "5g", "ciberseguridad", "hackeo", "fake news", "trump", "biden", "macron", "china", "taiwán",
        "brics", "corea del norte", "otan", "crimen organizado", "trata de personas", "nuclear", "energía solar",
        "inteligencia militar", "deepfake", "vacunas", "pandemia", "covid", "amazonas", "incendios forestales",
        "terremoto", "huracán", "desinformación", "redes sociales", "censura digital", "corte suprema", "europa",
        "sistema financiero"
        ]
    
    // Posiciones 
    //  0 -NewsAPI   1 -GNews    2 -NewsData.io 
    const ApisNoticiasKeys = [ ["2c97d461a1824274bae74e31a41df742"],["e32ee9c040ba92805d15d7379f3aceec"],["pub_73960f1b56a349cb89fb0484090abcb9"] ]
    let url = ``
        
   if (ApiOrden > 2) {ApiOrden= 0 }     
    for (let i = 0; i < 2; i++) {
      const usarIA = Math.random() > 0.5

      const newCase = generateNewCase(nivel)

      if (usarIA) {
          const { prompt, title, description, clues } = prompts[Math.floor(Math.random() * prompts.length)]
          let imageUrl = null;

          try {
            imageUrl = await generarImagen(prompt, nivel)
          } catch (err) {
            console.error("Error generando imagen con la API de imagenes IA:", err)
          }

          if (imageUrl) {
            newCase.isDeepfake = true
            newCase.mediaUrl = imageUrl ?? newCase.mediaUrl
            newCase.realImageUrl = imageUrl ?? newCase.realImageUrl
            newCase.title = title
            newCase.description = ` "${description}"`
            newCase.clues = clues
          }
          else {
            console.log("Usando caso local de deepfake.")
            const index = Math.floor(Math.random() * noticiasFalsas.length)
            const [localCase] = noticiasFalsas.splice(index, 1)

            newCase.isDeepfake = true
            newCase.mediaUrl = localCase.urlImg
            newCase.realImageUrl = localCase.urlImg
            newCase.title = localCase.title
            newCase.description = localCase.description
            newCase.clues = localCase.clues
          }
          enviarMensajeDelJefe(`Hola Juan  ¿Revisaste el nuevo caso? con titulo: ${title}`, 30)
      } else {

        console.log("Api orden: " + ApiOrden)
        const apiKey = ApisNoticiasKeys[ApiOrden][0];
        const query = queries[Math.floor(Math.random() * queries.length)];
        const page = Math.floor(Math.random() * 5) + 1;

        let success = false;
        let intentos = 0;
        let ordenInicial = ApiOrden;

        while (intentos < apiHandlers.length && !success) {
          const apiIndex = (ordenInicial + intentos) % apiHandlers.length;
          const apiKey = ApisNoticiasKeys[apiIndex][0];

          try {
            const results = await apiHandlers[apiIndex](query, apiKey, page);
            const validArticles = results.filter((a: any) =>
              a.image &&
              a.image.startsWith("http") &&
              !a.image.includes("default") &&
              !a.image.includes("logo") &&
              a.description &&
              !imagenesUsadas.has(a.image)
            );

            if (validArticles.length === 0) throw new Error("Sin artículos válidos");

            const selected = validArticles[Math.floor(Math.random() * validArticles.length)];
            imagenesUsadas.add(selected.image);

            newCase.isDeepfake = false;
            newCase.mediaUrl = selected.image;
            newCase.realImageUrl = selected.image;
            newCase.title = selected.description || selected.title || "Caso de noticia";
            newCase.description = selected.title || "Noticia generada automáticamente";
            newCase.clues = tomarMotivoErrorAleatorio(motivosErrorReales, 2)

            success = true;
            ApiOrden = (apiIndex + 1) % apiHandlers.length; // Avanza a la siguiente API
          } catch (err) {
            console.warn(`API ${apiIndex} falló:`, err);
            intentos++;
          }
        }

        // Si ninguna API sirvió (apiHandlers devolvio vacio) se usan los  datos de noticiasReales.js
        if (!success) {
          console.log("Obteniendo casos de JSON de auxilio");

          const disponibles = NoticiasReales.filter(n =>
            n.image &&
            n.image.startsWith("http") &&
            !imagenesUsadas.has(n.image)
          );

          let noticia;

          if (disponibles.length === 0) {
            console.warn("⚠️ No quedan noticias locales sin repetir. Usando cualquiera.");
            noticia = NoticiasReales[Math.floor(Math.random() * NoticiasReales.length)];
          } else {
            noticia = disponibles[Math.floor(Math.random() * disponibles.length)];
            imagenesUsadas.add(noticia.image); // Agrega a la lista de usadas
          }

          newCase.isDeepfake = false;
          newCase.mediaUrl = noticia.image;
          newCase.realImageUrl = noticia.image;
          newCase.title = noticia.description || noticia.title || "Caso local";
          newCase.description = noticia.title || "Noticia cargada localmente";
          newCase.clues = tomarMotivoErrorAleatorio(motivosErrorReales, 2)
          ApiOrden = (ordenInicial + 1) % apiHandlers.length;
        }

      }

      nuevosCasos.push(newCase)
    }

    setMediaCases((prev) => [...prev, ...nuevosCasos])
    setCaseCounter((prev) => prev + nuevosCasos.length)
  }

  type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'master';

  const generateHints = (difficulty: Difficulty, isDeepfake: boolean): string[] => {
    const deepfakeHints: Record<Difficulty, string[]> = {
      easy: [
        "Observa inconsistencias en la iluminación",
        "Revisa los rostros si los hay",
        "Busca tipografia extraña",
      ],
      medium: ["Busca artefactos de IA generativa", "Analiza patrones de píxeles anómalos", "Revisa metadatos de creación"],
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
    };

    const authenticHints: Record<Difficulty, string[]> = {
      easy: ["La iluminación es consistente", "No hay artefactos digitales", "Metadatos coherentes"],
      medium: ["Sincronización natural", "Expresiones auténticas", "Calidad uniforme"],
      hard: ["Patrones de compresión naturales", "Coherencia biométrica", "Ausencia de manipulación"],
      expert: ["Firma digital auténtica", "Análisis espectral limpio", "Coherencia forense completa"],
      master: ["Verificación criptográfica", "Análisis de blockchain", "Certificación de origen"],
    };

    return isDeepfake
      ? deepfakeHints[difficulty]
      : authenticHints[difficulty];
  };

  // Generar certificado PDF
  const generateCertificate = () => {
    const certificateData = {
      name: "Juan Rodríguez",
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

  useEffect(() => {
  if (score <= -300 && gameStarted && !isGameOver) {
    setIsGameOver(true)
    setGameOverReason("Tu puntaje cayó por debajo del mínimo permitido")
  }
}, [score, gameStarted, isGameOver])


  useEffect(() => {
  if (score <= -300 && gameStarted && !isGameOver) {
    setIsGameOver(true)
    setGameOverReason("Tu puntaje cayó por debajo del mínimo permitido")
  }
  }, [score, gameStarted, isGameOver])
  // Inicializar mensajes de WhatsApp
  useEffect(() => {
    const initialMessages: WhatsAppMessage[] = [
      {
        id: "wa1",
        from: "boss",
        fromName: "Roberto Martínez (Jefe)",
        content:
          "¡Bienvenido al Panel de Análisis, Juan Tienes varios casos urgentes que analizar hoy. ¡Que comience la Evaluación!",
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
        content: "Tengo algo que te va a interesar... Nivel de amenaza: ALTO 👀",
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
        content: "¿Cómo vas con los análisis? Si necesitas backup, avísame. ¡Somos un equipo!",
        timestamp: "10:50",
        isOwn: false,
        avatar: "MG",
        messageType: "text",
        isRead: false,
      },
    ]
    setWhatsappMessages(initialMessages)
  }, [])

  useEffect(() => {
    const generarCasosIniciales = async () => {
      const newLevel = 1

      const queries = [
      "argentina", "milei", "guerra", "ucrania", "rusia", "nasa", "elon musk", "luna", "inteligencia artificial",
      "bitcoin", "inflación", "crisis energética", "cambio climático", "siria", "iran", "eeuu", "israel", "hamas",
      "tecnología", "5g", "ciberseguridad", "hackeo", "fake news", "trump", "biden", "macron", "china", "taiwán",
      "brics", "corea del norte", "otan", "crimen organizado", "trata de personas", "nuclear", "energía solar",
      "inteligencia militar", "deepfake", "vacunas", "pandemia", "covid", "amazonas", "incendios forestales",
      "terremoto", "huracán", "desinformación", "redes sociales", "censura digital", "corte suprema", "europa",
      "sistema financiero"
      ]

      for (let i = 0; i < 3; i++) {
        const { prompt, title, description, clues } = prompts[Math.floor(Math.random() * prompts.length)]
        
        let imageUrl = null;

        try {
          imageUrl = await generarImagen(prompt, newLevel)
        } catch (err) {
          console.error("Error generando imagen con la API del modelo de IA:", err)
        }

        let newCase = generateNewCase(newLevel)

        if (imageUrl) {
          newCase.isDeepfake = true
          newCase.realImageUrl = imageUrl ?? newCase.realImageUrl
          newCase.mediaUrl = imageUrl ?? newCase.mediaUrl
          newCase.title = title
          newCase.description = `"${description}"`
          newCase.clues = clues
        }
        else {
          console.log("Usando caso local de deepfake.")
          // Si no se pudo generar la imagen, usar un caso local de deepfake
          const index = Math.floor(Math.random() * noticiasFalsas.length)
          const [localCase] = noticiasFalsas.splice(index, 1)

          newCase.isDeepfake = true
          newCase.mediaUrl = localCase.urlImg
          newCase.realImageUrl = localCase.urlImg
          newCase.title = localCase.title
          newCase.description = localCase.description
          newCase.clues = localCase.clues
        }

        setMediaCases((prev) => [...prev, newCase])
        setCaseCounter((prev) => prev + 1)
      }

      for (let i = 0; i < 3; i++) {
        const articulo = await obtenerNoticiaDesdeApis(queries)

        const newCase = generateNewCase(newLevel)
        newCase.isDeepfake = false
        newCase.realImageUrl = articulo.image
        newCase.mediaUrl = articulo.image
        newCase.title = articulo.title || "Noticia sin título"
        newCase.description = articulo.description || "Generada automáticamente"
        newCase.clues = tomarMotivoErrorAleatorio(motivosErrorReales, 2)

        setMediaCases((prev) => [...prev, newCase])
        setCaseCounter((prev) => prev + 1)

      }

      setNotifications((prev) => [...prev, "Casos generados desde IA y noticias reales"])
      setTimeout(() => setNotifications((prev) => prev.slice(1)), 5000)
      setLoadingInicial(false)
      setMostrarTour(true)
    }

    if (loadingInicial && !mostrarIntro && !casosYaGenerados) {
      generarCasosIniciales()
      setCasosYaGenerados(true)
    }
  }, [loadingInicial, mostrarIntro, casosYaGenerados])

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
    if (penaltiesPorErrores >= 2 && !isGameOver) {
      setIsGameOver(true)
      setGameOverReason("fired")
      showBoss("furious", "¡MISIÓN FALLIDA! Has sido eliminado de la prueba.", 8000)
    }
  }, [penaltiesPorErrores, isGameOver])

  // Temporizador - solo inicia cuando gameStarted es true
  useEffect(() => {
    if (isGameOver || !gameStarted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          if (!isGameOver) {
            setIsGameOver(true)
            setGameOverReason("timeout")
            showBoss("angry", "¡Tiempo agotado! La evaluación ha terminado.", 6000)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isGameOver, gameStarted])

  // Generar nuevos casos cuando se resuelven
  useEffect(() => {
  if (solvedCases.length > 0 && solvedCases.length % 3 === 0) {
    const newLevel = Math.floor(solvedCases.length / 3) + 1

    agregarCasosAleatorios(newLevel)

    // Notificación de nuevo caso
    setNotifications((prev) => [...prev, `🆕 ¡3 nuevos casos desbloqueados! Nivel ${newLevel}`])
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1))
    }, 5000)
  }
}, [solvedCases.length])


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  const handleCaseDecision = async (caseId: string, userDecision: boolean) => {
    if (isGameOver) return

    const case_ = mediaCases.find((c) => c.id === caseId)
    if (!case_) return

    const isCorrect = userDecision === case_.isDeepfake

    setMediaCases((prev) => prev.map((c) => (c.id === caseId ? { ...c, status: isCorrect ? "solved" : "wrong" } : c)))

    if (isCorrect) {
      // Reproducir sonido de éxito
      playSuccessSound()

      setSolvedCases((prev) => [...prev, caseId])
      setScore((prev) => prev + case_.xpReward)

      // Tiempo extra por nivel
      const newLevel = Math.floor((solvedCases.length + 1) / 3) + 1
      const tiempoExtra = calcularTiempoExtraPorNivel(newLevel)
      setTimeLeft((prev) => prev + tiempoExtra)

      // Actualizar estadísticas del jugador
      setPlayerStats((prev) => {
        const newXp = prev.xp + case_.xpReward
        const newStreak = prev.streak + 1
        const newPlayerLevel = Math.floor(newXp / 500) + 1
        const newRank = rankTitles[Math.min(newPlayerLevel - 1, rankTitles.length - 1)]

        // Verificar si subió de nivel
        const leveledUp = newPlayerLevel > prev.level
        if (leveledUp) {
          playLevelUpSound()
          setNotifications((prevNotifs) => [...prevNotifs, `¡NIVEL ${newPlayerLevel}! Nuevo rango: ${newRank}`])
          setTimeout(() => setNotifications((prev) => prev.slice(1)), 8000)
          showBoss("normal", `¡Felicidades! Has alcanzado el nivel ${newPlayerLevel}: ${newRank}`, 5000)
          enviarMensajeDelJefe(`Nivel ${newPlayerLevel} habilitado. ¿Revisaste los nuevos casos?`, 30)

        }

        return {
          ...prev,
          xp: newXp,
          streak: newStreak,
          maxStreak: Math.max(prev.maxStreak, newStreak),
          level: newPlayerLevel,
          rank: newRank,
          accuracy: Math.round(((solvedCases.length + 1) / (solvedCases.length + wrongAnswers.length + 1)) * 100),
        }
      })

      showBoss("normal", `¡Correcto! +${case_.xpReward} XP. Tiempo extra: +${tiempoExtra}s`, 3000)
      await agregarCasosAleatorios(newLevel)
    } else {
      // Reproducir sonido de error
      playErrorSound()

      setWrongAnswers((prev) => [...prev, caseId])
      setPenaltiesPorErrores((prev) => prev + 1)
      setScore((prev) => Math.max(0, prev - 50))

      // Resetear racha
      setPlayerStats((prev) => ({
        ...prev,
        streak: 0,
        accuracy: Math.round((solvedCases.length / (solvedCases.length + wrongAnswers.length + 1)) * 100),
      }))

      showBoss("angry", "Incorrecto. Penalización aplicada.", 3000)
    }

    setAiResponse(
      isCorrect
        ? `¡CORRECTO! ${case_.isDeepfake ? "Era un deepfake" : "Era auténtico"}. +${case_.xpReward} XP`
        : `INCORRECTO. ${case_.isDeepfake ? "Era un deepfake" : "Era auténtico"}. -50 puntos.`,
    )
  }

  const openCase = (caseId: string) => {
    const case_ = mediaCases.find((c) => c.id === caseId)
    if (case_) {
      setCurrentCase(case_)
      setActiveWindow("analysis")
    }
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
    setTimeLeft(300) // Timer de 5 minutos
    setGameStarted(false)
    setCurrentCase(null)
    setMediaCases([]) // eliminiar casos que hayan quedado en el panel
    setSolvedCases([])
    setWrongAnswers([])
    setScore(0)
    setPenaltiesPorErrores(0)
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
    setPlayerStats({
      level: 1,
      xp: 0,
      xpToNext: 500,
      rank: rankTitles[0],
      accuracy: 100,
      streak: 0,
      maxStreak: 0,
    })
    setMostrarVideoVictory(true) // tengo que mostrar el video de victoria
    setMostrarVideoGameOver(true) // tengo que mostrar los video de game over
    setMostrarTour(true) // Mostrar tour nuevamente
    setWhatsappMessages([]) // tengo que reiniciar los mensajes de WhatsApp
    setCasosYaGenerados(false) // Reiniciar el estado de generación de casos
    setLoadingInicial(true) // Reiniciar el estado de carga inicial
  }

  const startGame = () => {
    setGameStarted(true)
    setNotifications((prev) => [...prev, "¡Misión iniciada! El tiempo corre..."])
    setTimeout(() => setNotifications((prev) => prev.slice(1)), 5000)
    showBoss("normal", "¡La evaluación ha comenzado! Analiza los casos con cuidado.", 4000)
  }
  
  const iniciarAudio = () => {
  if (backgroundAudio) return // evitar múltiples instancias

  const audio = new Audio("/audio/true-detective.mp3")
  audio.loop = true
  audio.volume = 0.3
  audio.play().catch(err => {
    console.warn("🎵 El navegador bloqueó el audio automático:", err)
  })
  setBackgroundAudio(audio)
}

  if (mostrarIntro) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="relative w-full max-w-7xl mx-auto px-4">
          <video
            src="/videos/intro.mp4"
            autoPlay
            controls
            playsInline
            onEnded={() => {
              setMostrarIntro(false)
              setMostrarBriefing(true)
              iniciarAudio()
            }}

            className="w-full rounded-lg shadow-xl"
          />
          <button
            onClick={() => {
              setMostrarIntro(false)
              setMostrarBriefing(true)
              iniciarAudio() // Iniciar audio al omitir introducción
            }}
            className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-md font-bold hover:bg-gray-200 z-50"
          >
            Omitir introducción
          </button>
        </div>
      </div>
    );
  }

  if (mostrarBriefing) {
    return (
      <Briefing
        onStart={() => {
          setMostrarBriefing(false);
          setMostrarTour(true); // inicia el juego o el tour
        }}
      />
    );
  }

  

  if (loadingInicial && !mostrarIntro) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-2xl">
        Aguarde un momento ... Estamos preparando los casos para tu evaluación.
      </div>
    );
  }

  if (showVictory) {

    if (mostrarVideoVictory) {
      return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="relative w-full max-w-5xl">
            <video
              src="/videos/victory.mp4"
              autoPlay
              controls
              playsInline
              onEnded={() => setMostrarVideoVictory(false)}
              className="w-full rounded-lg shadow-xl"
            />
            <button
              onClick={() => setMostrarVideoVictory(false)}
              className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-md font-bold hover:bg-gray-200 z-50"
            >
              Omitir video
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FF1493)",
          backgroundSize: "400% 400%",
          animation: "gradient 3s ease infinite",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <Card className="max-w-2xl w-full relative z-10 border-yellow-500 shadow-2xl bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardHeader className="text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
            <div className="mx-auto mb-4">
              <Trophy className="w-20 h-20 animate-bounce" />
            </div>
            <CardTitle className="text-4xl font-bold">¡MISIÓN COMPLETADA!</CardTitle>
            <CardDescription className="text-lg text-yellow-100">
              ¡Felicidades! Has demostrado ser un verdadero Periodista anti Deepfakes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
                <span className="text-2xl font-bold">{playerStats.rank}</span>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500">
                Nivel {playerStats.level} Alcanzado
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-green-700">Precisión Final</p>
                <p className="text-3xl font-bold text-green-800">{playerStats.accuracy}%</p>
              </div>
              <div className="text-center p-4 bg-blue-100 rounded-lg">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-blue-700">Casos Resueltos</p>
                <p className="text-3xl font-bold text-blue-800">{solvedCases.length}</p>
              </div>
              <div className="text-center p-4 bg-purple-100 rounded-lg">
                <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-purple-700">Puntuación Final</p>
                <p className="text-3xl font-bold text-purple-800">{score}</p>
              </div>
              <div className="text-center p-4 bg-yellow-100 rounded-lg">
                <Sparkles className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-yellow-700">XP Total</p>
                <p className="text-3xl font-bold text-yellow-800">{playerStats.xp}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Logros Desbloqueados:
              </h3>
              <ul className="text-blue-700 space-y-2">
                <li>🏆 Maestro Anti Deepfake - Completar 10+ casos</li>
                <li>🎯 Precisión Elite - Mantener 90%+ de precisión</li>
                <li>⚡ Racha Legendaria - {playerStats.maxStreak} casos consecutivos</li>
                <li>🛡️ Defensor de la Verdad - Proteger la información veraz</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={generateCertificate}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Descargar Certificado
              </Button>
              <Button onClick={restartGame} variant="outline" size="lg">
                Jugar de Nuevo
              </Button>
            </div>
          </CardContent>
        </Card>

        <style jsx>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    )
  }

  if (isGameOver && gameOverReason !== "victory") {
    
    if (mostrarVideoGameOver) {
        return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="relative w-full max-w-5xl">
            <video
              src={videoFinal}
              autoPlay
              controls
              playsInline
              onEnded={() => setMostrarVideoGameOver(false)}
              className="w-full rounded-lg shadow-xl"
            />
            <button
              onClick={() => setMostrarVideoGameOver(false)}
              className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-md font-bold hover:bg-gray-200 z-50"
            >
              Omitir video
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{ backgroundColor: "#112433" }} // Azul oscuro
      >
        <Card className="max-w-2xl w-full relative z-10 border-red-500 shadow-2xl">
          <CardHeader className="text-center bg-red-700 text-white rounded-t-lg">
            <div className="mx-auto mb-4">
              {gameOverReason === "fired" ? (
                <Ban className="w-16 h-16" />
              ) : (
                <Clock className="w-16 h-16" />
              )}
            </div>
            <CardTitle className={`text-3xl ${merriweather.className}`}>
              {gameOverReason === "fired" ? "MISIÓN FALLIDA" : "TIEMPO AGOTADO"}
            </CardTitle>
            <CardDescription className="text-lg text-red-100">
              {gameOverReason === "fired"
                ? "Has sido eliminado de la prueba por múltiples errores críticos"
                : "Se acabó el tiempo para completar la evaluación"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-bold text-red-800 mb-2">Consecuencias:</h3>
              <ul className="text-red-700 space-y-1">
                {gameOverReason === "fired" ? (
                  <>
                    <li>• Evaluación terminada</li>
                    <li>• Acceso denegado al sistema</li>
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
                <p className="text-xl text-gray-600-bold">Casos Resueltos</p>
                <p className="text-3xl font-bold text-green-600">{solvedCases.length}</p>
              </div>
              <div>
                <p className="text-xl text-gray-600-bold">Errores Cometidos</p>
                <p className="text-3xl font-bold text-red-600">{wrongAnswers.length}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl text-gray-600-bold mb-2">Puntuación Final</p>
              <p className="text-3xl font-bold">{score} XP</p>
              <p className="text-md text-gray-500-bold">
                Nivel {playerStats.level} - {playerStats.rank}
              </p>
            </div>

            <Button onClick={restartGame} className="w-full bg-red-700" size="lg">
              Reintentar Misión
            </Button>
          </CardContent>
        </Card>
      </div>
    );


  }

  return (
    <div id="tour-blur-wrapper" style={{ position: "relative" }}>
      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay para efectos */}
        <div className="absolute inset-0 bg-black/10"></div>

        {mostrarBriefing && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60">
            <Briefing
              onStart={() => {
                setMostrarBriefing(false)
                setMostrarTour(true) // o startGame() si así comienza tu juego
              }}
            />
          </div>
        )}

        {/* Aparición del jefe */}
        {bossAppearance.isVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md mx-4 border-4 border-blue-500 animate-pulse">
              <div className="text-center">
                <img
                  src={
                    bossAppearance.mood === "furious" || bossAppearance.mood === "angry"
                      ? "/personajes/Roberto-perfil-enojado.png"
                      : "/personajes/Roberto-perfil-feliz.png"
                  }
                  alt="Jefe"
                  className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-gray-300"
                />
                <h2 className="text-xl font-bold mb-2 text-gray-800">Lic. Roberto Martínez</h2>
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
        {/* 🎧 Botón de Mute */}
{backgroundAudio && (
  <button
    onClick={() => {
      if (!backgroundAudio) return
      backgroundAudio.muted = !isMuted
      setIsMuted(!isMuted)
    }}
    style={{
      position: "fixed",
      top: "80px",
      right: "20px",
      zIndex: 9999, 
      backgroundColor: "#000",
      color: "#fff",
      padding: "10px 16px",
      border: "2px solid #555",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 0 6px rgba(0,0,0,0.5)"
    }}
  >
    {isMuted ? "🔇 Activado" : "🔊 Sonando"}
  </button>
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
                  {/*
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  */}
                  {/*<div className="w-5 h-5 text-blue-400 ml-2" />*/}

                    {/* Foto de perfil */}
                    <img
                      src="personajes/juan-perfil.png"
                      alt="Foto de perfil"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white"
                    />  
                    <span className={`text-white text-sm font-bold ${oswald.className}`}>Periodista - Juan Rodriguez</span>
                  </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-2 bg-blue-500 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4" />
                    <span className={`text-sm font-bold ${roboto.className}`}>Nivel {playerStats.level}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-800 px-3 py-1 rounded-full">
                    <Zap className="w-4 h-4" />
                    <span className={`text-sm font-bold ${roboto.className}`}>{playerStats.xp} XP</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${gameStarted ? "bg-red-600" : "bg-gray-600"}`}
                    id="timer-del-juego"
                  >
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-mono font-bold">
                      {gameStarted ? formatTime(timeLeft) : "ESPERANDO..."}
                    </span>
                  </div>
                </div>
              </div>

              {/* ----------------------------------------------------------------------------------------------------------------------------------------------
//                                      PANTALLA PRINCIPAL
// ----------------------------------------------------------------------------------------------------------------------------------------------*/}
              {/* Pantalla principal */}
              <div className="bg-gradient-to-br from-grey-800 to-grey-900 min-h-[600px] p-4">
                {/* Barra de tareas */}
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 mb-4 flex items-center justify-between border border-white/20">
                  <div className="flex items-center gap-2">                   
                    <Button
                      variant={activeWindow === "desktop" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveWindow("desktop")}
                      className={`${roboto.className} ${
                        activeWindow === "desktop"
                          ? "bg-[#6fcafa] text-[#111827] hover:bg-[#5bc0f5]"
                          : "text-white"
                      }`}
                      id="btn-centro-de-comando"
                    >
                      <Monitor className="w-4 h-4 mr-1" />
                      Panel de análisis
                    </Button>
                    <Button
                      variant={activeWindow === "whatsapp" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveWindow("whatsapp")}
                      className={`${roboto.className} ${
                        activeWindow === "whatsapp"
                          ? "bg-[#6fcafa] text-[#111827] hover:bg-[#5bc0f5]"
                          : "text-white"
                      }`} 
                      id="btn-whatsapp"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />Whatsapp
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
                      className={`${roboto.className} ${
                        activeWindow === "ai"
                          ? "bg-[#6fcafa] text-[#111827] hover:bg-[#5bc0f5]"
                          : "text-white"
                      }`}
                      id="btn-ia-asistente"
                    >
                      <Bot className="w-4 h-4 mr-1" />IA Asistente
                    </Button>
                    <Button
                      variant={activeWindow === "analysis" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveWindow("analysis")}
                      className={`${roboto.className} ${
                        activeWindow === "analysis"
                          ? "bg-[#6fcafa] text-[#111827] hover:bg-[#5bc0f5]"
                          : "text-white"
                      }`}                    >
                      <Search className="w-4 h-4 mr-1" />Laboratorio
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-2 bg-green-600 px-3 py-1 rounded-full">
                      <Trophy className="w-4 h-4" />
                      <span className={`text-sm font-bold ${roboto.className}`}>{score} Puntos</span>
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-600 px-3 py-1 rounded-full">
                      <Flame className="w-4 h-4" />
                      <span className={`text-sm font-bold ${roboto.className}`}>Racha: {playerStats.streak}</span>
                    </div>
                    {penaltiesPorErrores > 0 && (
                      <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full animate-pulse">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm font-bold">Errores: {penaltiesPorErrores}/2</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contenido de las ventanas */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl min-h-[500px] border border-white/30">
                  {activeWindow === "desktop" && (
                    <div className="p-6" id="centro-de-comando">

                      {/* Zócalo estilo noticiero */}
                        <div className="w-full bg-red-700 overflow-hidden py-1 rounded-md mb-4">
                          <div className="inline-block whitespace-nowrap animate-marquee text-white text-sm font-bold tracking-wide px-4">
                            {mensajes[indiceMensaje]}
                          </div>
                        </div>

                      <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-4xl font-bold bg-gradient-to-r from-[#111827] to-blue-800 bg-clip-text text-transparent flex items-center gap-3 ${anton.className}`}>
                          Panel de análisis
                        </h2>
                        <div className="flex items-center gap-4">
                          <Badge className={`text-lg px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-600 ${merriweather.className}`}>
                            {playerStats.rank}
                          </Badge>
                          <div className="text-right">
                            <p className={`text-sm text-blue-600 ${roboto.className}`}>Progreso al siguiente nivel</p>
                            <Progress value={(playerStats.xp % 500) / 5} className="w-32" />
                            <p className={`text-md text-blue-600 ${roboto.className}`}>{playerStats.xp % 500}/500 XP</p>
                          </div>
                        </div>
                      </div>

                      {/* Alerta de peligro */}
                      {penaltiesPorErrores >= 1 && penaltiesPorErrores < 2 && (
                        <Card className="mb-6 border-red-500 bg-gradient-to-r from-red-50 to-orange-50 animate-pulse">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 text-red-800">
                              <AlertTriangle className="w-6 h-6" />
                              <span className="font-bold text-lg">
                                ALERTA CRÍTICA: Estás cerca de ser desaprobado. Errores: {penaltiesPorErrores}/2
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Estadísticas del jugador */}
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg transition-all">
                          <CardContent className="p-2">
                            <div className="flex items-center">
                              <div className="w-2/5 flex justify-center">
                                <AlertTriangle className="w-14 h-14 text-yellow-600" />
                              </div>
                              <div className="w-3/5">
                                <p className="text-2xl font-bold text-yellow-600 leading-tight">
                                  {mediaCases.filter((c) => !solvedCases.includes(c.id) && c.status !== "wrong").length}
                                </p>
                                <p className={`text-sm text-yellow-700 font-semibold ${roboto.className}`}>
                                  Casos Pendientes
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all">
                          <CardContent className="p-2">
                            <div className="flex items-center">
                              <div className="w-2/5 flex justify-center">
                                <CheckCircle className="w-14 h-14 text-green-600" />
                              </div>
                              <div className="w-3/5">
                                <p className="text-2xl font-bold text-green-600 leading-tight">
                                  {solvedCases.length}
                                </p>
                                <p className={`text-sm text-green-700 font-semibold ${roboto.className}`}>
                                  Casos Completados
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200 hover:shadow-lg transition-all">
                          <CardContent className="p-2">
                            <div className="flex items-center">
                              <div className="w-2/5 flex justify-center">
                                <XCircle className="w-14 h-14 text-red-600" />
                              </div>
                              <div className="w-3/5">
                                <p className="text-2xl font-bold text-red-600 leading-tight">
                                  {wrongAnswers.length}
                                </p>
                                <p className={`text-sm text-red-700 font-semibold ${roboto.className}`}>
                                  Errores Críticos
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:shadow-lg transition-all">
                          <CardContent className="p-2">
                            <div className="flex items-center">
                              <div className="w-2/5 flex justify-center">
                                <Target className="w-14 h-14 text-blue-600" />
                              </div>
                              <div className="w-3/5">
                                <p className="text-2xl font-bold text-blue-600 leading-tight">
                                  {playerStats.accuracy}%
                                </p>
                                <p className={`text-sm text-blue-700 font-semibold ${roboto.className}`}>
                                  Precisión
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Casos/Misiones */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mediaCases
                        .filter((case_) => !solvedCases.includes(case_.id) && !wrongAnswers.includes(case_.id))
                        .map((case_) => (
                          <Card
                            key={case_.id}
                            className={`cursor-pointer transition-all hover:shadow-xl hover:scale-105 transform ${
                              case_.status === "solved"
                                ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-green-200"
                                : case_.status === "wrong"
                                  ? "bg-gradient-to-br from-red-50 to-pink-50 border-red-300 shadow-red-200"
                                  : "hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border-gray-200"
                            }`}
                            onClick={() => openCase(case_.id)}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">

                                  <Badge
                                    className="bg-transparent text-[#13118c] p-1 hover:bg-transparent hover:text-[#13118c] transition-none"
                                  >
                                    {case_.type === "image" ? (
                                      <ImageIcon className="w-6 h-6" /> // más grande
                                    ) : (
                                      <Video className="w-6 h-6" />
                                    )}
                                  </Badge>

                                  <Badge className={`bg-transparent text-[#13118c] hover:bg-[#13118c] hover:text-white transition-colors duration-200 rounded-full px-3 py-1 text-sm font-semibold ${merriweather.className}`}>
                                    Nivel {case_.level}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                  {solvedCases.includes(case_.id) && <CheckCircle className="w-5 h-5 text-green-600" />}
                                  {wrongAnswers.includes(case_.id) && <XCircle className="w-5 h-5 text-red-600" />}
                                  <span className={`text-md font-bold text-[#13118c]-600 ${roboto.className}`}>+{case_.xpReward} XP</span>
                                </div>
                              </div>
                              <CardTitle className={`text-xl font-bold ${merriweather.className}`}>{case_.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <img
                                  src={case_.realImageUrl || case_.mediaUrl}
                                  alt={case_.title}
                                  className="w-full h-32 object-cover rounded border-2 border-gray-200"
                                />
                                <p className={`text-xs text-black-600 text-bold ${roboto.className}`}>{case_.description}</p>
                                <div className="flex justify-between items-center">
                                  <Badge variant="outline" className="text-xs font-semibold">
                                    {case_.difficulty.toUpperCase()}
                                  </Badge>
                                  <span className={`text-xs text-gray-500 text-bold font-medium ${roboto.className}`}>{case_.source}</span>
                                </div>

                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  

                  {activeWindow === "whatsapp" && (
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[500px]">
                        {/* Lista de contactos */}
                        <Card className="lg:col-span-1">
                          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <MessageCircle className="w-5 h-5" />Comunicaciones Seguras
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
                                  onClick={() => {
                                    setSelectedContact(contact.id)
                                    marcarMensajesComoLeidos(contact.id)
                                  }}      
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

          {/* Contenido del mensaje */}
          <p className="text-sm font-medium">{msg.content}</p>

          {/* Interacción por checkbox si requiere respuesta */}
          {msg.requiereRespuesta && !msg.respondido && !msg.expirado && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                responderWhatsapp(msg.id, true)
              }}
              className="mt-2"
            >
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" required />
                Confirmo lo solicitado
              </label>
              <button
                type="submit"
                className="mt-1 bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Enviar
              </button>
            </form>
          )}

          {/* Estados visuales */}
          {msg.respondido && (
            <p className="text-green-600 text-xs mt-1">✅ Respondido</p>
          )}
          {msg.expirado && (
            <p className="text-red-600 text-xs mt-1">⏰ No respondiste a tiempo</p>
          )}

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
                      <h2 className={`text-3xl font-bold mb-4 flex items-center gap-2 bg-gradient-to-r from-[#111827] to-blue-800 bg-clip-text text-transparent ${anton.className}`}>
                        <Bot className="w-7 h-7 text-blue-600" />Asistente IA - DeepDetect Pro
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
                                <div className="w-5 h-5 text-blue-600" />
                                Herramientas de Análisis
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <Button
                                variant="outline"
                                className="w-full justify-start hover:bg-blue-50 border-blue-200"
                                id="btn-analisis-metadatos"
                              >
                                <Eye className="w-4 h-4 mr-2" />Análisis de Metadatos
                              </Button>
                              <Button
                                onClick={() => {
                                  window.open("https://undetectable.ai/es/ai-image-detector", "_blank")
                                }}
                                variant="outline"
                                className="w-full justify-start hover:bg-purple-50 border-purple-200"
                                data-tour="ai-tool-detect"
                                id="btn-deteccion-imagenes"
                              >
                                <Zap className="w-4 h-4 mr-2" />Detección de Imágenes
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full justify-start hover:bg-green-50 border-green-200"
                                id="btn-analisis-facial"
                              >
                                <Target className="w-4 h-4 mr-2" />Análisis Facial
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full justify-start hover:bg-orange-50 border-orange-200"
                                id="btn-sincronizacion"
                              >
                                <Video className="w-4 h-4 mr-2" />Sincronización Audio-Video
                              </Button>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-green-600" />Consejos del Experto
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
                                Recomendaciones Especiales
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-yellow-700 text-sm font-medium">
                                Has cometido algunos errores en tu misión. Te recomiendo tomarte más tiempo para
                                analizar cada caso. Usa las herramientas de análisis y revisa las pistas antes de tomar
                                una decisión final.
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
                              <CardTitle className={`flex items-center gap-2 ${merriweather.className}`}>
                                {currentCase.title}
                              </CardTitle>
                              <CardDescription className={`font-medium text-black ${roboto.className}`}>{currentCase.description}</CardDescription>
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
                                  <Badge className="font-bold text-white" style={{ backgroundColor: "#13118c", color: "#ffffff" }}>
                                    {currentCase.difficulty.toUpperCase()}
                                  </Badge>
                                  <Badge className="font-bold" style={{ backgroundColor: "#13118c", color: "#ffffff" }}>
                                    +{currentCase.xpReward} XP
                                  </Badge>
                                </div>

                                {wrongAnswers.includes(currentCase.id) && (
                                  <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-lg animate-pulse">
                                    <p className="text-red-800 text-sm font-bold">
                                      ❌ Ya analizaste este caso incorrectamente. Revisa los motivos antes de intentar con
                                      otro caso.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                            <CardHeader>
                              <CardTitle className={`flex items-center gap-2 ${roboto.className}`}>
                                Laboratorio de Análisis
                              </CardTitle>
                              <CardDescription className={`font-medium ${roboto.className}`}>
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
                                      <span>AUTÉNTICO</span>
                                    </Button>
                                    <Button
                                      onClick={() => handleCaseDecision(currentCase.id, true)}
                                      className="h-24 flex flex-col gap-2 bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
                                      disabled={wrongAnswers.includes(currentCase.id)}
                                    >
                                      <XCircle className="w-10 h-10" />
                                      <span>DEEPFAKE</span>
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" />
                                    <p className="font-bold text-green-800 text-lg">¡Misión Completada!</p>
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
                                    Pistas de Análisis:
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
                                      <strong>Consecuencias del error:</strong>
                                      <br />• Penalización de -50 puntos
                                      <br />• Racha de aciertos perdida
                                      <br />• Caso bloqueado temporalmente
                                      <br />• Riesgo de eliminación, +1 caso de error
                                    </p>
                                  </div>
                                )}

                                {wrongAnswers.includes(currentCase.id) && (
                                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-lg">
                                    <p className="text-orange-800 text-sm font-bold">
                                      <strong>Motivos del error:</strong>
                                    </p>
                                    {currentCase.clues?.length > 0 ? (
                                      <ul className="mt-2 list-disc list-inside text-orange-800 text-sm">
                                        {currentCase.clues.map((clue, index) => (
                                          <li key={index}>{clue}</li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p className="text-orange-800 text-sm mt-2">
                                        No hay pistas disponibles.
                                      </p>
                                    )}
                                  </div>
                                )}

                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ) : (
                        <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-blue-200">
                          <CardContent className="text-center py-16">
                            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-gray-700">
                              Selecciona una misión para analizar
                            </h3>
                            <p className="text-gray-600 font-medium">
                              Ve al Panel de analisis y haz clic en uno de los casos disponibles
                            </p>
                            <Button
                              onClick={() => setActiveWindow("desktop")}
                              className="mt-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-600 hover:to-blue-600"
                            >
                              Ir al Panel de análisis
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
          <div className="fixed top-4 left-4 flex items-center gap-4 z-20">
            <Button
              onClick={() => (window.location.href = "/")}
              className="cursor-pointer bg-white/90 backdrop-blur-sm rounded-sm px-1.5 py-0.5 shadow border border-white/30 hover:scale-105 transition-transform text-gray-700 text-xs font-medium"

            >
              Volver al inicio
            </Button>
          </div>
        </div>

        {/* Estilos CSS adicionales */}
        <style jsx>{`
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

        {!mostrarTour && (
          <button
            onClick={() => setMostrarTour(true)}
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 9999,
              backgroundColor: "#00bcd4",
              color: "#fff",
              border: "none",
              padding: "12px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              fontWeight: "bold",
            }}
          >
            ¿Cómo jugar?
          </button>
        )}

        {mostrarTour && (
          <Tour
            onFinish={() => {
              setMostrarTour(false)

              if (!tourYaFinalizado) {
                setTourYaFinalizado(true)
                startGame()          // primera vez: muestra mensaje del jefe
              } else {
                setGameStarted(true) // reinicio: arranca el timer de nuevo sin mostrar mensaje
              }
            }}
            setActiveWindow={setActiveWindow}
          />
        )}


      </div>
    </div>
  )
}
