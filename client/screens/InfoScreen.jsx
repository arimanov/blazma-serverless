import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { StatusBar } from "expo-status-bar";

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.dataTitle}>-- Info Screen --</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4DDE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
});
