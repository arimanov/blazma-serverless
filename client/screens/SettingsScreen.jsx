import React, { useState } from 'react';

import { StyleSheet, Text, View, Button, Alert, ActivityIndicator, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default () => {
    // const navigation = useNavigation();
    // const screen = 'LoginScreen';
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Settings Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#a9b8d2',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
