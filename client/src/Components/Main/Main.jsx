import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Container from "@material-ui/core/Container";
import Budget from "../Budget/Budget.jsx";
import Transaction from "../Transaction/Transaction.jsx";
import TransactionTable from "../TransactionTable/TransactionTable.jsx";
export default function Main({ user }) {
  return (
    <>
      <Navbar user={user} />
      <Container maxWidth="lg">
        <Budget budget={300} remainBudget={132} />
        <Transaction />
        <TransactionTable />
      </Container>
    </>
  );
}
