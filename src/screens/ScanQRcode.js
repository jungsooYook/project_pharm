import React, { useState, useEffect } from 'react';
import {
  Text,
  Alert,
  Vibration,
  Dimensions,
  View,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import styled from 'styled-components/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ResetButton from '../components/ResetButton';
import { useDispatch, useSelector } from 'react-redux';
import { AddDrugInfo } from '../actions';
import OverlayView from '../components/OverlayView';
import { EditPharmData, EditPharmName } from '../utils';
import secret from '../data/secret.json';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

function timestamp() {
  var Now = new Date();
  Now.setHours(Now.getHours() + 9);
  return Now.toISOString().replace('T', ' ').substring(0, 19);
}

///function Starts
function ScanQRcode({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const width = Dimensions.get('window').width;
  const dispatch = useDispatch();

  const { vibration } = useSelector(state => {
    return {
      vibration: state.settingInfo.vibration,
    };
  });

  // check drug ingrediant
  const BarCodeToINGRCode = async data => {
    await fetch(`${secret.drug_ingr_code_key}/${data.barcode}/.json`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        data.INGRCode = json.INGRCode;

        dispatch(AddDrugInfo(data));
      });
  };

  // Check combination caution drug
  const SearchMoreData = async data => {
    try {
      await fetch(`${secret.drug_information_key2}/${data.StdCode}/.json`)
        .then(response => {
          return response.json();
        })
        .then(json => {
          data.CombTarget = json.CombTarget;
          data.CombNote = json.CombNote;
          data.CombCount = json.CombCount;
          data.EffectGroup = json.EffectGroup;
          data.EffectTarget = json.EffectTarget;
          data.DuplicationCount = json.DuplicationCount;

          BarCodeToINGRCode(data);
        });
    } catch (e) {
      console.log(e.message);
      console.log('SearchMoreData function error');
    }
  };

  // convert barcode to standard code
  const SearchStdCode = async data => {
    try {
      await fetch(`${secret.drug_information_key1}/${data.barcode}/.json`)
        .then(response => {
          return response.json();
        })
        .then(json => {
          data.StdCode = json.StdCode;
          data.ATCcode = json.ATCCode;
          data.PregnantGrade = json.PregnantGrade;
          data.PregnantNote = json.PregnantNote;
          data.ElderNote = json.ElderNote;
          data.ChildAge = json.ChildAge;
          data.ChildRange = json.ChildRange;
          data.ChildNote = json.ChildNote;
          data.MaxInjectDay = json.MaxInjectDay;
          data.MaxDayCapacity = json.MaxDayCapacity;

          SearchMoreData(data);
        });
    } catch (e) {
      console.log('SearchStdCode function error');
    }
  };

  // check drug alert function
  function CheckDrugAlert(data) {
    Alert.alert(
      '복용 약물이 아래 내용이 맞습니까?',
      `복약 시간: ${timestamp()}
      약물명: ${data.name}
      `,
      [
        {
          text: '아니요',
          onPress: () => {
            console.log('Cancel Pressed'), setScanned(false);
          },
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => {
            console.log('OK Pressed');
            console.log(
              `drug name: ${data.name}\ndrug barcode: ${data.barcode}\ndrug seqcode: ${data.seqcode}`,
            );
            SearchStdCode(data);
            setScanned(false);
          },
        },
      ],
    );
  }

  // search barcode function
  const SearchDrugByBarCode = async editedData => {
    try {
      await fetch(
        `http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService1/getMdcinPrductItem?serviceKey=${secret.pharm_service_key}&bar_code=${editedData}&type=json`,
      )
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          const drugInfo = {
            name: EditPharmName(myJson.body.items[0].ITEM_NAME),
            howToStore: myJson.body.items[0].STORAGE_METHOD,
            howMuch: EditPharmData(myJson.body.items[0].UD_DOC_DATA),
            mainINGR: myJson.body.items[0].MAIN_ITEM_INGR,
            id: Date.now().toString(),
            time: Date().toString(),
            barcode: editedData,
            seqcode: myJson.body.items[0].ITEM_SEQ,
            effect: EditPharmData(myJson.body.items[0].EE_DOC_DATA),
            caution: EditPharmData(myJson.body.items[0].NB_DOC_DATA),
            brandName: myJson.body.items[0].ENTP_NAME,
            updateInfo: myJson.body.items[0].GBN_NAME,
          };

          return CheckDrugAlert(drugInfo);
        });
    } catch (e) {
      console.log(e.message);
      Alert.alert(
        '스캔 오류!',
        `의약품이 아니거나 국내에서 판매되는 의약품이 아닙니다.\n카메라가 흔들릴시 잘못 인식 할 수 있으므로 다시 스캔하세요.`,
        [
          {
            text: '다시 스캔하기',
            onPress: () => {
              setScanned(false);
            },
          },
        ],
      );
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  ///scan data function
  const handleBarCodeScanned = ({ type, data }) => {
    Vibration.vibrate(vibration ? 80 : 0);
    var index = data.indexOf('880');
    var editedData = data.substring(index, index + 13);
    SearchDrugByBarCode(editedData);

    console.log(
      `@@@ScanQRcode screen data@@@\nbarcode type: ${type}\nbarcode data:${editedData}\n------------------`,
    );
    setScanned(true);
  };

  if (hasPermission === null) {
    return <Text>카메라 권한 요청중입니다...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function _onchangeText(drugSearchText) {
    setDrugSearchText(drugSearchText);
  }

  /// Rendering Start
  return (
    <Container>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          width: width - 40,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 1,
        }}
      />
      <OverlayView />
      {scanned && (
        <ResetButton onPress={() => setScanned(false)} title="다시스캔" />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: 400,
    height: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ScanQRcode;
