import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  PermissionsAndroid,
  Text,
  ImageBackground,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { ActivityIndicator } from 'react-native-paper';
import MCIIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob';
import translate from '~/translations';
import {
  permitReadExternalStorage,
  permitWriteExternalStorage,
  permitCamera,
} from '~/utils/androidPermissions';

import { CameraProps } from '~/types/types';

import {
  TopBar,
  FlashButtonContainer,
  FlashButton,
  ButtonContainer,
  CaptureButton,
  CaptureButtonWrapper,
  PreviewButtonContainer,
  CloseButton,
  CheckButton,
} from './styles';
import Toast from '~/components/Toast';

/**
 * Opens the camera
 */
const Camera: React.FC<CameraProps> = (props: CameraProps) => {
  const { navigation, route } = props;

  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [camera, setCamera] = useState<RNCamera | null>();
  const [flash, setFlash] = useState(false);
  const [permission, setPermission] = useState(false);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [visibleToast, setVisibleToast] = useState(false);

  // Checks if the user is allowed to use the camera
  useEffect(() => {
    async function getPermission() {
      const grantedCamera = await permitCamera();

      if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(true);
      }
    }

    getPermission();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [imageUri]);

  // Toggles flash on and off
  function handleFlash() {
    setFlash(!flash);
  }

  // TODO: Add permission to android 6.0
  async function submitPicture() {
    try {
      // Check Permissions
      const grantedRead = await permitReadExternalStorage();
      const grantedWrite = await permitWriteExternalStorage();

      if (grantedRead && grantedWrite === PermissionsAndroid.RESULTS.GRANTED) {
        const uri = imageUri!.split('//')[1];
        const imageName = imageUri?.split('/').pop();

        const finalDestination = `/storage/emulated/0/DataApp/Pictures/${route.params.pictureSrcFolder}/${imageName}`;

        await RNFetchBlob.fs.mv(
          // Moves the picture from the cache folder to final destination
          uri,
          finalDestination,
        );

        navigation.navigate('AddItem', {
          picturePath: `file://${finalDestination}`,
        });
      } else {
        setVisibleToast(true);
      }
    } catch (error) {
      Alert.alert(translate('error'), translate('snapshotSaveError'));
    }
  }

  // Takes a picture
  const onTakePicture = async () => {
    try {
      const data = await camera?.takePictureAsync({
        quality: 0.5,
        forceUpOrientation: true,
        fixOrientation: true,
      });
      setLoading(true);
      setImageUri(data?.uri);
    } catch (error) {
      Alert.alert(translate('error'), translate('cameraMessageError'));
    }
  };

  // Camera view component
  const cameraView = () => (
    <View style={{ flex: 1 }}>
      <TopBar>
        <FlashButtonContainer>
          <FlashButton onPress={handleFlash}>
            {flash ? (
              <MCIIcons name="flash" size={22} color="#fff" />
            ) : (
              <MCIIcons name="flash-off" size={22} color="#fff" />
            )}
          </FlashButton>
        </FlashButtonContainer>
      </TopBar>

      <RNCamera
        ref={(ref) => setCamera(ref)}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        androidCameraPermissionOptions={{
          title: translate('cameraTitle'),
          message: translate('cameraMessage'),
          buttonPositive: translate('ok'),
          buttonNegative: translate('cancel'),
        }}
        captureAudio={false}
      />
      <ButtonContainer>
        <CaptureButtonWrapper>
          <CaptureButton onPress={onTakePicture} />
        </CaptureButtonWrapper>
      </ButtonContainer>
    </View>
  );

  // Picture Preview Component
  function picturePreview() {
    return (
      <>
        <View style={{ flex: 1 }}>
          <ImageBackground style={{ flex: 1 }} source={{ uri: imageUri }} />

          <PreviewButtonContainer>
            <CloseButton onPress={() => setImageUri(undefined)}>
              <MCIIcons name="close" size={32} color="#fff" />
            </CloseButton>
            <CheckButton onPress={submitPicture}>
              <MCIIcons name="check" size={32} color="#fff" />
            </CheckButton>
          </PreviewButtonContainer>
        </View>
        {visibleToast && (
          <Toast
            visible={visibleToast}
            message={translate('permissionsDenied')}
          />
        )}
      </>
    );
  }

  function render() {
    if (permission === false) {
      return (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text>{translate('cameraAcess')}</Text>
        </View>
      );
    }
    if (imageUri) {
      return picturePreview();
    }
    if (!isFocused) {
      return <View />;
    }
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return cameraView();
  }

  return render();
};

export default Camera;
