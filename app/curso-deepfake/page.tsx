"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CursoDeepfake() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-300">
      <div className="container mx-auto py-20 px-4">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">Curso Básico de Concienciación sobre Deepfakes</h1>
        <p className="text-center max-w-2xl mx-auto mb-12">
          Aprende qué son los deepfakes, sus riesgos y cómo protegerte. Curso introductorio gratuito en español.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Módulos */}
          <Link href="#modulo1" className="block p-6 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Módulo 1: Qué es un Deepfake</h3>
            <p className="text-slate-400 text-sm">Entiende qué son los deepfakes y cómo se han convertido en un fenómeno digital.</p>
          </Link>

          <Link href="#modulo2" className="block p-6 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Módulo 2: Cómo se crean</h3>
            <p className="text-slate-400 text-sm">Aprende de forma sencilla cómo funcionan las tecnologías detrás de los deepfakes.</p>
          </Link>

          <Link href="#modulo3" className="block p-6 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Módulo 3: Riesgos y Amenazas</h3>
            <p className="text-slate-400 text-sm">Conoce los peligros que representan los deepfakes en la sociedad y a nivel personal.</p>
          </Link>

          <Link href="#modulo4" className="block p-6 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Módulo 4: Cómo Detectarlos</h3>
            <p className="text-slate-400 text-sm">Descubre consejos para identificar deepfakes y protegerte de fraudes o engaños.</p>
          </Link>

          <Link href="#modulo5" className="block p-6 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Módulo 5: Qué Hacer Si Encuentras Uno</h3>
            <p className="text-slate-400 text-sm">Acciones a tomar si sospechás que un contenido es deepfake.</p>
          </Link>

          <Link href="#modulo6" className="block p-6 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Módulo 6: Ética y Leyes</h3>
            <p className="text-slate-400 text-sm">Aspectos legales y éticos relacionados con la creación y distribución de deepfakes.</p>
          </Link>
        </div>

        {/* Contenido de los módulos */}
        <div className="mt-16 space-y-16 max-w-3xl mx-auto">
          <div id="modulo1">
            <Badge className="mb-2 bg-purple-600 text-white">Módulo 1</Badge>
            <h2 className="text-3xl text-white mb-4">Qué es un Deepfake</h2>
            <p>
              Los deepfakes son contenidos digitales manipulados con inteligencia artificial para simular rostros, voces o acciones de personas reales.
              Aunque pueden tener usos creativos, también se emplean para fraudes, desinformación o ciberacoso.
            </p>
          </div>

          <div id="modulo2">
            <Badge className="mb-2 bg-purple-600 text-white">Módulo 2</Badge>
            <h2 className="text-3xl text-white mb-4">Cómo se crean</h2>
            <p>
              Se utilizan redes neuronales para analizar imágenes o audios reales y producir imitaciones casi idénticas. La IA aprende patrones y logra reproducir gestos, voces y rostros.
            </p>
          </div>

          <div id="modulo3">
            <Badge className="mb-2 bg-purple-600 text-white">Módulo 3</Badge>
            <h2 className="text-3xl text-white mb-4">Riesgos y Amenazas</h2>
            <ul className="list-disc list-inside text-slate-300">
              <li>Suplantación de identidad para fraudes económicos.</li>
              <li>Creación de noticias falsas.</li>
              <li>Videos comprometidos falsos.</li>
              <li>Difamación y daño reputacional.</li>
            </ul>
          </div>

          <div id="modulo4">
            <Badge className="mb-2 bg-purple-600 text-white">Módulo 4</Badge>
            <h2 className="text-3xl text-white mb-4">Cómo Detectarlos</h2>
            <ul className="list-disc list-inside text-slate-300">
              <li>Movimientos de labios que no coinciden con el audio.</li>
              <li>Parpadeo anormal o poco frecuente.</li>
              <li>Sombras o luces incoherentes.</li>
              <li>Fondo distorsionado o poco definido.</li>
              <li>Voces metálicas o poco naturales.</li>
            </ul>
          </div>

          <div id="modulo5">
            <Badge className="mb-2 bg-purple-600 text-white">Módulo 5</Badge>
            <h2 className="text-3xl text-white mb-4">Qué Hacer Si Encuentras Uno</h2>
            <ul className="list-disc list-inside text-slate-300">
              <li>No compartirlo si no estás seguro de su veracidad.</li>
              <li>Verificar con medios confiables o herramientas online.</li>
              <li>Reportar el contenido en redes sociales o autoridades.</li>
              <li>Buscar ayuda legal si sos víctima de un deepfake.</li>
            </ul>
          </div>

          <div id="modulo6">
            <Badge className="mb-2 bg-purple-600 text-white">Módulo 6</Badge>
            <h2 className="text-3xl text-white mb-4">Ética y Leyes</h2>
            <p>
              Muchos países están legislando contra deepfakes usados para dañar a personas. Suplantar identidades, difamar o extorsionar usando deepfakes puede tener consecuencias legales.
              Es importante usar esta tecnología de forma ética y responsable.
            </p>
          </div>
        </div>

        <div className="text-center mt-20">
          <Link href="/">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Volver al Inicio</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
