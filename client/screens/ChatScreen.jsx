import React, { useRef } from 'react';
import { format, parseISO } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageAction, messagesSelector } from '../redux/reducers';
import useMessageFetch from '../hooks/useMessageFetch';
import SendMessageCtrl from '../components/SendMessageCtrl';
import colors from '../utils/appColors';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';

const parseDateTime = (datetime) => format(parseISO(datetime), 'dd.MM.yyyy HH:mm');

export default () => {
    const dispatch = useDispatch();
    const scrollViewRef = useRef();
    const messages = useSelector(messagesSelector);

    useMessageFetch();

    const sendMessagePress = (message, cb) => {
        if (!message) return;
        const messageSendPromise = dispatch(sendMessageAction(message));
        Keyboard.dismiss();
        messageSendPromise.then((requestStatus) => cb(requestStatus));
    }

    return (
        <SafeAreaView style = {styles.container}>
            <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={115}>
                <View style={{ height: '100%' }}>
                    <ScrollView
                        style={styles.messagesWrapper}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
                    >
                        {
                            messages.map(({self, id, message, createdAt, userName}) => (
                                self
                                    ? <SelfMessage
                                        key={id}
                                        message={message}
                                        datetime={parseDateTime(createdAt)}
                                    />
                                    : <IncomingMessage
                                        key={id}
                                        message={message}
                                        datetime={parseDateTime(createdAt)}
                                        name={userName}
                                    />
                            ))
                        }
                    </ScrollView>
                    <SendMessageCtrl messageListRef={scrollViewRef} onPressSend={sendMessagePress} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const SelfMessage = ({message, datetime}) => {
    return (
        <View style={[styles.selfMessage, styles.commonMessage]}>
            <Text style={styles.commonMessageText}>{message}</Text>
            <Text style={styles.commonMessageDateTime}>{datetime}</Text>
        </View>
    );
}

const IncomingMessage = ({name, message, datetime}) => {
    return (
        <View style={[styles.incomingMessage, styles.commonMessage]}>
            <Text style={styles.incomingMessageUserName}>{name}:</Text>
            <Text style={styles.commonMessageText}>{message}</Text>
            <Text style={styles.commonMessageDateTime}>{datetime}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundSecond,
    },
    dataTitle: {
        marginBottom: 10,
    },
    messagesWrapper: {
        backgroundColor: colors.backgroundGeneral,
    },
    commonMessage: {
        padding: 10,
        width: '85%',
        marginTop: '3%',
        marginBottom: '1%',
        borderRadius: 10,
    },
    commonMessageText: {
        color: colors.graySecond,
    },
    commonMessageDateTime: {
        textAlign: 'right',
        fontSize: 12,
        color: colors.grayGeneral,
    },
    incomingMessage: {
        backgroundColor: colors.blueGeneral,
        marginLeft: '3%',
    },
    incomingMessageUserName: {
        fontSize: 13,
        color: colors.grayGeneral,
        marginBottom: 4,
    },
    selfMessage: {
        backgroundColor: colors.blueThird,
        marginLeft: '12%',
    },
});
