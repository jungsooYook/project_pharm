import React, { useState, useEffect } from "react";
import { Alert, Vibration, Dimensions } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Text = styled.Text;

const BulletinBoard = () => {
  return <Container></Container>;
};

export default BulletinBoard;
