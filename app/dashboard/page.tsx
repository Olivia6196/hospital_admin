import Header from "../components/Header"
import StatCard from "../components/StatCard"

const page = () => {
  return (
    <div className="flex flex-col gap-7 py-5 px-6">
      <Header title="Dashboard" subtitle="Welcome back, Olivia Omeje. Here's what's happening today." />
      <StatCard />
    </div>
  )
}

export default page