import React, { useState } from 'react';
import { Users, Truck, Radio, MapPin, Phone, ShieldCheck, Clock, X, Calendar, ClipboardList } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const initialPersonnel = [
    { id: 1, name: 'Vikram Singh', rank: 'DIG', unit: 'Zone 4 Strategic', status: 'Active', pulse: 'bg-emerald-500' },
    { id: 2, name: 'Ananya Sharma', rank: 'ACP', unit: 'Intelligence Unit', status: 'On-Call', pulse: 'bg-blue-500' },
    { id: 3, name: 'Sanjay Dutt', rank: 'DCP', unit: 'Operations', status: 'Field', pulse: 'bg-amber-500' },
    { id: 4, name: 'Rahul Varma', rank: 'Inspector', unit: 'Zone 2 Response', status: 'Active', pulse: 'bg-emerald-500' },
    { id: 5, name: 'Priya Mani', rank: 'SI', unit: 'Cyber Lab', status: 'Active', pulse: 'bg-emerald-500' },
];

const assets = [
    { id: 1, type: 'Patrol Vehicle', model: 'Scorpio-N (Modified)', status: 'Operational', battery: '92%', icon: Truck },
    { id: 2, type: 'Surveillance Drone', model: 'DJI Matrice 300', status: 'Charging', battery: '45%', icon: Radio },
    { id: 3, type: 'Mobile Command Post', model: 'BNS Unit 7', status: 'Deployed', battery: '100%', icon: MapPin },
    { id: 4, type: 'Forensic Kit', model: 'Level 4 Bio', status: 'In-Transit', battery: 'N/A', icon: ShieldCheck },
];

const fullSchedule = [
    { time: '18:00', task: 'Shift Change - Zone 4 Delta', unit: 'Delta Response', type: 'Administrative', color: 'border-blue-500' },
    { time: '19:30', task: 'Perimeter Sweep - Sector 7', unit: 'UAV-01', type: 'Surveillance', color: 'border-purple-500' },
    { time: '21:00', task: 'Night Patrol Launch (Urban Core)', unit: 'Striker-3', type: 'Patrol', color: 'border-amber-500' },
    { time: '22:15', task: 'Intelligence Debrief - BNS 111', unit: 'Intel Alpha', type: 'Intelligence', color: 'border-blue-500' },
    { time: '00:00', task: 'Drone Perimeter Sweep', unit: 'UAV-02', type: 'Surveillance', color: 'border-purple-500' },
    { time: '02:30', task: 'High-Risk Zone Saturation', unit: 'Response Team-1', type: 'Deterrence', color: 'border-rose-500' },
    { time: '04:00', task: 'Rapid Response Test Drills', unit: 'All Active Units', type: 'Drill', color: 'border-emerald-500' },
    { time: '06:00', task: 'Morning Vigil Handover', unit: 'Alpha/Bravo', type: 'Administrative', color: 'border-blue-500' },
];

export const ResourcesPage = () => {
    const [personnelList, setPersonnelList] = useState(initialPersonnel);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRosterModalOpen, setIsRosterModalOpen] = useState(false);
    const [newUnit, setNewUnit] = useState({ name: '', rank: 'Inspector', unit: '', status: 'Active' });

    const handleAddUnit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = personnelList.length + 1;
        const pulse = newUnit.status === 'Active' ? 'bg-emerald-500' : newUnit.status === 'On-Call' ? 'bg-blue-500' : 'bg-amber-500';
        setPersonnelList([...personnelList, { ...newUnit, id, pulse }]);
        setIsAddModalOpen(false);
        setNewUnit({ name: '', rank: 'Inspector', unit: '', status: 'Active' });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Asset Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {assets.map((asset) => (
                    <div key={asset.id} className="glass-card p-5 group hover:border-app-primary/30 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-app-background rounded-lg group-hover:bg-app-primary/10 transition-colors border border-app-border">
                                <asset.icon className="w-5 h-5 text-app-primary" />
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                asset.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-500' :
                                    asset.status === 'Charging' ? 'bg-amber-500/10 text-amber-500' :
                                        'bg-blue-500/10 text-blue-500'
                            )}>
                                {asset.status}
                            </span>
                        </div>
                        <div className="text-sm font-bold text-app-text">{asset.type}</div>
                        <div className="text-[10px] text-app-text-dim font-medium mb-3">{asset.model}</div>
                        <div className="h-1 w-full bg-app-background rounded-full overflow-hidden border border-app-border">
                            <div
                                className={cn("h-full transition-all duration-1000", asset.battery !== 'N/A' ? 'bg-app-primary' : 'bg-app-text-dim')}
                                style={{ width: asset.battery !== 'N/A' ? asset.battery : '100%' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Personnel Directory */}
                <div className="xl:col-span-2 glass-card p-0 overflow-hidden">
                    <div className="p-6 border-b border-app-border flex items-center justify-between bg-app-card/30">
                        <h3 className="text-sm font-bold text-app-text-dim uppercase tracking-widest flex items-center gap-2">
                            <Users className="w-4 h-4 text-app-primary" />
                            Personnel Strategic Directory
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="text-[10px] font-bold px-4 py-2 rounded bg-app-primary hover:brightness-110 transition-all text-white shadow-lg shadow-app-primary/20 active:scale-95"
                            >
                                ADD UNIT
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-app-border text-[10px] font-black uppercase text-app-text-dim tracking-tighter">
                                    <th className="px-6 py-4">Officer Details</th>
                                    <th className="px-6 py-4">Current Unit</th>
                                    <th className="px-6 py-4">Operational Status</th>
                                    <th className="px-6 py-4 text-right pr-12">Action Hub</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-app-border/50">
                                {personnelList.map((p) => (
                                    <tr key={p.id} className="hover:bg-app-card/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-app-card flex items-center justify-center text-[10px] font-bold border border-app-border group-hover:border-app-primary/50">
                                                    {p.name.split(' ').map(n => n?.[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-app-text">{p.name || 'Unnamed Unit'}</div>
                                                    <div className="text-[10px] text-app-text-dim">{p.rank}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-app-text-dim font-medium">#{p.unit || 'UNASSIGNED'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", p.pulse)} />
                                                <span className="text-[10px] font-bold text-app-text-dim uppercase">{p.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right pr-8">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 hover:bg-app-card rounded text-app-text-dim"><Phone className="w-3 h-3" /></button>
                                                <button className="p-1.5 hover:bg-app-card rounded text-app-text-dim"><Radio className="w-3 h-3" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Operations Schedule */}
                <div className="glass-card p-6 text-app-text">
                    <h3 className="text-sm font-bold mb-6 text-app-text-dim uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-4 h-4 text-app-success" />
                        Next 24h Deployment
                    </h3>
                    <div className="space-y-6">
                        {fullSchedule.slice(0, 4).map((item, i) => (
                            <div key={i} className={cn("pl-4 border-l-2 py-1", item.color)}>
                                <div className="text-[10px] font-black text-app-text-dim mb-1">{item.time} HOURS</div>
                                <div className="text-xs font-bold">{item.task}</div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => setIsRosterModalOpen(true)}
                        className="w-full mt-8 py-4 rounded-xl border border-app-border text-[10px] font-bold hover:bg-app-card hover:border-app-primary/30 transition-all uppercase tracking-[0.2em] text-app-text-dim hover:text-app-primary active:scale-95"
                    >
                        Full Roster View
                    </button>
                </div>
            </div>

            {/* Modal for Adding Unit */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-app-background border border-app-border p-8 rounded-2xl w-full max-w-md shadow-2xl relative"
                        >
                            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-app-card rounded-full text-app-text-dim transition-colors"><X size={18} /></button>
                            <h2 className="text-lg font-bold text-app-text mb-6 flex items-center gap-3"><Users className="w-5 h-5 text-app-primary" />Deploy New Unit</h2>
                            <form onSubmit={handleAddUnit} className="space-y-6">
                                <FormItem label="Officer Name"><input type="text" required className="w-full bg-app-card border border-app-border rounded-lg px-4 py-3 text-xs text-app-text outline-none" placeholder="e.g. Sahil B." value={newUnit.name} onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })} /></FormItem>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormItem label="Rank"><select className="w-full bg-app-card border border-app-border rounded-lg px-4 py-3 text-xs text-app-text outline-none" value={newUnit.rank} onChange={(e) => setNewUnit({ ...newUnit, rank: e.target.value })}><option>Inspector</option><option>SI</option><option>ASI</option><option>Constable</option></select></FormItem>
                                    <FormItem label="Status"><select className="w-full bg-app-card border border-app-border rounded-lg px-4 py-3 text-xs text-app-text outline-none" value={newUnit.status} onChange={(e) => setNewUnit({ ...newUnit, status: e.target.value })}><option>Active</option><option>On-Call</option><option>Field</option></select></FormItem>
                                </div>
                                <FormItem label="Strategic Sector / Unit"><input type="text" required className="w-full bg-app-card border border-app-border rounded-lg px-4 py-3 text-xs text-app-text outline-none" placeholder="e.g. Nagpur South" value={newUnit.unit} onChange={(e) => setNewUnit({ ...newUnit, unit: e.target.value })} /></FormItem>
                                <button type="submit" className="w-full py-4 bg-app-primary text-white font-bold rounded-xl shadow-lg uppercase tracking-widest text-[10px]">CONFIRM DEPLOYMENT</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal for Full Roster View */}
            <AnimatePresence>
                {isRosterModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-app-background border border-app-border rounded-3xl w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-app-border bg-app-card/20 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-app-primary/10 rounded-2xl border border-app-primary/30">
                                        <Calendar className="w-6 h-6 text-app-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-app-text uppercase tracking-widest">Master Deployment Roster</h2>
                                        <p className="text-xs text-app-text-dim font-medium mt-1">Strategic Operations Schedule // Cycle-742</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsRosterModalOpen(false)}
                                    className="p-3 bg-app-card border border-app-border hover:border-rose-500/50 hover:text-rose-500 rounded-2xl transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content - Scrollable Roster */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar">
                                <div className="grid grid-cols-1 gap-4">
                                    {fullSchedule.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "p-6 rounded-2xl border bg-app-card/10 flex items-center justify-between group hover:bg-app-card/30 transition-all",
                                                item.color.replace('border-', 'border-opacity-30 border-')
                                            )}
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="text-sm font-black text-white w-20 font-mono tracking-widest">{item.time}</div>
                                                <div className={cn("w-1 h-10 rounded-full", item.color.replace('border-', 'bg-'))} />
                                                <div>
                                                    <div className="text-sm font-bold text-white group-hover:text-app-primary transition-colors">{item.task}</div>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-[10px] font-black text-app-text-dim uppercase tracking-tighter italic">Unit: {item.unit}</span>
                                                        <div className="w-1 h-1 bg-app-border rounded-full" />
                                                        <span className="text-[10px] font-black text-app-primary uppercase tracking-widest">{item.type}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="px-4 py-2 border border-app-border rounded-lg text-[10px] font-black text-app-text-dim hover:bg-app-background uppercase tracking-widest">RE-ASSIGN</button>
                                                <button className="p-2 bg-app-primary/10 border border-app-primary/30 rounded-lg text-app-primary"><ClipboardList size={14} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-app-border bg-app-card/20 flex items-center justify-between text-app-text-dim">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Security Protocol Active</span>
                                </div>
                                <span className="text-[10px] font-mono">SECURE_REF: SCHED_MU_99</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FormItem = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black text-app-text-dim uppercase tracking-widest ml-1">{label}</label>
        {children}
    </div>
);
