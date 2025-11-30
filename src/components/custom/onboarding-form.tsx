"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile, Gender, Goal, ExperienceLevel } from '@/lib/types';
import { storage } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dumbbell, Bike, Apple, Heart } from 'lucide-react';

export default function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    objetivos: [],
    sexo: 'masculino', // valor inicial para o radio group funcionar
  });

  const handleSubmit = () => {
    const profile: UserProfile = {
      nome: formData.nome || '',
      idade: formData.idade || 0,
      sexo: formData.sexo || 'outro',
      peso: formData.peso || 0,
      altura: formData.altura || 0,
      objetivos: formData.objetivos || [],
      nivelAcademia: formData.nivelAcademia || 'iniciante',
      nivelPedal: formData.nivelPedal || 'iniciante',
      nivelCorrida: formData.nivelCorrida || 'iniciante',
      dataRegistro: new Date().toISOString(),
    };

    storage.saveUserProfile(profile);
    router.push('/dashboard');
  };

  const objetivosOptions: { value: Goal; label: string }[] = [
    { value: 'perder_peso', label: 'Perder Peso' },
    { value: 'ganhar_peso', label: 'Ganhar Peso' },
    { value: 'manter_peso', label: 'Manter Peso' },
    { value: 'ganhar_massa', label: 'Ganhar Massa Muscular' },
    { value: 'modificar_dieta', label: 'Modificar Minha Dieta' },
    { value: 'controlar_estresse', label: 'Controlar o Estresse' },
  ];

  const toggleObjetivo = (objetivo: Goal) => {
    const current = formData.objetivos || [];
    if (current.includes(objetivo)) {
      setFormData({
        ...formData,
        objetivos: current.filter(o => o !== objetivo),
      });
    } else {
      setFormData({
        ...formData,
        objetivos: [...current, objetivo],
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
            BRUTWS
          </h1>
          <p className="text-gray-400 text-lg">Seu app completo de fitness e nutrição</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Passo {step} de 3</span>
            <span className="text-sm text-gray-400">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-green-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-800">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Informações Básicas</h2>
              
              <div>
                <Label htmlFor="nome" className="text-gray-300">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome || ''}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white mt-2"
                  placeholder="Digite seu nome"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="idade" className="text-gray-300">Idade</Label>
                  <Input
                    id="idade"
                    type="number"
                    value={formData.idade || ''}
                    onChange={(e) => setFormData({ ...formData, idade: parseInt(e.target.value) })}
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    placeholder="Ex: 25"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Sexo</Label>
                  <RadioGroup
                    value={formData.sexo}
                    onValueChange={(value) => setFormData({ ...formData, sexo: value as Gender })}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="masculino" id="masculino" className="border-gray-600" />
                      <Label htmlFor="masculino" className="text-gray-300 cursor-pointer">Masculino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="feminino" id="feminino" className="border-gray-600" />
                      <Label htmlFor="feminino" className="text-gray-300 cursor-pointer">Feminino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outro" id="outro" className="border-gray-600" />
                      <Label htmlFor="outro" className="text-gray-300 cursor-pointer">Outro</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="peso" className="text-gray-300">Peso (kg)</Label>
                  <Input
                    id="peso"
                    type="number"
                    step="0.1"
                    value={formData.peso || ''}
                    onChange={(e) => setFormData({ ...formData, peso: parseFloat(e.target.value) })}
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    placeholder="Ex: 70.5"
                  />
                </div>

                <div>
                  <Label htmlFor="altura" className="text-gray-300">Altura (cm)</Label>
                  <Input
                    id="altura"
                    type="number"
                    value={formData.altura || ''}
                    onChange={(e) => setFormData({ ...formData, altura: parseInt(e.target.value) })}
                    className="bg-gray-800 border-gray-700 text-white mt-2"
                    placeholder="Ex: 175"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6 text-lg"
                disabled={!formData.nome || !formData.idade || !formData.peso || !formData.altura}
              >
                Continuar
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Seus Objetivos</h2>
              
              <div className="space-y-3">
                {objetivosOptions.map((objetivo) => (
                  <div
                    key={objetivo.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.objetivos?.includes(objetivo.value)
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                    onClick={() => toggleObjetivo(objetivo.value)}
                  >
                    <Checkbox
                      checked={formData.objetivos?.includes(objetivo.value)}
                      onCheckedChange={() => toggleObjetivo(objetivo.value)}
                      className="border-gray-600"
                    />
                    <Label className="text-gray-300 cursor-pointer flex-1">{objetivo.label}</Label>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:border-orange-600"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
                  disabled={!formData.objetivos || formData.objetivos.length === 0}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Nível de Experiência</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Academia */}
                <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Heart className="w-6 h-6 text-orange-500" />
                    </div>
                    <Label className="text-lg font-semibold text-white">Academia</Label>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">Planos de treino personalizados para todos</p>
                  <RadioGroup
                    value={formData.nivelAcademia}
                    onValueChange={(value) => setFormData({ ...formData, nivelAcademia: value as ExperienceLevel })}
                    className="space-y-2 flex-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="iniciante" id="academia-iniciante" />
                      <Label htmlFor="academia-iniciante" className="text-gray-300 cursor-pointer">Iniciante</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediario" id="academia-intermediario" />
                      <Label htmlFor="academia-intermediario" className="text-gray-300 cursor-pointer">Intermediário</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="avancado" id="academia-avancado" />
                      <Label htmlFor="academia-avancado" className="text-gray-300 cursor-pointer">Avançado</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Pedal/Corrida */}
                <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Bike className="w-6 h-6 text-yellow-500" />
                    </div>
                    <Label className="text-lg font-semibold text-white">Pedal / Corrida</Label>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">Treinos de cardio e resistência</p>
                  <RadioGroup
                    value={formData.nivelPedal}
                    onValueChange={(value) => setFormData({ ...formData, nivelPedal: value as ExperienceLevel, nivelCorrida: value as ExperienceLevel })}
                    className="space-y-2 flex-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="iniciante" id="pedal-iniciante" />
                      <Label htmlFor="pedal-iniciante" className="text-gray-300 cursor-pointer">Iniciante</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediario" id="pedal-intermediario" />
                      <Label htmlFor="pedal-intermediario" className="text-gray-300 cursor-pointer">Intermediário</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="avancado" id="pedal-avancado" />
                      <Label htmlFor="pedal-avancado" className="text-gray-300 cursor-pointer">Avançado</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 border-black bg-black text-white hover:bg-gray-900 hover:border-gray-800"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-6 text-lg"
                >
                  Começar Agora! 🚀
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
