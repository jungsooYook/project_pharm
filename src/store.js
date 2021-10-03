import { createStore, combineReducers } from "redux";
import { DrugInfomation } from "./reducers/DrugInformation";
import { SettingInfo } from "./reducers/SettingInfo";

const reducers = combineReducers({
  drugInfo: DrugInfomation,
  settingInfo: SettingInfo,
});

const store = createStore(reducers);

export default store;
