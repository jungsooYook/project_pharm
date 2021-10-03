import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { PharmDetailed } from "../screens";
import MainTab from "./MainTab";
import { ThemeConsumer } from "styled-components/native";
import { dark, light } from "../theme";
import { ThemeContext } from "styled-components";

const Stack = createStackNavigator();

const DrugStack = () => {
  const darkmode = useSelector((state) => {
    return state.settingInfo.darkmode;
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
          title: "약물 상세정보",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: theme.title,
            fontSize: 30,
            fontWeight: "bold",
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
