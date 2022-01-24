import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { screens } from '../utils/constants';
import SidebarButton from './SidebarButton';
import { logoutStatusSelector, logoutUserAction, userDataSelector } from '../redux/reducers';
import { unsetUserData } from '../hooks/useAuthData';
import colors from '../utils/appColors';


const Sidebar = ({ navigation }) => {

    const dispatch = useDispatch();

    const [activeScreenIndex, setActiveScreenIndex] = useState(1);
    const { userName, userToken } = useSelector(userDataSelector);
    const isLoadingLogout = useSelector(logoutStatusSelector);

    useEffect(() => {
        if (!userName && !userToken) {
            navigation.navigate(screens.LOGIN);
        }
    }, [userName, userToken]);

    useEffect(() => {
        setActiveScreenIndex(navigation.getState().index);
    }, [navigation.getState().index]);


    return (
        <SafeAreaView style={styles.sidebarWrapper}>

            <View style={styles.userInfo}>
                <Ionicons name="person-circle-outline" size={70} color={colors.blueSecond}/>
                <Text style={styles.userInfoText}>{userName}</Text>
            </View>

            <View style={styles.menuButtonsWrapper}>
                <SidebarButton
                    icon="chatbubble-ellipses-outline"
                    text="Messages"
                    navigateTo={screens.CHAT}
                    active={activeScreenIndex === 1}
                />
                <SidebarButton
                    icon="settings-outline"
                    text="Settings"
                    navigateTo={screens.SETTINGS}
                    active={activeScreenIndex === 2}
                />
                <SidebarButton
                    icon="information-circle-outline"
                    text="Info"
                    navigateTo={screens.INFO}
                    active={activeScreenIndex === 3}
                />
            </View>

            <View style={styles.bottom}>
                {
                    isLoadingLogout
                        ? <ActivityIndicator size="large" style={styles.spin} />
                        : <Pressable
                            style={({ pressed }) => [
                                pressed ? styles.logoutButtonPressIn : styles.logoutButtonPressOut,
                                styles.logoutButton
                            ]}
                            onPress={async () => {
                                dispatch(logoutUserAction())
                                await unsetUserData();
                            }}
                        >
                            <Ionicons name="exit-outline" size={30} style={styles.logoutButtonIcon}/>
                        </Pressable>
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sidebarWrapper: {
        flex: 1,
        backgroundColor: colors.backgroundSecond
    },
    menuButtonsWrapper: {
        paddingTop: 30,
        flex: 1,
    },
    bottom: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 15,
    },
    logoutButton: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        borderRadius: 100,
    },
    logoutButtonIcon: {
        marginLeft: 23,
        color: colors.graySecond,
    },
    logoutButtonPressIn: {
        backgroundColor: colors.grayGeneral,
    },
    logoutButtonPressOut: {
        backgroundColor: colors.red,
    },
    userInfo: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 15,
    },
    userInfoText: {
        color: colors.blueSecond,
        fontWeight: 'bold'
    },
    spin: {
        marginTop: 18
    },
});

export default Sidebar;
