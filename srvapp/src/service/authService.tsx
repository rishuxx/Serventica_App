// authService.tsx
import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorageUtils} from '@state/storage';
import {useAuthStore} from '@state/authStore';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {appAxios} from './apiInterceptors';

export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, {phone});
    const {accessToken, refreshToken, customer} = response.data;

    // Use token storage utilities
    tokenStorageUtils.setAccessToken(accessToken);
    tokenStorageUtils.setRefreshToken(refreshToken);

    // Set user in auth store
    const {setUser} = useAuthStore.getState();
    setUser({...customer, role: 'Customer'});
  } catch (error) {
    console.error('Login Error', error);
    throw error;
  }
};

export const deliveryLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    const {accessToken, refreshToken, deliveryPartner} = response.data;

    // Use token storage utilities
    tokenStorageUtils.setAccessToken(accessToken);
    tokenStorageUtils.setRefreshToken(refreshToken);

    // Set user in auth store
    const {setUser} = useAuthStore.getState();
    setUser({...deliveryPartner, role: 'Delivery'});
  } catch (error) {
    console.error('Login Error', error);
    throw error;
  }
};

export const refresh_tokens = async () => {
  try {
    const refreshToken = tokenStorageUtils.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });

    const {accessToken, refreshToken: newRefreshToken} = response.data;

    // Update tokens
    tokenStorageUtils.setAccessToken(accessToken);
    tokenStorageUtils.setRefreshToken(newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error('Refresh Token Error', error);

    // Clear tokens and redirect to login
    tokenStorageUtils.clearTokens();
    resetAndNavigate('CustomerLogin');

    throw error;
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await appAxios.get('/user');
    const userWithRole = response.data.user.role
      ? response.data.user
      : {...response.data.user, role: 'Customer'};

    setUser(userWithRole);
  } catch (error) {
    console.error('Refetch User Error', error);
    throw error;
  }
};
