import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SLIIcons from 'react-native-vector-icons/SimpleLineIcons';
import translate from '~/translations';

import Home from '~/screens/Home';
import SearchTable from '~/screens/SearchTable';
import InputModal from '~/components/InputModal';
import MessageModal from './components/MessageModal';

import { configStore } from '~/store';
import { MainStackParamList, RootStackParamList } from './types/types';

const { store } = configStore();

const MainStack = createStackNavigator<MainStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={({ navigation, route }) => ({
          title: translate('drawers'),
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
      <MainStack.Screen
        name="SearchTable"
        component={SearchTable}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
          mode="modal">
          <RootStack.Screen
            name="Main"
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name="InputModal" component={InputModal} />
          <RootStack.Screen name="MessageModal" component={MessageModal} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
