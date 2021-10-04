import React from "react";
import { Dimensions, Alert } from "react-native";
import { RemoveDrugInfo } from "../actions";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { DateConvert } from "../util";
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
  height: 70px;
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
`;

const IconContainer = styled.TouchableOpacity`
  flex: 0.8;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px
  padding-right: 10px
  padding-left: 10px
`;

const Content = styled.Text`
  flex:0.9
  align-items: flex-start
  font-size: 20px;
  color: black;
`;

const Time = styled.Text`
  flex: 1;
  font-size: 15px;
  color: black;
  align-self: center;
  align-items: center;
  justify-content: center;
  padding-top: 6px;
`;

const TimeContainer = styled.View`
  flex: 0.5;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

const PharmDataContent = ({ drugInfo, namePress }) => {
  const dispatch = useDispatch();
  const { id, name } = drugInfo;
  const { year, month, week, date, time } = DateConvert(drugInfo.time);
  const { bigTextMode, darkmode } = useSelector((state) => {
    return {
      bigTextMode: state.settingInfo.bigTextMode,
      darkmode: state.settingInfo.darkmode,
    };
  });

  function PharmNameset(data) {
    if (width < 600) {
      if (bigTextMode == true) {
        if (data.length >= 6) {
          return `${data.substring(0, 6)}..`;
        } else {
          return data;
        }
      } else {
        if (bigTextMode == true) {
          if (data.length >= 10) {
            return `${data.substring(0, 10)}..`;
          } else {
            return data;
          }
        }
      }
    } else {
      return data;
    }

    if (data.length >= 10) {
      return `${data.substring(0, 10)}..`;
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
        <Content style={{ fontSize: bigTextMode ? 35 : 20 }}>
          {PharmNameset(name)}
        </Content>
        <TimeContainer>
          <Time
            style={{ fontSize: bigTextMode ? 25 : 15 }}
          >{`${month}월 ${date}일 (${week})`}</Time>
          <Time style={{ fontSize: bigTextMode ? 25 : 15 }}>{`${time}`}</Time>
        </TimeContainer>
      </NmaeContainer>
      <IconContainer onPress={removePress}>
        <FontAwesome5 name="trash-alt" size={26} color="black" />
      </IconContainer>
    </Container>
  );
};

export default PharmDataContent;
