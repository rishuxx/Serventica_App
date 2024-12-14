import {
  View,
  ViewStyle,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import React, {FC, ReactNode} from 'react';

interface CustomSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // Add the following styles for Android notched devices
    ...(Platform.OS === 'android' && {
      paddingTop: 24, // Adjust the padding value as needed
    }),
  },
});

export default CustomSafeAreaView;
