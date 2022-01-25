import React from 'react';
import { StyleSheet, Text, SafeAreaView, Image, View, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/appColors';
import { APP_VERSION, BUILD_NUMBER } from '@env';

export default () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/blazma-logo.png')}
                />
            </View>
            <View style={styles.infoContainer}>

                <Text style={styles.title}>Blazma — simple open-source React Native chat application</Text>

                <View style={styles.textBlock}>
                    <Ionicons name={'logo-github'} size={18}  style={styles.icon} />
                    <Text> Github: </Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/arimanov/blazma')}>
                        github.com/arimanov/blazma
                    </Text>
                </View>

                <View style={styles.textBlock}>
                    <Ionicons name={'git-branch-outline'} size={18}  style={styles.icon} />
                    <Text> App version: {APP_VERSION}</Text>
                </View>

                <View style={styles.textBlock}>
                    <Ionicons name={'terminal-outline'} size={18}  style={styles.icon} />
                    <Text> Build number: {BUILD_NUMBER}</Text>
                </View>

                <View style={styles.textBlock}>
                    <Ionicons name={'mail-open-outline'} size={18}  style={styles.icon} />
                    <Text> Email for feedback: </Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('mailto:blazma@tsipun.ru')}>
                        blazma@tsipun.ru
                    </Text>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundGeneral,
    },
    logoContainer: {
        alignItems: 'center',
        paddingTop: 10,
    },
    logo: {
        width: 100,
        height: 100,
    },
    icon: {
        width: 25,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 30,
    },
    link: {
        color: colors.blueGeneral,
    },
    textBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoContainer: {
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
    }
});
