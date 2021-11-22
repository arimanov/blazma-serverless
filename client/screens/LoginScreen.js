import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, Alert, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';

export default () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.navigate('ChatScreen')} title="login" />
        </View>
    );
}
