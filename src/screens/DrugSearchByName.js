import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Alert, Dimensions, Text } from 'react-native';
import secret from '../data/secret.json';
import { EditPharmName } from '../utils';

const width = Dimensions.get('window').width;

const TextContainer = styled.Text`
  font-size: 20px;
  padding-bottom: 4px;
  font-weight: bold;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start
  align-items: center;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  margin-top: 20px;
`;

const ContentBox = styled.TouchableOpacity`
  flex: 1;
  height: 50px;
  width: ${width - 30}px;
  border-radius: 15px;
  background-color: lightgray;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ContentText = styled.Text`
  font-size: 20px;
  color: black;
`;

const TextInputBox = styled.TextInput`
  width: ${width - 110}px
  height:50px;
  border-radius:15px;
  background-color: lightgray
  font-size:20px;
  padding: 3px 18px
  margin-right: 10px
`;

const SearchContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
`;

const SearchButtonTouch = styled.TouchableOpacity`
  width: 60px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: lightgray;
`;

function DrugSearchByName({ navigation }) {
  const [text, setText] = useState('');
  const [drugNames, setDrugNames] = useState([]);
  const { bigTextMode, darkmode } = useSelector(state => {
    return {
      bigTextMode: state.settingInfo.bigTextMode,
      darkmode: state.settingInfo.darkmode,
    };
  });

  // 약물 이름 길이 수정 함수
  function PharmNameset(data) {
    if (width < 600) {
      if (bigTextMode == true) {
        if (data.length >= 6) {
          return `${data.substring(0, 6)}..`;
        } else {
          return data;
        }
      } else {
        if (data.length >= 20) {
          return `${data.substring(0, 20)}..`;
        } else {
          return data;
        }
      }
    } else {
      return data;
    }
  }

  // 약물 누를시 알람 설정
  function PressDrugName(data) {
    Alert.alert(
      '해당 약물을 추가하시겠습니까?',
      `약물명: ${EditPharmName(data.ITEM_NAME)}`,
      [
        {
          text: '아니요',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ],
    );
  }

  const SearchDrugName = async data => {
    try {
      await fetch(
        `${secret.search_drug_name_key}&item_name=${data}&spclty_pblc=의약품&order=Y&pageNo=1&numOfRows=100&type=json`,
      )
        .then(response => {
          return response.json();
        })
        .then(json => {
          return json.body.items;
        })
        .then(result => {
          return setDrugNames(result);
        });
    } catch (e) {
      return console.log('Error in Searching drug by name');
    }
  };

  return (
    <Container>
      <SearchContainer>
        <TextInputBox
          onChangeText={setText}
          value={text}
          onSubmitEditing={() => {
            SearchDrugName(text);
          }}
          placeholder="약물명을 입력하세요."
        />
        <SearchButtonTouch
          onPress={() => {
            SearchDrugName(text);
          }}
        >
          <TextContainer>검색</TextContainer>
        </SearchButtonTouch>
      </SearchContainer>
      <ScrollContainer>
        {drugNames
          ? drugNames.map(info => (
              <ContentBox
                key={info.ITEM_SEQ}
                onPress={() => {
                  PressDrugName(info);
                }}
              >
                <ContentText>
                  {PharmNameset(EditPharmName(info.ITEM_NAME))}
                </ContentText>
              </ContentBox>
            ))
          : null}
      </ScrollContainer>
    </Container>
  );
}

export default DrugSearchByName;
