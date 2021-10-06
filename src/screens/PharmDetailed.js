import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, Dimensions, Alert, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PharmDataContent } from '../components';
import { Ionicons } from '@expo/vector-icons';
import { AddDrugInfo } from '../actions';
import { dark, light } from '../theme';
import secret from '../data/secret.json';

const Container = styled.SafeAreaView`
  justify-content: flex-start;
  padding-top: 10px
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding-left: 15px;
  padding-right: 15px
`;

const List = styled.ScrollView`
  flex: 0.97;
  padding: 15px 10px;
  margin-top: 0;
  padding-bottom: 30px;
`;

const Content = styled.Text`
  font-size: 20px
  color: ${({ theme }) => theme.text};
  padding: 7px 0;
  padding-bottom: 30px
`;

const SemiTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  padding-bottom:10px
  align-self: center
  color: ${({ theme }) => theme.semititle};
`;

function PharmDetailed({ route, navigation }) {
  const [url, setUrl] = useState('');
  const [Stdcode, setStdcode] = useState('');
  var { drugInfo } = route.params;
  const width = Dimensions.get('window').width;
  const seqcode = drugInfo.seqcode;

  const { bigTextMode, darkmode } = useSelector(state => {
    return {
      bigTextMode: state.settingInfo.bigTextMode,
      darkmode: state.settingInfo.darkmode,
    };
  });

  // Search drug image from seq code
  const SearchDrugImage = async seqcode => {
    try {
      await fetch(
        `http://apis.data.go.kr/1470000/MdcinGrnIdntfcInfoService/getMdcinGrnIdntfcInfoList?serviceKey=${secret.image_service_key}&item_seq=${seqcode}&pageNo=1&numOfRows=3&type=json`,
      )
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          return setUrl(myJson.body.items[0].ITEM_IMAGE);
        });
    } catch (e) {
      console.log(e.message);
      return setUrl('');
    }
  };

  SearchDrugImage(seqcode);

  // 복용 주의 알림
  useEffect(() => {
    drugInfo.PregnantGrade || drugInfo.ElderNote || drugInfo.ChildAge
      ? Alert.alert(
          '복용시 주의하세요!',
          '복용시 주의가 필요한 약물입니다. 반드시 의사와 상의후 복용하세요.',
        )
      : null;
  }, []);

  const styles = StyleSheet.create({
    text: {
      fontSize: bigTextMode ? 30 : 20,
    },
    semiTitle: {
      fontSize: bigTextMode ? 35 : 25,
    },
  });
  return (
    <Container>
      <List>
        {url !== '' ? (
          <Image
            style={{
              height: (width * 0.8) / 1.832157,
              width: width * 0.8,
              alignSelf: 'center',
              marginBottom: 30,
            }}
            source={{
              uri: url,
            }}
          />
        ) : null}
        {drugInfo.PregnantGrade || drugInfo.ElderNote || drugInfo.ChildAge ? (
          <SemiTitle style={[styles.semiTitle, { color: 'red' }]}>
            복용 경고!
          </SemiTitle>
        ) : null}
        {
          <Content style={[styles.text, { color: 'red' }]}>
            {drugInfo.name}
          </Content>
        }
        <SemiTitle style={styles.semiTitle}>약물명</SemiTitle>
        <Content style={styles.text}>{drugInfo.name}</Content>
        <SemiTitle style={styles.semiTitle}>약물 DUR 정보</SemiTitle>

        <Content style={styles.text}>제조사: {drugInfo.brandName}</Content>
        <Content style={styles.text}>바코드: {drugInfo.barcode}</Content>
        <Content style={styles.text}>품목 기준코드: {drugInfo.seqcode}</Content>
        {drugInfo.stdcode == '' ? null : (
          <Content style={styles.text}>의약품 코드: {drugInfo.stdcode}</Content>
        )}
        {drugInfo.ATCcode === 'nan' ? null : (
          <Content style={styles.text}>ATC 코드: {drugInfo.ATCcode}</Content>
        )}
        <Content style={styles.text}>ATC 코드: {drugInfo.ATCcode}</Content>
        <Content style={styles.text}>ATC 코드: {drugInfo.ATCcode}</Content>
        <Content style={styles.text}>ATC 코드: {drugInfo.ATCcode}</Content>
        <SemiTitle style={styles.semiTitle}>약물 허가 업데이트 정보</SemiTitle>
        <Content style={styles.text}>{drugInfo.updateInfo}</Content>
        <SemiTitle style={styles.semiTitle}>저장 방법</SemiTitle>
        <Content style={styles.text}>{drugInfo.howToStore}</Content>
        <SemiTitle style={styles.semiTitle}>사용시 주의사항</SemiTitle>
        <Content style={styles.text}>{drugInfo.caution}</Content>
        <SemiTitle style={styles.semiTitle}>효능 효과</SemiTitle>
        <Content style={styles.text}>{drugInfo.effect.substring(6)}</Content>
        <SemiTitle style={styles.semiTitle}>주성분</SemiTitle>
        <Content style={styles.text}>{drugInfo.mainINGR}</Content>
        <SemiTitle style={styles.semiTitle}>복용방법 및 섭취량</SemiTitle>
        <Content style={styles.text}>{drugInfo.howMuch.substring(6)}</Content>
      </List>
    </Container>
  );
}

export default PharmDetailed;
