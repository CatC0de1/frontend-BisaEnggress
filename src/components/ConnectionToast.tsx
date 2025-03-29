import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

export const showConnectionErrorToast = () => {
  Toast.show({
    type: 'error',
    text1: 'Koneksi Internet Tidak Stabil',
    text2: 'Periksa koneksi Anda dan coba lagi.',
  });
};

export const useConnectionErrorToast = () => {
  useEffect(() => {
    showConnectionErrorToast();
  }, []);
};
