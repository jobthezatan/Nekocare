import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>NEK<Text style={styles.paw}>🐾</Text>CARE</Text>
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
    logo: {
        fontSize: 25,
        fontWeight: '800',
        color: '#6B7C7C',
        letterSpacing: 1,
    },
    paw: {
        fontSize: 16, // Adjust to fit nicely
        color: '#34D399',
    }
});

export default Header;
