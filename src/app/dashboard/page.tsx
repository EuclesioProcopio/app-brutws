"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { storage, calculations } from '@/lib/store';
import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dumbbell, Bike, Apple, User, TrendingUp, Calendar, Target, LogOut } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [imc, setImc] = useState<number>(0);
  const [tmb, setTmb] = useState<number>(0);

  useEffect(() => {
    const userProfile = storage.getUserProfile();
    if (!userProfile) {
      router.push('/');
      return;
    }
    
    setProfile(userProfile);
    setImc(calculations.calcularIMC(userProfile.peso, userProfile.altura));
    setTmb(calculations.calcularTMB(userProfile.peso, userProfile.altura, userProfile.idade, userProfile.sexo));
  }, [router]);

  const handleLogout = () => {
    storage.clearAllData();
    router.push('/');
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  const getIMCStatus = (imc: number) => {
    if (imc < 18.5) return { text: 'Abaixo do peso', color: 'text-blue-400' };
    if (imc < 25) return { text: 'Peso normal', color: 'text-green-400' };
    if (imc < 30) return { text: 'Sobrepeso', color: 'text-yellow-400' };
    return { text: 'Obesidade', color: 'text-red-400' };
  };

  const imcStatus = getIMCStatus(imc);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
              BRUTWS
            </h1>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Olá, {profile.nome.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-400">Pronto para alcançar seus objetivos hoje?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">Peso Atual</span>
            </div>
            <p className="text-2xl font-bold">{profile.peso} kg</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">IMC</span>
            </div>
            <p className="text-2xl font-bold">{imc.toFixed(1)}</p>
            <p className={`text-xs ${imcStatus.color}`}>{imcStatus.text}</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">TMB</span>
            </div>
            <p className="text-2xl font-bold">{Math.round(tmb)}</p>
            <p className="text-xs text-gray-400">kcal/dia</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">Objetivos</span>
            </div>
            <p className="text-2xl font-bold">{profile.objetivos.length}</p>
            <p className="text-xs text-gray-400">ativos</p>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Academia */}
          <Link href="/academia">
            <div className="group relative bg-gradient-to-br from-orange-500/20 to-orange-600/10 hover:from-orange-500/30 hover:to-orange-600/20 border-2 border-orange-500/50 hover:border-orange-500 rounded-2xl p-8 transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/10 group-hover:to-orange-600/10 transition-all duration-300" />
              
              <div className="relative z-10">
                <div className="bg-orange-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Dumbbell className="w-8 h-8 text-orange-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Academia</h3>
                <p className="text-gray-400 mb-4">
                  Planos de treino personalizados para todos os grupos musculares
                </p>
                
                <div className="flex items-center text-orange-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Começar treino
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Pedal/Caminhada */}
          <Link href="/pedal">
            <div className="group relative bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 hover:from-yellow-500/30 hover:to-yellow-600/20 border-2 border-yellow-500/50 hover:border-yellow-500 rounded-2xl p-8 transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-yellow-600/0 group-hover:from-yellow-500/10 group-hover:to-yellow-600/10 transition-all duration-300" />
              
              <div className="relative z-10">
                <div className="bg-yellow-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Bike className="w-8 h-8 text-yellow-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Pedal/Caminhada</h3>
                <p className="text-gray-400 mb-4">
                  Rotas, mapas e comunidade para ciclistas e corredores
                </p>
                
                <div className="flex items-center text-yellow-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Explorar rotas
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Dieta */}
          <Link href="/dieta">
            <div className="group relative bg-gradient-to-br from-green-500/20 to-green-600/10 hover:from-green-500/30 hover:to-green-600/20 border-2 border-green-500/50 hover:border-green-500 rounded-2xl p-8 transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-600/0 group-hover:from-green-500/10 group-hover:to-green-600/10 transition-all duration-300" />
              
              <div className="relative z-10">
                <div className="bg-green-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Apple className="w-8 h-8 text-green-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Dieta</h3>
                <p className="text-gray-400 mb-4">
                  Controle de calorias, macros e planos alimentares personalizados
                </p>
                
                <div className="flex items-center text-green-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Gerenciar dieta
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold mb-4">Seus Objetivos Ativos</h3>
          <div className="flex flex-wrap gap-2">
            {profile.objetivos.map((objetivo) => {
              const labels: Record<string, string> = {
                perder_peso: 'Perder Peso',
                ganhar_peso: 'Ganhar Peso',
                manter_peso: 'Manter Peso',
                ganhar_massa: 'Ganhar Massa',
                modificar_dieta: 'Modificar Dieta',
                controlar_estresse: 'Controlar Estresse',
              };
              
              return (
                <span
                  key={objetivo}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-green-500/20 border border-orange-500/30 rounded-full text-sm font-medium"
                >
                  {labels[objetivo]}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
