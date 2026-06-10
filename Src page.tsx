'use client';

import { useState } from 'react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import MainApp        from '@/components/app/MainApp';

export default function Page() {
  // userProfile is null until onboarding completes
  const [userProfile, setUserProfile] = useState(null);

  const handleOnboardingComplete = (profile) => {
    // profile = { name, email, plan, answers: { goal, level, sport, risk, bankroll, frequency, type } }
    setUserProfile(profile);
  };

  if (!userProfile) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return <MainApp userProfile={userProfile} />;
}
