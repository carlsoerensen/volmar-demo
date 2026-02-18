import React, { useState } from 'react';
import {
  LayoutDashboard,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  MessageSquare,
  Search,
  Bell,
  Menu,
  MoreVertical,
  Filter,
  FileText,
  TrendingUp,
  Users,
  UserPlus,
  Phone,
  Briefcase,
  Download,
  Send,
  Smartphone,
  Bot,
  Wifi,
  Battery,
  Signal,
  Camera,
  ChevronLeft
} from 'lucide-react';

const DomusMasterDashboard = () => {
  const [activeTab, setActiveTab] = useState('approval');
  const [selectedPeriod, setSelectedPeriod] = useState('Denne Uge');

  // --- MOCK DATA ---

  const stats = [
    { title: "Indberetningsgrad", value: "92%", change: "+4%", status: "positive", icon: CheckCircle },
    { title: "Godkendte Timer", value: "342t", change: "Denne uge", status: "neutral", icon: Clock },
    { title: "AI-Flagged Afvigelser", value: "3", change: "Kræver handling", status: "warning", icon: AlertTriangle },
    { title: "Sagsbudgetter", value: "OK", change: "2 tæt på max", status: "neutral", icon: BarChart3 },
  ];

  const aiActivities = [
    { time: "15:35", text: "TimeBot har modtaget indberetning fra Piotr (8t, Villa Strandvejen).", type: "success" },
    { time: "15:42", text: "AI har sendt rykker til Morten (Manglede svar).", type: "warning" },
    { time: "15:45", text: "Jens har rettet timer fra 7 til 8 efter AI forespørgsel.", type: "info" },
    { time: "16:01", text: "TimeBot har registreret sygdom på Anders.", type: "alert" },
  ];

  const timeEntries = [
    { id: 1, name: "Piotr Kowalski", project: "Villa Strandvejen", hours: 8.0, status: "Godkendt", aiRisk: "Low", note: "Standard dag" },
    { id: 2, name: "Jens Hansen", project: "Renovering Randers C", hours: 14.5, status: "Afventer", aiRisk: "High", note: "AI: Højt timeantal (>12t)" },
    { id: 3, name: "Anders 'Lærling'", project: "Værkstedet", hours: 7.5, status: "Godkendt", aiRisk: "Low", note: "-" },
    { id: 4, name: "Morten Byggeleder", project: "Ukendt", hours: 0, status: "Afvist", aiRisk: "Medium", note: "AI: Projekt ej genkendt" },
    { id: 5, name: "Søren Tømrer", project: "Villa Strandvejen", hours: 8.0, status: "Godkendt", aiRisk: "Low", note: "-" },
  ];

  const projects = [
    { name: "Villa Strandvejen", budget: 1500, used: 1120, status: "On Track", color: "bg-emerald-500" },
    { name: "Renovering Randers C", budget: 500, used: 480, status: "Risk", color: "bg-amber-500" },
    { name: "Skoleudvidelse", budget: 3200, used: 450, status: "On Track", color: "bg-emerald-500" },
    { name: "Service/Spjæld", budget: 0, used: 125, status: "Løbende", color: "bg-blue-500" },
  ];

  const employeeList = [
    { id: 1, name: "Piotr Kowalski", role: "Tømrer", phone: "+45 12 34 56 78", stdProject: "Villa Strandvejen", status: "Aktiv", missingReports: 0 },
    { id: 2, name: "Jens Hansen", role: "Snedker", phone: "+45 23 45 67 89", stdProject: "Renovering Randers C", status: "Aktiv", missingReports: 1 },
    { id: 3, name: "Anders 'Lærling'", role: "Lærling", phone: "+45 87 65 43 21", stdProject: "Værkstedet", status: "Aktiv", missingReports: 0 },
    { id: 4, name: "Morten Byggeleder", role: "Byggeleder", phone: "+45 11 22 33 44", stdProject: "Kontoret", status: "Aktiv", missingReports: 2 },
    { id: 5, name: "Søren Tømrer", role: "Tømrer", phone: "+45 99 88 77 66", stdProject: "-", status: "Inaktiv", missingReports: 0 },
  ];

  // --- COMPONENTS ---

  const SidebarItem = ({ id, icon: Icon, label, alert }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all mb-1 ${
        activeTab === id
          ? 'bg-[#1e293b] text-white shadow-md'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span className="font-medium text-sm">{label}</span>
      </div>
      {alert && (
        <span className="bg-[#f59e0b] text-[#1e293b] text-[10px] font-bold px-2 py-0.5 rounded-full">
          {alert}
        </span>
      )}
    </button>
  );

  // --- VIEWS ---

  const DashboardView = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${
                stat.status === 'warning' ? 'bg-amber-50 text-amber-600' :
                stat.status === 'positive' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
              }`}>
                <stat.icon size={22} />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                 stat.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                 stat.status === 'positive' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-[#1e293b]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area (Simulated) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1e293b]">Timeforbrug pr. Projekt (Denne Uge)</h3>
            <button className="text-sm text-slate-400 hover:text-[#1e293b] flex items-center gap-1">
              <Filter size={14} /> Filter
            </button>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-slate-100 pb-2">
            {[65, 40, 85, 30, 55, 45, 70].map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                 <div className="relative w-full">
                    <div
                      className="w-full bg-[#1e293b] rounded-t-sm opacity-80 group-hover:opacity-100 transition-all group-hover:bg-[#f59e0b]"
                      style={{ height: `${h * 2}px` }}
                    ></div>
                 </div>
                 <span className="text-xs text-slate-400 font-mono">{['M', 'T', 'O', 'T', 'F', 'L', 'S'][i]}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-6 justify-center">
             <div className="flex items-center gap-2 text-xs text-slate-500">
               <div className="w-3 h-3 bg-[#1e293b] rounded-sm"></div> Timer
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-500">
               <div className="w-3 h-3 bg-[#f59e0b] rounded-sm"></div> Overtid
             </div>
          </div>
        </div>

        {/* Live AI Feed */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-[#1e293b] mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            TimeBot Live Feed
          </h3>
          <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            {aiActivities.map((activity, idx) => (
              <div key={idx} className="flex gap-4 relative">
                <div className={`w-10 h-10 rounded-full border-4 border-white shrink-0 flex items-center justify-center z-10 ${
                  activity.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                  activity.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                  activity.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  <MessageSquare size={14} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 mb-0.5">{activity.time}</p>
                  <p className="text-sm text-slate-700 leading-snug">{activity.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SmartApprovalView = () => (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h2 className="text-lg font-bold text-[#1e293b]">Smart Godkendelse</h2>
          <p className="text-sm text-slate-500">AI har flaget <span className="font-bold text-amber-600">3 afvigelser</span> der kræver din opmærksomhed.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 flex items-center gap-2 shadow-sm">
            <Download size={16} className="text-[#0063cf]" />
            Eksporter til e-conomic
          </button>
          <button className="px-4 py-2 bg-[#1e293b] text-white rounded-lg text-sm font-medium hover:bg-slate-800 shadow-lg shadow-slate-900/20">
            Godkend Alle Valide (42)
          </button>
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
          <tr>
            <th className="p-4 border-b">Medarbejder</th>
            <th className="p-4 border-b">Projekt</th>
            <th className="p-4 border-b">Timer</th>
            <th className="p-4 border-b">AI Risiko Analyse</th>
            <th className="p-4 border-b text-right">Handling</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {timeEntries.map((entry) => (
            <tr key={entry.id} className={`group hover:bg-slate-50/80 transition-colors ${entry.aiRisk === 'High' ? 'bg-amber-50/30' : ''}`}>
              <td className="p-4">
                <div className="font-medium text-[#1e293b]">{entry.name}</div>
                <div className="text-xs text-slate-400">Idag, 27. Okt</div>
              </td>
              <td className="p-4 text-sm text-slate-600">
                <span className={`px-2 py-1 rounded border ${
                   entry.project === 'Ukendt' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-100 text-slate-600 border-slate-200'
                } text-xs font-medium`}>
                  {entry.project}
                </span>
              </td>
              <td className="p-4 font-mono text-sm font-semibold">{entry.hours}t</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {entry.aiRisk === 'High' && <AlertTriangle size={16} className="text-amber-500" />}
                  {entry.aiRisk === 'Medium' && <AlertTriangle size={16} className="text-amber-500" />}
                  {entry.aiRisk === 'Low' && <CheckCircle size={16} className="text-emerald-500" />}

                  <span className={`text-sm ${
                    entry.aiRisk === 'High' ? 'text-amber-700 font-bold' :
                    entry.aiRisk === 'Medium' ? 'text-amber-600' : 'text-emerald-700'
                  }`}>
                    {entry.note}
                  </span>
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-slate-200 rounded text-slate-500"><MessageSquare size={16}/></button>
                  <button className="p-2 hover:bg-red-100 rounded text-red-500"><AlertTriangle size={16}/></button>
                  <button className="p-2 bg-emerald-100 hover:bg-emerald-200 rounded text-emerald-700"><CheckCircle size={16}/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ProjectEconomyView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
      {projects.map((proj, idx) => {
        const percentage = Math.min((proj.used / (proj.budget || 1)) * 100, 100);
        return (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[#1e293b] text-lg">{proj.name}</h3>
                <p className="text-slate-500 text-sm">Total entreprise</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                proj.status === 'Risk' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {proj.status}
              </span>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2 font-medium">
                <span className="text-slate-600">Forbrugt: {proj.used}t</span>
                <span className="text-slate-400">Budget: {proj.budget > 0 ? proj.budget + 't' : 'N/A'}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full ${proj.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${proj.budget > 0 ? percentage : 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
                <TrendingUp size={12} />
                {proj.budget > 0
                  ? `${Math.round(percentage)}% af timer brugt. AI forudser budgetoverskridelse om 3 uger ved nuværende tempo.`
                  : 'Løbende fakturering.'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  const EmployeesView = () => (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h2 className="text-lg font-bold text-[#1e293b]">Medarbejdere</h2>
          <p className="text-sm text-slate-500">Administrer håndværkere og deres standard-projekter.</p>
        </div>
        <button className="px-4 py-2 bg-[#1e293b] text-white rounded-lg text-sm font-medium hover:bg-slate-800 shadow-lg shadow-slate-900/20 flex items-center gap-2">
          <UserPlus size={16} /> Opret Medarbejder
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
          <tr>
            <th className="p-4 border-b">Navn & Rolle</th>
            <th className="p-4 border-b">Kontakt</th>
            <th className="p-4 border-b">Standard Projekt</th>
            <th className="p-4 border-b">Status</th>
            <th className="p-4 border-b text-right">Handling</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {employeeList.map((emp) => (
            <tr key={emp.id} className="group hover:bg-slate-50/80 transition-colors">
              <td className="p-4">
                <div className="font-medium text-[#1e293b] flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                        {emp.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                    </div>
                    {emp.name}
                </div>
                <div className="text-xs text-slate-400 pl-10 flex items-center gap-1">
                    <Briefcase size={10} /> {emp.role}
                </div>
              </td>
              <td className="p-4 text-sm text-slate-600">
                 <div className="flex items-center gap-2">
                    <Phone size={14} className="text-slate-400" />
                    {emp.phone}
                 </div>
              </td>
              <td className="p-4">
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium border border-slate-200">
                  {emp.stdProject}
                </span>
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                   emp.status === 'Aktiv' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Aktiv' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                  {emp.status}
                </span>
                {emp.missingReports > 0 && (
                    <span className="ml-2 text-xs text-amber-600 font-medium flex items-center gap-1">
                        <AlertTriangle size={10} /> {emp.missingReports} mangler
                    </span>
                )}
              </td>
              <td className="p-4 text-right">
                <button className="text-slate-400 hover:text-[#1e293b] p-2 hover:bg-slate-100 rounded">
                    <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const TimeBotDemoView = () => {
    const chatMessages = [
      {
        sender: 'bot',
        time: '15:30',
        content: 'Hej Piotr! 👋 Hvordan gik dagen i dag på Villa Strandvejen?',
      },
      {
        sender: 'user',
        time: '15:32',
        content: 'Hej! God dag, vi nåede at lægge gulv i stuen. 8 timer.',
      },
      {
        sender: 'bot',
        time: '15:32',
        content: null,
        richContent: (
          <div>
            <p className="mb-2">Perfekt! Jeg registrerer:</p>
            <div className="bg-white/80 rounded-lg p-3 space-y-1.5 text-[13px] mb-2">
              <div className="flex items-center gap-2"><span>📍</span><span className="text-slate-500">Projekt:</span><span className="font-semibold text-[#1e293b]">Villa Strandvejen</span></div>
              <div className="flex items-center gap-2"><span>⏱</span><span className="text-slate-500">Timer:</span><span className="font-semibold text-[#1e293b]">8,0</span></div>
              <div className="flex items-center gap-2"><span>📅</span><span className="text-slate-500">Dato:</span><span className="font-semibold text-[#1e293b]">27. oktober 2025</span></div>
              <div className="flex items-center gap-2"><span>🔨</span><span className="text-slate-500">Opgave:</span><span className="font-semibold text-[#1e293b]">Gulvlægning, stue</span></div>
            </div>
            <p>Stemmer det? 👆</p>
          </div>
        ),
      },
      {
        sender: 'user',
        time: '15:33',
        content: 'Ja det ser rigtigt ud 👍',
      },
      {
        sender: 'bot',
        time: '15:33',
        content: '✅ Registreret! Dine timer er sendt til godkendelse hos Volmar. God eftermiddag, Piotr!',
      },
      {
        sender: 'bot',
        time: '15:34',
        content: 'Forresten — i morgen starter du samme sted, ikk? Skal jeg sætte Villa Strandvejen op som standard igen? 🏠',
      },
      {
        sender: 'user',
        time: '15:35',
        content: 'Ja tak, det ville være godt',
      },
      {
        sender: 'bot',
        time: '15:35',
        content: '👍 Noteret! Du får en påmindelse kl. 15:30 i morgen. Hav en god aften!',
      },
    ];

    return (
      <div className="animate-in fade-in duration-500">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-2">TimeBot Medarbejder-Oplevelse</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Se hvordan dine medarbejdere nemt indberetter timer direkte fra deres telefon via en intelligent AI-samtale.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12">
          {/* Phone Mockup */}
          <div className="relative">
            {/* Phone Frame */}
            <div className="relative w-[320px] h-[660px] bg-[#1a1a1a] rounded-[3rem] shadow-2xl shadow-slate-900/30 border-[3px] border-[#2a2a2a] p-[3px]">
              {/* Inner bezel */}
              <div className="w-full h-full bg-[#0a0a0a] rounded-[2.7rem] overflow-hidden flex flex-col">
                
                {/* Status Bar */}
                <div className="bg-[#075e54] px-6 pt-3 pb-0">
                  <div className="flex justify-between items-center text-white text-[11px] mb-2">
                    <span className="font-semibold">15:35</span>
                    <div className="absolute left-1/2 -translate-x-1/2 w-[90px] h-[25px] bg-[#0a0a0a] rounded-b-2xl"></div>
                    <div className="flex items-center gap-1.5">
                      <Signal size={12} />
                      <Wifi size={12} />
                      <Battery size={12} />
                    </div>
                  </div>
                </div>

                {/* Chat Header */}
                <div className="bg-[#075e54] px-3 pb-3 flex items-center gap-3">
                  <ChevronLeft size={22} className="text-white/80" />
                  <div className="w-9 h-9 rounded-full bg-[#f59e0b] flex items-center justify-center shadow-lg">
                    <Bot size={18} className="text-[#0f172a]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-[15px] leading-tight">DOMUS TimeBot</p>
                    <p className="text-emerald-200 text-[11px]">online</p>
                  </div>
                  <Phone size={18} className="text-white/70" />
                  <MoreVertical size={18} className="text-white/70" />
                </div>

                {/* Chat Body */}
                <div className="flex-1 overflow-y-auto bg-[#ece5dd]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23d5cec3\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M20 20h10v10H20zM50 50h10v10H50zM80 20h10v10H80zM20 80h10v10H20zM110 110h10v10h-10zM140 50h10v10h-10zM50 140h10v10H50zM170 20h10v10h-10zM20 170h10v10H20zM140 140h10v10h-10zM170 170h10v10h-10z\'/%3E%3C/g%3E%3C/svg%3E")' }}>
                  <div className="p-3 space-y-2">
                    {/* Date Pill */}
                    <div className="flex justify-center mb-2">
                      <span className="bg-white/80 text-[11px] text-slate-500 px-3 py-1 rounded-full shadow-sm font-medium">I DAG</span>
                    </div>

                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`relative max-w-[82%] px-3 py-2 rounded-lg shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-[#dcf8c6] rounded-tr-none'
                            : 'bg-white rounded-tl-none'
                        }`}>
                          {/* Chat bubble tail */}
                          <div className={`absolute top-0 w-3 h-3 ${
                            msg.sender === 'user'
                              ? '-right-1.5 bg-[#dcf8c6]'
                              : '-left-1.5 bg-white'
                          }`} style={{ clipPath: msg.sender === 'user' ? 'polygon(0 0, 0% 100%, 100% 0)' : 'polygon(100% 0, 0 0, 100% 100%)' }} />
                          
                          {msg.sender === 'bot' && idx <= 1 && (
                            <p className="text-[11px] font-bold text-[#075e54] mb-0.5">DOMUS TimeBot</p>
                          )}
                          {msg.richContent ? (
                            <div className="text-[13.5px] leading-relaxed text-[#303030]">{msg.richContent}</div>
                          ) : (
                            <p className="text-[13.5px] leading-relaxed text-[#303030]">{msg.content}</p>
                          )}
                          <div className={`flex items-center gap-1 mt-0.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                            <span className="text-[10px] text-slate-400">{msg.time}</span>
                            {msg.sender === 'user' && (
                              <svg width="16" height="10" viewBox="0 0 16 10" className="text-[#53bdeb]">
                                <path d="M1 5l3 3L9 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 5l3 3L13 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    <div className="flex justify-start">
                      <div className="bg-white px-4 py-3 rounded-lg rounded-tl-none shadow-sm">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Bar */}
                <div className="bg-[#f0f0f0] px-2 py-2 flex items-center gap-2">
                  <div className="flex-1 bg-white rounded-full flex items-center px-3 py-2 shadow-sm">
                    <span className="text-[13px] text-slate-400 flex-1">Skriv en besked...</span>
                    <Camera size={20} className="text-slate-400 ml-2" />
                  </div>
                  <div className="w-10 h-10 bg-[#075e54] rounded-full flex items-center justify-center shadow-md">
                    <Send size={18} className="text-white ml-0.5" />
                  </div>
                </div>

                {/* Home indicator */}
                <div className="bg-[#0a0a0a] flex justify-center py-2">
                  <div className="w-28 h-1 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Description Cards */}
          <div className="max-w-sm space-y-4 pt-4">
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <MessageSquare size={20} className="text-emerald-600" />
                </div>
                <h3 className="font-bold text-[#1e293b]">Naturlig Samtale</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">Medarbejdere skriver bare hvad de har lavet — AI'en forstår konteksten og registrerer automatisk projekt, timer og opgave.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Bot size={20} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-[#1e293b]">Intelligent Genkendelse</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">TimeBot kender medarbejderens standard-projekt, husker tidligere opgaver, og stiller kun spørgsmål når noget er uklart.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <CheckCircle size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-[#1e293b]">Bekræft & Godkend</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">Før registrering viser AI'en en opsummering som medarbejderen bekræfter. Timerne sendes direkte til mester-dashboardet.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Clock size={20} className="text-purple-600" />
                </div>
                <h3 className="font-bold text-[#1e293b]">Proaktive Påmindelser</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">Har en medarbejder glemt at indberette? TimeBot sender automatisk en venlig rykker — så mesteren slipper for at ringe rundt.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- MAIN LAYOUT ---

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-slate-800">

      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] flex flex-col hidden md:flex border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-white font-bold text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-[#0f172a]">
              <HomeIcon />
            </div>
            DOMUS<span className="text-[#f59e0b]">BYG</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 pl-10">Mester Dashboard v2.0</p>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">Administration</div>
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Overblik" />
          <SidebarItem id="approval" icon={CheckCircle} label="Smart Godkendelse" alert="3" />
          <SidebarItem id="economy" icon={BarChart3} label="Sagsøkonomi" />
          <SidebarItem id="employees" icon={Users} label="Medarbejdere" />

          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3 mt-8">Demo</div>
          <SidebarItem id="timebot" icon={Smartphone} label="TimeBot Demo" />

          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3 mt-8">Konfiguration</div>
          <SidebarItem id="settings" icon={MoreVertical} label="Indstillinger" />
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f59e0b] flex items-center justify-center text-[#0f172a] font-bold">
              V
            </div>
            <div>
              <p className="text-sm font-medium text-white">Volmar</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-500"><Menu/></button>
            <h2 className="text-lg font-bold text-[#1e293b]">
              {activeTab === 'dashboard' && 'Dagligt Overblik'}
              {activeTab === 'approval' && 'Timegodkendelse'}
              {activeTab === 'economy' && 'Sagsøkonomi & Budgetter'}
              {activeTab === 'employees' && 'Medarbejderoversigt'}
              {activeTab === 'timebot' && 'TimeBot Demo'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Søg i sager eller medarbejdere..."
                className="pl-9 pr-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b] w-64"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'approval' && <SmartApprovalView />}
            {activeTab === 'economy' && <ProjectEconomyView />}
            {activeTab === 'employees' && <EmployeesView />}
            {activeTab === 'timebot' && <TimeBotDemoView />}
            {activeTab === 'settings' && (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <FileText size={48} className="mb-4 opacity-20" />
                <p>Denne sektion er under udarbejdelse i MVP'en.</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

// Simple Icon component for the Logo
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

export default DomusMasterDashboard;
