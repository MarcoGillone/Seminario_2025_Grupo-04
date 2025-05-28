"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
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
} from "lucide-react"

interface MediaCase {
  id: string
  type: "image" | "video"
  title: string
  source: string
  description: string
  isDeepfake: boolean
  difficulty: "easy" | "medium" | "hard"
  hints: string[]
  mediaUrl: string
  realImageUrl?: string
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

const mediaCases: MediaCase[] = [
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
    mediaUrl: "img/Francella Rambo.jpg",
    realImageUrl: "img/Francella Rambo.jpg",
  },
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
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hora en segundos
  const [currentCase, setCurrentCase] = useState<MediaCase | null>(null)
  const [emails, setEmails] = useState<Email[]>([])
  const [whatsappMessages, setWhatsappMessages] = useState<WhatsAppMessage[]>([])
  const [selectedContact, setSelectedContact] = useState<string>("boss")
  const [solvedCases, setSolvedCases] = useState<string[]>([])
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [penalties, setPenalties] = useState(0)
  const [aiResponse, setAiResponse] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [bossMessageIndex, setBossMessageIndex] = useState(0)
  const [lastBossMessage, setLastBossMessage] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [gameOverReason, setGameOverReason] = useState("")

  // Inicializar emails
  useEffect(() => {
    const initialEmails: Email[] = [
      {
        id: "email1",
        from: "fuente.anonima@protonmail.com",
        subject: "URGENTE: Material comprometedor",
        content: "Adjunto material que podría ser de interés periodístico. Verificar autenticidad antes de publicar.",
        timestamp: "10:30",
        hasAttachment: true,
        caseId: "case1",
        isRead: false,
        priority: "normal",
      },
      {
        id: "email2",
        from: "editor.jefe@newsroom.com",
        subject: "Re: Deadline para investigación deepfakes",
        content:
          "Necesitamos los resultados del análisis antes de las 18:00. La competencia ya está trabajando en esto.",
        timestamp: "09:15",
        hasAttachment: false,
        isRead: false,
        priority: "urgent",
      },
      {
        id: "email3",
        from: "agencia.reuters@news.com",
        subject: "Material verificado para publicación",
        content: "Adjuntamos material ya verificado por nuestro equipo. Pueden proceder con confianza.",
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
        content: "Buenos días Alex. Tenemos varios casos urgentes que analizar hoy.",
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
        content: "Tengo algo que te va a interesar... 👀",
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
        content: "¿Cómo vas con los análisis? Si necesitas ayuda, avísame",
        timestamp: "10:50",
        isOwn: false,
        avatar: "MG",
        messageType: "text",
        isRead: false,
      },
    ]
    setWhatsappMessages(initialMessages)
  }, [])

  // Verificar game over por penalizaciones
  useEffect(() => {
    if (penalties >= 20 && !isGameOver) {
      setIsGameOver(true)
      setGameOverReason("fired")

      // Email de despido
      const fireEmail: Email = {
        id: `fire_email_${Date.now()}`,
        from: "rrhh@newsroom.com",
        subject: "TERMINACIÓN DE CONTRATO LABORAL",
        content: `Estimado Alex Rivera,

Por la presente le comunicamos que su contrato laboral queda TERMINADO con efecto inmediato debido a:

- Múltiples errores en análisis críticos
- Daño a la reputación de la empresa
- Publicación de información no verificada

Debe entregar todos los materiales de la empresa y abandonar las instalaciones.

Departamento de Recursos Humanos
NewsRoom Corp.`,
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        hasAttachment: false,
        isRead: false,
        priority: "legal",
      }

      // Email de abogado
      const lawyerEmail: Email = {
        id: `lawyer_email_${Date.now()}`,
        from: "demandas@bufetesanchez.com",
        subject: "NOTIFICACIÓN LEGAL - DEMANDA POR DAÑOS Y PERJUICIOS",
        content: `Sr. Alex Rivera,

En representación de nuestros clientes afectados por sus análisis erróneos, le notificamos que se ha iniciado una DEMANDA por daños y perjuicios por un monto de $2,500,000.

Los cargos incluyen:
- Difamación
- Daños a la reputación
- Pérdidas económicas
- Negligencia profesional

Tiene 30 días para responder a esta demanda.

Bufete Legal Sánchez & Asociados
Departamento de Litigios`,
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        hasAttachment: true,
        isRead: false,
        priority: "legal",
      }

      setTimeout(() => {
        setEmails((prev) => [...prev, fireEmail, lawyerEmail])
      }, 3000)

      // Mensaje de WhatsApp del abogado
      const lawyerMessage: WhatsAppMessage = {
        id: `lawyer_wa_${Date.now()}`,
        from: "lawyer",
        fromName: "Bufete Legal Sánchez",
        content: "Sr. Rivera, necesitamos hablar urgentemente sobre la demanda. Contáctenos inmediatamente. ⚖️",
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        isOwn: false,
        avatar: "BL",
        messageType: "urgent",
        isRead: false,
      }

      setTimeout(() => {
        setWhatsappMessages((prev) => [...prev, lawyerMessage])
      }, 5000)
    }
  }, [penalties, isGameOver])

  // Temporizador
  useEffect(() => {
    if (isGameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          if (!isGameOver) {
            setIsGameOver(true)
            setGameOverReason("timeout")
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isGameOver])

  // Mensajes automáticos del jefe
  useEffect(() => {
    if (isGameOver) return

    const bossTimer = setInterval(() => {
      const now = Date.now()
      const timeSinceLastMessage = now - lastBossMessage

      if (
        timeSinceLastMessage > 45000 &&
        solvedCases.length < mediaCases.length &&
        bossMessageIndex < bossMessages.length
      ) {
        const newBossMessage: WhatsAppMessage = {
          id: `boss_auto_${now}`,
          from: "boss",
          fromName: "Roberto Martínez (Jefe)",
          content: bossMessages[bossMessageIndex],
          timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
          isOwn: false,
          avatar: "RM",
          messageType: wrongAnswers.length > 1 ? "urgent" : "text",
          isRead: false,
        }

        setWhatsappMessages((prev) => [...prev, newBossMessage])
        setBossMessageIndex((prev) => prev + 1)
        setLastBossMessage(now)
      }
    }, 10000)

    return () => clearInterval(bossTimer)
  }, [bossMessageIndex, solvedCases.length, wrongAnswers.length, lastBossMessage, isGameOver])

  // Mensajes adicionales cuando hay errores
  useEffect(() => {
    if (wrongAnswers.length > 0 && !isGameOver) {
      const errorMessages = [
        "¡Alex! ¿Qué pasó con ese análisis? ¡Era incorrecto! 😡",
        "No podemos permitirnos más errores. ¡Concéntrate!",
        "El director está furioso. ¡Necesito precisión, no velocidad!",
        "¡ESTO ES INACEPTABLE! ¿Qué está pasando contigo?",
        "Alex, tu trabajo está en peligro. ¡REACCIONA!",
      ]

      const errorMessage: WhatsAppMessage = {
        id: `boss_error_${Date.now()}`,
        from: "boss",
        fromName: "Roberto Martínez (Jefe)",
        content: errorMessages[Math.min(wrongAnswers.length - 1, errorMessages.length - 1)],
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        isOwn: false,
        avatar: "RM",
        messageType: "urgent",
        isRead: false,
      }

      setTimeout(() => {
        setWhatsappMessages((prev) => [...prev, errorMessage])
      }, 2000)
    }
  }, [wrongAnswers.length, isGameOver])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleCaseDecision = (caseId: string, userDecision: boolean) => {
    if (isGameOver) return

    const case_ = mediaCases.find((c) => c.id === caseId)
    if (!case_) return

    const isCorrect = userDecision === case_.isDeepfake

    if (isCorrect) {
      setSolvedCases((prev) => [...prev, caseId])
      setScore((prev) => prev + (case_.difficulty === "easy" ? 10 : case_.difficulty === "medium" ? 20 : 30))

      const congratsMessage: WhatsAppMessage = {
        id: `boss_congrats_${Date.now()}`,
        from: "boss",
        fromName: "Roberto Martínez (Jefe)",
        content: `¡Excelente trabajo con "${case_.title}"! Sigue así 👏`,
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
      setScore((prev) => Math.max(0, prev - 5))
    }

    setAiResponse(
      isCorrect
        ? `✅ Correcto! ${case_.isDeepfake ? "Es un deepfake" : "Es contenido auténtico"}. ${case_.hints[0]}`
        : `❌ Incorrecto. ${case_.isDeepfake ? "Era un deepfake" : "Era contenido auténtico"}. Penalización: -5 puntos. Pista: ${case_.hints[0]}`,
    )
  }

  const openCase = (caseId: string) => {
    const case_ = mediaCases.find((c) => c.id === caseId)
    if (case_) {
      setCurrentCase(case_)
      setActiveTab("analysis")
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

    // Respuestas automáticas según el contacto
    const responses: Record<string, string[]> = {
      boss: [
        "¡Menos chat y más análisis! ⏰",
        "Necesito resultados, no conversación",
        "¿Ya terminaste con los casos?",
        "El tiempo corre, Alex",
      ],
      colleague: [
        "¡Ánimo Alex! Sé que puedes hacerlo",
        "Si necesitas ayuda con algo específico, dime",
        "Recuerda revisar bien los metadatos",
        "¿Todo bien? Te veo estresado",
      ],
      tech: [
        "¿Necesitas ayuda con las herramientas de análisis?",
        "Puedo enviarte el manual de detección",
        "¿Problemas técnicos?",
      ],
      source1: [
        "Tengo más material si lo necesitas",
        "¿Qué opinas de lo que te envié?",
        "Cuidado, hay gente vigilando...",
      ],
      lawyer: [
        "Sr. Rivera, esto es muy serio",
        "Necesitamos hablar inmediatamente",
        "Su situación legal es complicada",
      ],
    }

    const contactResponses = responses[selectedContact]
    if (contactResponses) {
      const response: WhatsAppMessage = {
        id: `response_${Date.now()}`,
        from: selectedContact,
        fromName: whatsappContacts.find((c) => c.id === selectedContact)?.name || "",
        content: contactResponses[Math.floor(Math.random() * contactResponses.length)],
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        isOwn: false,
        avatar: whatsappContacts.find((c) => c.id === selectedContact)?.avatar || "",
        messageType: selectedContact === "lawyer" ? "urgent" : "text",
        isRead: false,
      }

      setTimeout(() => {
        setWhatsappMessages((prev) => [...prev, response])
      }, 2000)
    }
  }

  const getContactMessages = (contactId: string) => {
    return whatsappMessages.filter((msg) => msg.from === contactId || (msg.isOwn && msg.targetContact === contactId))
  }

  const getUnreadCount = (contactId: string) => {
    return whatsappMessages.filter((msg) => msg.from === contactId && !msg.isRead).length
  }

  const restartGame = () => {
    setTimeLeft(3600)
    setCurrentCase(null)
    setSolvedCases([])
    setWrongAnswers([])
    setScore(0)
    setPenalties(0)
    setAiResponse("")
    setNewMessage("")
    setActiveTab("dashboard")
    setBossMessageIndex(0)
    setLastBossMessage(0)
    setIsGameOver(false)
    setGameOverReason("")

    // Reiniciar emails y mensajes
    const initialEmails: Email[] = [
      {
        id: "email1",
        from: "fuente.anonima@protonmail.com",
        subject: "URGENTE: Material comprometedor",
        content: "Adjunto material que podría ser de interés periodístico. Verificar autenticidad antes de publicar.",
        timestamp: "10:30",
        hasAttachment: true,
        caseId: "case1",
        isRead: false,
        priority: "normal",
      },
      {
        id: "email2",
        from: "editor.jefe@newsroom.com",
        subject: "Re: Deadline para investigación deepfakes",
        content:
          "Necesitamos los resultados del análisis antes de las 18:00. La competencia ya está trabajando en esto.",
        timestamp: "09:15",
        hasAttachment: false,
        isRead: false,
        priority: "urgent",
      },
      {
        id: "email3",
        from: "agencia.reuters@news.com",
        subject: "Material verificado para publicación",
        content: "Adjuntamos material ya verificado por nuestro equipo. Pueden proceder con confianza.",
        timestamp: "08:45",
        hasAttachment: true,
        caseId: "case3",
        isRead: false,
        priority: "normal",
      },
    ]
    setEmails(initialEmails)

    const initialMessages: WhatsAppMessage[] = [
      {
        id: "wa1",
        from: "boss",
        fromName: "Roberto Martínez (Jefe)",
        content: "Buenos días Alex. Tenemos varios casos urgentes que analizar hoy.",
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
        content: "Tengo algo que te va a interesar... 👀",
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
        content: "¿Cómo vas con los análisis? Si necesitas ayuda, avísame",
        timestamp: "10:50",
        isOwn: false,
        avatar: "MG",
        messageType: "text",
        isRead: false,
      },
    ]
    setWhatsappMessages(initialMessages)
  }

  if (isGameOver) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {gameOverReason === "fired" ? (
                <Skull className="w-16 h-16 text-red-600" />
              ) : (
                <Clock className="w-16 h-16 text-yellow-600" />
              )}
            </div>
            <CardTitle className="text-3xl text-red-600">
              {gameOverReason === "fired" ? "¡DESPEDIDO!" : "¡TIEMPO AGOTADO!"}
            </CardTitle>
            <CardDescription className="text-lg">
              {gameOverReason === "fired"
                ? "Has sido despedido por múltiples errores críticos"
                : "Se acabó el tiempo para completar los análisis"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-bold text-red-800 mb-2">Consecuencias:</h3>
              <ul className="text-red-700 space-y-1">
                {gameOverReason === "fired" ? (
                  <>
                    <li>• Contrato laboral terminado</li>
                    <li>• Demanda por daños y perjuicios: $2,500,000</li>
                    <li>• Reputación profesional arruinada</li>
                    <li>• Prohibición de trabajar en medios por 5 años</li>
                  </>
                ) : (
                  <>
                    <li>• Casos sin resolver: {mediaCases.length - solvedCases.length}</li>
                    <li>• Oportunidad perdida</li>
                    <li>• Competencia publicó primero</li>
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
              <p className="text-3xl font-bold">{score} puntos</p>
              {penalties > 0 && <p className="text-red-600">Penalizaciones: -{penalties}</p>}
            </div>

            <Button onClick={restartGame} className="w-full" size="lg">
              Intentar de Nuevo
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold">Centro de Verificación - NewsRoom</h1>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              Periodista: Alex Rivera
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-lg font-mono">
              <Clock className="w-5 h-5" />
              <span className={timeLeft < 600 ? "text-red-600" : "text-green-600"}>{formatTime(timeLeft)}</span>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              Puntuación: {score}
            </Badge>
            {penalties > 0 && (
              <Badge variant="destructive" className="text-lg px-3 py-1">
                Penalizaciones: -{penalties}
              </Badge>
            )}
          </div>
        </div>

        {/* Alerta de peligro */}
        {penalties >= 10 && penalties < 20 && (
          <Card className="mb-4 border-red-500 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-bold">¡PELIGRO! Estás cerca del despido. Penalizaciones: {penalties}/20</span>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email ({emails.filter((e) => !e.isRead).length})
              {emails.some((e) => e.priority === "legal" && !e.isRead) && <Scale className="w-4 h-4 text-red-600" />}
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
              {whatsappMessages.filter((m) => !m.isRead).length > 0 && (
                <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                  {whatsappMessages.filter((m) => !m.isRead).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              IA Asistente
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Análisis
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    Casos Pendientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">{mediaCases.length - solvedCases.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Casos Resueltos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{solvedCases.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    Errores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{wrongAnswers.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Precisión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {solvedCases.length + wrongAnswers.length > 0
                      ? Math.round((solvedCases.length / (solvedCases.length + wrongAnswers.length)) * 100)
                      : 0}
                    %
                  </div>
                </CardContent>
              </Card>
            </div>

            {wrongAnswers.length > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    ¡Atención! Errores Detectados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700">
                    Has cometido {wrongAnswers.length} error(es). Cada error reduce tu puntuación y aumenta la presión
                    del jefe. ¡A los 20 puntos de penalización serás despedido!
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Casos Activos</CardTitle>
                <CardDescription>Haz clic en un caso para analizarlo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaCases.map((case_) => (
                    <Card
                      key={case_.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        solvedCases.includes(case_.id)
                          ? "bg-green-50 border-green-200"
                          : wrongAnswers.includes(case_.id)
                            ? "bg-red-50 border-red-200"
                            : ""
                      }`}
                      onClick={() => openCase(case_.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge variant={case_.type === "image" ? "default" : "secondary"}>
                            {case_.type === "image" ? (
                              <ImageIcon className="w-3 h-3 mr-1" />
                            ) : (
                              <Video className="w-3 h-3 mr-1" />
                            )}
                            {case_.type}
                          </Badge>
                          {solvedCases.includes(case_.id) && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {wrongAnswers.includes(case_.id) && <XCircle className="w-5 h-5 text-red-600" />}
                        </div>
                        <CardTitle className="text-sm">{case_.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <img
                            src={case_.realImageUrl || case_.mediaUrl}
                            alt={case_.title}
                            className="w-full h-32 object-cover rounded border"
                          />
                          <p className="text-xs text-gray-600">{case_.description}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">
                              {case_.difficulty}
                            </Badge>
                            <span className="text-xs text-gray-500">{case_.source}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Bandeja de Entrada
                  {emails.some((e) => e.priority === "legal") && (
                    <Badge variant="destructive" className="ml-2">
                      <Scale className="w-3 h-3 mr-1" />
                      Legal
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {emails.map((email) => (
                      <Card
                        key={email.id}
                        className={`cursor-pointer transition-all hover:shadow-sm ${
                          !email.isRead
                            ? email.priority === "legal"
                              ? "bg-red-100 border-red-300"
                              : email.priority === "urgent"
                                ? "bg-yellow-50 border-yellow-200"
                                : "bg-blue-50 border-blue-200"
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
                                        : ""
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
                              {!email.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                            </div>
                          </div>
                          <h3 className="font-medium mb-1">{email.subject}</h3>
                          <p className="text-sm text-gray-600 whitespace-pre-line">{email.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* WhatsApp */}
          <TabsContent value="whatsapp">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
              {/* Lista de contactos */}
              <Card className="lg:col-span-1">
                <CardHeader className="bg-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    {whatsappContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedContact === contact.id ? "bg-green-50 border-green-200" : ""
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
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm">{contact.name}</p>
                              {getUnreadCount(contact.id) > 0 && (
                                <Badge variant="destructive" className="px-2 py-0 text-xs">
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
                <CardHeader className="bg-green-600 text-white rounded-t-lg">
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
                <CardContent className="p-0 flex flex-col h-[500px]">
                  {/* Mensajes */}
                  <ScrollArea className="flex-1 p-4 bg-gray-50">
                    <div className="space-y-2">
                      {getContactMessages(selectedContact).map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-xs p-3 rounded-lg cursor-pointer relative ${
                              msg.isOwn
                                ? "bg-green-600 text-white"
                                : msg.messageType === "urgent"
                                  ? "bg-red-100 text-red-800 border border-red-300"
                                  : "bg-white text-gray-800 shadow-sm"
                            }`}
                            onClick={() => msg.caseId && openCase(msg.caseId)}
                          >
                            {msg.messageType === "urgent" && (
                              <AlertTriangle className="w-4 h-4 text-red-600 absolute top-1 right-1" />
                            )}
                            <p className="text-sm">{msg.content}</p>
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
                  <div className="p-4 bg-white border-t">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Input
                        placeholder="Escribe un mensaje..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendWhatsAppMessage()}
                        className="flex-1"
                      />
                      <Button variant="ghost" size="sm">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Camera className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mic className="w-4 h-4" />
                      </Button>
                      <Button onClick={sendWhatsAppMessage} className="bg-green-600 hover:bg-green-700">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* IA Asistente */}
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Asistente IA - DeepDetect
                </CardTitle>
                <CardDescription>Tu asistente para análisis de medios digitales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiResponse && (
                    <div
                      className={`p-4 rounded-lg ${
                        aiResponse.includes("✅")
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <p className="text-sm">{aiResponse}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Herramientas de Análisis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Eye className="w-4 h-4 mr-2" />
                          Análisis de Metadatos
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Zap className="w-4 h-4 mr-2" />
                          Detección de Artefactos
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Target className="w-4 h-4 mr-2" />
                          Análisis Facial
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Video className="w-4 h-4 mr-2" />
                          Sincronización Audio-Video
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Consejos Rápidos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Revisa inconsistencias en iluminación</li>
                          <li>• Observa bordes borrosos o pixelados</li>
                          <li>• Analiza sincronización audio-video</li>
                          <li>• Busca artefactos de compresión</li>
                          <li>• Verifica coherencia temporal</li>
                          <li>• Examina micro-expresiones faciales</li>
                          <li>• Comprueba calidad uniforme</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {wrongAnswers.length > 0 && (
                    <Card className="border-yellow-200 bg-yellow-50">
                      <CardHeader>
                        <CardTitle className="text-yellow-800 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          Recomendaciones Especiales
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-yellow-700 text-sm">
                          Has cometido algunos errores. Te recomiendo tomarte más tiempo para analizar cada caso. Usa
                          las herramientas de análisis y revisa las pistas antes de tomar una decisión.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análisis */}
          <TabsContent value="analysis">
            {currentCase ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {currentCase.type === "image" ? <ImageIcon className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                      {currentCase.title}
                    </CardTitle>
                    <CardDescription>{currentCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <img
                        src={currentCase.realImageUrl || currentCase.mediaUrl}
                        alt={currentCase.title}
                        className="w-full rounded-lg border"
                      />

                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Fuente: {currentCase.source}</Badge>
                        <Badge
                          variant={
                            currentCase.difficulty === "easy"
                              ? "default"
                              : currentCase.difficulty === "medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {currentCase.difficulty}
                        </Badge>
                      </div>

                      {wrongAnswers.includes(currentCase.id) && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-red-800 text-sm font-medium">
                            ❌ Ya analizaste este caso incorrectamente. Revisa las pistas antes de intentar de nuevo.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Análisis y Decisión</CardTitle>
                    <CardDescription>¿Es este contenido auténtico o un deepfake?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {!solvedCases.includes(currentCase.id) ? (
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            onClick={() => handleCaseDecision(currentCase.id, false)}
                            className="h-20 flex flex-col gap-2"
                            variant="outline"
                            disabled={wrongAnswers.includes(currentCase.id)}
                          >
                            <CheckCircle className="w-8 h-8 text-green-600" />
                            <span>AUTÉNTICO</span>
                          </Button>
                          <Button
                            onClick={() => handleCaseDecision(currentCase.id, true)}
                            className="h-20 flex flex-col gap-2"
                            variant="outline"
                            disabled={wrongAnswers.includes(currentCase.id)}
                          >
                            <XCircle className="w-8 h-8 text-red-600" />
                            <span>DEEPFAKE</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                          <p className="font-medium text-green-800">Caso Resuelto Correctamente</p>
                          <p className="text-sm text-green-600 mt-1">
                            {currentCase.isDeepfake ? "Era un deepfake" : "Era contenido auténtico"}
                          </p>
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium mb-2">Pistas de Análisis:</h4>
                        <ul className="text-sm space-y-1 text-gray-600">
                          {currentCase.hints.map((hint, index) => (
                            <li key={index}>• {hint}</li>
                          ))}
                        </ul>
                      </div>

                      {wrongAnswers.includes(currentCase.id) && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-yellow-800 text-sm">
                            <strong>Consecuencias del error:</strong>
                            <br />• Penalización de -5 puntos
                            <br />• Aumento de presión del jefe
                            <br />• Caso bloqueado temporalmente
                            <br />• Riesgo de despido a 20 penalizaciones
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Selecciona un caso para analizar</h3>
                  <p className="text-gray-600">Ve al Dashboard y haz clic en uno de los casos disponibles</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
