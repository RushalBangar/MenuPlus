'use client';

import { useState, useEffect } from 'react';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  shift: string;
  status: string;
  rating: number;
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: 1, name: 'Chef Gordon', role: 'Head Chef', shift: 'Morning', status: 'Active', rating: 4.9 },
    { id: 2, name: 'Sarah Connor', role: 'Head Waiter', shift: 'Evening', status: 'Active', rating: 4.8 },
    { id: 3, name: 'Alex Rivera', role: 'Mixologist', shift: 'Evening', status: 'Active', rating: 4.7 },
    { id: 4, name: 'Elena Rostova', role: 'Floor Manager', shift: 'Morning', status: 'Active', rating: 4.9 }
  ]);

  useEffect(() => {
    fetch('https://menuplus.onrender.com/api/staff')
      .then(res => res.json())
      .then(data => setStaff(data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Staff & Shift Management</h1>
          <p className="text-sm text-slate-400">Manage employee rosters, shift assignments, and performance ratings.</p>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg">
          + Add Staff Member
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staff.map((member) => (
          <div key={member.id} className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-orange-500/40 transition-all">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-extrabold text-white text-lg shadow-md">
                {member.name.charAt(0)}
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-500/30">
                {member.status}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-white text-lg">{member.name}</h3>
              <p className="text-xs text-orange-400 font-semibold">{member.role}</p>
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-xs text-slate-400">
              <div>
                <span>Shift: </span>
                <span className="text-slate-200 font-semibold">{member.shift}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <span>★</span>
                <span>{member.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
