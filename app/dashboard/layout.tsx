import Sidebar from '../compontents/sidebar/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-72 fixed left-0 top-0 h-screen bg-linear-to-b from-blue-700 to-indigo-800 text-white shadow-2xl z-50 overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-1 ml-72 min-h-screen">
        {children}
      </div>

    </div>
  );
}