import { LuBadgeDollarSign } from "react-icons/lu";
import { FaBed, FaUser } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

const stats = [
  {
    label: "Total Patients",
    value: "1,284",
    change: "12% from last month",
    positive: true,
    icon: IoIosPeople ,
  },
  {
    label: "Active Doctors",
    value: "42",
    change: "3 new this month",
    positive: true,
    icon: FaUser,
  },
  {
    label: "Beds Occupied",
    value: "78%",
    change: "5% from last week",
    positive: false,
    icon: FaBed ,
  },
  {
    label: "Monthly Revenue",
    value: "₦6.1M",
    change: "8.9% from last month",
    positive: true,
    icon: LuBadgeDollarSign,
  },
];

const StatCard = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((card) => (
        <div key={card.label} className="flex gap-4 bg-blue-200 dark:bg-black/30 border backdrop-blur-2xl border-white/20 shadow-2xl z-10 rounded-2xl px-5 py-3 hover:translate-y-1">
          <div className="h-9 w-9 flex items-center justify-center text-blue-800 bg-white/70 border backdrop-blur-2xl border-white/10 shadow-2xl rounded-lg">
            <card.icon size={20}
            />
          </div>
          <div className="">
            <p className={`uppercase text-blue-950 dark:text-white/80 text-[0.8rem]`}>{card.label}</p>
            <p className="text-blue-950 dark:text-white text-[1.3rem] font-semibold">{card.value}</p>
            <p
              className={`flex items-center gap-0.5  ${card.positive ? "text-emerald-500" : "text-red-600"} text-[0.8rem]`}
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
