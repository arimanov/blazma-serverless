import { useEffect, useState } from 'react';
import { AppState  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { fetchMessagesAction } from '../redux/reducers';
import { MESSAGE_FETCH_INTERVAL_MS } from '../utils/constants';

export default () => {

    const [isRunning, setIsRunning] = useState(false);
    const navigation = useNavigation()
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('ℹ️', 'Init message fetching');
        if (!isRunning) {
            setIsRunning(true);
            setInterval(() => {
                if (navigation.getState().index === 1 && AppState.currentState === 'active') {
                    dispatch(fetchMessagesAction());
                }
            }, MESSAGE_FETCH_INTERVAL_MS);
        }
    }, []);
}