import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: 0,
  isLoading: false,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      //Solution 1:
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        //this will nt return the state because in this new reducers we do not retern a state.
        //instead it will retun nothing
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      //pay atention to the order of the code beause now we are mutating the
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
//we did so because thunk in built i redux toolkit.
// here we didnot use the automatic action creator created by create slice we used our own one
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  //when redux sees that it will know that this function is a thunk
  //it will execute it before dispatching to store
  // Middleware.
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    //APi Call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    console.log(converted);
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export default accountSlice.reducer;
//difference : here we pass the initial state as a default state.
// Important rules for reducers:
// Do not modify the existing state directly.
// Avoid asynchronous logic or side effects.
// Place as much logic as possible inside the reducer.
// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     // write the actions in the shape of state domain.
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       //Later
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       // it is advised in redux to return the original state bake instead of
//       //throwing an error.
//       return state;
//   }
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount: amount, purpose: purpose },
//   };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
