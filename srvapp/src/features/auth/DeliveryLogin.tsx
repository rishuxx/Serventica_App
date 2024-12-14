import {View, Alert, StyleSheet, ScrollView} from 'react-native';
import React, {FC, useState} from 'react';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {deliveryLogin} from 'service/authService.tsx';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import {screenHeight} from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';

const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      await deliveryLogin(email, password);
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <LottieView
            autoPlay
            loop
            style={styles.lottie}
            source={require('@assets/animations/delivery_man.json')}
          />

          <CustomText variant="h3" fontFamily={Fonts.SemiBold}>
            Delivery Partner Portal
          </CustomText>

          <CustomText variant="h6" fontFamily={Fonts.Regular}>
            Faster than flash
          </CustomText>

          <CustomInput
            onChangeText={setEmail}
            value={email}
            left={
              <Icon
                name="email"
                color="#f8890e"
                style={{marginLeft: 10}}
                size={RFValue(18)}
              />
            }
            placeholder="Email"
            inputMode="email"
            right={false}
          />

          <CustomInput
            onChangeText={setPassword}
            value={password}
            left={
              <Icon
                name="lock"
                color="#f8890e"
                style={{marginLeft: 10}}
                size={RFValue(18)}
              />
            }
            placeholder="Password"
            inputMode="text"
            secureTextEntry={true}
            right={false}
          />

          <CustomButton
            disabled={
              email.length === 0 ||
              password.length < 8 ||
              !email.includes('@') ||
              !email.endsWith('.com')
            }
            title="Login"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  lottie: {
    width: 150,
    height: 150,
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});

export default DeliveryLogin;
