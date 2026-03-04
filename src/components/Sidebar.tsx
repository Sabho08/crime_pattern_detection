import React, { useState } from 'react';
import { Map, Zap, Bell, Shield, AlertTriangle, Radar, Info, ChevronRight, Activity, Target, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
    const alerts = [
        { id: 1, type: 'NIA', msg: 'Pattern: Aggressive BNS 111 activity in Nagpur South', icon: Shield, color: 'text-amber-500', time: '12m ago' },
        { id: 2, type: 'CBI', msg: 'Expected Hotspot: Sector 14 Financial Hub (Next 6h)', icon: Radar, color: 'text-blue-500', time: '24m ago' },
        { id: 3, type: 'LOCAL', msg: 'BNS 103 inquiry launched in Zone 2', icon: AlertTriangle, color: 'text-rose-500', time: '1h ago' },
        { id: 4, type: 'RAW', msg: 'Border-adjacent digital traces identified', icon: Activity, color: 'text-emerald-500', time: '2h ago' },
    ];

    const navItems = [
        { icon: Activity, label: "Live Surveillance", id: 'COMMAND' },
        { icon: Radar, label: "Signal Intelligence", id: 'SIGNAL' },
        { icon: Target, label: "High-Risk Targets", id: 'RISK' },
        { icon: Shield, label: "Asset Management", id: 'RESOURCES' },
        { icon: MapPin, label: "Advanced Analytics", id: 'ANALYTICS' },
    ];

    return (
        <aside className="w-80 h-full border-r border-app-border bg-app-background flex flex-col shrink-0">
            {/* Sidebar Branding - Minimal */}
            <div className="p-8 pb-4">
                <div className="flex items-center gap-2 text-app-text-dim mb-8">
                    <Info className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Operational Unit v4.0</span>
                </div>

                {/* Secondary Navigation */}
                <div className="space-y-1">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={activeTab === item.id}
                            onClick={() => setActiveTab(item.id)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-10 custom-scrollbar">
                {/* Real-time Alerts Feed */}
                <section>
                    <div className="flex items-center justify-between mb-6 px-2">
                        <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4 text-app-text-dim" />
                            <h2 className="text-[10px] font-black text-app-text uppercase tracking-widest">Agency Feed</h2>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                    </div>

                    <div className="space-y-4">
                        {alerts.map((alert) => (
                            <div key={alert.id} className="group cursor-pointer">
                                <div className="p-4 bg-app-card/30 border border-app-border/50 rounded-2xl group-hover:border-app-border group-hover:bg-app-card/50 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={cn("text-[9px] font-black uppercase tracking-widest border px-2 py-0.5 rounded",
                                            alert.color.includes('rose') ? 'bg-rose-500/10 border-rose-500/20' :
                                                alert.color.includes('amber') ? 'bg-amber-500/10 border-amber-500/20' :
                                                    'bg-blue-500/10 border-blue-500/20', alert.color)}>
                                            {alert.type}
                                        </div>
                                        <span className="text-[9px] font-bold text-app-text-dim uppercase">{alert.time}</span>
                                    </div>
                                    <p className="text-[11px] font-medium text-app-text-dim leading-relaxed group-hover:text-app-text transition-colors">
                                        {alert.msg}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            <div className="p-6 border-t border-app-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-app-card border border-app-border flex items-center justify-center">
                        <Zap className="w-4 h-4 text-app-accent" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-app-text uppercase italic">K-NODE 07</div>
                        <div className="text-[9px] text-app-text-dim font-bold uppercase tracking-tighter">Secure Uplink Online</div>
                    </div>
                </div>
                <button className="p-2 hover:bg-app-card rounded-lg text-app-text-dim">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </aside>
    );
};

const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
    <div
        onClick={onClick}
        className={cn(
            "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer group",
            active ? "bg-app-primary/10 border border-app-primary/20" : "hover:bg-app-card/50 border border-transparent"
        )}
    >
        <Icon className={cn("w-4 h-4 transition-colors", active ? "text-app-primary" : "text-app-text-dim group-hover:text-app-text")} />
        <span className={cn("text-[11px] font-black uppercase tracking-widest transition-colors", active ? "text-app-text" : "text-app-text-dim group-hover:text-app-text")}>
            {label}
        </span>
    </div>
);

