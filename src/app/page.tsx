"use client";

import { ArrowRight, Play, MapPin, Camera, TrendingUp, Check, Star, Shield, Gift, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header/Nav */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-xl">
              B
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
              BRUTWS
            </span>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Começar Agora
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
            <span className="text-orange-400 text-sm font-medium">🔥 Vagas Limitadas Disponíveis</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transforme Seu Corpo e Sua{' '}
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Alimentação
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-400 mb-4 max-w-4xl mx-auto">
            O Aplicativo Inovador que Treina, Nutre e Motiva Você a Superar Seus Limites!
          </p>
          
          <p className="text-lg text-gray-500 mb-10 max-w-3xl mx-auto">
            Desfrute de vídeos orientativos, rotas personalizadas e um monitoramento preciso das calorias dos seus alimentos — tudo em um só lugar, sem complicações!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 rounded-xl">
              Começar Agora <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-yellow-600 bg-yellow-600 hover:bg-yellow-700 text-black font-semibold text-lg px-8 py-6 rounded-xl">
              Ver Demonstração <Play className="ml-2" />
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative max-w-5xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                    <Play className="w-10 h-10" />
                  </div>
                  <p className="text-gray-500">Preview do Aplicativo</p>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Problem/Connection Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Você Já Se Sentiu <span className="text-orange-500">Perdido</span>?
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            A frustração de não saber se está fazendo os exercícios corretamente ou se sua dieta é realmente eficaz pode ser desmotivadora. Com <span className="text-orange-500 font-semibold">Brutws</span>, você não só tem a orientação que precisa, mas também a motivação que falta.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              A Solução <span className="text-orange-500">Completa</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Brutws une tecnologia de ponta e simplicidade para oferecer um sistema totalmente integrado de treino e nutrição.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Play, title: 'Vídeos Personalizados', desc: 'Exercícios guiados passo a passo' },
              { icon: MapPin, title: 'Rotas Mapeadas', desc: 'GPS integrado para seus treinos' },
              { icon: Camera, title: 'Contador de Calorias', desc: 'Capture e monitore suas refeições' },
              { icon: TrendingUp, title: 'Relatórios Semanais', desc: 'Acompanhe seu progresso' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-black border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all group">
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all">
                  <feature.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Benefícios que <span className="text-orange-500">Transformam</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Personalização Completa', desc: 'Treinos adaptáveis ao seu nível e preferências.' },
              { title: 'Rotas Mapeadas', desc: 'Descubra novos caminhos para correr ou pedalar de forma segura.' },
              { title: 'Controle Nutricional Fácil', desc: 'Saiba exatamente quantas calorias você ingere.' },
              { title: 'Motivação e Perspicácia', desc: 'Relatórios semanais para acompanhar seu progresso e se manter focado.' }
            ].map((benefit, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-orange-500/50 transition-all">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              O Que Nossos <span className="text-orange-500">Usuários</span> Dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Maria S.', text: 'Com o Brutws, perdi 5kg em um mês! Os vídeos me guiaram perfeitamente e agora sinto que realmente entendo minha nutrição.', rating: 5 },
              { name: 'João P.', text: 'Eu adoro as rotas do GPS! Nunca mais caminhei pelos mesmos caminhos.', rating: 5 }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-black border border-gray-800 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">"{testimonial.text}"</p>
                <p className="text-orange-500 font-semibold">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/10 rounded-full mb-6">
            <Shield className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Garantia de <span className="text-orange-500">30 Dias</span>
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Experimente Brutws sem riscos! Se em 30 dias você não estiver satisfeito, devolvemos seu investimento integralmente.
          </p>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-y border-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-6">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Bônus <span className="text-orange-500">Exclusivo</span>
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            Assinantes do Brutws ganham uma <span className="text-orange-500 font-bold">consulta nutricional gratuita</span>!
          </p>
          <p className="text-orange-400 font-semibold text-lg">⚠️ Vagas limitadas! Não perca!</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Perguntas <span className="text-orange-500">Frequentes</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'E se eu não souber usar o aplicativo?', a: 'Nosso suporte está disponível 24/7 e temos tutoriais passo a passo para facilitar sua experiência.' },
              { q: 'Preciso pagar mais para ter acesso a todos os recursos?', a: 'Não! Todos os recursos do Brutws estão disponíveis na sua assinatura.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-800/50 transition-all"
                >
                  <span className="text-lg font-semibold">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-orange-500 transition-transform ${faqOpen === idx ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen === idx && (
                  <div className="px-6 pb-5 text-gray-400">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-bold mb-6">
            Comece <span className="text-orange-500">Agora</span>!
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Não perca mais tempo, baixe o Brutws e dê o primeiro passo para uma nova vida!
          </p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-xl px-12 py-8 rounded-xl shadow-2xl shadow-orange-500/20">
            Clique Aqui Para Se Inscrever <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-xl">
              B
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
              BRUTWS
            </span>
          </div>
          <p className="text-gray-500 mb-4">
            Transforme-se no melhor que você pode ser. Com Brutws, cada passo conta, cada exercício importa, e cada refeição pode ser a chave para a sua evolução.
          </p>
          <p className="text-gray-600 text-sm">
            © 2024 Brutws. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
