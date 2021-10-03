import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import {
  DarkModeButton,
  ScanVibrationButton,
  BigTextMode,
} from "../components";
import { useSelector } from "react-redux";

const Container = styled.SafeAreaView`
  justify-content: flex-start;
  padding-top: 10px;
  padding-right: 10px
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const List = styled.ScrollView`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold
  padding-top:11px
  padding-bottom: 30px
  color: ${({ theme }) => theme.title};
`;

/// function start
function Setting() {
  const width = Dimensions.get("window").width;

  const { bigTextMode, darkmode } = useSelector((state) => {
    return {
      bigTextMode: state.settingInfo.bigTextMode,
      darkmode: state.settingInfo.darkmode,
    };
  });

  return (
    <Container>
      <Title style={{ fontSize: bigTextMode ? 40 : 30 }}>환경설정</Title>
      <List width={width - 10}>
        <DarkModeButton content="다크모드 활성화" />
        <ScanVibrationButton content="스캔시 진동 활성화" />
        <BigTextMode content="큰 글씨 모드" />
      </List>
    </Container>
  );
}

export default Setting;
