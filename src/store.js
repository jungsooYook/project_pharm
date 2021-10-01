import { createStore, combineReducers } from "redux";
import { DrungInfomation } from "./reducers/DrugInformation";
import { SettingInfo } from "./reducers/SettingInfo";

const reducers = combineReducers({
  drugInfo: DrungInfomation,
  settingInfo: SettingInfo,
});

const store = createStore(reducers);

export default store;
