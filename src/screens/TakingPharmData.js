import React from "react";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import PharmDataContent from "../components/PharmDataContent";
import { Alert } from "react-native";

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
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.title};
`;

const List = styled.ScrollView`
  flex: 1;
  padding: 15px 10px;
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

function TakingPharmData() {
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
      <Title>복용중인 약물</Title>
      <List>
        <SemiTitle>약물명</SemiTitle>
        <PharmDataContent
          PharmName={"옥동자 메카톤"}
          removePress={_removePress}
        />
        <PharmDataContent
          PharmName={PharmNameset(name)}
          removePress={_removePress}
        />
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

export default TakingPharmData;

// charAt : 특정 index에 해당하는 문자가 무엇인지 확인
// indexOf : 특정 문자가 어디에 있는지 확인
// substring : string에서 index:index 를 통해 특정 string 추출 가능
// title=" => +7
// [CDATA[ => +7
