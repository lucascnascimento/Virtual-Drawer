import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import translate from '~/translations';

import { Item, ItemErrors } from '~/types/types';

import {
  Container,
  Header,
  ImgContainer,
  Img,
  CameraButton,
  TrashButton,
  Title,
  Form,
  TxtInput,
} from './styles';

interface ItemProps {
  mode: 'create' | 'edit' | 'show';
  pictureSrcFolder: string;
  pictureURI: string | undefined;
  item: Item;
  setItem: React.Dispatch<React.SetStateAction<Item>>;
  errors: ItemErrors;
}

const ItemViewer: React.FC<ItemProps> = (props: ItemProps) => {
  const { mode, pictureSrcFolder, pictureURI, item, setItem, errors } = props;
  const navigation = useNavigation();

  const locationRef = useRef<React.MutableRefObject<typeof TxtInput | null>>(
    null,
  );
  const descriptionRef = useRef<React.MutableRefObject<typeof TxtInput | null>>(
    null,
  );

  return (
    <Container>
      <Header>
        <ImgContainer>
          {pictureURI ? <Img source={{ uri: pictureURI }} /> : <View />}
          <CameraButton>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Camera', { pictureSrcFolder })
              }>
              <MCIIcon name="camera-plus" size={32} color="#000" />
            </TouchableOpacity>
          </CameraButton>
        </ImgContainer>

        {mode === 'show' && (
          <TrashButton>
            <TouchableOpacity>
              <MCIIcon name="trash-can-outline" size={32} color="#F00" />
            </TouchableOpacity>
          </TrashButton>
        )}
        <Title>
          {mode === 'create' ? translate('informations') : item.name}
        </Title>
      </Header>

      <Form>
        <TxtInput
          label={translate('name')}
          value={item.name}
          onChangeText={(text: string) =>
            setItem((prevState) => ({ ...prevState, name: text }))
          }
          returnKeyType="next"
          onSubmitEditing={() => locationRef.current.focus()}
          error={errors.name}
        />
        <TxtInput
          label={translate('location')}
          value={item.location}
          onChangeText={(text: string) =>
            setItem((prevState) => ({ ...prevState, location: text }))
          }
          ref={locationRef}
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current.focus()}
          error={errors.location}
        />
        <TxtInput
          label={translate('description')}
          multiline
          value={item.description}
          onChangeText={(text: string) =>
            setItem((prevState) => ({ ...prevState, description: text }))
          }
          ref={descriptionRef}
          returnKeyType="send"
          error={errors.description}
        />

        {mode !== 'create' && (
          <>
            <TxtInput
              label={translate('createdAt')}
              disabled
              value={item.createdAt}
            />
            <TxtInput
              label={translate('updatedAt')}
              disabled
              value={item.updatedAt}
            />
          </>
        )}
      </Form>
    </Container>
  );
};

export default ItemViewer;
