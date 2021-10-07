import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import PharmDataContent from '../components/PharmDataContent';
import { dark, light } from '../theme';
import { Alert } from 'react-native';
import secret from '../data/secret.json';

const Container = styled.SafeAreaView`
  justify-content: flex-start;
  padding-top: 7px
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
  padding-top: 0;
  margin-top: 0;
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
  const theme = darkmode ? dark : light;
  const drugInfos = useSelector(state => {
    return state.drugInfo;
  });

  //Search forbidden drug function
  const SearchForbiddenDrug = async data => {
    try {
      await fetch(`https://${firebase_forbidden_drugg}/${data}/.json`)
        .then(response => {
          return response.json();
        })
        .then(json => {
          return json.ForbiddenDrug;
        });
    } catch (e) {}
  };

  const { bigTextMode, darkmode } = useSelector(state => {
    return {
      bigTextMode: state.settingInfo.bigTextMode,
      darkmode: state.settingInfo.darkmode,
    };
  });

  // remove button press function

  return (
    <Container>
      <Title style={{ fontSize: bigTextMode ? 40 : 30 }}>복약 내역</Title>
      <Content
        style={{ color: theme.caution, paddingTop: 20, paddingBottom: 0 }}
      >
        빨간색으로 뜨는 약물은 복용시 주의가 필요한 약물입니다.
      </Content>
      <List>
        {drugInfos &&
          drugInfos
            .sort((a, b) => parseFloat(b.id) - parseFloat(a.id))
            .map(drugInfo => (
              <PharmDataContent
                style={{
                  backgroundColor:
                    drugInfo.PregnantGrade ||
                    drugInfo.ElderNote ||
                    drugInfo.ChildAge
                      ? theme.caution
                      : darkmode
                      ? 'gray'
                      : 'lightgray',
                }}
                key={drugInfo.id}
                drugInfo={drugInfo}
                navigation={navigation}
                namePress={() =>
                  navigation.navigate('PharmDetailed', { drugInfo })
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
