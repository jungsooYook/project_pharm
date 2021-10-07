import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, Dimensions, Alert, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PharmDataContent } from '../components';
import { FontAwesome5 } from '@expo/vector-icons';
import { AddDrugInfo } from '../actions';
import { dark, light } from '../theme';
import secret from '../data/secret.json';

const width = Dimensions.get('window').width;

const Container = styled.SafeAreaView`
  justify-content: flex-start;
  padding-top: 5px
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding-left: 15px;
  padding-right: 15px
`;

const SemiContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const List = styled.ScrollView`
  width: ${width - 20}px
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
flex:1
  font-size: 25px;
  font-weight: bold;
  padding-top: 10px
  padding-bottom:10px
  align-self: flex-start
  color: ${({ theme }) => theme.semititle};
`;

function PharmDetailed({ route, navigation }) {
  const [url, setUrl] = useState('');
  const [Stdcode, setStdcode] = useState('');
  const [showDUR, setShowDUR] = useState(false);
  const [showCaution, setShowCaution] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  var { drugInfo } = route.params;
  const seqcode = drugInfo.seqcode;

  const { bigTextMode, darkmode } = useSelector(state => {
    return {
      bigTextMode: state.settingInfo.bigTextMode,
      darkmode: state.settingInfo.darkmode,
    };
  });

  const theme = darkmode ? dark : light;

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
          <SemiTitle style={[styles.semiTitle, { color: theme.caution }]}>
            복용 경고!
          </SemiTitle>
        ) : null}
        {drugInfo.PregnantGrade ? (
          <Content style={[styles.text, { color: theme.caution }]}>
            {`임부 복용 경고!\n\n임부 금기 등급: ${drugInfo.PregnantGrade}\n${
              drugInfo.PregnantNote == 'nan' ? null : drugInfo.PregnantNote
            }`}
          </Content>
        ) : null}
        {drugInfo.ElderNote ? (
          drugInfo.ElderNote == 'nan' ? (
            <Content style={[styles.text, { color: theme.caution }]}>
              고령자 복용 경고
            </Content>
          ) : (
            <Content style={[styles.text, { color: theme.caution }]}>
              {`고령자 복용 경고!\n\n${drugInfo.ElderNote}`}
            </Content>
          )
        ) : null}
        {drugInfo.ChildAge ? (
          <Content style={[styles.text, { color: theme.caution }]}>
            {`${drugInfo.ChildAge}${drugInfo.ChildRange}\n${
              drugInfo.ChildNote == 'nan' ? Boolean(false) : drugInfo.ChildNote
            }`}
          </Content>
        ) : null}
        <SemiTitle style={styles.semiTitle}>약물명</SemiTitle>
        <Content style={styles.text}>{drugInfo.name}</Content>
        <SemiContainer>
          <SemiTitle style={styles.semiTitle}>약물 DUR 정보</SemiTitle>
          <TouchableOpacity
            style={{
              paddingRight: 4,
              paddingLeft: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setShowDUR(prev => !prev);
            }}
          >
            <FontAwesome5
              name={showDUR ? 'chevron-up' : 'chevron-down'}
              size={25}
              color={theme.text}
            />
          </TouchableOpacity>
        </SemiContainer>
        {showDUR ? (
          <SemiContainer
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Content style={styles.text}>제조사: {drugInfo.brandName}</Content>
            <Content style={styles.text}>바코드: {drugInfo.barcode}</Content>
            <Content style={styles.text}>
              품목 기준코드: {drugInfo.seqcode}
            </Content>
            {drugInfo.stdcode == '' ? null : (
              <Content style={styles.text}>
                의약품 코드: {drugInfo.StdCode}
              </Content>
            )}
            {drugInfo.ATCcode === 'nan' ? null : (
              <Content style={styles.text}>
                ATC 코드: {drugInfo.ATCcode}
              </Content>
            )}
          </SemiContainer>
        ) : null}

        <SemiContainer>
          <SemiTitle style={styles.semiTitle}>
            약물 허가 업데이트 정보
          </SemiTitle>
          <TouchableOpacity
            style={{
              paddingRight: 4,
              paddingLeft: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setShowUpdate(prev => !prev);
            }}
          >
            <FontAwesome5
              name={showUpdate ? 'chevron-up' : 'chevron-down'}
              size={25}
              color={theme.text}
            />
          </TouchableOpacity>
        </SemiContainer>
        {showUpdate ? (
          <SemiContainer
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Content style={styles.text}>{drugInfo.updateInfo}</Content>
          </SemiContainer>
        ) : null}
        <SemiTitle style={styles.semiTitle}>저장 방법</SemiTitle>
        <Content style={styles.text}>{drugInfo.howToStore}</Content>

        <SemiContainer>
          <SemiTitle style={styles.semiTitle}>복용시 주의사항</SemiTitle>
          <TouchableOpacity
            style={{
              paddingRight: 4,
              paddingLeft: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setShowCaution(prev => !prev);
            }}
          >
            <FontAwesome5
              name={showCaution ? 'chevron-up' : 'chevron-down'}
              size={25}
              color={theme.text}
            />
          </TouchableOpacity>
        </SemiContainer>
        {showCaution ? (
          <SemiContainer
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Content style={styles.text}>{drugInfo.caution}</Content>
          </SemiContainer>
        ) : null}

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
