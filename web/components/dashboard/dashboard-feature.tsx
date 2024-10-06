'use client';

import Login from '../my-first/login';
import { AppHero } from '../ui/ui-layout';

export default function DashboardFeature() {
  return (
    <div>
      <AppHero title="TPP" subtitle="Tu donación trazada aporta más." />
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="space-y-2">
          <Login />
        </div>
      </div>
    </div>
  );
}
