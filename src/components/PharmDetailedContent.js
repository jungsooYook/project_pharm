import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

const Container = styled.View`
  flex:1;
  flex-direction: row
  margin-top: 10px
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.pharmDataContent}
  border-radius: 10px;
  width: ${width - 70}px;
  height: 50px
`;

const NmaeContainer = styled.TouchableOpacity`
  flex: 5;
  justify-content: center;
  align-self: center
  align-items: flex-start;
  padding-left: 45px;
  padding-right: 40px
  padding-top: 9px;
`;

const IconContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 20px;
`;

const Content = styled.Text`
  flex:0.9
  font-size: 20px;
  color: black;

`;

const PharmDataContent = ({ PharmName, namePress, removePress }) => {
  return (
    <Container>
      <NmaeContainer onPress={namePress}>
        <Content>{PharmName}</Content>
      </NmaeContainer>
      <IconContainer onPress={removePress}>
        <FontAwesome5 name="trash-alt" size={26} color="black" />
      </IconContainer>
    </Container>
  );
};

export default PharmDataContent;
