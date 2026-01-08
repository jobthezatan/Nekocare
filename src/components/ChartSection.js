import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { usePetStore } from '../store/PetStore';

const ChartSection = () => {
    const { timeRange, updateTimeRange, healthLogs } = usePetStore();
    const ranges = ['7 DAY', '30 DAY', '3 MONTH', '6 MONTH', '1 YEAR'];

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Cat Daily <View style={styles.badge}><Text style={styles.badgeText}>Summarise</Text></View></Text>
            </View>

            <View style={styles.chartContainer}>
                {/* Simplified conceptual chart visualization */}
                <View style={styles.yAxis}>
                    <View style={styles.line} />
                    <View style={styles.line} />
                    <View style={styles.line} />
                </View>
                <View style={styles.waveContainer}>
                    {/* Render bars from healthLogs */}
                    {healthLogs.length > 0 ? healthLogs.map((log, index) => {
                        const level = parseInt(log.eating_level, 10) || 0;
                        return (
                            <View key={log.id} style={[styles.waveBar, {
                                height: (level / 5) * 80 + 20, // Scale 1-5 to height 
                                backgroundColor: level >= 4 ? '#818CF8' : '#C7D2FE'
                            }]} />
                        );
                    }) : (
                        // Fallback/Placeholder if no data
                        <>
                            <View style={[styles.waveBar, { height: 30 }]} />
                            <View style={[styles.waveBar, { height: 50 }]} />
                            <View style={[styles.waveBar, { height: 80 }]} />
                            <View style={[styles.waveBar, { height: 40 }]} />
                        </>
                    )}
                </View>
                <View style={styles.labels}>
                    <Text style={styles.labelText}>Eat & Drink Overview</Text>
                </View>
            </View>

            <View style={styles.tabsContainer}>
                {ranges.map((range) => (
                    <TouchableOpacity
                        key={range}
                        style={[styles.tab, timeRange === range && styles.activeTab]}
                        onPress={() => updateTimeRange(range)}
                    >
                        <Text style={[styles.tabText, timeRange === range && styles.activeTabText]}>
                            {range}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    header: {
        marginBottom: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    badge: {
        backgroundColor: '#FFB8B8',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        alignSelf: 'center', // Fix for nested view
    },
    badgeText: {
        fontSize: 10,
        color: '#000',
    },
    chartContainer: {
        height: 150,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    waveContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: '60%',
        width: '80%',
        justifyContent: 'space-between',
    },
    waveBar: {
        width: 6,
        backgroundColor: '#818CF8', // Indigo/Blueish
        borderRadius: 3,
        opacity: 0.5,
    },
    line: {
        height: 1,
        backgroundColor: '#E5E7EB',
        width: '100%',
        marginVertical: 15,
    },
    yAxis: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    labels: {
        position: 'absolute',
        top: 10,
        width: '100%',
        alignItems: 'center',
    },
    labelText: {
        fontSize: 12,
        color: '#6B7280',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        padding: 4,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#1F2937', // Dark color for active
    },
    tabText: {
        fontSize: 10,
        color: '#6B7280',
        fontWeight: '600',
    },
    activeTabText: {
        color: 'white',
    },
});

export default ChartSection;
