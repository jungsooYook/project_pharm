import React, { useState } from "react";
import styled from "styled-components/native";
import { Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DarkModeAction } from "../actions";
import { dark, light } from "../theme";

const Container = styled.View`
  flex-direction: row;
  padding: 10px 0;
  padding-left: 10px;
`;

const SwitchContainer = styled.View`
  flex: 1;
  flex-direction: row-reverse
  align-items: center;
  justify-content: flex-start;
  `;

const Content = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  align-self: flex-start;
`;

/// function start
function DarkModeButton({ content }) {
  const dispatch = useDispatch();

  const theme = darkmode ? dark : light;

  function toggleSwitch() {
    dispatch(DarkModeAction());
  }

  const darkmode = useSelector((state) => {
    return state.settingInfo.darkmode;
  });
  ///rendering start
  return (
    <Container>
      <Content>{content}</Content>
      <SwitchContainer>
        <Switch
          trackColor={{
            false: theme.toggleBarUnactivated,
            true: theme.toggleBarActivated,
          }}
          thumbColor={theme.toggle}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={darkmode}
          style={{
            marginLeft: 4,
            alignItems: "center",
          }}
        />
      </SwitchContainer>
    </Container>
  );
}

export default DarkModeButton;

DarkModeButton.defaultprops = {
  isEnabled: false,
};
