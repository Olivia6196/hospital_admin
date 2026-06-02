import Sidebar from '../components/sidebar/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen gap-1.5 bg-black text-white">
      <div className="bg-linear-to-b from-black/80 to-blue-950 text-white shadow-2xl z-50 overflow-hidden border-r border-white/40 rounded-lg">
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen overflow-auto">
        {children}
      </div>

    </div>
  );
}