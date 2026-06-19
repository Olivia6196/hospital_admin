import DepartmentChart from "../components/charts/DepartmentChart"
import PatientTrendChart from "../components/charts/PatientTrendChart"
import RevenueChart from "../components/charts/RevenueChart"
import Header from "../components/Header"
import AppointmentOverview from "../components/submain/AppointmentOverview"
import PatientsTable from "../components/submain/PatientsTable"
import StaffOverview from "../components/submain/StaffOverview"
import StatCard from "../components/submain/StatCard"

const page = () => {
  return (
    <div className="flex flex-col gap-7 py-5 px-3 md:px-6">
      <Header title="Dashboard" subtitle="Welcome back, Admin. Here's what's happening today." />
        <StatCard />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PatientTrendChart />
        <DepartmentChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
        <RevenueChart />
        <StaffOverview />
      </div>
      
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PatientsTable />
        <AppointmentOverview />
      </div>
    </div>
  )
}

export default page