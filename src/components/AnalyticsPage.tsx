import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, PieChart, BarChart2, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { fetchBNSStats } from '../lib/api';
import Loader from './Loader';
import DownloadButton from './DownloadButton';

export const AnalyticsPage = () => {
    const [stats, setStats] = React.useState<Record<string, number>>({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await fetchBNSStats();
                setStats(data);
            } catch (error) {
                console.error("Error loading stats:", error);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    const sectionsMapping: Record<string, string> = {
        '103': 'BNS 103 (Murder)',
        '115': 'BNS 115 (Assault)',
        '303': 'BNS 303 (Theft)',
        '111': 'BNS 111 (Organized Crime)',
        '126': 'BNS 126 (Nuisance)',
        '70': 'BNS 70 (Sexual Offenses)',
        '310': 'BNS 310 (Robbery)',
        '320': 'BNS 320 (Mischief)'
    };

    const colorsMapping: Record<string, string> = {
        '103': 'bg-rose-500',
        '115': 'bg-amber-500',
        '303': 'bg-blue-500',
        '111': 'bg-emerald-500',
        '126': 'bg-purple-500',
        '70': 'bg-pink-500',
        '310': 'bg-orange-500',
        '320': 'bg-cyan-500'
    };

    const maxVal = Math.max(...Object.values(stats), 10);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Analytics Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-app-card/40 p-6 rounded-2xl border border-app-border">
                <div>
                    <h1 className="text-2xl font-black text-app-text tracking-tight">System Analytics</h1>
                    <p className="text-sm text-app-text-dim font-medium">Predictive model performance and BNS categorization metrics</p>
                </div>
                <div className="flex gap-3 items-center">
                    <DownloadButton text="Generate Report" completedText="Ready" />
                    <div className="px-4 py-2 bg-app-card rounded-lg text-[9px] font-black text-app-text-dim cursor-pointer hover:bg-app-background transition-colors border border-app-border h-10 flex items-center">
                        FILTERS
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Categorization Matrix */}
                <div className="lg:col-span-2 glass-card p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <BarChart2 className="w-5 h-5 text-app-primary" />
                            <h3 className="text-sm font-black text-app-text uppercase tracking-widest">BNS Section Frequency</h3>
                        </div>
                        <span className="text-[10px] font-bold text-app-text-dim uppercase">Live Distribution</span>
                    </div>

                    <div className="space-y-6">
                        {Object.entries(stats).map(([section, count]) => (
                            <AnalyticBar
                                key={section}
                                label={sectionsMapping[section] || `BNS ${section}`}
                                value={count}
                                max={maxVal}
                                color={colorsMapping[section] || 'bg-app-primary'}
                            />
                        ))}
                        {Object.keys(stats).length === 0 && <p className="text-app-text-dim text-xs">Loading archival records...</p>}
                    </div>
                </div>

                {/* Stats Matrix Sidebar Replacement */}
                <div className="glass-card p-8 flex flex-col gap-6">
                    <h3 className="text-sm font-black text-app-text uppercase tracking-widest flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-app-primary" />
                        Key Insights
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-app-background/50 rounded-xl border border-app-border">
                            <div className="text-[10px] font-black text-app-primary uppercase mb-1">Top Hazard</div>
                            <div className="text-sm font-bold text-white">BNS 111 (Organized Crime)</div>
                        </div>
                        <div className="p-4 bg-app-background/50 rounded-xl border border-app-border">
                            <div className="text-[10px] font-black text-emerald-500 uppercase mb-1">Peak Mitigation</div>
                            <div className="text-sm font-bold text-white">Urban Core Night Vigil</div>
                        </div>
                        <div className="p-4 bg-app-background/50 rounded-xl border border-app-border">
                            <div className="text-[10px] font-black text-blue-500 uppercase mb-1">Detection Delta</div>
                            <div className="text-sm font-bold text-white">+5.2% YoY (Zone 4)</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard icon={Activity} label="Processed FIRs" value="12,482" trend="+5.2%" color="text-blue-500" />
                <MetricCard icon={Target} label="Detection Rate" value="88.4%" trend="+1.8%" color="text-emerald-500" />
                <MetricCard icon={TrendingUp} label="Risk Mitigation" value="14.2%" trend="+0.4%" color="text-amber-500" />
            </div>
        </div>
    );
};

const AnalyticBar = ({ label, value, max, color }: any) => (
    <div className="space-y-2">
        <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-app-text-dim">{label}</span>
            <span className="text-xs font-black text-app-text">{value} cases</span>
        </div>
        <div className="h-2 w-full bg-app-background rounded-full overflow-hidden border border-app-border">
            <div
                className={cn("h-full rounded-full transition-all duration-1000 ease-out", color)}
                style={{ width: `${(value / max) * 100}%` }}
            />
        </div>
    </div>
);

const MetricCard = ({ icon: Icon, label, value, trend, color }: any) => (
    <div className="glass-card p-6 border border-app-border hover:border-app-border/80 transition-all">
        <div className="flex items-center gap-3 mb-4">
            <div className={cn("p-2 rounded-lg bg-app-background", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-app-text-dim uppercase tracking-widest">{label}</span>
        </div>
        <div className="flex items-end justify-between">
            <div className="text-2xl font-black text-app-text">{value}</div>
            <div className={cn("text-[10px] font-bold uppercase", trend.startsWith('+') ? 'text-emerald-500' : 'text-app-danger')}>
                {trend}
            </div>
        </div>
    </div>
);
