import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';

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

//! MainStack
export type MainStackParamList = {
  Home: {
    render: boolean;
    item?: TableName;
  };
  SearchTable: undefined;
};

//! @MainStack Home Screen
type HomeScreenRouteProp = RouteProp<MainStackParamList, 'Home'>;

type HomeScreenNavigationProp = CompositeNavigationProp<
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

//! RootStack
export type RootStackParamList = {
  Main: undefined;
  InputModal: undefined;
  MessageModal: {
    title: string;
    message: string;
    cancelText: string;
    confirmText: string;
    item: TableName;
    parentScreen: string;
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
type InputModalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'InputModal'
>;

export type InputModalProps = {
  navigation: InputModalScreenNavigationProp;
};
