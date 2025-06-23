"use client";

import {
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Bot,
  Eye,
  Mail,
  MessageCircle,
  Skull,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Roboto, } from 'next/font/google'

import { Merriweather } from 'next/font/google'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
})

export default function Briefing({ onStart }: { onStart: () => void }) {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `00:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const calculateTimeByLevel = (level: number) => {
    return 300; // Tiempo fijo de 5 minutos
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 relative ${roboto.className}`}
      style={{
        background: "linear-gradient(135deg,rgb(0, 0, 0) 0%,rgb(0, 18, 122) 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <Card className="max-w-4xl w-full relative z-10 border-blue-500 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50">
      <Card className="max-w-4xl w-full relative z-10 border-blue-500 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader className="text-center bg-gradient-to-r from-blue-800 to-blue-800 text-white rounded-t-lg">
          <CardTitle className={`text-4xl font-bold ${merriweather.className}`}>INVESTIGACIÓN DE DEEPFAKES</CardTitle>
          <CardDescription className="text-lg text-blue-100">
            Defendiendo el periodismo en la era de la IA
          </CardDescription>
        </CardHeader>
      </Card>

        <CardContent className="space-y-6 p-8">
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg border-2 border-red-500">
            <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2 text-xl">
              <AlertTriangle className="w-6 h-6" /> ALERTA DEEPFAKES
            </h3>
            <p className="text-red-700 font-medium leading-relaxed">
              <strong>Periodista Juan Rodríguez</strong>, la desinformación digital ha alcanzado niveles críticos.
              Tu misión es analizar contenido multimedia y determinar si es auténtico o deepfakes manipulados mediante IA.
              <br />
              <br />
              <span className="text-red-800 font-bold">El futuro de la verdad está en tus manos.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-20 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Target className="w-6 h-6" />OBJETIVOS PRINCIPALES
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
                  <span className="text-green-700 font-medium">Máximo 1 error crítico</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-md border border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center gap-2">
                  <Clock className="w-6 h-6" />SISTEMA DE TIEMPO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <p className="text-yellow-800 font-bold text-center text-lg">
                    TIEMPO INICIAL: {formatTime(calculateTimeByLevel(1))}
                  </p>
                </div>
                <div className="space-y-2 text-yellow-700 text-sm">
                  <p><strong>ADVERTENCIA:</strong> Ten mucho cuidado con el tiempo.</p>
                  <p>A medida que vayas acertando, el tiempo se incrementará</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-blue-10 to-indigo-20 p-6 rounded-lg border-2 border-blue-100">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2 text-xl">
              <div className="w-6 h-6" />CONDICIONES DE FALLO
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-red-800 font-bold">TIEMPO AGOTADO</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <XCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-orange-800 font-bold">2 ERRORES</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-yellow-800 font-bold">BAJA PRECISIÓN</p>
              </div>
            </div>
          </div>

        {/*
          <div className="bg-gradient-to-r from-blue-10 to-indigo-20 p-6 rounded-lg border-2 border-blue-100">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2 text-xl">
              <div className="w-6 h-6" />HERRAMIENTAS DISPONIBLES
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center">
                <Mail className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-blue-700 text-sm font-medium">Correos electrónicos</p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <p className="text-green-700 text-sm font-medium">WhatsApp</p>
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
        */}

          <div className="flex gap-4 pt-4">
            <Button
              onClick={onStart}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg py-4"
              size="lg"
            >
              <div className="w-6 h-6 mr-2" />INICIAR MISIÓN
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

          <div className="text-center text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
