"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { storage } from '@/lib/store';
import { UserProfile, ExperienceLevel } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Dumbbell, Play, Clock, Flame, Target, TrendingUp } from 'lucide-react';

interface WorkoutCategory {
  id: string;
  nome: string;
  descricao: string;
  grupoMuscular: string;
  icon: string;
}

export default function AcademiaPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const userProfile = storage.getUserProfile();
    if (!userProfile) {
      router.push('/');
      return;
    }
    setProfile(userProfile);
  }, [router]);

  if (!profile) return null;

  const workoutCategories: WorkoutCategory[] = [
    { id: 'bracos', nome: 'Braços Fortes', descricao: 'Bíceps e antebraço', grupoMuscular: 'Braços', icon: '💪' },
    { id: 'peito', nome: 'Peito Definido', descricao: 'Peitoral completo', grupoMuscular: 'Peito', icon: '🦾' },
    { id: 'costas', nome: 'Costas Largas', descricao: 'Dorsais e trapézio', grupoMuscular: 'Costas', icon: '🏋️' },
    { id: 'pernas', nome: 'Pernas Fortes', descricao: 'Quadríceps e posterior', grupoMuscular: 'Pernas', icon: '🦵' },
    { id: 'ombros', nome: 'Ombros 3D', descricao: 'Deltoides completo', grupoMuscular: 'Ombros', icon: '💪' },
    { id: 'gluteos', nome: 'Glúteos Definidos', descricao: 'Glúteo máximo e médio', grupoMuscular: 'Glúteos', icon: '🍑' },
    { id: 'triceps', nome: 'Tríceps Definido', descricao: 'Três cabeças do tríceps', grupoMuscular: 'Braços', icon: '💪' },
    { id: 'abdomen', nome: 'Abdômen Definido', descricao: 'Core completo', grupoMuscular: 'Abdômen', icon: '🔥' },
    { id: 'crossfit', nome: 'CrossFit', descricao: 'Treino funcional intenso', grupoMuscular: 'Full Body', icon: '⚡' },
    { id: 'powerlifting', nome: 'Powerlifting', descricao: 'Força máxima', grupoMuscular: 'Full Body', icon: '🏆' },
  ];

  const getWorkoutPlan = (categoryId: string, nivel: ExperienceLevel) => {
    const planos: Record<string, Record<ExperienceLevel, any>> = {
      bracos: {
        iniciante: {
          diasPorSemana: 2,
          exercicios: [
            { nome: 'Rosca Direta com Barra', series: 3, repeticoes: '12-15', descanso: '60s' },
            { nome: 'Rosca Martelo', series: 3, repeticoes: '12-15', descanso: '60s' },
            { nome: 'Rosca Concentrada', series: 3, repeticoes: '10-12', descanso: '60s' },
          ],
          alongamentos: ['Alongamento de bíceps na parede', 'Rotação de punhos', 'Alongamento de antebraço'],
        },
        intermediario: {
          diasPorSemana: 3,
          exercicios: [
            { nome: 'Rosca Direta com Barra', series: 4, repeticoes: '10-12', descanso: '60s' },
            { nome: 'Rosca Alternada', series: 4, repeticoes: '10-12', descanso: '60s' },
            { nome: 'Rosca Scott', series: 3, repeticoes: '12-15', descanso: '45s' },
            { nome: 'Rosca Inversa', series: 3, repeticoes: '12-15', descanso: '45s' },
          ],
          alongamentos: ['Alongamento de bíceps na parede', 'Rotação de punhos', 'Alongamento de antebraço', 'Flexão e extensão de dedos'],
        },
        avancado: {
          diasPorSemana: 4,
          exercicios: [
            { nome: 'Rosca Direta com Barra', series: 5, repeticoes: '8-10', descanso: '90s' },
            { nome: 'Rosca 21', series: 3, repeticoes: '21 (7+7+7)', descanso: '60s' },
            { nome: 'Rosca Scott', series: 4, repeticoes: '10-12', descanso: '60s' },
            { nome: 'Rosca Martelo', series: 4, repeticoes: '10-12', descanso: '60s' },
            { nome: 'Rosca Concentrada', series: 3, repeticoes: '12-15', descanso: '45s' },
          ],
          alongamentos: ['Alongamento de bíceps na parede', 'Rotação de punhos', 'Alongamento de antebraço', 'Flexão e extensão de dedos', 'Massagem de antebraço'],
        },
      },
      peito: {
        iniciante: {
          diasPorSemana: 2,
          exercicios: [
            { nome: 'Supino Reto', series: 3, repeticoes: '12-15', descanso: '90s' },
            { nome: 'Supino Inclinado', series: 3, repeticoes: '12-15', descanso: '90s' },
            { nome: 'Crucifixo', series: 3, repeticoes: '12-15', descanso: '60s' },
          ],
          alongamentos: ['Alongamento de peito na porta', 'Rotação de ombros', 'Alongamento de peitoral'],
        },
        intermediario: {
          diasPorSemana: 3,
          exercicios: [
            { nome: 'Supino Reto', series: 4, repeticoes: '10-12', descanso: '90s' },
            { nome: 'Supino Inclinado', series: 4, repeticoes: '10-12', descanso: '90s' },
            { nome: 'Crucifixo Inclinado', series: 3, repeticoes: '12-15', descanso: '60s' },
            { nome: 'Flexão de Braço', series: 3, repeticoes: 'até a falha', descanso: '60s' },
          ],
          alongamentos: ['Alongamento de peito na porta', 'Rotação de ombros', 'Alongamento de peitoral', 'Alongamento cruzado'],
        },
        avancado: {
          diasPorSemana: 4,
          exercicios: [
            { nome: 'Supino Reto', series: 5, repeticoes: '8-10', descanso: '120s' },
            { nome: 'Supino Inclinado', series: 4, repeticoes: '10-12', descanso: '90s' },
            { nome: 'Supino Declinado', series: 4, repeticoes: '10-12', descanso: '90s' },
            { nome: 'Crucifixo Inclinado', series: 4, repeticoes: '12-15', descanso: '60s' },
            { nome: 'Pullover', series: 3, repeticoes: '12-15', descanso: '60s' },
          ],
          alongamentos: ['Alongamento de peito na porta', 'Rotação de ombros', 'Alongamento de peitoral', 'Alongamento cruzado', 'Mobilidade torácica'],
        },
      },
    };

    return planos[categoryId]?.[nivel] || planos.bracos.iniciante;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Dumbbell className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-500">Academia</h1>
                <p className="text-sm text-gray-400">Nível: {profile.nivelAcademia}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-gray-400">Treinos/Semana</span>
            </div>
            <p className="text-2xl font-bold">3-4x</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-gray-400">Duração Média</span>
            </div>
            <p className="text-2xl font-bold">60min</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-gray-400">Calorias/Treino</span>
            </div>
            <p className="text-2xl font-bold">~400</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-gray-400">Progresso</span>
            </div>
            <p className="text-2xl font-bold">0%</p>
          </div>
        </div>

        {/* Workout Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Escolha seu Treino</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workoutCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-orange-500/50 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-500 rounded-full">
                    {category.grupoMuscular}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-orange-500 transition-colors">
                  {category.nome}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{category.descricao}</p>
                <div className="flex items-center text-orange-500 text-sm font-semibold">
                  <Play className="w-4 h-4 mr-2" />
                  Ver treino
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Plan Detail */}
        {selectedCategory && (
          <div className="bg-gray-900 rounded-2xl p-6 border border-orange-500/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Plano de Treino - {workoutCategories.find(c => c.id === selectedCategory)?.nome}
              </h2>
              <Button
                onClick={() => setSelectedCategory(null)}
                variant="ghost"
                className="text-gray-400"
              >
                Fechar
              </Button>
            </div>

            {(() => {
              const plan = getWorkoutPlan(selectedCategory, profile.nivelAcademia);
              return (
                <div className="space-y-6">
                  {/* Info */}
                  <div className="bg-gray-800 p-4 rounded-xl">
                    <p className="text-gray-300">
                      <span className="font-semibold text-orange-500">Frequência:</span> {plan.diasPorSemana}x por semana
                    </p>
                    <p className="text-gray-300 mt-2">
                      <span className="font-semibold text-orange-500">Nível:</span> {profile.nivelAcademia}
                    </p>
                  </div>

                  {/* Alongamentos */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-orange-500">Alongamentos Pré-Treino</h3>
                    <div className="space-y-2">
                      {plan.alongamentos.map((along: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
                          <span className="text-orange-500 font-bold">{idx + 1}</span>
                          <span className="text-gray-300">{along}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exercícios */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-orange-500">Exercícios</h3>
                    <div className="space-y-3">
                      {plan.exercicios.map((ex: any, idx: number) => (
                        <div key={idx} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-white">{ex.nome}</h4>
                            <Play className="w-5 h-5 text-orange-500 cursor-pointer hover:scale-110 transition-transform" />
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Séries:</span>
                              <p className="font-semibold text-orange-500">{ex.series}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Repetições:</span>
                              <p className="font-semibold text-orange-500">{ex.repeticoes}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Descanso:</span>
                              <p className="font-semibold text-orange-500">{ex.descanso}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6">
                    Iniciar Treino
                  </Button>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
