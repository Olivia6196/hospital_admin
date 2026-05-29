import Sidebar from '../components/sidebar/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[url(/images/dashboard_img.webp)] bg-cover bg-no-repeat relative text-white">
      <div className="absolute inset-0 bg-black/80" />
      <div className="w-60 fixed left-0 top-0 h-screen bg-linear-to-b from-blue-900 to-blue-950 text-white shadow-2xl z-50 overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-1 ml-60 min-h-screen">
        {children}
      </div>

    </div>
  );
}