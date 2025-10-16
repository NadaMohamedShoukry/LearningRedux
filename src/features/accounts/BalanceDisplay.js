import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}
//Lagacy way befor hooks ...ConnectAPI
//map a state from a store to a prop
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}
//connect(mapStateToProps) a function that takes a function as an argument
//then returns a function which will take the BalanceDisplay component as an argument.
//then the balance which is returned from the function becomes the props of the component
export default connect(mapStateToProps)(BalanceDisplay);
