import React, { useState, useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/appColors';

const SendMessageCtrl = ({ messageListRef, onPressSend }) => {

    const inputRef = useRef();
    const [message, setMessage] = useState('');

    const onPressSendCb = (status) => {
        if (status) {
            inputRef.current.clear();
            setMessage('');
        }
    }

    return (
        <View style={styles.sendFormWrapper}>
            <TextInput
                ref={inputRef}
                placeholder={'Message'}
                multiline
                style={styles.messageInput}
                onChangeText={setMessage}
                onFocus={() => {
                    setTimeout(() => {
                        messageListRef.current.scrollToEnd({animated: true});
                    }, 100);
                }}
            />
            <Pressable
                style={({ pressed }) => [pressed ? styles.buttonPressedIn : styles.buttonPressedOut, styles.button]}
                onPress={() => onPressSend(message, onPressSendCb)}
            >
                {({ pressed }) => (
                    <Ionicons
                        name={'arrow-up-circle'}
                        size={40}
                        style={pressed ? styles.buttonIconPIn : styles.buttonIconPOut} />
                )}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    sendFormWrapper: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopWidth: 1,
        borderTopColor: colors.blueFourth,
    },
    messageInput: {
        flex: 1,
        borderWidth: 1.5,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        borderColor: colors.blueThird,
    },
    buttonIconPIn: {
        color: colors.blueThird,
    },
    buttonIconPOut: {
        color: colors.blueGeneral,
    },
});

export default SendMessageCtrl;