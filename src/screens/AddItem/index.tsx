import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import MCIIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import db from '~/database/db';

import translate from '~/translations';
import ItemViewer from '~/components/Item';

import { AddItemProps, Item, ItemErrors } from '~/types/types';

// TODO: Submit and save on database

const AddItem: React.FC<AddItemProps> = (props: AddItemProps) => {
  const navigation = useNavigation();
  const { route } = props;

  const [item, setItem] = useState({} as Item);
  const [errors, setErrors] = useState({} as ItemErrors);

  // Get picture URI from cache to display on Image tag
  useEffect(() => {
    setItem((prevState) => ({
      ...prevState,
      pictureSrc: route.params.picturePath,
    }));
  }, [route.params.picturePath]);

  useLayoutEffect(() => {
    // Validate input
    function validateInfo() {
      if (!item.name) {
        setErrors((prevState) => ({ ...prevState, name: true }));
        return false;
      }

      setErrors((prevState) => ({ ...prevState, name: false }));
      return true;
    }

    // Handle form submit
    async function handleSubmit() {
      if (validateInfo()) {
        const res = await db.insertRow(route.params.pictureSrcFolder!, item);
      }
    }

    navigation.setOptions({
      title: translate('newItem'),
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 12 }} onPress={handleSubmit}>
          <MCIIcons name="check" size={32} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [item, navigation, route.params.pictureSrcFolder]);

  return (
    <ItemViewer
      mode="create"
      pictureSrcFolder={route.params.pictureSrcFolder}
      pictureURI={item.pictureSrc}
      item={item}
      setItem={setItem}
      errors={errors}
    />
  );
};

export default AddItem;
