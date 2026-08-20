import DashboardPage from '@/domains/dashboard/containers/DashboardPage';

type Props = {
  params: Promise<{ dashboardId: string }>;
};

export default async function Page({ params }: Props) {
  const { dashboardId } = await params;
  return <DashboardPage dashboardId={Number(dashboardId)} />;
}
