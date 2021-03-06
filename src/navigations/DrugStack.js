import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { DrugSearchByName, PharmDetailed } from '../screens';
import MainTab from './MainTab';
import { ThemeConsumer } from 'styled-components/native';
import { dark, light } from '../theme';
import { ThemeContext } from 'styled-components';

const Stack = createStackNavigator();

const DrugStack = () => {
  const { bigTextMode, darkmode } = useSelector(state => {
    return {
      bigTextMode: state.settingInfo.bigTextMode,
      darkmode: state.settingInfo.darkmode,
    };
  });

  const theme = darkmode ? dark : light;

  return (
    <Stack.Navigator initialRouteName="MainTab">
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PharmDetailed"
        component={PharmDetailed}
        options={{
          title: '약물 상세정보',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: theme.title,
            fontSize: bigTextMode ? 40 : 30,
            fontWeight: 'bold',
          },
          headerTintColor: theme.text,

          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      />

      <Stack.Screen
        name="DrugSearchByName"
        component={DrugSearchByName}
        options={{
          title: '약물명으로 찾기',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: theme.title,
            fontSize: bigTextMode ? 40 : 30,
            fontWeight: 'bold',
          },
          headerTintColor: theme.text,

          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default DrugStack;
