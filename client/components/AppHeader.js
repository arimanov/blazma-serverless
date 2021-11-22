import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, Alert, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';

export default () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <Text
                style={{ marginLeft: 15, marginTop: 10, marginBottom: 10  }}
                onPress={ () => navigation.toggleDrawer() }
            >
                🍔
            </Text>
        </SafeAreaView>
    )
}
