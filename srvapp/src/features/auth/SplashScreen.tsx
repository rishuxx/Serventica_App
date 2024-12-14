import {View, StyleSheet, Image, Alert} from 'react-native';
import React, {FC, useEffect} from 'react';
import {screenHeight} from '@utils/Scaling';
import Logo from '@assets/images/Servlogo.png';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorageUtils} from '@state/storage';

import {resetAndNavigate} from '@utils/NavigationUtils';
import {jwtDecode} from 'jwt-decode';
import {refetchUser, refresh_tokens} from 'service/authService.tsx';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});
/////
interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    try {
      const accessToken = tokenStorageUtils.getAccessToken();
      const refreshToken = tokenStorageUtils.getRefreshToken();

      // No tokens, navigate to login
      if (!accessToken || !refreshToken) {
        resetAndNavigate('CustomerLogin');
        return false;
      }

      const currentTime = Math.floor(Date.now() / 1000);

      // Decode tokens
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      // Check refresh token expiry
      if (decodedRefreshToken.exp < currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('Session Expired', 'Please login again');
        return false;
      }

      // Refresh access token if expired
      if (decodedAccessToken.exp < currentTime) {
        try {
          await refresh_tokens();
          await refetchUser(setUser);
        } catch (error) {
          console.error('Token Refresh Error', error);
          resetAndNavigate('CustomerLogin');
          return false;
        }
      }

      // Determine navigation based on user role
      if (user?.role === 'Customer') {
        resetAndNavigate('ProductDashboard');
      } else if (user?.role === 'Delivery') {
        resetAndNavigate('DeliveryDashboard');
      } else {
        resetAndNavigate('CustomerLogin');
      }

      return true;
    } catch (error) {
      console.error('Token Check Error', error);
      resetAndNavigate('CustomerLogin');
      return false;
    }
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        GeoLocation.requestAuthorization();
        tokenCheck();
      } catch (error) {
        Alert.alert(
          'Sorry we need location service to give you better shopping exp',
        );
      }
    };
    const timeoutId = setTimeout(fetchUserLocation, 2000);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161616',
  },
  logoImage: {
    height: screenHeight * 0.3,
    width: screenHeight * 0.3,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
