import { PermissionsAndroid, PermissionStatus } from 'react-native';
import translate from '~/translations';

/**
 * All permission must have been placed on the AndroidManifest.xml file
 */

export function permitReadExternalStorage(): Promise<PermissionStatus> {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    {
      title: translate('readStorageTitle'),
      message: translate('readStorageMessage'),
      buttonPositive: translate('ok'),
      buttonNegative: translate('cancel'),
    },
  );
}

export function permitWriteExternalStorage(): Promise<PermissionStatus> {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: translate('writeStorageTitle'),
      message: translate('writeStorageMessage'),
      buttonPositive: translate('ok'),
      buttonNegative: translate('cancel'),
    },
  );
}

export function permitCamera(): Promise<PermissionStatus> {
  return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    title: translate('cameraTitle'),
    message: translate('cameraMessage'),
    buttonPositive: translate('ok'),
    buttonNegative: translate('cancel'),
  });
}
