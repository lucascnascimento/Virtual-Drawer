import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { GestureResponderEvent } from 'react-native';

export interface Item {
  id?: number;
  name: string;
  description?: string;
  location?: string;
  pictureSrc?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TablesList {
  tables: string[];
}

export interface TableName {
  name: string;
}

// #region Navigator and Screen types

//! MainStack
export type MainStackParamList = {
  Home: {
    deletedItems?: Array<string>;
  };
  SearchTable: undefined;
  Options: undefined;
  TableItems: {
    tableName: string;
  };
  AddItem: {
    picturePath: string;
    pictureSrcFolder?: string;
  };
  Camera: {
    pictureSrcFolder: string;
  };
};

//! @MainStack Home Screen
type HomeScreenRouteProp = RouteProp<MainStackParamList, 'Home'>;

export type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

export type HomeProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

//! @MainStack SearchTable
type SearchTableScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'SearchTable'>,
  StackNavigationProp<RootStackParamList>
>;

export type SearchTableProps = {
  navigation: SearchTableScreenNavigationProp;
};

//! @MainStack Options
type OptionsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Options'>,
  StackNavigationProp<RootStackParamList>
>;

export type OptionsProps = {
  navigation: OptionsScreenNavigationProp;
};

//! @MainStack TableItems
type TableItemsScreenRouteProp = RouteProp<MainStackParamList, 'TableItems'>;

type TableItemsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'TableItems'>,
  StackNavigationProp<RootStackParamList>
>;

export type TableItemsProps = {
  route: TableItemsScreenRouteProp;
  navigation: TableItemsScreenNavigationProp;
};

//! @MainStack AddItem
type AddItemScreenRouteProp = RouteProp<MainStackParamList, 'AddItem'>;

type AddItemScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'AddItem'>,
  StackNavigationProp<RootStackParamList>
>;

export type AddItemProps = {
  route: AddItemScreenRouteProp;
  navigation: AddItemScreenNavigationProp;
};

//! @MainStack Camera
type CameraScreenRouteProp = RouteProp<MainStackParamList, 'Camera'>;

type CameraScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Camera'>,
  StackNavigationProp<RootStackParamList>
>;

export type CameraProps = {
  route: CameraScreenRouteProp;
  navigation: CameraScreenNavigationProp;
};

//! RootStack
export type RootStackParamList = {
  Main: undefined;
  InputModal: {
    handleAddAction: (inputText: string) => Promise<void>;
  };
  MessageModal: {
    title: string;
    message: string;
    leftButtonLable: string;
    rightButtonLable: string;
    leftButtonHandler: () => void;
    rightButtonHandler:
      | ((name: string) => Promise<void>)
      | (() => Promise<void>);
    item: string;
  };
};

//! RootStack MessageModal
type MessageModalScreenRouteProp = RouteProp<
  RootStackParamList,
  'MessageModal'
>;

type MessageModalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MessageModal'
>;

export type MessageModalProps = {
  route: MessageModalScreenRouteProp;
  navigation: MessageModalScreenNavigationProp;
};

//! RootStack InputModal
type InputModalScreenRouteProp = RouteProp<RootStackParamList, 'InputModal'>;

type InputModalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'InputModal'
>;

export type InputModalProps = {
  route: InputModalScreenRouteProp;
  navigation: InputModalScreenNavigationProp;
};

// #endregion

// #region Styled-components

export interface TouchableOpacityProps {
  onPress: (event: GestureResponderEvent) => void | undefined | Promise<void>;
}

// #endregion
