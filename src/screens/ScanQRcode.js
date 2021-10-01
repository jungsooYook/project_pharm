import React, { useState, useEffect } from "react";
import { Text, Alert, Vibration, Dimensions } from "react-native";
import styled from "styled-components/native";
import { BarCodeScanner } from "expo-barcode-scanner";

import ResetButton from "../components/ResetButton";
import { useDispatch, useSelector } from "react-redux";
import { DrugInformationAction } from "../actions/DrugInformationAction";
import OverlayView from "../components/OverlayView";
import { EditPharmData, EditPharmName } from "../util";

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

  // vibration redux
  const vibration = useSelector((state) => {
    return state.settingInfo.vibration;
  });

  // check drug alert function
  function CheckDrugAlert(item) {
    console.log(
      "########################################## \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    );
    Alert.alert(
      "복용 약물이 아래 내용이 맞습니까?",
      `복약 시간: ${timestamp()}
      의약품명: ${item}
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
            console.log("OK Pressed"),
              navigation.navigate("Info"),
              setScanned(false);
          },
        },
      ]
    );
  }

  // search barcode function
  const SearchDrugByBarCode = async (editedData) => {
    Vibration.vibrate(vibration ? 200 : 0);

    try {
      await fetch(
        `http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService1/getMdcinPrductItem?serviceKey=4ARJOwbLh8jufyYInZFDNEp0phIdsR0d7ZZP0bqJKwTfQ3cL%2BDf7zJWkSnYAk%2B8%2BjCjn%2FV9RLSxZ2vNFQ%2BYHrQ%3D%3D&bar_code=${editedData}&type=json`
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
          const mainIngredient = myJson.body.items[0].MAIN_ITEM_INGR;

          dispatch(
            DrugInformationAction(name, howToStore, howMuch, mainIngredient)
          );

          return CheckDrugAlert(name);
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
    const editedData = type === 16 ? data.replace("010", "") : data;
    setScanned(true);
    SearchDrugByBarCode(editedData);
    console.log(`### ${type} \n${editedData} ###`);
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

// json url
// http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService1/getMdcinPrductItem?serviceKey=4ARJOwbLh8jufyYInZFDNEp0phIdsR0d7ZZP0bqJKwTfQ3cL%2BDf7zJWkSnYAk%2B8%2BjCjn%2FV9RLSxZ2vNFQ%2BYHrQ%3D%3D&bar_code=8806469007237&type=json

// xml url
// http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService1/getMdcinPrductItem?serviceKey=4ARJOwbLh8jufyYInZFDNEp0phIdsR0d7ZZP0bqJKwTfQ3cL%2BDf7zJWkSnYAk%2B8%2BjCjn%2FV9RLSxZ2vNFQ%2BYHrQ%3D%3D&bar_code=8806469007237&type=xml
