"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  Shield,
  Search,
  Zap,
  Play,
  ExternalLink,
  BookOpen,
  Users,
  Award,
  FileText,
  Video,
  Database,
  PenToolIcon as Tool,
  Globe,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Component() {
  const juegos = [
    {
      id: 1,
      titulo: "Investigación de Deepfakes",
      descripcion: "Descubre la verdad detrás de medios manipulados en esta experiencia de detective",
      imagen: "/img/deepfake_detection.png",
      categoria: "Investigación",
      dificultad: "Avanzado",
      esPrincipal: true,
    },
    {
      id: 2,
      titulo: "Desafío de Ciberseguridad",
      descripcion: "Pon a prueba tus habilidades contra las últimas amenazas cibernéticas",
      imagen: "/img/cibersecurity.png",
      categoria: "Seguridad",
      dificultad: "Intermedio",
    },
  ]

  const cursos = [
    {
      id: 1,
      titulo: "Detección de Deepfakes Básico",
      descripcion: "Aprende los fundamentos para identificar contenido manipulado",
      duracion: "4 semanas",
      nivel: "Principiante",
      estudiantes: 1250,
    },
    {
      id: 2,
      titulo: "Análisis Forense Digital",
      descripcion: "Técnicas avanzadas de investigación digital y análisis de evidencia",
      duracion: "8 semanas",
      nivel: "Avanzado",
      estudiantes: 890,
    },
    {
      id: 3,
      titulo: "Ciberseguridad Práctica",
      descripcion: "Implementa medidas de seguridad y protege sistemas digitales",
      duracion: "6 semanas",
      nivel: "Intermedio",
      estudiantes: 2100,
    },
  ]

  const recursosDescarga = [
    {
      titulo: "Guía Completa de Detección de Deepfakes",
      descripcion: "Manual exhaustivo con técnicas y herramientas actualizadas",
      tipo: "PDF",
      tamaño: "4.2 MB",
      descargas: 8420,
      categoria: "Guías",
      icono: FileText,
      color: "text-blue-400",
      borderColor: "border-blue-500",
    },
    {
      titulo: "Kit de Herramientas Forenses Digitales",
      descripcion: "Conjunto de utilidades para análisis de evidencia digital",
      tipo: "ZIP",
      tamaño: "23.5 MB",
      descargas: 5210,
      categoria: "Herramientas",
      icono: Tool,
      color: "text-green-400",
      borderColor: "border-green-500",
    },
    {
      titulo: "Base de Datos de Casos Reales",
      descripcion: "Colección de casos de estudio con deepfakes documentados",
      tipo: "JSON",
      tamaño: "12.8 MB",
      descargas: 3890,
      categoria: "Datos",
      icono: Database,
      color: "text-purple-400",
      borderColor: "border-purple-500",
    },
    {
      titulo: "Checklist de Verificación de Medios",
      descripcion: "Lista de verificación paso a paso para análisis de contenido",
      tipo: "PDF",
      tamaño: "1.1 MB",
      descargas: 12450,
      categoria: "Guías",
      icono: FileText,
      color: "text-orange-400",
      borderColor: "border-orange-500",
    },
  ]

  const recursosOnline = [
    {
      titulo: "Tutoriales Interactivos",
      descripcion: "Aprende técnicas de detección con ejemplos prácticos paso a paso",
      icono: Video,
      color: "text-red-400",
      borderColor: "border-red-500",
      enlace: "/tutoriales",
      badge: "Nuevo",
      badgeColor: "bg-red-600",
    },
    {
      titulo: "Comunidad de Expertos",
      descripcion: "Conecta con investigadores y comparte conocimientos en tiempo real",
      icono: MessageCircle,
      color: "text-green-400",
      borderColor: "border-green-500",
      enlace: "https://discord.com",
      externo: true,
      badge: "Activo",
      badgeColor: "bg-green-600",
    },
    {
      titulo: "Laboratorio Virtual",
      descripcion: "Practica análisis forense en un entorno seguro y controlado",
      icono: Globe,
      color: "text-cyan-400",
      borderColor: "border-cyan-500",
      enlace: "/laboratorio",
      badge: "Beta",
      badgeColor: "bg-cyan-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold text-white">TechCheck</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#juegos" className="text-slate-300 hover:text-purple-400 transition-colors">
                Juegos
              </Link>
              <Link href="#cursos" className="text-slate-300 hover:text-purple-400 transition-colors">
                Cursos
              </Link>
              <Link href="#recursos" className="text-slate-300 hover:text-purple-400 transition-colors">
                Recursos
              </Link>
              <Link href="#acerca" className="text-slate-300 hover:text-purple-400 transition-colors">
                Acerca
              </Link>
              <Button
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
              >
                Iniciar Sesión
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-purple-600 text-white">Experiencia de Juego de Nueva Generación</Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Descubre el Engaño
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {" "}
                Digital
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Sumérgete en juegos inmersivos que desafían tu percepción de la realidad. Domina el arte de detectar
              deepfakes y manipulación digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
                onClick={() => (window.location.href = "/juego")}
              >
                <Play className="mr-2 h-5 w-5" />
                Jugar Investigación Deepfake
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                Explorar Cursos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Juegos Section */}
      <section id="juegos" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Juegos Destacados</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Desafíate con nuestra colección de juegos de investigación digital de vanguardia
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {juegos.map((juego) => (
              <Card
                key={juego.id}
                className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-all duration-300 group"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={juego.imagen || "/placeholder.svg"}
                      alt={juego.titulo}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant={juego.esPrincipal ? "default" : "secondary"}
                        className={juego.esPrincipal ? "bg-purple-600" : ""}
                      >
                        {juego.categoria}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {juego.dificultad}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-white mb-2 text-xl">{juego.titulo}</CardTitle>
                  <CardDescription className="text-slate-400 mb-4">{juego.descripcion}</CardDescription>
                  <Button
                    className={`w-full ${
                      juego.esPrincipal
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-white"
                    }`}
                    onClick={() => {
                      if (juego.esPrincipal) {
                        window.location.href = "/juego"
                      }
                    }}
                  >
                    {juego.esPrincipal ? (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Jugar Investigación
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Jugar Ahora
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos Section */}
      <section id="cursos" className="py-20 px-4 bg-slate-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Cursos Especializados</h2>
            <p className="text-slate-300 text-lg">Aprende de expertos en seguridad digital y detección de deepfakes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cursos.map((curso) => (
              <Card
                key={curso.id}
                className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-purple-400 text-purple-400">
                      {curso.nivel}
                    </Badge>
                    <div className="flex items-center text-slate-400 text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      {curso.estudiantes}
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl">{curso.titulo}</CardTitle>
                  <CardDescription className="text-slate-400">{curso.descripcion}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-300 text-sm">Duración: {curso.duracion}</span>
                    <Award className="h-5 w-5 text-purple-400" />
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Inscribirse
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos Section - HERRAMIENTAS ONLINE REALES */}
      <section id="recursos" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Recursos</h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              Accede a las mejores herramientas online para detección de deepfakes, verificación de contenido y análisis
              forense digital
            </p>
          </div>

          {/* Herramientas de Detección de IA */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Eye className="h-6 w-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Detectores de Contenido IA</h3>
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-400">Verificación instantánea</Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-slate-700/50 text-blue-400">
                      <Eye className="h-5 w-5" />
                    </div>
                    <Badge className="bg-blue-600 text-white text-xs">Recomendado</Badge>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Undetectable AI - Detector de Imágenes</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Detecta si una imagen fue generada por IA usando tecnología avanzada de análisis
                  </p>
                  <div className="text-xs text-slate-500 mb-4">
                    ✓ Análisis instantáneo • ✓ Múltiples formatos • ✓ Interfaz intuitiva
                  </div>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <a href="https://undetectable.ai/es/ai-image-detector" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Usar Herramienta
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-slate-700/50 text-green-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <Badge className="bg-green-600 text-white text-xs">Popular</Badge>
                  </div>
                  <h4 className="text-white font-semibold mb-2">GPTZero - Detector de Texto IA</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Identifica texto generado por ChatGPT, GPT-4 y otros modelos de lenguaje
                  </p>
                  <div className="text-xs text-slate-500 mb-4">
                    ✓ Análisis profundo • ✓ Múltiples idiomas • ✓ API disponible
                  </div>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <a href="https://gptzero.me" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Usar Herramienta
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-slate-700/50 text-purple-400">
                      <Video className="h-5 w-5" />
                    </div>
                    <Badge className="bg-purple-600 text-white text-xs">Avanzado</Badge>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Deepware Scanner</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Escanea videos en busca de deepfakes y manipulaciones faciales
                  </p>
                  <div className="text-xs text-slate-500 mb-4">
                    ✓ Detección de deepfakes • ✓ Análisis facial • ✓ Reportes detallados
                  </div>
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <a href="https://scanner.deepware.ai" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Usar Herramienta
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Herramientas de Verificación */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Search className="h-6 w-6 text-orange-400" />
              <h3 className="text-2xl font-bold text-white">Verificación y Fact-Checking</h3>
              <Badge className="bg-orange-600/20 text-orange-400 border-orange-400">Investigación profesional</Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-slate-700/50 text-orange-400">
                      <Search className="h-5 w-5" />
                    </div>
                    <Badge className="bg-orange-600 text-white text-xs">Esencial</Badge>
                  </div>
                  <h4 className="text-white font-semibold mb-2">TinEye - Búsqueda Inversa</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Encuentra el origen de imágenes y detecta manipulaciones mediante búsqueda inversa
                  </p>
                  <div className="text-xs text-slate-500 mb-4">
                    ✓ 50+ mil millones de imágenes • ✓ Historial de cambios • ✓ API comercial
                  </div>
                  <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    <a href="https://tineye.com" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Usar Herramienta
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-red-500 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-slate-700/50 text-red-400">
                      <Globe className="h-5 w-5" />
                    </div>
                    <Badge className="bg-red-600 text-white text-xs">Profesional</Badge>
                  </div>
                  <h4 className="text-white font-semibold mb-2">InVID WeVerify</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Suite completa para verificación de videos y detección de contenido manipulado
                  </p>
                  <div className="text-xs text-slate-500 mb-4">
                    ✓ Análisis de metadatos • ✓ Verificación de videos • ✓ Herramientas forenses
                  </div>
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <a
                      href="https://www.invid-project.eu/tools-and-services/invid-verification-plugin/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Usar Herramienta
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-slate-700/50 text-cyan-400">
                      <Database className="h-5 w-5" />
                    </div>
                    <Badge className="bg-cyan-600 text-white text-xs">Forense</Badge>
                  </div>
                  <h4 className="text-white font-semibold mb-2">FotoForensics</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Análisis forense de imágenes para detectar manipulaciones y ediciones
                  </p>
                  <div className="text-xs text-slate-500 mb-4">
                    ✓ Análisis ELA • ✓ Detección de clonado • ✓ Metadatos EXIF
                  </div>
                  <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                    <a href="https://fotoforensics.com" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Usar Herramienta
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Herramientas Especializadas */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Tool className="h-6 w-6 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">Herramientas Especializadas</h3>
              <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-400">Análisis avanzado</Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 hover:border-yellow-500 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-slate-700/50 text-yellow-400">
                      <Shield className="h-5 w-5" />
                    </div>
                    <Badge className="bg-yellow-600 text-white text-xs">Nuevo</Badge>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Hive Moderation</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Detección de contenido generado por IA y moderación automática
                  </p>
                  <div className="text-xs text-slate-500 mb-4">
                    ✓ API robusta • ✓ Múltiples tipos de media • ✓ Precisión alta
                  </div>
                  <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                    <a
                      href="https://hivemoderation.com/ai-generated-content-detection"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Usar Herramienta
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-indigo-500 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-slate-700/50 text-indigo-400">
                      <Users className="h-5 w-5" />
                    </div>
                    <Badge className="bg-indigo-600 text-white text-xs">Comunidad</Badge>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Bellingcat Toolkit</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Colección de herramientas OSINT para investigación y verificación
                  </p>
                  <div className="text-xs text-slate-500 mb-4">
                    ✓ Herramientas OSINT • ✓ Guías detalladas • ✓ Casos reales
                  </div>
                  <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    <a href="https://www.bellingcat.com/resources/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Usar Herramienta
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-slate-700/50 text-pink-400">
                      <Zap className="h-5 w-5" />
                    </div>
                    <Badge className="bg-pink-600 text-white text-xs">Rápido</Badge>
                  </div>
                  <h4 className="text-white font-semibold mb-2">AI or Not</h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Detector simple y rápido para identificar imágenes generadas por IA
                  </p>
                  <div className="text-xs text-slate-500 mb-4">
                    ✓ Interfaz simple • ✓ Resultados instantáneos • ✓ Gratis
                  </div>
                  <Button asChild className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                    <a href="https://www.aiornot.com" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Usar Herramienta
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">¿Por Qué Elegir Nuestra Plataforma?</h2>
            <p className="text-slate-300 text-lg">Tecnología avanzada se encuentra con jugabilidad atractiva</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600/30 transition-colors">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Detección Avanzada</h3>
              <p className="text-slate-400">
                Algoritmos de última generación para identificar los deepfakes y manipulaciones digitales más
                sofisticados
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600/30 transition-colors">
                <Search className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Análisis en Tiempo Real</h3>
              <p className="text-slate-400">
                Retroalimentación y análisis instantáneo mientras investigas medios sospechosos y evidencia digital
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600/30 transition-colors">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Experiencia Inmersiva</h3>
              <p className="text-slate-400">
                Historias atractivas y escenarios realistas que hacen divertido aprender sobre seguridad digital
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">¿Listo para Convertirte en un Detective Digital?</h2>
            <p className="text-slate-300 text-lg mb-8">
              Únete a miles de jugadores que están dominando el arte de la investigación digital y detección de
              deepfakes
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
              onClick={() => window.open("/deepfake-investigation", "_blank")}
            >
              Comenzar Tu Investigación
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Eye className="h-6 w-6 text-purple-400" />
              <span className="text-lg font-semibold text-white">TechCheck</span>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                Términos
              </Link>
              <Link href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                Soporte
              </Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-center text-slate-500">
            <p>&copy; 2024 TechCheck. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
