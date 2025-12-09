"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/store';
import OnboardingForm from '@/components/custom/onboarding-form';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se o onboarding já foi completado
    if (storage.isOnboardingComplete()) {
      router.push('/dashboard');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent animate-pulse">
            BRUTWS
          </h1>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return <OnboardingForm />;
}
