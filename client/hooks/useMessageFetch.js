import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { fetchMessagesAction } from '../redux/reducers';

export default () => {

    const [isRunning, setIsRunning] = useState(false);
    const navigation = useNavigation()
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('ℹ️', 'Init message fetching');
        if (!isRunning) {
            setIsRunning(true);
            setInterval(() => {
                if (navigation.getState().index === 1) {
                    dispatch(fetchMessagesAction());
                }
            }, 5000);
        }
    }, []);
}