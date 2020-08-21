import React from 'react';
import { ToastAndroid } from 'react-native';

interface ToastProps {
  visible: boolean;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ visible, message }: ToastProps) => {
  if (visible) {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    return null;
  }
  return null;
};

export default Toast;