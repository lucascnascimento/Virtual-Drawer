import React from 'react';
import { ToastAndroid } from 'react-native';

interface ToastProps {
  visible: boolean;
  message: string;
}

/**
 * Android only toast component
 * @param visible Toggle Toast visibility
 * @param message Message to be displayed
 */
const Toast: React.FC<ToastProps> = ({ visible, message }: ToastProps) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      100,
    );
    return null;
  }
  return null;
};

export default Toast;
