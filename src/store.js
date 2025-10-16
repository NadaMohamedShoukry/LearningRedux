import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
//create the store. OLD way : this function id deprecated
const store = createStore(rootReducer);
export default store;
