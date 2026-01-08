import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const BottomNav = () => {
    return (
        <View style={styles.container}>
            <NavIcon name="home" />
            <NavIcon name="bar-chart-2" active />
            <View style={styles.addButton}>
                <Text style={styles.plus}>+</Text>
            </View>
            <NavIcon name="camera" />
            <NavIcon name="user" />
        </View>
    );
};

const NavIcon = ({ name, active }) => {
    let color = active ? '#34D399' : '#9CA3AF';
    return (
        <TouchableOpacity style={[styles.iconBox, active && styles.activeIconBox]}>
            <Feather name={name} size={24} color={color} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingBottom: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 10,
        elevation: 8,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    iconBox: {
        padding: 10,
    },
    activeIconBox: {
        backgroundColor: '#ECFDF5',
        borderRadius: 12,
    },
    addButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#34D399',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#34D399',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
    plus: {
        color: 'white',
        fontSize: 30,
        fontWeight: '300',
        marginTop: -2,
    }
});

export default BottomNav;
