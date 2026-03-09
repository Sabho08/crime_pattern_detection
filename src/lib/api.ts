export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchHotspots = async () => {
    const response = await fetch(`${API_BASE_URL}/hotspots`);
    if (!response.ok) throw new Error('Failed to fetch hotspots');
    return response.json();
};

export const fetchBNSStats = async () => {
    const response = await fetch(`${API_BASE_URL}/bns-stats`);
    if (!response.ok) throw new Error('Failed to fetch BNS stats');
    return response.json();
};

export const fetchPredictiveZones = async () => {
    const response = await fetch(`${API_BASE_URL}/predictive-zones`);
    if (!response.ok) throw new Error('Failed to fetch predictive zones');
    return response.json();
};

export const fetchFIRs = async () => {
    const response = await fetch(`${API_BASE_URL}/firs`);
    if (!response.ok) throw new Error('Failed to fetch FIRs');
    return response.json();
};

export const predictRisk = async (data: { latitude: number; longitude: number; time_of_day: string; dist_to_ps: number }) => {
    const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to predict risk');
    return response.json();
};

export const fetchAdvisories = async () => {
    const response = await fetch(`${API_BASE_URL}/deterrence-advisories`);
    if (!response.ok) throw new Error('Failed to fetch advisories');
    return response.json();
};
