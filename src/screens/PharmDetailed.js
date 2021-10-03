import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Image, Dimensions, Alert } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PharmDataContent } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { AddDrugInfo } from "../actions";
import seceret from "../data/seceret.json";

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
  const [url, setUrl] = useState("");
  const [isUrl, setIsUrl] = useState(false);
  var { drugInfo } = route.params;
  const width = Dimensions.get("window").width;
  const seqcode = drugInfo.seqcode;

  const SearchDrugImage = async (seqcode) => {
    try {
      await fetch(
        `http://apis.data.go.kr/1470000/MdcinGrnIdntfcInfoService/getMdcinGrnIdntfcInfoList?serviceKey=${seceret.image_service_key}&item_seq=${seqcode}&pageNo=1&numOfRows=3&type=json`
      )
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          return setUrl(myJson.body.items[0].ITEM_IMAGE);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  SearchDrugImage(seqcode);

  return (
    <Container>
      <List>
        <Image
          style={{
            height: (width * 0.8) / 1.832157,
            width: width * 0.8,
            alignSelf: "center",
            paddingBottom: 50,
          }}
          source={{
            uri: url,
          }}
        />
        <SemiTitle>약물명</SemiTitle>
        <Content>{drugInfo.name}</Content>
        <SemiTitle>바코드</SemiTitle>
        <Content>{drugInfo.barcode}</Content>
        <Content>{drugInfo.seqcode}</Content>
        <SemiTitle>저장 방법</SemiTitle>
        <Content>{drugInfo.howToStore}</Content>
        <SemiTitle>주성분</SemiTitle>
        <Content>{drugInfo.mainINGR}</Content>
        <SemiTitle>복용방법 및 섭취량</SemiTitle>
        <Content>{drugInfo.howMuch}</Content>
        <SemiTitle>복용방법 및 섭취량</SemiTitle>
      </List>
    </Container>
  );
}

export default PharmDetailed;
