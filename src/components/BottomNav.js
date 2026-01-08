import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const BottomNav = () => {
    return (
        <View style={styles.container}>
            <NavIcon name="home" />
            <NavIcon name="bar-chart-2" active />
            <View style={styles.addButton}>
                <Ionicons name="add" size={40} color="white" />
            </View>
            <NavIcon name="video-camera" IconComponent={AntDesign} />
            <NavIcon name="user" />
        </View>
    );
};

const NavIcon = ({ name, active, IconComponent = Feather }) => {
    let color = active ? '#34D399' : '#9CA3AF';
    return (
        <TouchableOpacity style={[styles.iconBox, active && styles.activeIconBox]}>
            <IconComponent name={name} size={26} color={color} />
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
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#34D399',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        shadowColor: '#34D399',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    }
});

export default BottomNav;
