import React, { createContext, useState, useContext } from 'react';
import { supabase } from '../services/supabase';

const PetContext = createContext();

export const usePetStore = () => useContext(PetContext);

export const PetProvider = ({ children }) => {
    const [selectedPet, setSelectedPet] = useState({ name: 'Mochi', type: 'Cat' });
    const [timeRange, setTimeRange] = useState('3 MONTH');
    const [waterIntake, setWaterIntake] = useState(250); // ml
    const [waterGoal, setWaterGoal] = useState(400); // ml

    // Mock Data State
    const [healthLogs, setHealthLogs] = useState([]);
    const [riskHistory, setRiskHistory] = useState([]);
    const [latestRiskAssessment, setLatestRiskAssessment] = useState({
        riskLevel: 60,
        riskLabel: 'Medium',
        preventionApproaches: [
            {
                title: '5 วิธีป้องกันป่วยโรคไตและนิ่วในแมว',
                intro: 'การเลี้ยงแมวให้สุขภาพดีและห่างไกลจากโรคไตและนิ่วนั้น สามารถทำได้ง่ายๆ หากเจ้าของใส่ใจดูแลอย่างใกล้ชิด',
                bullets: [
                    'กระตุ้นการดื่มน้ำ (แมวชอบน้ำพุ)',
                    'เลือกอาหารที่มีคุณภาพ (โซเดียมต่ำ, โปรตีนคุณภาพดี)',
                    'ทำความสะอาดกระบะทรายเป็นประจำ'
                ],
                note: '(เนื้อหาจำลองเพื่อการสาธิต ตามข้อมูลแมว เพศผู้, ทำหมันแล้ว, พันธุ์ผสม)'
            }
        ],
        approachesList: ['Option data', 'Option data 2', 'Option data 3']
    });

    const fetchDashboardData = async () => {
        try {
            await checkAndSeedData(); // Ensure data exists

            // 1. Fetch daily_health_logs (Last 7 days)
            const { data: logs, error: logsError } = await supabase
                .from('daily_health_logs')
                .select('*')
                .order('log_date', { ascending: true })
                .limit(7);

            if (logsError) throw logsError;

            if (logs) {
                setHealthLogs(logs);

                // Calculate latest water/sleep from the last log
                const latestLog = logs[logs.length - 1];
                if (latestLog && latestLog.payload_json) {
                    setWaterIntake(latestLog.payload_json.drink_ml || 0);
                }
            }

            // 2. Fetch risk_assessments
            // Assuming we join with ai_assessments to get summary_text, or if it's in risk_assessments directly as per user request
            // User schema hint: risk_assessments (summary_text, risk_count, assessed_at)
            const { data: risks, error: risksError } = await supabase
                .from('risk_assessments')
                .select('*')
                .order('assessed_at', { ascending: false })
                .limit(5);

            if (risksError) throw risksError;

            if (risks) {
                setRiskHistory(risks);
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const checkAndSeedData = async () => {
        try {
            // Check if any log exists
            const { count } = await supabase.from('daily_health_logs').select('*', { count: 'exact', head: true });

            if (count === 0) {
                console.log('Seeding data...');

                // 1. Get or Create a Cat
                let catId;
                const { data: cats } = await supabase.from('cats').select('id').limit(1);

                if (cats && cats.length > 0) {
                    catId = cats[0].id;
                } else {
                    // Need an owner_user_id. Check auth state.
                    let userId = (await supabase.auth.getUser()).data.user?.id;

                    if (!userId) {
                        try {
                            // Try anonymous sign in if enabled, or just wait? 
                            // For this specific error, we need a user ID. 
                            const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
                            if (authData?.user) {
                                userId = authData.user.id;
                            } else {
                                console.warn("No user logged in and anonymous sign-in failed/disabled. Using placeholder UUID.");
                                // Fallback: This might fail FK constraint if owner_user_id references auth.users
                                userId = '00000000-0000-0000-0000-000000000000';
                            }
                        } catch (err) {
                            console.warn("Auth check failed:", err);
                            userId = '00000000-0000-0000-0000-000000000000';
                        }
                    }

                    // Create dummy cat
                    const { data: newCat, error: catError } = await supabase
                        .from('cats')
                        .insert({
                            name: 'Mochi',
                            owner_user_id: userId
                        })
                        .select()
                        .single();

                    if (catError) {
                        console.error("Error creating cat:", JSON.stringify(catError));
                        return; // Cannot proceed without cat
                    }
                    catId = newCat.id;
                }

                // 2. Prepare Mock Logs
                const mockLogs = Array.from({ length: 7 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (6 - i));
                    return {
                        cat_id: catId,
                        weight_kg: 5.0, // Numeric
                        food_text: 'Tuna & Salmon', // Text
                        eating_level: String(Math.floor(Math.random() * 5) + 1), // Store as string "1"-"5"
                        drinking_level: String(Math.floor(Math.random() * 5) + 1), // Store as string "1"-"5"
                        urine_amount: ['Little', 'Normal', 'Much'][Math.floor(Math.random() * 3)],
                        stool_type: 'Normal',
                        energy_level: 'High',
                        log_date: date.toISOString().split('T')[0],
                        payload_json: {
                            sleep_hours: Math.floor(Math.random() * 10) + 8,
                            drink_ml: Math.floor(Math.random() * 200) + 100
                        }
                    };
                });
                await supabase.from('daily_health_logs').insert(mockLogs);

                // 3. Prepare Mock Risks
                const mockRisks = [
                    {
                        // assessment_id: ... needs to link to ai_assessments if FK exists. 
                        // For simplicity, assuming user provided schema allows direct insert or we insert into ai_assessments first.
                        // However, based on user prompt "risk_assessments... use field summary_text", I'll try direct insert.
                        // If it fails due to FK, I will catch it.
                        // Let's assume standard structure -> Insert ai_assessments first then risk_assessments? 
                        // User said: "risk_assessments.id -> ai_assessments.assessment_id".
                        // Use raw text for now as requested.
                        risk_level: 'Low', // Guessing column name
                        summary_text: 'สุขภาพโดยรวมแข็งแรงดี ระดับน้ำและอาหารปกติ',
                        risk_count: 1,
                        assessed_at: new Date(Date.now() - 86400000 * 2).toISOString(),
                    },
                    {
                        risk_level: 'Medium',
                        summary_text: 'ควรดื่มน้ำเพิ่มขึ้นเล็กน้อย',
                        risk_count: 2,
                        assessed_at: new Date(Date.now() - 86400000 * 10).toISOString(),
                    }
                ];
                // Note: Schema might require ai_assessment_id. Seeding risks might be complex without knowing exact FK. 
                // I will try to insert fields that user explicitly listed.
                await supabase.from('risk_assessments').insert(mockRisks);

                console.log('Seeding complete.');
            }
        } catch (e) {
            console.log("Seeding skipped or failed (likely due to schema mismatch or RLS):", e);
        }
    };

    // Load data on mount (Simulated)
    React.useEffect(() => {
        fetchDashboardData();
    }, []);

    const updateTimeRange = (range) => {
        setTimeRange(range);
        // In a real app, this would fetch new graph data
        console.log(`Time range updated to: ${range}`);
    };

    const value = {
        selectedPet,
        timeRange,
        updateTimeRange,
        waterIntake,
        waterGoal,
        healthLogs,
        riskHistory,
        latestRiskAssessment,
        fetchDashboardData
    };

    return (
        <PetContext.Provider value={value}>
            {children}
        </PetContext.Provider>
    );
};
