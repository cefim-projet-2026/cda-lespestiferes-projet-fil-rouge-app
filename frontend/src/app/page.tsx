import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  CloudDownload,
  Settings,
  LogOut,
  BookOpen,
} from "lucide-react";
import { cn } from "./utils";

type EventType = "E-Learning" | "Presentiel" | "Framework";

interface Event {
  id: string;
  type: EventType;
  title: string;
  subtitle: string;
  instructor: string;
  room?: string;
  day: number;
  startHour: number;
  endHour: number;
}

const events: Event[] = [
  {
    id: "1",
    type: "Presentiel",
    title: "DEV.CDA",
    subtitle: "B3_DEV_CDA_25",
    instructor: "M. Baadu P.",
    room: "A1-06",
    day: 0,
    startHour: 8,
    endHour: 10,
  },
  {
    id: "2",
    type: "E-Learning",
    title: "E-LEARNING",
    subtitle: "B3_DEV_CDA_25",
    instructor: "Mme Charriere A.",
    day: 0,
    startHour: 10,
    endHour: 12,
  },

  {
    id: "3",
    type: "Presentiel",
    title: "DEV.CDA",
    subtitle: "B3_DEV_CDA_25",
    instructor: "M. Baadu P.",
    day: 1,
    startHour: 8,
    endHour: 10,
  },
  {
    id: "4",
    type: "E-Learning",
    title: "E-LEARNING",
    subtitle: "B3_DEV_CDA_25",
    instructor: "Mme Charriere A.",
    day: 1,
    startHour: 10,
    endHour: 12,
  },
  {
    id: "5",
    type: "Framework",
    title: "FRAMEWORK",
    subtitle: "REACT JS",
    instructor: "M. Lebhar R.",
    room: "A1-06",
    day: 1,
    startHour: 13.5,
    endHour: 17,
  },

  {
    id: "6",
    type: "Framework",
    title: "FRAMEWORK",
    subtitle: "REACT JS",
    instructor: "M. Lebhar R.",
    room: "A1-06",
    day: 2,
    startHour: 8,
    endHour: 12,
  },
  {
    id: "7",
    type: "Presentiel",
    title: "DEV.CDA",
    subtitle: "B3_DEV_CDA_25",
    instructor: "M. Baadu P.",
    day: 2,
    startHour: 13.5,
    endHour: 17,
  },

  {
    id: "8",
    type: "E-Learning",
    title: "E-LEARNING",
    subtitle: "B3_DEV_CDA_25",
    instructor: "Mme Charriere A.",
    day: 3,
    startHour: 8,
    endHour: 10,
  },
  {
    id: "9",
    type: "Presentiel",
    title: "DEV.CDA",
    subtitle: "B3_DEV_CDA_25",
    instructor: "M. Baadu P.",
    day: 3,
    startHour: 10,
    endHour: 11.5,
  },
  {
    id: "10",
    type: "Framework",
    title: "REACT JS",
    subtitle: "REACT JS",
    instructor: "M. Lebhar R.",
    room: "A1-06",
    day: 3,
    startHour: 11.5,
    endHour: 12.5,
  },
  {
    id: "11",
    type: "E-Learning",
    title: "E-LEARNING",
    subtitle: "B3_DEV_CDA_25",
    instructor: "Mme Charriere A.",
    day: 3,
    startHour: 13.5,
    endHour: 17,
  },

  {
    id: "12",
    type: "E-Learning",
    title: "E-LEARNING",
    subtitle: "B3_DEV_CDA_25",
    instructor: "Mme Charriere A.",
    day: 4,
    startHour: 8,
    endHour: 10,
  },
  {
    id: "13",
    type: "E-Learning",
    title: "E-LEARNING",
    subtitle: "B3_DEV_CDA_25",
    instructor: "Mme Charriere A.",
    day: 4,
    startHour: 10,
    endHour: 12,
  },
  {
    id: "14",
    type: "E-Learning",
    title: "E-LEARNING",
    subtitle: "B3_DEV_CDA_25",
    instructor: "Mme Charriere A.",
    day: 4,
    startHour: 13.5,
    endHour: 17,
  },
];

const typeStyles = {
  "E-Learning": {
    bg: "bg-[#FFF3E8]",
    border: "bg-[#FF7A00]",
    badgeBg: "bg-[#FFD7B3]",
    badgeText: "text-[#CC6200]",
  },
  Presentiel: {
    bg: "bg-[#FFF9E6]",
    border: "bg-[#FFB800]",
    badgeBg: "bg-[#FFE8A1]",
    badgeText: "text-[#CC9300]",
  },
  Framework: {
    bg: "bg-[#F2F4F7]",
    border: "bg-[#9CA3AF]",
    badgeBg: "bg-[#E5E7EB]",
    badgeText: "text-[#4B5563]",
  },
};

const days = [
  { name: "LUNDI", date: "20 Juin" },
  { name: "MARDI", date: "21 Juin" },
  { name: "MERCREDI", date: "22 Juin" },
  { name: "JEUDI", date: "23 Juin" },
  { name: "VENDREDI", date: "24 Juin" },
];

const timeSlots = [
  { label: "08H00", hour: 8 },
  { label: "09H00", hour: 9 },
  { label: "10H00", hour: 10 },
  { label: "11H00", hour: 11 },
  { label: "BREAK", hour: 12.5 },
  { label: "14H00", hour: 14 },
  { label: "15H00", hour: 15 },
  { label: "16H00", hour: 16 },
];

const HOUR_HEIGHT = 100;
const START_HOUR = 8;

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-[#F3F4F6]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-4 h-8 bg-[#FFB800] rounded-full"></div>
            <div className="w-4 h-8 bg-[#FFB800] rounded-full"></div>
            <div className="w-4 h-8 bg-[#FFB800] rounded-full"></div>
          </div>
          <div className="leading-tight font-bold text-xl tracking-tight">
            CAMPUS
            <br />
            CONN-ECT
          </div>
        </div>

        <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-sm gap-8 text-sm font-semibold">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <BookOpen className="w-4 h-4" />
            NOTES
          </button>
          <div className="w-px h-4 bg-gray-300"></div>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            CDA_25_2
            <ChevronRight className="w-4 h-4 rotate-90" />
          </button>
          <div className="w-px h-4 bg-gray-300"></div>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            PROMOTION 25/26
            <ChevronRight className="w-4 h-4 rotate-90" />
          </button>
          <div className="w-px h-4 bg-gray-300"></div>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            TOUS LES ELÈVES
            <ChevronRight className="w-4 h-4 rotate-90" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-bold text-sm">DUPONT JEAN-PIERRE</div>
            <div className="text-xs text-gray-500 font-medium tracking-wide">
              FORMATEUR
            </div>
          </div>
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Sub Header */}
      <div className="flex items-center justify-between px-12 py-6">
        <div className="flex items-center gap-4 text-2xl font-bold">
          <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span>Semaine 25</span>
          <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF7A00]"></div>
            E-Learning
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FFB800]"></div>
            Presentiel
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#9CA3AF]"></div>
            Framework
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-8 pb-8 relative">
        <div className="bg-white rounded-[2rem] shadow-sm p-8 flex">
          {/* Time Column */}
          <div className="w-20 flex flex-col relative pt-[80px]">
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className={cn(
                  "absolute w-full text-right pr-6 text-xs font-semibold text-gray-400",
                  slot.label === "BREAK" && "text-gray-300 tracking-widest",
                )}
                style={{
                  top: `${(slot.hour - START_HOUR) * HOUR_HEIGHT + 80}px`,
                  transform: "translateY(-50%)",
                }}
              >
                {slot.label}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="flex-1 grid grid-cols-5 gap-6">
            {days.map((day, dayIndex) => (
              <div key={dayIndex} className="relative">
                {/* Day Header */}
                <div className="text-center pb-6 border-b border-gray-100 mb-4 h-[80px]">
                  <div className="font-bold text-lg tracking-wide">
                    {day.name}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {day.date}
                  </div>
                </div>

                {/* Events Container */}
                <div
                  className="relative w-full"
                  style={{ height: `${9 * HOUR_HEIGHT}px` }}
                >
                  {events
                    .filter((e) => e.day === dayIndex)
                    .map((event) => {
                      const top = (event.startHour - START_HOUR) * HOUR_HEIGHT;
                      const height =
                        (event.endHour - event.startHour) * HOUR_HEIGHT;
                      const style = typeStyles[event.type];

                      return (
                        <div
                          key={event.id}
                          className={cn(
                            "absolute w-full rounded-2xl overflow-hidden flex flex-col p-4 transition-transform hover:scale-[1.02] cursor-pointer",
                            style.bg,
                          )}
                          style={{
                            top: `${top}px`,
                            height: `${height - 8}px`,
                          }}
                        >
                          <div
                            className={cn(
                              "absolute left-0 top-0 bottom-0 w-1.5",
                              style.border,
                            )}
                          ></div>

                          <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                              <span
                                className={cn(
                                  "text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider",
                                  style.badgeBg,
                                  style.badgeText,
                                )}
                              >
                                {event.title}
                              </span>
                              {event.room && (
                                <span className="text-[10px] font-bold bg-black/5 text-gray-500 px-2 py-0.5 rounded-md">
                                  {event.room}
                                </span>
                              )}
                            </div>

                            <h3 className="font-bold text-sm text-gray-900 mt-1">
                              {event.subtitle}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium mt-1">
                              {event.instructor}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 left-8 flex gap-4">
          <button className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#FF7A00] hover:bg-gray-50 transition-colors">
            <CloudDownload className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#FF7A00] hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#FF7A00] hover:bg-gray-50 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
