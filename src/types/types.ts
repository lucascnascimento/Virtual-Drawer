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

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
};
