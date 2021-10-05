import React, { useState, useEffect } from 'react';
import { Alert, Vibration, Dimensions, Text } from 'react-native';
import styled from 'styled-components/native';
import { EditPharmData } from '../util';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background};
`;

const Content = styled.Text`
  flex: 1;
  font-size: 30px;
  color: ${({ theme }) => theme.text};
  margin: 10px 5px
  justify-content: flex-start;
  align-self: flex-start;
  padding: 20px 25px;
`;

const List = styled.ScrollView`
  padding-top: 15px;
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 0;
`;

const BulletinBoard = () => {
  return (
    <Container>
      <List>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
        <Content>TEXT MODE</Content>
      </List>
    </Container>
  );
};

export default BulletinBoard;
