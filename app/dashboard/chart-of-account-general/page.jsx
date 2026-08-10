'use client';

import { ListTree } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { AccountCodeManager } from '@/components/dashboard/accounts/AccountCodeManager';

export default function ChartOfAccountGeneralPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Chart of Account General' }]} />
      <PageHeader
        title="Chart Of Account General"
        description="Manage general ledger codes and descriptions."
      />
      <AccountCodeManager apiPath="/api/chart-of-account-general" icon={ListTree} requireMainAccount />
    </div>
  );
}
