"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { storage, calculations } from '@/lib/store';
import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Apple, Camera, Barcode, TrendingUp, Target, Flame, Clock, Plus } from 'lucide-react';

interface FoodItem {
  nome: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  porcao: string;
}

export default function DietaPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'diario' | 'jejum' | 'scanner'>('diario');
  const [caloriasConsumidas, setCaloriasConsumidas] = useState(0);
  const [metaCalorias, setMetaCalorias] = useState(0);
  const [searchFood, setSearchFood] = useState('');

  useEffect(() => {
    const userProfile = storage.getUserProfile();
    if (!userProfile) {
      router.push('/');
      return;
    }
    setProfile(userProfile);
    
    // Calcular meta de calorias baseado no objetivo
    const tmb = calculations.calcularTMB(userProfile.peso, userProfile.altura, userProfile.idade, userProfile.sexo);
    const caloriasBase = calculations.calcularCaloriasDiarias(tmb, 'moderado');
    
    // Ajustar baseado no objetivo
    let metaAjustada = caloriasBase;
    if (userProfile.objetivos.includes('perder_peso')) {
      metaAjustada = caloriasBase - 500; // Déficit de 500 kcal
    } else if (userProfile.objetivos.includes('ganhar_peso') || userProfile.objetivos.includes('ganhar_massa')) {
      metaAjustada = caloriasBase + 500; // Superávit de 500 kcal
    }
    
    setMetaCalorias(Math.round(metaAjustada));
  }, [router]);

  if (!profile) return null;

  const alimentosComuns: FoodItem[] = [
    { nome: 'Peito de Frango Grelhado', calorias: 165, proteinas: 31, carboidratos: 0, gorduras: 3.6, porcao: '100g' },
    { nome: 'Arroz Integral', calorias: 111, proteinas: 2.6, carboidratos: 23, gorduras: 0.9, porcao: '100g' },
    { nome: 'Batata Doce', calorias: 86, proteinas: 1.6, carboidratos: 20, gorduras: 0.1, porcao: '100g' },
    { nome: 'Ovo Cozido', calorias: 155, proteinas: 13, carboidratos: 1.1, gorduras: 11, porcao: '1 unidade' },
    { nome: 'Banana', calorias: 89, proteinas: 1.1, carboidratos: 23, gorduras: 0.3, porcao: '1 unidade' },
    { nome: 'Aveia', calorias: 389, proteinas: 17, carboidratos: 66, gorduras: 7, porcao: '100g' },
    { nome: 'Whey Protein', calorias: 120, proteinas: 24, carboidratos: 3, gorduras: 1.5, porcao: '30g' },
    { nome: 'Salmão Grelhado', calorias: 208, proteinas: 20, carboidratos: 0, gorduras: 13, porcao: '100g' },
  ];

  const filteredFoods = alimentosComuns.filter(food =>
    food.nome.toLowerCase().includes(searchFood.toLowerCase())
  );

  const addFood = (food: FoodItem) => {
    setCaloriasConsumidas(prev => prev + food.calorias);
  };

  const percentualCalorias = (caloriasConsumidas / metaCalorias) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="bg-orange-600 hover:bg-orange-700 text-white border-orange-600">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Apple className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-500">Dieta</h1>
                <p className="text-sm text-gray-400">Controle nutricional completo</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Daily Summary */}
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-2 border-green-500/50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Resumo de Hoje</h2>
            <span className="text-sm text-gray-400">{new Date().toLocaleDateString('pt-BR')}</span>
          </div>

          {/* Calorie Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Calorias</span>
              <span className="text-sm font-semibold">
                {caloriasConsumidas} / {metaCalorias} kcal
              </span>
            </div>
            <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
                style={{ width: `${Math.min(percentualCalorias, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {metaCalorias - caloriasConsumidas > 0
                ? `Restam ${metaCalorias - caloriasConsumidas} kcal`
                : `Excedeu em ${caloriasConsumidas - metaCalorias} kcal`}
            </p>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-900/50 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-400 mb-1">Proteínas</p>
              <p className="text-2xl font-bold text-green-500">0g</p>
              <p className="text-xs text-gray-400">Meta: {Math.round(profile.peso * 2)}g</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-400 mb-1">Carboidratos</p>
              <p className="text-2xl font-bold text-green-500">0g</p>
              <p className="text-xs text-gray-400">Meta: {Math.round(metaCalorias * 0.5 / 4)}g</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-400 mb-1">Gorduras</p>
              <p className="text-2xl font-bold text-green-500">0g</p>
              <p className="text-xs text-gray-400">Meta: {Math.round(metaCalorias * 0.25 / 9)}g</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-400">Peso Atual</span>
            </div>
            <p className="text-2xl font-bold">{profile.peso} kg</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-400">IMC</span>
            </div>
            <p className="text-2xl font-bold">
              {calculations.calcularIMC(profile.peso, profile.altura).toFixed(1)}
            </p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-400">TMB</span>
            </div>
            <p className="text-2xl font-bold">
              {Math.round(calculations.calcularTMB(profile.peso, profile.altura, profile.idade, profile.sexo))}
            </p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-400">Sequência</span>
            </div>
            <p className="text-2xl font-bold">0 dias</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('diario')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'diario'
                ? 'bg-green-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Apple className="w-4 h-4 inline mr-2" />
            Diário
          </button>
          <button
            onClick={() => setActiveTab('jejum')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'jejum'
                ? 'bg-green-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            Jejum
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'scanner'
                ? 'bg-green-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Barcode className="w-4 h-4 inline mr-2" />
            Scanner
          </button>
        </div>

        {/* Content */}
        {activeTab === 'diario' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Input
                value={searchFood}
                onChange={(e) => setSearchFood(e.target.value)}
                placeholder="Buscar alimento..."
                className="bg-gray-900 border-gray-800 text-white pl-4 pr-10"
              />
              <Plus className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Food List */}
            <div>
              <h3 className="text-lg font-bold mb-4">Banco de Alimentos</h3>
              <div className="space-y-3">
                {filteredFoods.map((food, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-green-500/50 rounded-xl p-4 cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold group-hover:text-green-500 transition-colors">
                          {food.nome}
                        </h4>
                        <p className="text-sm text-gray-400">{food.porcao}</p>
                      </div>
                      <Button
                        onClick={() => addFood(food)}
                        size="sm"
                        className="bg-green-500/20 hover:bg-green-500/30 text-green-500 border border-green-500/50"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-gray-400">Calorias</span>
                        <p className="font-semibold text-green-500">{food.calorias}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Proteínas</span>
                        <p className="font-semibold text-green-500">{food.proteinas}g</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Carbs</span>
                        <p className="font-semibold text-green-500">{food.carboidratos}g</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Gorduras</span>
                        <p className="font-semibold text-green-500">{food.gorduras}g</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jejum' && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
              <Clock className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Jejum Intermitente</h3>
              <p className="text-gray-400 mb-6">
                Controle seu período de jejum e alimentação com timer inteligente
              </p>

              <div className="bg-gray-800 p-6 rounded-xl mb-6">
                <p className="text-sm text-gray-400 mb-2">Protocolo Atual</p>
                <p className="text-3xl font-bold text-green-500 mb-1">16:8</p>
                <p className="text-sm text-gray-400">16h jejum / 8h alimentação</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-xl">
                  <p className="text-sm text-gray-400 mb-1">Início do Jejum</p>
                  <p className="text-xl font-bold text-green-500">20:00</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl">
                  <p className="text-sm text-gray-400 mb-1">Fim do Jejum</p>
                  <p className="text-xl font-bold text-green-500">12:00</p>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-6">
                Iniciar Jejum
              </Button>
            </div>

            {/* Protocolos */}
            <div>
              <h3 className="text-lg font-bold mb-4">Protocolos Populares</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 hover:border-green-500/50 cursor-pointer transition-all">
                  <p className="text-2xl font-bold text-green-500 mb-1">16:8</p>
                  <p className="text-sm text-gray-400">Mais popular para iniciantes</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 hover:border-green-500/50 cursor-pointer transition-all">
                  <p className="text-2xl font-bold text-green-500 mb-1">18:6</p>
                  <p className="text-sm text-gray-400">Intermediário</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 hover:border-green-500/50 cursor-pointer transition-all">
                  <p className="text-2xl font-bold text-green-500 mb-1">20:4</p>
                  <p className="text-sm text-gray-400">Avançado</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scanner' && (
          <div className="space-y-6">
            {/* Barcode Scanner */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
              <Barcode className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Scanner de Código de Barras</h3>
              <p className="text-gray-400 mb-6">
                Escaneie o código de barras do alimento para obter informações nutricionais instantâneas
              </p>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold">
                Abrir Scanner (Em breve)
              </Button>
            </div>

            {/* Photo Scanner */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
              <Camera className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Detecção por Foto</h3>
              <p className="text-gray-400 mb-6">
                Tire uma foto do seu prato e nossa IA calculará as calorias automaticamente
              </p>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold">
                Tirar Foto (Em breve)
              </Button>
            </div>

            {/* Info */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-green-500">💡 Dica:</span> Essas funcionalidades usam tecnologia de IA avançada para reconhecer alimentos e calcular valores nutricionais com precisão.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
