import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>NEK<Text style={styles.paw}>🐾</Text>CARE</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 15, // Safe area top
        paddingHorizontal: 20,
        backgroundColor: '#E8F5F3',
        paddingBottom: 15,
    },
    logoContainer: {
        backgroundColor: '#2F80ED', // Blue box color
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    logo: {
        fontSize: 20,
        fontWeight: '800',
        color: 'white',
        letterSpacing: 1,
    },
    paw: {
        fontSize: 16,
        color: '#AEE2FF', // Lighter blue for paw
    }
});

export default Header;
