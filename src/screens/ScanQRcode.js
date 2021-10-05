import React, { useState, useEffect } from "react";
import { Text, Alert, Vibration, Dimensions, Pressable } from "react-native";
import styled from "styled-components/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import ResetButton from "../components/ResetButton";
import { useDispatch, useSelector } from "react-redux";
import { AddDrugInfo } from "../actions";
import OverlayView from "../components/OverlayView";
import { EditPharmData, EditPharmName } from "../util";
import secret from "../data/secret.json";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

function timestamp() {
  var Now = new Date();
  Now.setHours(Now.getHours() + 9);
  return Now.toISOString().replace("T", " ").substring(0, 19);
}

///function Starts
function ScanQRcode({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const width = Dimensions.get("window").width;
  const dispatch = useDispatch();

  const {vibration} = useSelector((state) => {
    return {
      vibration: state.settingInfo.vibration
    }
  })

  // Search StdCode from edited barcode function

  const SearchStdCode = async (data) => {
    try {
      await fetch(
        `https://${secret.firebase_barcode_to_prestdcode_id}/${data.barcode}/.json`
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          console.log(`std of name: ${data.name}`)
          console.log(`std of barcode: ${data.barcode}`)
          console.log(`std of id: ${data.id}`)

          data.stdcode = json.PreStdCode.substring(3,12)
          data.ATCcode = json.ATCCode

          console.log('std of stdcode: ',data.stdcode)

          dispatch(AddDrugInfo(data))
          
        });
    } 
    catch (e) {
      console.log('SearchStdCode function error')
    }
  };



  // check drug alert function
  function CheckDrugAlert(data) {
    Alert.alert(
      "복용 약물이 아래 내용이 맞습니까?",
      `복약 시간: ${timestamp()}
      의약품명: ${data.name}
      `,
      [
        {
          text: "아니요",
          onPress: () => {
            console.log("Cancel Pressed"), setScanned(false);
          },
          style: "cancel",
        },
        {
          text: "네",
          onPress: () => {
            console.log("OK Pressed");
            console.log(`drug name: ${data.name}\ndrug barcode: ${data.barcode}\ndrug seqcode: ${data.seqcode}`)
            SearchStdCode(data)
            setScanned(false);
          },
        },
      ]
    );
  }

  // search barcode function
  const SearchDrugByBarCode = async (editedData) => {
    try {
      await fetch(
        `http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService1/getMdcinPrductItem?serviceKey=${secret.pharm_service_key}&bar_code=${editedData}&type=json`
      )
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          const name = EditPharmName(myJson.body.items[0].ITEM_NAME);
          const howToStore = myJson.body.items[0].STORAGE_METHOD;
          const howMuch = EditPharmData(
            myJson.body.items[0].UD_DOC_DATA,
            "[CDATA[",
            "]"
          );
          const mainINGR = myJson.body.items[0].MAIN_ITEM_INGR;
          const seqcode = myJson.body.items[0].ITEM_SEQ;
          const time = Date().toString();

          const drugInfo = {
            name: name,
            howToStore: howToStore,
            howMuch: howMuch,
            mainINGR: mainINGR,
            id: Date.now().toString(),
            time: time,
            barcode: editedData,
            seqcode: seqcode,
            stdcode: "initial state"
          };

          return CheckDrugAlert(drugInfo);
        });
    } catch (e) {
      console.log(e.message);
      Alert.alert(
        "스캔 오류!",
        `의약품이 아니거나 국내에서 판매되는 의약품이 아닙니다.\n카메라가 흔들릴시 잘못 인식 할 수 있으므로 다시 스캔하세요.`,
        [
          {
            text: "다시 스캔하기",
            onPress: () => {
              setScanned(false);
            },
          },
        ]
      );
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  ///scan data function
  const handleBarCodeScanned = ({ type, data }) => {
    Vibration.vibrate(vibration ? 200 : 0);
    var index = data.indexOf("880");
    var editedData = data.substring(index, index + 13);
    SearchDrugByBarCode(editedData);
    
    console.log(`@@@ScanQRcode screen data@@@\nbarcode type: ${type}\nbarcode data:${editedData}\n-----------------------------------`);
    setScanned(true);
  };

  if (hasPermission === null) {
    return <Text>카메라 권한 요청중입니다...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  /// Rendering Start
  return (
    <Container>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          width: width - 40,
          justifyContent: "flex-start",
          alignItems: "center",
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

export default ScanQRcode;
