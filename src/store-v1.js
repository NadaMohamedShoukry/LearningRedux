import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: 0,
};
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};
//difference : here we pass the initial state as a default state.
// Important rules for reducers:
// Do not modify the existing state directly.
// Avoid asynchronous logic or side effects.
// Place as much logic as possible inside the reducer.
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    // write the actions in the shape of state domain.
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      //Later
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      // it is advised in redux to return the original state bake instead of
      //throwing an error.
      return state;
  }
}
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
//create the store. OLD way : this function id deprecated
const store = createStore(rootReducer);
//dispatch actions
// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 500, purpose: "Buy a car" },
// });

// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());
// Older code bases
// const ACCOUNT_DEPOSIT = "account/deposit"
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
store.dispatch(deposit(500));
console.log(store.getState());
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
store.dispatch(withdraw(200));
console.log(store.getState());

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
store.dispatch(requestLoan(500, "lala"));
console.log(store.getState());

function payLoan() {
  return { type: "account/payLoan" };
}
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  //call the new date here to prevent side effect in reducer fuunction.
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date(),
    },
  };
}
function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
store.dispatch(createCustomer("Nada Shoukry", "123123123"));
console.log(store.getState());
