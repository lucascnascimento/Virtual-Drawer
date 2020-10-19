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
import MCIIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import translate from '~/translations';
import { permitCamera } from '~/utils/androidPermissions';
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
  const { navigation } = props;

  const isFocused = useIsFocused();
  const [camera, setCamera] = useState<RNCamera | null>();
  const [flash, setFlash] = useState(false);
  const [permission, setPermission] = useState(false);
  const [imageUri, setImageUri] = useState<string>('');
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

  // Toggles flash on and off
  function handleFlash() {
    setFlash(!flash);
  }

  // Submits the picture
  async function submitPicture() {
    navigation.navigate('AddItem', {
      picturePath: imageUri,
    });
  }

  // Takes a picture
  const onTakePicture = async () => {
    try {
      const data = await camera?.takePictureAsync({
        quality: 0.5,
        forceUpOrientation: true,
        fixOrientation: true,
      });

      if (data?.uri) {
        setImageUri(data.uri);
      } else {
        throw new Error();
      }

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
            <CloseButton onPress={() => setImageUri('')}>
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

    return cameraView();
  }

  return render();
};

export default Camera;
