import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, Dimensions, Alert, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import * as Speech from 'expo-speech';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
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
  padding-bottom: 10px;
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
  const [showDUR, setShowDUR] = useState(false);
  const [showCaution, setShowCaution] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showHowToStore, setShowHowToStore] = useState(false);
  const [showEffect, setShowEffect] = useState(false);
  const [showINGR, setShowINGR] = useState(false);
  const [showMethod, setShowMethod] = useState(false);
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
      console.log('drug image search ???????????? ?????? ??????');
      return setUrl('');
    }
  };

  SearchDrugImage(seqcode);

  // ?????? ?????? ??????
  useEffect(() => {
    drugInfo.PregnantGrade || drugInfo.ElderNote || drugInfo.ChildAge
      ? Alert.alert(
          '????????? ???????????????!',
          '????????? ????????? ????????? ???????????????. ????????? ????????? ????????? ???????????????.',
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
    icon: {
      color: theme.text,
      fontSize: 22,
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
        {drugInfo.PregnantGrade || drugInfo.ElderNote || drugInfo.ChildAge ? ( // ?????? ?????? ?????? ??????
          <SemiTitle style={[styles.semiTitle, { color: theme.caution }]}>
            ?????? ??????!
          </SemiTitle>
        ) : null}
        {drugInfo.PregnantGrade ? ( // ???????????? ?????? ??????
          <Content style={[styles.text, { color: theme.caution }]}>
            {`?????? ?????? ??????!\n\n?????? ?????? ??????: ${drugInfo.PregnantGrade}\n${
              drugInfo.PregnantNote == 'nan' ? null : drugInfo.PregnantNote
            }`}
          </Content>
        ) : null}
        {drugInfo.ElderNote ? ( // ????????? ?????? ?????? ??????
          drugInfo.ElderNote == 'nan' ? (
            <Content style={[styles.text, { color: theme.caution }]}>
              ????????? ?????? ??????!
            </Content>
          ) : (
            <Content style={[styles.text, { color: theme.caution }]}>
              {`????????? ?????? ??????!\n\n${drugInfo.ElderNote}`}
            </Content>
          )
        ) : null}
        {drugInfo.ChildAge ? (
          <Content style={[styles.text, { color: theme.caution }]}>
            {`?????? ????????? ?????? ??????!\n${drugInfo.ChildAge} ${
              drugInfo.ChildRange
            } ????????? ???????????????\n${
              drugInfo.ChildNote == 'nan' ? '' : drugInfo.ChildNote
            }`}
          </Content>
        ) : null}

        <SemiTitle style={styles.semiTitle}>?????????</SemiTitle>
        <Content style={styles.text}>{drugInfo.name}</Content>

        <SemiContainer>
          <SemiTitle style={styles.semiTitle}>???????????? ??? ?????????</SemiTitle>
          <TouchableOpacity
            style={{
              paddingRight: 4,
              paddingLeft: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setShowMethod(prev => !prev);
            }}
          >
            <FontAwesome5
              name={showMethod ? 'chevron-up' : 'chevron-down'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </SemiContainer>
        {showMethod ? (
          <SemiContainer
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Content style={styles.text}>
              {drugInfo.howMuch.substring(6)}
            </Content>
          </SemiContainer>
        ) : null}

        <SemiContainer>
          <SemiTitle style={styles.semiTitle}>?????? DUR ??????</SemiTitle>
          <TouchableOpacity
            style={{
              // ?????? DUR??????
              paddingRight: 5,
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
              style={styles.icon}
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
            <Content style={styles.text}>?????????: {drugInfo.brandName}</Content>
            <Content style={styles.text}>?????????: {drugInfo.barcode}</Content>
            <Content style={styles.text}>
              ?????? ????????????: {drugInfo.seqcode}
            </Content>
            {drugInfo.stdcode == '' ? null : (
              <Content style={styles.text}>
                ????????? ??????: {drugInfo.StdCode}
              </Content>
            )}
            {drugInfo.ATCcode === 'nan' ? null : (
              <Content style={styles.text}>
                ATC ??????: {drugInfo.ATCcode}
              </Content>
            )}
            {drugInfo.INGRCode == null ? null : (
              <Content style={styles.text}>
                ????????? ??????: {drugInfo.INGRCode}
              </Content>
            )}
          </SemiContainer>
        ) : null}

        <SemiContainer>
          <SemiTitle style={styles.semiTitle}>
            ?????? ?????? ???????????? ??????
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
              style={styles.icon}
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

        <SemiContainer>
          <SemiTitle style={styles.semiTitle}>?????? ?????? ??????</SemiTitle>
          <TouchableOpacity
            style={{
              paddingRight: 4,
              paddingLeft: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setShowHowToStore(prev => !prev);
            }}
          >
            <FontAwesome5
              name={showHowToStore ? 'chevron-up' : 'chevron-down'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </SemiContainer>
        {showHowToStore ? (
          <SemiContainer
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Content style={styles.text}>{drugInfo.howToStore}</Content>
          </SemiContainer>
        ) : null}

        <SemiContainer>
          <SemiTitle style={styles.semiTitle}>????????? ????????????</SemiTitle>
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
              style={styles.icon}
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

        <SemiContainer>
          <SemiTitle style={styles.semiTitle}>?????? ??? ??????</SemiTitle>
          <TouchableOpacity
            style={{
              paddingRight: 4,
              paddingLeft: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setShowEffect(prev => !prev);
            }}
          >
            <FontAwesome5
              name={showEffect ? 'chevron-up' : 'chevron-down'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </SemiContainer>
        {showEffect ? (
          <SemiContainer
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Content style={styles.text}>
              {drugInfo.effect.substring(6)}
            </Content>
          </SemiContainer>
        ) : null}

        <SemiContainer>
          <SemiTitle style={styles.semiTitle}>?????????</SemiTitle>
          <TouchableOpacity
            style={{
              paddingRight: 4,
              paddingLeft: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setShowINGR(prev => !prev);
            }}
          >
            <FontAwesome5
              name={showINGR ? 'chevron-up' : 'chevron-down'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </SemiContainer>
        {showINGR ? (
          <SemiContainer
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Content style={styles.text}>{drugInfo.mainINGR}</Content>
          </SemiContainer>
        ) : null}
      </List>
    </Container>
  );
}

export default PharmDetailed;
