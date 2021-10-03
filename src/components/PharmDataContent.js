import React from "react";
import { Dimensions, Alert } from "react-native";
import { RemoveDrugInfo } from "../actions";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

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
  height: 50px;
  margin-bottom:2px
`;

const NmaeContainer = styled.TouchableOpacity`
  flex-direction: row
  flex: 7;
  justify-content: center;
  align-self: center
  align-items: center;
  padding-bottom: 5px
  padding-left: 20px;
  padding-right: 40px
`;

const IconContainer = styled.TouchableOpacity`
  flex: 0.8;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 15px;
  margin-right: 0;
`;

const Content = styled.Text`
  flex:0.9
  align-items: flex-end
  font-size: 20px;
  color: black;
`;

const Time = styled.Text`
  flex: 1.3;
  font-size: 15px;
  color: black;
`;

const PharmDataContent = ({ drugInfo, namePress }) => {
  const dispatch = useDispatch();
  const { id, name } = drugInfo;
  const week = drugInfo.time.substring(0, 3);
  const year = drugInfo.time.substring(11, 15);
  const date = drugInfo.time.substring(8, 10);
  const time = drugInfo.time.substring(16, 21);
  const month = monthConvert(drugInfo.time.substring(4, 7));

  function monthConvert(month) {
    switch (month) {
      case "Jan":
        return "1월";
      case "Feb":
        return "2월";
      case "Mar":
        return "3월";
      case "Apr":
        return "4월";
      case "May":
        return "5월";
      case "Jun":
        return "6월";
      case "Jul":
        return "7월";
      case "Aug":
        return "8월";
      case "Sep":
        return "9월";
      case "Oct":
        return "10월";
      case "Nov":
        return "11월";
      case "Dec":
        return "12월";
      default:
        return month;
    }
  }

  function DateConvert(date) {
    switch (date) {
      case "01":
        return "1";
      case "02":
        return "2";
    }
  }
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
        <Time>{`${month} ${date}일  ${week} ${time}`}</Time>
      </NmaeContainer>
      <IconContainer onPress={removePress}>
        <FontAwesome5 name="trash-alt" size={26} color="black" />
      </IconContainer>
    </Container>
  );
};

export default PharmDataContent;
