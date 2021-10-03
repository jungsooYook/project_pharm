import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components/native";
import { dark, light } from "../theme";
import { StatusBar } from "react-native";

import DrugStack from "./DrugStack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Navigation = () => {
  // darkmode redux
  const darkmode = useSelector((state) => {
    return state.settingInfo.darkmode;
  });

  const theme = darkmode ? dark : light;

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={darkmode ? "light-content" : "dark-content"}
      />

      <NavigationContainer>
        <DrugStack />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Navigation;
