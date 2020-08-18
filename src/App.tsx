import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SLIIcons from 'react-native-vector-icons/SimpleLineIcons';
import translate from '~/translations';

import Home from '~/screens/Home';
import SearchAndAddIcons from '~/components/SearchAndAddIcons';

import { configStore } from '~/store';

const { store } = configStore();

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: translate('drawers'),
              headerRight: () => <SearchAndAddIcons />,
              headerLeft: () => (
                <SLIIcons name="settings" color="#000" size={24} />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
