const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: 0,
};
//difference : here we pass the initial state as a default state.
// Important rules for reducers:
// Do not modify the existing state directly.
// Avoid asynchronous logic or side effects.
// Place as much logic as possible inside the reducer.
export default function accountReducer(state = initialStateAccount, action) {
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
export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
