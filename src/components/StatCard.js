import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const StatCard = ({ title, subclass, children, buttonText, onButtonPress }) => {
    return (
        <View style={[styles.card, styles[subclass]]}>
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.title}>{title}</Text>

                </View>
                {subclass === 'Sleep' && <Text style={styles.waterSubtitle}>(NUM)ml / day</Text>}
            </View>

            <View style={styles.content}>
                {children}
            </View>

            {buttonText && (
                <TouchableOpacity style={styles.button} onPress={onButtonPress}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 20,
        marginVertical: 10,
        minHeight: 120, // ensure some height
    },
    water: {
        backgroundColor: '#C5E6E0', // Light Teal
    },
    history: {
        backgroundColor: '#60BFAE', // Darker Teal
    },
    risk: {
        backgroundColor: '#E8F1E9', // Very light green
        borderWidth: 1,
        borderColor: '#D1E7DD',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
    },
    waterSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    content: {
        marginTop: 5,
    },
    button: {
        backgroundColor: '#0F766E', // Active Teal
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    }
});

export default StatCard;
