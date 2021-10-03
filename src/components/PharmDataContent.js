import React from "react";
import { Dimensions, Alert } from "react-native";
import { RemoveDrugInfo } from "../actions";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
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
`;

const TimeContainer = styled.View`
  flex: 0.5;
  align-items: center;
  justify-content: center;
`;

const PharmDataContent = ({ drugInfo, namePress }) => {
  const dispatch = useDispatch();

  const { id, name } = drugInfo;
  const week = WeekConvert(drugInfo.time.substring(0, 3));
  const year = drugInfo.time.substring(11, 15);
  const date = DateConvert(drugInfo.time.substring(8, 10));
  const time = drugInfo.time.substring(16, 21);
  const month = monthConvert(drugInfo.time.substring(4, 7));

  console.log(drugInfo.time);

  const { bigTextMode, darkmode } = useSelector((state) => {
    return {
      bigTextMode: state.settingInfo.bigTextMode,
      darkmode: state.settingInfo.darkmode,
    };
  });

  function monthConvert(month) {
    switch (month) {
      case "Jan":
        return "1";
      case "Feb":
        return "2";
      case "Mar":
        return "3";
      case "Apr":
        return "4";
      case "May":
        return "5";
      case "Jun":
        return "6";
      case "Jul":
        return "7";
      case "Aug":
        return "8";
      case "Sep":
        return "9";
      case "Oct":
        return "10";
      case "Nov":
        return "11";
      case "Dec":
        return "12";
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
      case "03":
        return "3";
      case "04":
        return "4";
      case "05":
        return "5";
      case "06":
        return "6";
      case "07":
        return "7";
      case "08":
        return "8";
      case "09":
        return "9";
    }
  }

  function WeekConvert(week) {
    switch (week) {
      case "Mon":
        return "월";
      case "Tue":
        return "화";
      case "Wed":
        return "수";
      case "Thu":
        return "목";
      case "Fri":
        return "금";
      case "Sat":
        return "터";
      case "Sun":
        return "일";
    }
  }

  function PharmNameset(data) {
    if (width < 800) {
      if (bigTextMode == true) {
        if (data.length >= 6) {
          return `${data.substring(0, 6)}..`;
        } else {
          return data;
        }
      } else {
        if (bigTextMode == true) {
          if (data.length >= 10) {
            return `${data.substring(0, 10)}...`;
          } else {
            return data;
          }
        }
      }
    } else {
      return data;
    }

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
