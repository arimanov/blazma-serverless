import React, { useEffect } from 'react';
import { Image, StyleSheet, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    cancelAnimation,
    Easing,
} from 'react-native-reanimated';

const Indicator = ({ actionIsActive, isPressed, togglePress }) => {

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, { duration: 1000, easing: Easing.linear}),
            -1
        );
        return () => cancelAnimation(rotation);
    }, []);

    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: actionIsActive ? `${rotation.value}deg` : '0deg' }],
        };
    });

    return (
        <Pressable onPress={togglePress}>
            <Animated.View style={[styles.loaderWrapper , animatedStyle]}>
                <Image
                    style={[styles.iconLoad, { opacity: isPressed ? actionIsActive ? 0.9 : 0.7 : 0.2 }]}
                    source={require('../assets/reload-circle.png')}
                />
            </Animated.View>
        </Pressable>
    );
}

Indicator.propTypes = {
    actionIsActive: PropTypes.bool,
    isPressed: PropTypes.bool,
    togglePress: PropTypes.func,
};

Indicator.defaultProps = {
    actionIsActive: false,
    isPressed: false,
    togglePress: () => {},
};

const styles = StyleSheet.create({
    loaderWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
    },
    iconLoad: {
        width: 29,
        height: 29,
    }
});

export default Indicator