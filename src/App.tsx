import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SLIIcons from 'react-native-vector-icons/SimpleLineIcons';
import translate from '~/translations';

import Home from '~/screens/Home';
import SearchTable from '~/screens/SearchTable';

import SearchAndAddIcons from '~/components/SearchAndAddIcons';

import { configStore } from '~/store';
import { RootStackParamList } from './types/types';

const { store } = configStore();

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation, route }) => ({
              title: translate('drawers'),
              headerRight: () => <SearchAndAddIcons navigation={navigation} />,
              headerLeft: () => (
                <SLIIcons
                  name="settings"
                  color="#000"
                  size={24}
                  style={{ paddingLeft: 20 }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="SearchTable"
            component={SearchTable}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
