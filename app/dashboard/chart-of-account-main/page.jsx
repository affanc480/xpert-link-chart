'use client';

import { Layers } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { AccountCodeManager } from '@/components/dashboard/accounts/AccountCodeManager';

export default function ChartOfAccountMainPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Chart of Account Main' }]} />
      <PageHeader
        title="Chart Of Account Main"
        description="Manage your top-level chart of account codes and descriptions."
      />
      <AccountCodeManager apiPath="/api/chart-of-account-main" icon={Layers} />
    </div>
  );
}
