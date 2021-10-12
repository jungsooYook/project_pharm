import React from 'react';
import styled from 'styled-components/native';
import { Vibration } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  align-self: flex-end
  background-color: pink;
  border-radius: 30px;
  width: 60px;
  height: 60px;
  margin-right: 10px
  position: absolute
  right: 20px;
  bottom: 60px;
`;

const Title = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

function longPress() {
  Vibration.vibrate(20);
  Speech.speak('약물 이름으로 검색합니다', { rate: 0.9 });
}

function DrugSearchButton() {
  return (
    <Container delayLongPress={300} onLongPress={longPress}>
      <FontAwesome name="search" size={20} />
    </Container>
  );
}

export default DrugSearchButton;
