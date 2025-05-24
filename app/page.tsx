import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, BookOpen, GamepadIcon, FileText, Shield, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-red-600" />
            <span className="font-bold text-xl">DeepFake Defender</span>
          </div>
          <nav className="ml-auto flex gap-6">
            <Link
              href="#cursos"
              className="text-sm font-medium transition-colors hover:text-red-600 flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              Cursos
            </Link>
            <Link
              href="#juegos"
              className="text-sm font-medium transition-colors hover:text-red-600 flex items-center gap-1"
            >
              <GamepadIcon className="h-4 w-4" />
              Juegos
            </Link>
            <Link
              href="#recursos"
              className="text-sm font-medium transition-colors hover:text-red-600 flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              Recursos
            </Link>
            <Button variant="destructive" size="sm">
              Únete Ahora
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ff0000_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-red-600/20 text-red-500 w-fit">
                  <AlertTriangle className="mr-1 h-3.5 w-3.5" />
                  Alerta: Deepfakes en aumento
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Protégete contra la amenaza de los <span className="text-red-500">Deepfakes</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-gray-300 md:text-xl">
                  Aprende a identificar y defenderte de la desinformación digital. Nuestro programa de capacitación te
                  dará las herramientas para navegar con seguridad en la era de la inteligencia artificial.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" variant="destructive">
                    Comenzar Ahora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-red-500 text-white hover:bg-red-500/20">
                    Ver Demostración
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto lg:ml-auto">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse"></div>
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    alt="Deepfake Detection"
                    width={500}
                    height={500}
                    className="relative z-10 rounded-xl border-2 border-red-500 shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-red-600 text-white p-3 rounded-lg shadow-lg z-20">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-red-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-sm">
                <span className="text-3xl md:text-4xl font-bold text-red-600">96%</span>
                <span className="text-sm text-center text-muted-foreground">
                  de personas no detectan deepfakes avanzados
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-sm">
                <span className="text-3xl md:text-4xl font-bold text-red-600">500%</span>
                <span className="text-sm text-center text-muted-foreground">aumento de deepfakes en el último año</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-sm">
                <span className="text-3xl md:text-4xl font-bold text-red-600">85%</span>
                <span className="text-sm text-center text-muted-foreground">
                  mejora en detección después de capacitación
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-sm">
                <span className="text-3xl md:text-4xl font-bold text-red-600">10K+</span>
                <span className="text-sm text-center text-muted-foreground">
                  personas capacitadas en nuestro programa
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Cursos Section */}
        <section id="cursos" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-600 w-fit">
                <BookOpen className="mr-1 h-3.5 w-3.5" />
                Cursos
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Capacítate con nuestros cursos
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Programas diseñados por expertos para ayudarte a identificar y combatir la desinformación digital.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-xl">
                <div className="absolute top-0 right-0 h-20 w-20 translate-x-6 -translate-y-6 bg-red-500 opacity-20 blur-2xl transition-all group-hover:opacity-40"></div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-full bg-red-100 p-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Fundamentos de Deepfakes</h3>
                </div>
                <p className="mb-4 text-muted-foreground">
                  Aprende qué son los deepfakes, cómo se crean y por qué son peligrosos.
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-sm font-medium">4 semanas</span>
                  <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                    Ver Curso
                  </Button>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-xl">
                <div className="absolute top-0 right-0 h-20 w-20 translate-x-6 -translate-y-6 bg-red-500 opacity-20 blur-2xl transition-all group-hover:opacity-40"></div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-full bg-red-100 p-2 text-red-600">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Detección Avanzada</h3>
                </div>
                <p className="mb-4 text-muted-foreground">
                  Técnicas y herramientas para identificar contenido manipulado digitalmente.
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-sm font-medium">6 semanas</span>
                  <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                    Ver Curso
                  </Button>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-xl">
                <div className="absolute top-0 right-0 h-20 w-20 translate-x-6 -translate-y-6 bg-red-500 opacity-20 blur-2xl transition-all group-hover:opacity-40"></div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-full bg-red-100 p-2 text-red-600">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Verificación de Hechos</h3>
                </div>
                <p className="mb-4 text-muted-foreground">
                  Metodologías para verificar la autenticidad de noticias e información en línea.
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-sm font-medium">3 semanas</span>
                  <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                    Ver Curso
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Juegos Section */}
        <section id="juegos" className="py-16 md:py-24 bg-slate-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-red-600/20 text-red-500 w-fit">
                <GamepadIcon className="mr-1 h-3.5 w-3.5" />
                Juegos
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Aprende jugando</h2>
              <p className="max-w-[700px] text-gray-300 md:text-xl">
                Juegos interactivos diseñados para entrenar tu ojo y mente en la detección de contenido manipulado.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="group relative overflow-hidden rounded-xl border border-gray-700 bg-slate-800 p-1">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Juego de detección de deepfakes"
                    width={600}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">Spot the Fake</h3>
                  <p className="mt-2 text-gray-400">
                    Pon a prueba tu capacidad para distinguir entre videos reales y deepfakes.
                  </p>
                  <Button className="mt-4 w-full" variant="destructive">
                    Jugar Ahora
                  </Button>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl border border-gray-700 bg-slate-800 p-1">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="Juego de verificación de noticias"
                    width={600}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">Fact Checker</h3>
                  <p className="mt-2 text-gray-400">
                    Conviértete en un verificador de hechos y detecta noticias falsas.
                  </p>
                  <Button className="mt-4 w-full" variant="destructive">
                    Jugar Ahora
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recursos Section */}
        <section id="recursos" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-600 w-fit">
                <FileText className="mr-1 h-3.5 w-3.5" />
                Recursos
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Herramientas y materiales</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Accede a recursos gratuitos para mantenerte informado y protegido.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-red-600" />
                  <h3 className="font-semibold">Guía de Detección</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  PDF con técnicas para identificar manipulaciones en imágenes y videos.
                </p>
                <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50">
                  Descargar
                </Button>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-red-600" />
                  <h3 className="font-semibold">Informe de Tendencias</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Análisis actualizado sobre las últimas tendencias en deepfakes.
                </p>
                <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50">
                  Descargar
                </Button>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-red-600" />
                  <h3 className="font-semibold">Kit de Herramientas</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Software y aplicaciones recomendadas para verificación de contenido.
                </p>
                <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50">
                  Descargar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-red-600 to-red-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Únete a nuestra comunidad de defensores digitales
                </h2>
                <p className="max-w-[600px] text-red-100 md:text-xl">
                  Recibe actualizaciones, acceso a recursos exclusivos y forma parte de una red global comprometida con
                  la lucha contra la desinformación.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="nombre" className="text-sm font-medium">
                        Nombre
                      </label>
                      <Input
                        id="nombre"
                        placeholder="Tu nombre"
                        className="bg-white/20 border-white/30 placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="apellido" className="text-sm font-medium">
                        Apellido
                      </label>
                      <Input
                        id="apellido"
                        placeholder="Tu apellido"
                        className="bg-white/20 border-white/30 placeholder:text-white/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="bg-white/20 border-white/30 placeholder:text-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="mensaje" className="text-sm font-medium">
                      Mensaje (opcional)
                    </label>
                    <Textarea
                      id="mensaje"
                      placeholder="¿Por qué te interesa este tema?"
                      className="bg-white/20 border-white/30 placeholder:text-white/50"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-white text-red-600 hover:bg-white/90">
                    Registrarme Ahora
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Lo que dicen nuestros participantes</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Experiencias de personas que han completado nuestros programas de capacitación.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-red-100 p-1">
                    <Image
                      src="/placeholder.svg?height=50&width=50"
                      alt="Avatar"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">María García</h4>
                    <p className="text-sm text-muted-foreground">Periodista</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Este programa cambió completamente mi forma de verificar información. Ahora tengo las herramientas
                  para identificar deepfakes con confianza."
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-red-100 p-1">
                    <Image
                      src="/placeholder.svg?height=50&width=50"
                      alt="Avatar"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Carlos Rodríguez</h4>
                    <p className="text-sm text-muted-foreground">Profesor</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Los recursos y juegos son excelentes para enseñar a mis estudiantes sobre la importancia de verificar
                  la información en la era digital."
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-red-100 p-1">
                    <Image
                      src="/placeholder.svg?height=50&width=50"
                      alt="Avatar"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Laura Martínez</h4>
                    <p className="text-sm text-muted-foreground">Estudiante</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Los juegos interactivos hacen que el aprendizaje sea divertido y efectivo. Ahora puedo identificar
                  señales de manipulación que antes pasaba por alto."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Preguntas frecuentes</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Respuestas a las dudas más comunes sobre nuestros programas.
              </p>
            </div>
            <div className="mx-auto max-w-3xl space-y-4">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold">¿Qué son exactamente los deepfakes?</h3>
                <p className="mt-2 text-muted-foreground">
                  Los deepfakes son videos, imágenes o audios sintéticos creados mediante inteligencia artificial que
                  manipulan o reemplazan la apariencia o voz de una persona de manera realista.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold">¿Por qué es importante saber identificarlos?</h3>
                <p className="mt-2 text-muted-foreground">
                  Los deepfakes pueden usarse para desinformación, fraude, suplantación de identidad y otros fines
                  maliciosos. Saber identificarlos es crucial para protegerse y mantener la integridad de la
                  información.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold">¿Necesito conocimientos técnicos para los cursos?</h3>
                <p className="mt-2 text-muted-foreground">
                  No, nuestros cursos están diseñados para todos los niveles. Comenzamos con conceptos básicos y
                  progresivamente avanzamos a técnicas más sofisticadas.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold">¿Los recursos son gratuitos?</h3>
                <p className="mt-2 text-muted-foreground">
                  Sí, ofrecemos recursos básicos gratuitos. Los cursos completos y herramientas avanzadas están
                  disponibles para miembros registrados.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-slate-900 text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-red-500" />
                <span className="font-bold text-xl">DeepFake Defender</span>
              </div>
              <p className="text-sm text-gray-400">
                Capacitando a las personas para identificar y combatir la desinformación digital.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#cursos" className="hover:text-white">
                    Cursos
                  </Link>
                </li>
                <li>
                  <Link href="#juegos" className="hover:text-white">
                    Juegos
                  </Link>
                </li>
                <li>
                  <Link href="#recursos" className="hover:text-white">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>info@deepfakedefender.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Ciudad, País</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suscríbete</h3>
              <p className="text-sm text-gray-400 mb-2">Recibe actualizaciones y nuevos recursos.</p>
              <form className="flex gap-2">
                <Input placeholder="Tu email" className="bg-slate-800 border-slate-700" />
                <Button variant="destructive" size="sm">
                  Enviar
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} DeepFake Defender. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
