import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Dimensions, Text } from 'react-native';
import secret from '../data/secret.json';

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

const TextInputBox = styled.TextInput`
  flex;1;
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

  const SearchDrugName = async data => {
    try {
      await fetch(
        `${secret.search_drug_name_key}&item_name=${data}&order=Y&pageNo=1&numOfRows=100&type=json`,
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
      return console.log('에러발생');
    }
  };

  return (
    <Container>
      <SearchContainer>
        <TextInputBox
          onChangeText={setText}
          value={text}
          // blurOnSubmit={Alert.alert('blurOnSubmit')}
          onSubmitEditing={() => {
            Alert.alert('submit');
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
      {drugNames.map(info => (
        <Text key={info.ITEM_SEQ}>{info.ITEM_NAME}</Text>
      ))}
    </Container>
  );
}

export default DrugSearchByName;
