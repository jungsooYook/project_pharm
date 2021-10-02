import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PharmDataContent } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { AddDrugInfo } from "../actions";

const Container = styled.SafeAreaView`
  justify-content: flex-start;
  padding-top: 10px
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding-left: 15px;
  padding-right: 15px
`;

const List = styled.ScrollView`
  flex: 3;
  padding: 15px 10px;
  margin-top: 0;
`;

const Content = styled.Text`
  font-size: 20px
  color: ${({ theme }) => theme.text};
  padding: 7px 0;
  padding-bottom: 30px
`;

const SemiTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  padding-bottom:10px
  align-self: center
  color: ${({ theme }) => theme.semititle};
`;

function PharmDetailed({ route, navigation }) {
  var { drugInfo } = route.params;

  return (
    <Container>
      <List>
        <SemiTitle>약물명</SemiTitle>
        <Content>{drugInfo.name}</Content>
        <SemiTitle>저장 방법</SemiTitle>
        <Content>{drugInfo.howToStore}</Content>
        <SemiTitle>주성분</SemiTitle>
        <Content>{drugInfo.mainINGR}</Content>
        <SemiTitle>복용방법 및 섭취량</SemiTitle>
        <Content>{drugInfo.howMuch}</Content>
      </List>
    </Container>
  );
}

export default PharmDetailed;
