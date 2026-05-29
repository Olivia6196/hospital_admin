import { LuBadgeDollarSign } from "react-icons/lu";
import { FaBed, FaUser } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

const stats = [
  {
    label: "Total Patients",
    value: "1,284",
    change: "12% from last month",
    positive: true,
    icon: <IoIosPeople size={37} className="text-blue-600 bg-blue-600/10 border backdrop-blur-2xl border-white/20 shadow-2xl rounded-lg p-2"/>,
  },
  {
    label: "Active Doctors",
    value: "42",
    change: "3 new this month",
    positive: true,
    icon: <FaUser size={37} className="text-green-700 bg-green-600/10 border backdrop-blur-2xl border-white/20 shadow-2xl rounded-lg p-2"/>,
  },
  {
    label: "Beds Occupied",
    value: "78%",
    change: "5% from last week",
    positive: false,
    icon: <FaBed size={37} className="text-amber-600 bg-amber-600/10 border backdrop-blur-2xl border-white/20 shadow-2xl rounded-lg p-2"/>,
  },
  {
    label: "Monthly Revenue",
    value: "₦6.1M",
    change: "8.9% from last month",
    positive: true,
    icon: <LuBadgeDollarSign size={37} className="text-purple-600 bg-purple-600/10 border backdrop-blur-2xl border-white/20 shadow-2xl rounded-lg p-2"/>,
  },
];

const StatCard = () => {
  return (
    <section className="grid grid-cols-4 gap-4">
      {stats.map((card) => (
        <div key={card.label} className="flex gap-4 bg-white/6 border backdrop-blur-2xl border-white/20 shadow-2xl z-10 rounded-2xl px-5 py-3 hover:translate-y-1">
          <div className="">
            {card.icon}
          </div>
          <div className="">
            <p className={`uppercase text-white/80 text-sm`}>{card.label}</p>
            <p className="text-white text-[1.3rem] font-semibold">{card.value}</p>
            <p
              className={`flex gap-0.5  ${card.positive ? "text-green-500" : "text-red-600"} text-[0.8rem]`}
            >
              <span className="text-[1.2rem]">{card.positive ? "↑" : "↓"}</span> 
              {card.change}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StatCard;
