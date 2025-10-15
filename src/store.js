import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: 0,
};

//difference : here we pass the initial state as a default state.
// Important rules for reducers:
// Do not modify the existing state directly.
// Avoid asynchronous logic or side effects.
// Place as much logic as possible inside the reducer.
function reducer(state = initialState, action) {
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
//create the store.
const store = createStore(reducer);
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
