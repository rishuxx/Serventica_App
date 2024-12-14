/* eslint-disable react/react-in-jsx-scope */
import {FC} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomText from './CustomText';
import {Fonts} from '@utils/Constants';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  disabled: boolean;
  loading: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  onPress,
  title,
  disabled,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.btn, {backgroundColor: disabled ? '#BABABA' : '#F0E6A4'}]}>
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <CustomText
          variant="h6"
          style={styles.text}
          fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 14,
    marginVertical: 8,
    width: '100%',
  },
  text: {
    color: '#000',
  },
});

export default CustomButton;
