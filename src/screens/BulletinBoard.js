<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
import { Alert, Vibration, Dimensions, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Content = styled.Text`
  flex: 1;
  font-size: 20px;
  color: pink;
  justify-content: flex-start;
  align-self: flex-start;
  padding: 20px 25px;
`;

const BulletinBoard = () => {
  return (
    <Container>
      <Content>데이터 어떻게 불러오냐...</Content>
      <Content>123123</Content>
    </Container>
  );
};

export default BulletinBoard;
=======
import React, { useState, useEffect } from "react";
import { Alert, Vibration, Dimensions, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Content = styled.Text`
  flex: 1;
  font-size: 20px;
  color: pink;
  justify-content: flex-start;
  align-self: flex-start;
  padding: 20px 25px;
`;

const BulletinBoard = () => {
  return (
    <Container>
      <Content>데이터 어떻게 불러오냐...</Content>
      <Content>123123</Content>
    </Container>
  );
};

export default BulletinBoard;
>>>>>>> Stashed changes
