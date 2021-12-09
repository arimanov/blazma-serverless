import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Alert, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { useNavigation } from '@react-navigation/native';

const SidebarButton = ({ icon, text, active, navigateTo }) => {

    const navigation = useNavigation();
    const iconSize = 25;

    const openScreen = () => {
        if (!active) {
            navigation.navigate(navigateTo);
        }
    };

    return (
        <Pressable
            style={({ pressed }) => [
                active
                    ? styles.active
                    : pressed ? styles.pressedIn : styles.pressedOut,
                styles.common
            ]}
            onPress={openScreen}
        >
            <>
                <Ionicons name={icon} size={iconSize} style={active ? styles.colorActive : styles.colorInactive}/>
                <Text style={[active ? styles.colorActive : styles.colorInactive, styles.text]}>{text}</Text>
            </>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    common: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    pressedIn: {
        backgroundColor: '#f1eaea',
    },
    pressedOut: {
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: '#5D7CF3',
    },
    text: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
    colorActive: {
        color: '#F7F8FA',
    },
    colorInactive: {
        color: '#2F3046',
    }
});

SidebarButton.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    active: PropTypes.bool,
    navigateTo: PropTypes.string,
};

SidebarButton.defaultProps = {
    active: false,
};

export default SidebarButton;