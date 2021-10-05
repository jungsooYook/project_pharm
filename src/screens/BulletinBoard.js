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

const data = `<DOC title=\"효능효과\" type=\"EE\">\r\n  <SECTION title=\"\">\r\n    <ARTICLE title=\"\">\r\n      <PARAGRAPH tagName=\"p\" textIndent=\"\" marginLeft=\"\"><![CDATA[○다음 경우의 비타민 B6의 보급]]></PARAGRAPH>\r\n      <PARAGRAPH tagName=\"p\" textIndent=\"\" marginLeft=\"\"><![CDATA[-임신&#xff65;수유기]]></PARAGRAPH>\r\n      <PARAGRAPH tagName=\"p\" textIndent=\"\" marginLeft=\"\"><![CDATA[-병중&#xff65;병후의 체력저하 시]]></PARAGRAPH>\r\n      <PARAGRAPH tagName=\"p\" textIndent=\"\" marginLeft=\"\"><![CDATA[○마그네슘결핍으로 인한 근육경련]]></PARAGRAPH>\r\n    </ARTICLE>\r\n  </SECTION>\r\n</DOC>`;

const BulletinBoard = () => {
  const choco = 8 < 20 ? `left` : `right`;
  return (
    <Container>
      <List>
        <Content>원 투 뜨리</Content>
        <Content>{EditPharmData(data)}</Content>
        <Content>{data.indexOf(`title="`, 65)}</Content>
        <Content>{data.indexOf(`[CDATA[`, 48)}</Content>
        <Content>{data.indexOf(`"`, 72)}</Content>
        <Content>{data.indexOf(`title="`, 72)}</Content>
      </List>
    </Container>
  );
};

export default BulletinBoard;
