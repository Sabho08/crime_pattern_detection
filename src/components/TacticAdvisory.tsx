import React, { useState, useEffect } from 'react';
import { Shield, MapPin, Activity, ChevronRight, AlertTriangle, Navigation } from 'lucide-react';
import { cn } from '../lib/utils';

// Using a proxy or direct fetch since we are in the same local environment
const API_BASE_URL = 'http://localhost:8000';

interface Advisory {
    location: [number, number];
    risk_score: number;
    patrol_frequency: string;
    checkpoint_recommended: boolean;
    advisory: string;
}

export const TacticAdvisory = () => {
    const [advisories, setAdvisories] = useState<Advisory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdvisories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/deterrence-advisories`);
                if (response.ok) {
                    const data = await response.json();
                    setAdvisories(data);
                }
            } catch (err) {
                console.error("Advisory Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAdvisories();
    }, []);

    if (loading) return null;

    return (
        <div className="glass-card p-6 bg-gradient-to-br from-indigo-500/5 to-transparent border-app-border overflow-hidden relative">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-[10px] font-black flex items-center gap-2 text-app-text-dim uppercase tracking-widest">
                        <Navigation className="w-4 h-4 text-app-primary" />
                        Tactical Deterrence Dashboard (Phase 4)
                    </h3>
                    <p className="text-[9px] text-app-text-dim uppercase tracking-widest mt-1">Live Intelligence-Led Deployment</p>
                </div>
                <div className="px-3 py-1 bg-app-primary/10 border border-app-primary/20 rounded-full text-[9px] font-black text-app-primary uppercase tracking-tighter">
                    Feedback Loop Active
                </div>
            </div>

            <div className="space-y-4">
                {advisories.map((adv, idx) => (
                    <div key={idx} className="bg-app-background/50 border border-app-border p-4 rounded-xl group hover:border-app-primary/30 transition-all cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className={cn(
                                    "p-2 rounded-lg",
                                    adv.risk_score > 15 ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
                                )}>
                                    <MapPin size={14} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-app-text uppercase">Hotspot Sector {idx + 1}</div>
                                    <div className="text-[8px] text-app-text-dim font-bold tracking-tighter uppercase italic">{adv.location[0].toFixed(3)}, {adv.location[1].toFixed(3)}</div>
                                </div>
                            </div>
                            {adv.checkpoint_recommended && (
                                <div className="px-2 py-0.5 bg-rose-500/20 text-rose-500 border border-rose-500/30 rounded text-[7px] font-black uppercase tracking-tighter">
                                    Checkpoint Recommended
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex-1">
                                <p className="text-[10px] text-app-text-dim leading-relaxed italic">"{adv.advisory}"</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-app-border">
                            <div className="flex items-center gap-1.5">
                                <Activity size={10} className="text-app-text-dim" />
                                <span className="text-[9px] font-bold text-app-text-dim uppercase tracking-tighter">Patrol Frequency:</span>
                                <span className="text-[9px] font-black text-app-primary uppercase tracking-tighter">{adv.patrol_frequency}</span>
                            </div>
                            <ChevronRight size={14} className="text-app-text-dim group-hover:text-app-primary transition-colors" />
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 bg-app-card border border-app-border rounded-lg text-[9px] font-black uppercase tracking-[0.2em] hover:bg-app-background transition-colors text-app-text flex items-center justify-center gap-2">
                <Shield size={12} /> DEPLOY RESOURCES TO STREET
            </button>
        </div>
    );
};
