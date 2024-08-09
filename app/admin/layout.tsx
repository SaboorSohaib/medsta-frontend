import type { Metadata } from 'next';
import AdminDashboard from './adminDashboard';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Medsta Admin',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
