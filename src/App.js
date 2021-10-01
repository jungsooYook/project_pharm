import React from "react";
import MainTab from "./navigations/MainTab";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
