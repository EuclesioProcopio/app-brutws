"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { storage } from '@/lib/store';
import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bike, MapPin, Users, Trophy, Target, TrendingUp, Clock, Flame, Navigation } from 'lucide-react';

interface Route {
  id: string;
  nome: string;
  distancia: number;
  tipo: 'ciclismo' | 'corrida' | 'caminhada';
  dificuldade: string;
  elevacao: number;
  duracao: number;
  popularidade: number;
}

export default function PedalPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'rotas' | 'comunidade' | 'metas'>('rotas');
  const [locationStatus, setLocationStatus] = useState<string>('');

  useEffect(() => {
    const userProfile = storage.getUserProfile();
    if (!userProfile) {
      router.push('/');
      return;
    }
    setProfile(userProfile);
  }, [router]);

  const handleLocationClick = () => {
    setLocationStatus('Verificando permissões...');
    
    // Verifica se o navegador suporta geolocalização
    if (!('geolocation' in navigator)) {
      setLocationStatus('Geolocalização não suportada. Abrindo Google Maps...');
      setTimeout(() => {
        window.open('https://www.google.com/maps', '_blank');
        setLocationStatus('');
      }, 2000);
      return;
    }

    // Verifica permissões primeiro
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'denied') {
          setLocationStatus('⚠️ Permissão de localização negada. Para ativar: vá em Configurações do navegador > Permissões > Localização e permita para este site.');
          setTimeout(() => {
            window.open('https://www.google.com/maps', '_blank');
            setLocationStatus('');
          }, 5000);
          return;
        }
        
        // Se não foi negada, tenta obter localização
        obterLocalizacao();
      }).catch(() => {
        // Se a API de permissões não funcionar, tenta obter localização diretamente
        obterLocalizacao();
      });
    } else {
      // Se a API de permissões não existir, tenta obter localização diretamente
      obterLocalizacao();
    }
  };

  const obterLocalizacao = () => {
    setLocationStatus('Obtendo sua localização...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocationStatus(`✅ Localização obtida! Abrindo mapa...`);
        
        setTimeout(() => {
          window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
          setLocationStatus('');
        }, 1000);
      },
      (error) => {
        let errorMessage = '';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '⚠️ Permissão de localização negada. Para ativar: vá em Configurações do navegador > Permissões > Localização e permita para este site.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = '⚠️ Localização indisponível no momento. Abrindo Google Maps...';
            break;
          case error.TIMEOUT:
            errorMessage = '⚠️ Tempo esgotado ao obter localização. Abrindo Google Maps...';
            break;
          default:
            errorMessage = '⚠️ Erro ao obter localização. Abrindo Google Maps...';
        }
        
        setLocationStatus(errorMessage);
        
        setTimeout(() => {
          window.open('https://www.google.com/maps', '_blank');
          setLocationStatus('');
        }, error.code === error.PERMISSION_DENIED ? 5000 : 2000);
      },
      {
        enableHighAccuracy: false, // Menos restritivo
        timeout: 10000,
        maximumAge: 60000 // Aceita cache de até 1 minuto
      }
    );
  };

  if (!profile) return null;

  const rotasPopulares: Route[] = [
    {
      id: '1',
      nome: 'Circuito Parque Ibirapuera',
      distancia: 5.2,
      tipo: 'ciclismo',
      dificuldade: 'Fácil',
      elevacao: 15,
      duracao: 20,
      popularidade: 95,
    },
    {
      id: '2',
      nome: 'Avenida Paulista - Faria Lima',
      distancia: 12.5,
      tipo: 'ciclismo',
      dificuldade: 'Moderado',
      elevacao: 120,
      duracao: 45,
      popularidade: 88,
    },
    {
      id: '3',
      nome: 'Corrida Marginal Pinheiros',
      distancia: 8.0,
      tipo: 'corrida',
      dificuldade: 'Fácil',
      elevacao: 5,
      duracao: 50,
      popularidade: 92,
    },
    {
      id: '4',
      nome: 'Trilha Horto Florestal',
      distancia: 15.3,
      tipo: 'ciclismo',
      dificuldade: 'Difícil',
      elevacao: 350,
      duracao: 90,
      popularidade: 78,
    },
    {
      id: '5',
      nome: 'Caminhada Parque Villa-Lobos',
      distancia: 3.5,
      tipo: 'caminhada',
      dificuldade: 'Fácil',
      elevacao: 10,
      duracao: 45,
      popularidade: 85,
    },
  ];

  const getDificuldadeColor = (dificuldade: string) => {
    switch (dificuldade) {
      case 'Fácil':
        return 'text-green-500 bg-green-500/20';
      case 'Moderado':
        return 'text-yellow-500 bg-yellow-500/20';
      case 'Difícil':
        return 'text-red-500 bg-red-500/20';
      default:
        return 'text-gray-500 bg-gray-500/20';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'ciclismo':
        return '🚴';
      case 'corrida':
        return '🏃';
      case 'caminhada':
        return '🚶';
      default:
        return '🏃';
    }
  };

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
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Bike className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-yellow-500">Pedal/Caminhada</h1>
                <p className="text-sm text-gray-400">Nível: {profile.nivelPedal}</p>
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
              <Target className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-400">Distância Total</span>
            </div>
            <p className="text-2xl font-bold">0 km</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-400">Tempo Total</span>
            </div>
            <p className="text-2xl font-bold">0h</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-400">Calorias</span>
            </div>
            <p className="text-2xl font-bold">0</p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-400">Atividades</span>
            </div>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('rotas')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'rotas'
                ? 'bg-yellow-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            Rotas
          </button>
          <button
            onClick={() => setActiveTab('comunidade')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'comunidade'
                ? 'bg-yellow-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Comunidade
          </button>
          <button
            onClick={() => setActiveTab('metas')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'metas'
                ? 'bg-yellow-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4 inline mr-2" />
            Metas
          </button>
        </div>

        {/* Content */}
        {activeTab === 'rotas' && (
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="text-center mb-6">
                <MapPin className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Mapa Interativo</h3>
                <p className="text-gray-400 mb-4">
                  Abra o Google Maps para visualizar rotas e sua localização
                </p>
              </div>

              <Button 
                onClick={handleLocationClick}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold transition-all duration-300"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Obter Minha Localização
              </Button>

              {locationStatus && (
                <div className={`mt-4 p-4 rounded-lg text-center ${
                  locationStatus.includes('⚠️') 
                    ? 'bg-orange-500/20 border border-orange-500/50' 
                    : locationStatus.includes('✅')
                    ? 'bg-green-500/20 border border-green-500/50'
                    : 'bg-blue-500/20 border border-blue-500/50'
                }`}>
                  <p className={`text-sm ${
                    locationStatus.includes('⚠️') 
                      ? 'text-orange-400' 
                      : locationStatus.includes('✅')
                      ? 'text-green-400'
                      : 'text-blue-400'
                  }`}>
                    {locationStatus}
                  </p>
                </div>
              )}

              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-400 mb-2">
                  <strong>💡 Como permitir localização:</strong>
                </p>
                <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
                  <li>Chrome/Edge: Clique no ícone de cadeado/informações ao lado da URL → Permissões → Localização → Permitir</li>
                  <li>Firefox: Clique no ícone de informações → Permissões → Localização → Permitir</li>
                  <li>Safari: Safari → Preferências → Sites → Localização → Permitir</li>
                </ul>
              </div>
            </div>

            {/* Popular Routes */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Rotas Populares</h2>
              <div className="space-y-4">
                {rotasPopulares.map((rota) => (
                  <div
                    key={rota.id}
                    className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-yellow-500/50 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{getTipoIcon(rota.tipo)}</span>
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-yellow-500 transition-colors">
                            {rota.nome}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${getDificuldadeColor(rota.dificuldade)}`}>
                              {rota.dificuldade}
                            </span>
                            <span className="text-xs text-gray-400">
                              {rota.popularidade}% popularidade
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Distância</span>
                        <p className="font-semibold text-yellow-500">{rota.distancia} km</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Elevação</span>
                        <p className="font-semibold text-yellow-500">{rota.elevacao}m</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Duração</span>
                        <p className="font-semibold text-yellow-500">{rota.duracao}min</p>
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 border border-yellow-500/50">
                      Iniciar Rota
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comunidade' && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
              <Users className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Comunidade Brutws</h3>
              <p className="text-gray-400 mb-6">
                Conecte-se com milhões de atletas, compartilhe rotas, crie desafios e acompanhe o progresso da comunidade
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-xl">
                  <p className="text-3xl font-bold text-yellow-500 mb-1">2.5M+</p>
                  <p className="text-sm text-gray-400">Atletas Ativos</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl">
                  <p className="text-3xl font-bold text-yellow-500 mb-1">150K+</p>
                  <p className="text-sm text-gray-400">Rotas Criadas</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl">
                  <p className="text-3xl font-bold text-yellow-500 mb-1">50K+</p>
                  <p className="text-sm text-gray-400">Desafios Ativos</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold">
                  Explorar Comunidade
                </Button>
                <Button variant="outline" className="w-full border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10">
                  Ver Heatmap Global
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h4 className="font-bold mb-2 text-yellow-500">🏆 Competições</h4>
                <p className="text-sm text-gray-400">Crie e participe de competições de segmento com ranking em tempo real</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h4 className="font-bold mb-2 text-yellow-500">🎯 Desafios</h4>
                <p className="text-sm text-gray-400">Desafie amigos e acompanhe quem está mais ativo</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h4 className="font-bold mb-2 text-yellow-500">📊 Análises com IA</h4>
                <p className="text-sm text-gray-400">Insights inteligentes sobre seu desempenho e progresso</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h4 className="font-bold mb-2 text-yellow-500">📍 Rotas Offline</h4>
                <p className="text-sm text-gray-400">Baixe rotas para usar sem conexão</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metas' && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
              <Target className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Defina suas Metas</h3>
              <p className="text-gray-400 mb-6">
                Estabeleça objetivos personalizados e acompanhe seu progresso com análises detalhadas
              </p>
              
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold">
                Criar Nova Meta
              </Button>
            </div>

            {/* Meta Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">Meta Semanal</h4>
                  <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full">0%</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">Pedalar 50km esta semana</p>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600" style={{ width: '0%' }} />
                </div>
                <p className="text-xs text-gray-400 mt-2">0 / 50 km</p>
              </div>

              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">Meta Mensal</h4>
                  <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full">0%</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">200km em atividades</p>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600" style={{ width: '0%' }} />
                </div>
                <p className="text-xs text-gray-400 mt-2">0 / 200 km</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
