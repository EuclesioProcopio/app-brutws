// Tipos do aplicativo Brutws

export type Gender = 'masculino' | 'feminino' | 'outro';
export type Goal = 'perder_peso' | 'ganhar_peso' | 'manter_peso' | 'ganhar_massa' | 'modificar_dieta' | 'controlar_estresse';
export type ExperienceLevel = 'iniciante' | 'intermediario' | 'avancado';

export interface UserProfile {
  nome: string;
  idade: number;
  sexo: Gender;
  peso: number; // kg
  altura: number; // cm
  objetivos: Goal[];
  nivelAcademia: ExperienceLevel;
  nivelPedal: ExperienceLevel;
  nivelCorrida: ExperienceLevel;
  dataRegistro: string;
}

export interface WorkoutPlan {
  id: string;
  nome: string;
  categoria: string;
  nivel: ExperienceLevel;
  diasPorSemana: number;
  exercicios: Exercise[];
  alongamentos: string[];
}

export interface Exercise {
  nome: string;
  series: number;
  repeticoes: string;
  descanso: string;
  grupoMuscular: string;
  videoUrl?: string;
}

export interface Route {
  id: string;
  nome: string;
  distancia: number; // km
  tipo: 'ciclismo' | 'corrida' | 'caminhada';
  dificuldade: ExperienceLevel;
  elevacao: number;
  duracao: number; // minutos
  coordenadas: [number, number][];
}

export interface Meal {
  id: string;
  nome: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  porcao: string;
}

export interface DailyLog {
  data: string;
  caloriasConsumidas: number;
  caloriasQueimadas: number;
  peso: number;
  treinos: string[];
  refeicoes: Meal[];
}
