import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from '../components/Header'; // Reusing Header if possible, or creating a specific one
import { usePetStore } from '../store/PetStore';

const RiskAssessmentScreen = ({ navigateTo }) => {
    const { latestRiskAssessment } = usePetStore();
    const { riskLevel, riskLabel, preventionApproaches, approachesList } = latestRiskAssessment;

    // Default to first approach
    const [selectedApproach, setSelectedApproach] = useState(approachesList[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Find content matching selection or default to first
    // Note: In real app, make sure approachesList items match preventionApproaches keys/titles
    const activePrevention = preventionApproaches[0];

    // Gradient color for the gauge (simulated with standard colors for now)
    const gaugeColor = riskLevel > 50 ? '#F59E0B' : '#10B981';

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const selectOption = (option) => {
        setSelectedApproach(option);
        setIsDropdownOpen(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Custom Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigateTo('Dashboard')} style={styles.backButton}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>NEKOCARE</Text>
                <View style={{ width: 30 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <Text style={styles.screenTitle}>แนวโน้มสุขภาพ</Text>

                {/* Gauge Chart Area - Simplified implementation using CSS/border radius tricks if no svg */}
                <View style={styles.gaugeContainer}>
                    <Text style={styles.chartTitle}>Health Trends Overview</Text>
                    <View style={styles.legendContainer}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#FADba5' }]} />
                            <Text style={styles.legendText}>Health</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                            <Text style={styles.legendText}>Less Health</Text>
                        </View>
                    </View>

                    {/* Circular Chart Simulation */}
                    <View style={styles.chartWrapper}>
                        <View style={styles.outerCircle}>
                            <View style={[styles.innerCircle, { borderTopColor: gaugeColor, borderRightColor: gaugeColor }]} />
                            <View style={styles.centerCircle}>
                                <Text style={styles.percentageText}>{riskLevel}%</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.disclaimer}>
                        *ผลลัพธ์จากการทำนายสุขภาพแมว โปรดทราบว่านี่เป็นเพียงการประเมินเบื้องต้นเท่านั้น (ความแม่นยำ 88%)
                        โปรดปรึกษาสัตวแพทย์เพื่อวินิจฉัยโรค
                    </Text>
                </View>

                {/* Risk Level Section */}
                <View style={styles.riskSection}>
                    <Text style={styles.sectionHeader}>ระดับความเสี่ยง</Text>
                    <View style={styles.riskCard}>
                        <View style={styles.riskHeaderLine}>
                            <Text style={styles.riskLevelTitle}>risk level {riskLevel}%</Text>
                            <View style={[styles.riskLevelIndicator, { backgroundColor: gaugeColor }]} />
                        </View>
                        <Text style={styles.riskDescription}>
                            Predict health risk based on your cat's profile.
                        </Text>
                        <Text style={styles.riskDescriptionTH}>
                            ทำนายความเสี่ยงสุขภาพจากข้อมูลของน้องแมว
                            (ความแม่นยำ 88%)
                        </Text>
                        <TouchableOpacity style={styles.moreButton}>
                            <Text style={styles.moreButtonText}>More {'>'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Approach Section */}
                <View style={styles.approachSection}>
                    <Text style={styles.sectionHeader}>Approach</Text>

                    <View style={styles.approachCard}>
                        <Text style={styles.cardTitle}>Disease Prevention</Text>

                        {/* Custom Dropdown */}
                        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                            <Text style={styles.dropdownText}>{selectedApproach}</Text>
                            <MaterialCommunityIcons name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={20} color="#6B7280" />
                        </TouchableOpacity>

                        {isDropdownOpen && (
                            <View style={styles.dropdownList}>
                                {approachesList.map((item, index) => (
                                    <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => selectOption(item)}>
                                        <Text style={styles.dropdownItemText}>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        <View style={styles.approachContent}>
                            <Text style={styles.approachTitle}>{activePrevention.title}</Text>
                            <Text style={styles.approachText}>
                                {activePrevention.intro}
                            </Text>
                            <View style={styles.bulletList}>
                                {activePrevention.bullets.map((bullet, idx) => (
                                    <Text key={idx} style={styles.bulletItem}>• {bullet}</Text>
                                ))}
                            </View>
                            <Text style={styles.approachTextItalic}>
                                {activePrevention.note}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 40 }} />

            </ScrollView>
            {/* Bottom Navigation Mock (since it's persistent in App.js but this is a full screen, 
             we might need to hide the main one or just show a static one here if designed that way. 
             For now, leaving blank as it might overlap) */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    backButton: {
        width: 30,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#098774', // Brand color
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },
    // Gauge Chart Styles
    gaugeContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    chartTitle: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 10,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    legendText: {
        fontSize: 12,
        color: '#4B5563',
    },
    chartWrapper: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    outerCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 10,
        borderColor: '#FEF3C7', // Light orange bg
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    innerCircle: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 10,
        borderColor: 'transparent',
        transform: [{ rotate: '-45deg' }], // Simple rotation to simulate part fill
    },
    centerCircle: {
        position: 'absolute',
    },
    percentageText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111827',
    },
    disclaimer: {
        fontSize: 10,
        color: '#EF4444', // Red
        textAlign: 'center',
        marginTop: 10,
    },
    // Risk Section
    riskSection: {
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#374151',
    },
    riskCard: {
        backgroundColor: '#D1FAE5', // Light green bg
        borderRadius: 16,
        padding: 20,
    },
    riskHeaderLine: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    riskLevelTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#065F46',
        marginRight: 10,
    },
    riskLevelIndicator: {
        width: 40,
        height: 4,
        borderRadius: 2,
    },
    riskDescription: {
        fontSize: 12,
        color: '#065F46',
        marginBottom: 2,
    },
    riskDescriptionTH: {
        fontSize: 12,
        color: '#065F46',
        marginBottom: 15,
        opacity: 0.8,
    },
    moreButton: {
        alignSelf: 'flex-end',
    },
    moreButtonText: {
        color: '#10B981',
        fontWeight: 'bold',
    },
    // Approach Section
    approachSection: {
        marginBottom: 20,
    },
    approachCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#111827',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    dropdownText: {
        color: '#4B5563',
        fontSize: 14,
    },
    dropdownList: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        marginTop: -10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    dropdownItemText: {
        color: '#374151',
    },
    approachContent: {
        marginTop: 5,
    },
    approachTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#374151',
    },
    approachText: {
        fontSize: 12,
        color: '#6B7280',
        lineHeight: 18,
        marginBottom: 8,
    },
    bulletList: {
        marginLeft: 10,
        marginBottom: 10,
    },
    bulletItem: {
        fontSize: 12,
        color: '#6B7280',
        lineHeight: 18,
    },
    approachTextItalic: {
        fontSize: 10,
        color: '#9CA3AF',
        fontStyle: 'italic',
    },


});

export default RiskAssessmentScreen;
