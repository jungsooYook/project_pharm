import React from "react";
import { TouchableOpacity, Dimensions, Alert } from "react-native";
import { RemoveDrugInfo } from "../actions";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

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

const PharmDataContent = ({ namePress, drugInfo }) => {
  const dispatch = useDispatch();
  const { id, name } = drugInfo;

  function PharmNameset(data) {
    if (data.length >= 10) {
      return `${data.substring(0, 10)}...`;
    } else {
      return data;
    }
  }

  // remove press function
  function removePress() {
    console.log("Press remove button");
    Alert.alert(
      "정말 삭제하시겠습니까?",
      "삭제시 복구 불가능하니 신중히 선택바랍니다.",
      [
        {
          text: "아니요",
          onPress: () => {},
        },
        {
          text: "네",
          onPress: () => {
            dispatch(RemoveDrugInfo(id));
          },
        },
      ]
    );
  }

  return (
    <Container>
      <NmaeContainer onPress={namePress}>
        <Content>{PharmNameset(name)}</Content>
      </NmaeContainer>
      <IconContainer onPress={removePress}>
        <FontAwesome5 name="trash-alt" size={26} color="black" />
      </IconContainer>
    </Container>
  );
};

export default PharmDataContent;
