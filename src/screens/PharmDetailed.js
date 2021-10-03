import React from "react";
import { useSelector } from "react-redux";
import { Image, Dimensions } from "react-native";
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
  flex: 0.97;
  padding: 15px 10px;
  margin-top: 0;
  padding-bottom: 30px;
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
  const width = Dimensions.get("window").width;

  const SearchDrugByBarCode = async (barcode) => {
    try {
      await fetch(
        `http://apis.data.go.kr/1470000/MdcinGrnIdntfcInfoService/getMdcinGrnIdntfcInfoList?serviceKey=4ARJOwbLh8jufyYInZFDNEp0phIdsR0d7ZZP0bqJKwTfQ3cL%2BDf7zJWkSnYAk%2B8%2BjCjn%2FV9RLSxZ2vNFQ%2BYHrQ%3D%3D&item_name=%ED%83%80%EC%9D%B4%EB%A0%88%EB%86%80&pageNo=1&numOfRows=3&type=json`
      )
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          const name = EditPharmName(myJson.body.items[0].ITEM_NAME);
          const howToStore = myJson.body.items[0].STORAGE_METHOD;
          const howMuch = EditPharmData(
            myJson.body.items[0].UD_DOC_DATA,
            "[CDATA[",
            "]"
          );
          const mainINGR = myJson.body.items[0].MAIN_ITEM_INGR;
          const id = Date.now().toString();
          const time = Date();

          const drugInfo = {
            name: name,
            howToStore: howToStore,
            howMuch: howMuch,
            mainINGR: mainINGR,
            id: id,
            time: time,
            barcode: editedData,
          };

          return CheckDrugAlert(name, drugInfo);
        });
    } catch (e) {
      console.log(e.message);
      Alert.alert(
        "스캔 오류!",
        `의약품이 아니거나 국내에서 판매되는 의약품이 아닙니다.\n카메라가 흔들릴시 잘못 인식 할 수 있으므로 다시 스캔하세요.`,
        [
          {
            text: "다시 스캔하기",
            onPress: () => {
              setScanned(false);
            },
          },
        ]
      );
    }
  };

  return (
    <Container>
      <List>
        <SemiTitle>약물명</SemiTitle>
        <Content>{drugInfo.name}</Content>
        <SemiTitle>바코드</SemiTitle>
        <Content>{drugInfo.barcode}</Content>
        <SemiTitle>저장 방법</SemiTitle>
        <Content>{drugInfo.howToStore}</Content>
        <SemiTitle>주성분</SemiTitle>
        <Content>{drugInfo.mainINGR}</Content>
        <SemiTitle>복용방법 및 섭취량</SemiTitle>

        <Image
          style={{
            height: (width * 0.8) / 1.832157,
            width: width * 0.8,
            alignSelf: "center",
            paddingBottom: 50,
          }}
          source={{
            uri: "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/147427630838400132",
          }}
        />
      </List>
    </Container>
  );
}

export default PharmDetailed;
