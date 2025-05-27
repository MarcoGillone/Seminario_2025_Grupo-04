"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Shield, Search, Zap, Play, ExternalLink, BookOpen, Download, Users, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Component() {
  const juegos = [
    {
      id: 1,
      titulo: "Investigación de Deepfakes",
      descripcion: "Descubre la verdad detrás de medios manipulados en esta experiencia de detective",
      imagen: "/placeholder.svg?height=200&width=300",
      categoria: "Investigación",
      dificultad: "Avanzado",
      esPrincipal: true,
    },
    {
      id: 2,
      titulo: "Desafío de Ciberseguridad",
      descripcion: "Pon a prueba tus habilidades contra las últimas amenazas cibernéticas",
      imagen: "/placeholder.svg?height=200&width=300",
      categoria: "Seguridad",
      dificultad: "Intermedio",
    },
    {
      id: 3,
      titulo: "Simulador de Ética IA",
      descripcion: "Navega decisiones éticas complejas en el desarrollo de inteligencia artificial",
      imagen: "/placeholder.svg?height=200&width=300",
      categoria: "Ética",
      dificultad: "Principiante",
    },
    {
      id: 4,
      titulo: "Laboratorio Forense Digital",
      descripcion: "Analiza evidencia digital y resuelve casos complejos de cibercrimen",
      imagen: "/placeholder.svg?height=200&width=300",
      categoria: "Forense",
      dificultad: "Avanzado",
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

  const recursos = [
    {
      titulo: "Guía de Detección de Deepfakes",
      tipo: "PDF",
      tamaño: "2.5 MB",
      descargas: 5420,
    },
    {
      titulo: "Kit de Herramientas Forenses",
      tipo: "ZIP",
      tamaño: "15.8 MB",
      descargas: 3210,
    },
    {
      titulo: "Base de Datos de Casos",
      tipo: "JSON",
      tamaño: "8.2 MB",
      descargas: 1890,
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
              <span className="text-xl font-bold text-white">TechGames</span>
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
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
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
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
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
                        window.open("/deepfake-investigation", "_blank")
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

      {/* Recursos Section */}
      <section id="recursos" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Recursos Gratuitos</h2>
            <p className="text-slate-300 text-lg">Herramientas y materiales para potenciar tu aprendizaje</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {recursos.map((recurso, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">{recurso.titulo}</h3>
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                      {recurso.tipo}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-sm mb-4">
                    <span>{recurso.tamaño}</span>
                    <span>{recurso.descargas} descargas</span>
                  </div>
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                  </Button>
                </CardContent>
              </Card>
            ))}
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
              <span className="text-lg font-semibold text-white">TechGames</span>
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
            <p>&copy; 2024 TechGames. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
