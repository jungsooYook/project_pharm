import React, { useState, useEffect } from 'react';
import { Alert, Vibration, Dimensions, Text } from 'react-native';
import styled from 'styled-components/native';

const width = Dimensions.get('window').width;

const Container = styled.SafeAreaView`
  justify-content: flex-start;
  padding-top: 7px
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding-left: 15px;
  padding-right: 15px
`;

const Content = styled.Text`
  flex: 1;
  width: ${width - 40}px
  font-size: 30px;
  color: ${({ theme }) => theme.text};
  margin: 10px 5px
  justify-content: center;
  align-self: flex-start;
  align-items: center
  padding: 20px 25px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold
  padding-bottom: 15px
  color: ${({ theme }) => theme.title};
`;

const List = styled.ScrollView`
  flex:1
  padding-top: 15px;
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 0;
`;

const DrugNow = () => {
  return (
    <Container>
      <Title>현재 복용중인 약물</Title>
      <List>
        <Content>추후 업데이트 예정...</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
      </List>
    </Container>
  );
};

export default DrugNow;
