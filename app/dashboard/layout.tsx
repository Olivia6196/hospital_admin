import Sidebar from '../components/sidebar/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-72 fixed left-0 top-0 h-screen bg-linear-to-b from-green-700 to-blue-900 text-white shadow-2xl z-50 overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-1 ml-72 min-h-screen">
        {children}
      </div>

    </div>
  );
}