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

const NameContainer = styled.TouchableOpacity`
  flex: 6;
  justify-content: center;
  align-self: center
  align-items: flex-start;
  padding-left: 20px;
  padding-right: 40px
  padding-top: 10px;
  padding-bottom: 5px
`;

const IconContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 20px;
`;

const Content = styled.Text`
  flex:1
  font-size: 20px;
  color: black;
  margin-left:0
  padding-left:0

`;

const PharmDataContent = ({ PharmName, namePress, removePress }) => {
  return (
    <Container>
      <NameContainer onPress={namePress}>
        <Content>{PharmName}</Content>
      </NameContainer>
      <IconContainer onPress={removePress}>
        <FontAwesome5 name="trash-alt" size={26} color="black" />
      </IconContainer>
    </Container>
  );
};

export default PharmDataContent;
