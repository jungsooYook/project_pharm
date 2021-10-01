import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PharmDataContent } from "../components";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.SafeAreaView`
  justify-content: flex-start;
  padding-top: 10px
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding-left: 15px;
  padding-right: 15px
`;

const Title = styled.Text`
flex:9;
align-items: center
justify-content: center
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.title};
`;

const List = styled.ScrollView`
  flex: 3;
  padding: 15px 10px;
  margin-top: 0;
`;

const Content = styled.Text`
  font-size: 20px
  color: white;
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

const sample =
  '<DOC title="용법용량" type="UD">\r\n  <SECTION title="">\r\n    <ARTICLE title="">\r\n      <PARAGRAPH tagName="p" textIndent="0" marginLeft="0"><![CDATA[만 12세 이상 소아 및 성인:]]></PARAGRAPH>\r\n      <PARAGRAPH tagName="p" textIndent="0" marginLeft="0"><![CDATA[1회 1~2정씩 1일 3-4회 (4-6시간 마다) 필요시 복용한다.]]></PARAGRAPH>\r\n      <PARAGRAPH tagName="p" textIndent="0" marginLeft="0"><![CDATA[1일 최대 4그램 (8정)을 초과하여 복용하지 않는다.]]></PARAGRAPH>\r\n      <PARAGRAPH tagName="p" textIndent="0" marginLeft="0"><![CDATA[이 약은 가능한 최단기간동안 최소 유효용량으로 복용한다.]]></PARAGRAPH>\r\n    </ARTICLE>\r\n  </SECTION>\r\n</DOC>';

function PharmDetailed() {
  const { name, howToStore, mainIngredient, howMuch } = useSelector((state) => {
    return {
      name: state.drugInfo.name,
      howToStore: state.drugInfo.howToStore,
      mainIngredient: state.drugInfo.mainIngredient,
      howMuch: state.drugInfo.howMuch,
    };
  });

  function PharmNameset(data) {
    if (data.length >= 10) {
      return `${data.substring(0, 10)}...`;
    } else {
      return data;
    }
  }

  // remove button press function
  function _removePress() {
    Alert.alert("경고!", "정말 삭제하시겠습니까?", [
      {
        text: "아니요",
        onPress: () => {},
      },
      {
        text: "네",
        onPress: () => {},
      },
    ]);
  }

  return (
    <Container>
      <List>
        <SemiTitle>약물명</SemiTitle>
        <Content>{name}</Content>
        <SemiTitle>저장 방법</SemiTitle>
        <Content>{howToStore}</Content>
        <SemiTitle>주성분</SemiTitle>
        <Content>{mainIngredient}</Content>
        <SemiTitle>복용방법 및 섭취량</SemiTitle>
        <Content>{howMuch}</Content>
        {/* <Content>{name}</Content>
        <SemiTitle>보관방법</SemiTitle>
        <Content>{howToStore}</Content>
        <SemiTitle>약물명</SemiTitle>
        <Content>{mainIngredient}</Content>
        <SemiTitle>용법 및 용량</SemiTitle>
        <Content>{EditData(howMuch, `[CDATA[`, `]`)}</Content>
        <SemiTitle>유통기한</SemiTitle>
        <Content>2323</Content> */}
      </List>
    </Container>
  );
}

export default PharmDetailed;
