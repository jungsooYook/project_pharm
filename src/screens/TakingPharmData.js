import React from "react";
import styled from "styled-components/native";
import { useSelector  } from "react-redux";
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
  padding-top: 9px;
`;

const List = styled.ScrollView`
  flex: 1;
  padding-top: 15px;
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 0;
`;

const Content = styled.Text`
  font-size: 20px
  color: white;
  padding: 7px 0;
  padding-bottom: 30px
`;

// function start
function TakingPharmData({ navigation }) {
  const drugInfos = useSelector((state) => {
    return state.drugInfo;
  });

  const { bigTextMode } = useSelector((state) => {
    return {
      bigTextMode: state.settingInfo.bigTextMode,
      darkmode: state.settingInfo.darkmode,
    };
  });

  // remove button press function

  return (
    <Container>
      <Title style={{ fontSize: bigTextMode ? 40 : 30 }}>복약 내역</Title>
      <List>
        {drugInfos &&
          drugInfos.sort((a,b) => parseFloat(b.id) - parseFloat(a.id)).map((drugInfo) => (
            <PharmDataContent
              style={{}}
              key={drugInfo.id}
              drugInfo={drugInfo}
              navigation={navigation}
              namePress={() =>
                navigation.navigate("PharmDetailed", { drugInfo })
              }
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
