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

// function start
function TakingPharmData({ navigation }) {
  const drugInfos = useSelector((state) => {
    return state.drugInfo;
  });

  console.log(`@@@PharmData : drugInfo[0].name@@@`);
  // remove button press function

  return (
    <Container>
      <Title>복용중인 약물</Title>
      <List>
        {drugInfos &&
          drugInfos.map((drugInfo) => (
            <PharmDataContent
              key={drugInfo.id}
              onPress={() => {}}
              drugInfo={drugInfo}
            />
          ))}
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
