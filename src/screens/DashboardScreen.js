import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import ChartSection from '../components/ChartSection';
import StatCard from '../components/StatCard';
import BottomNav from '../components/BottomNav';
import { usePetStore } from '../store/PetStore';

const DashboardScreen = ({ navigateTo }) => {
    const { selectedPet, waterIntake, waterGoal, riskHistory, cats, setSelectedPet } = usePetStore();
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const handleSelectCat = (cat) => {
        setSelectedPet(cat);
        setIsDropdownOpen(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Custom Header */}
            <Header />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Dropdown / Info Area */}
                <View style={styles.infoRow}>
                    <Text style={styles.sectionTitle}>ข้อมูลสำหรับสัตว์เลี้ยง</Text>
                    <View style={styles.petTag}>
                        <Text style={styles.petTagText}>Pet Care</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.inputBox}
                    onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.inputText}>
                        {selectedPet?.name || "Select a Cat"}
                    </Text>
                    <Text style={styles.chevron}>⌄</Text>
                </TouchableOpacity>

                {isDropdownOpen && (
                    <View style={styles.dropdownList}>
                        {cats.length > 0 ? (
                            cats.map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={styles.dropdownItem}
                                    onPress={() => handleSelectCat(cat)}
                                >
                                    <Text style={styles.dropdownText}>{cat.name}</Text>
                                    <Text style={styles.dropdownSubText}>{cat.breed || 'Unknown Breed'}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={styles.dropdownItem}>
                                <Text style={styles.dropdownText}>No cats found</Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Chart Section */}
                <ChartSection />

                {/* Create the specific cards from the design */}

                {/* Water Card */}
                <StatCard title="Sleep" subclass="Sleep">
                    <View style={styles.waterContainer}>
                        <View style={styles.waterIconPlaceholder}>
                            <MaterialCommunityIcons name="sleep" size={24} color='#000000' />
                        </View>
                        <View style={styles.waterBarInfo}>
                            <Text style={styles.volumeText}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{waterIntake}</Text>
                                <Text style={{ color: '#6B7280' }}> / {waterGoal} ml</Text>
                            </Text>
                            <View style={styles.progressBarBg}>
                                <View style={[styles.progressBarFill, { width: `${(waterIntake / waterGoal) * 100}%` }]} />
                            </View>
                            <View style={styles.statusRow}>
                                <View style={styles.statusChipDrink}><Text style={styles.statusText}>drink X%</Text></View>
                                <View style={styles.statusChipLeft}><Text style={styles.statusText}>left X%</Text></View>
                            </View>
                        </View>
                    </View>
                </StatCard>

                {/* History Card */}
                <StatCard title="History" subclass="history">
                    <View style={styles.historyContainer}>
                        <View style={styles.historyHeader}>
                            <Text style={styles.tableHeader}>content</Text>
                            <Text style={styles.tableHeader}>Risk</Text>
                            <Text style={styles.tableHeader}>Date</Text>
                        </View>
                        <View style={styles.historyContentBox}>
                            {riskHistory.map((risk) => (
                                <View key={risk.id} style={styles.historyRow}>
                                    <Text style={styles.historyText} numberOfLines={1}>{risk.summary_text}</Text>
                                    <Text style={[styles.historyText, styles.riskLabel,
                                    risk.risk_level === 'High' ? { color: '#EF4444' } :
                                        risk.risk_level === 'Medium' ? { color: '#F59E0B' } :
                                            { color: '#10B981' }
                                    ]}>{risk.risk_level}</Text>
                                    <Text style={styles.historyText}>{new Date(risk.assessed_at).toLocaleDateString()}</Text>
                                </View>
                            ))}
                            {riskHistory.length === 0 && <Text style={{ textAlign: 'center', marginTop: 10, color: '#9CA3AF' }}>No history</Text>}
                        </View>
                    </View>
                </StatCard>

                {/* Predictive Risk Card */}
                <StatCard
                    title="Predictive Risk"
                    subclass="risk"
                    buttonText="Analyze Now"
                    onButtonPress={() => navigateTo('RiskAssessment')}
                >
                    <Text style={styles.riskText}>
                        Predict health risks based on your cat's profile.
                        {"\n"}
                        ทำนายความเสี่ยงสุขภาพจากข้อมูลของน้องแมว
                    </Text>
                </StatCard>

                {/* Spacer for bottom nav */}
                <View style={{ height: 100 }} />

            </ScrollView>

            {/* Bottom Navigation */}
            <BottomNav />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    scrollContent: {
        padding: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 10,
    },
    petTag: {
        backgroundColor: '#A7F3D0',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    petTagText: {
        fontSize: 10,
        color: '#065F46',
        fontWeight: 'bold',
    },
    inputBox: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputText: {
        color: '#9CA3AF',
    },
    chevron: {
        color: '#6B7280',
        fontSize: 12,
    },
    dropdownList: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 5,
        marginTop: -15, // Overlap slightly or just sit below
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    dropdownSubText: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    // Water specific styles
    waterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    waterIconPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: '#098774ff',
        borderRadius: 25,
        marginRight: 15,
        opacity: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    waterBarInfo: {
        flex: 1,
    },
    volumeText: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 5,
        textAlign: 'right', // Align text right to match design
        justifyContent: 'flex-end',
        display: 'flex',
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        marginBottom: 8,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#4B5563', // Dark grey filling
        borderRadius: 4,
    },
    statusRow: {
        flexDirection: 'row',
    },
    statusChipDrink: {
        backgroundColor: '#93C5FD', // Light blue
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 8,
    },
    statusChipLeft: {
        backgroundColor: '#D1D5DB', // Grey
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#374151',
    },
    // History specific
    historyContainer: {
        marginTop: 5,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    tableHeader: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#374151',
    },
    historyContentBox: {
        backgroundColor: 'white',
        minHeight: 80,
        borderRadius: 8,
        padding: 5,
    },
    historyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    historyText: {
        fontSize: 10,
        color: '#4B5563',
        flex: 1,
    },
    riskLabel: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Risk specific
    riskText: {
        color: '#6B7280',
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 5,
    }
});

export default DashboardScreen;
