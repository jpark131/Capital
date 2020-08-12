import React, { Component } from "react";
import _ from "lodash";
import TransactionTable from "./transactionTable";
import { getUserObject, getCategories } from "../services/userService";
import Pie from "./common/pie";
import ListGroup from "./common/listGroup";
import { deleteTransaction } from "../services/transactionService";

class Home extends Component {
  state = {
    transactions: [],
    categories: [],
    months: [],
    sortColumn: { path: "date", order: "asc" },
    currentMonth: new Date(),
    budget: 0,
  };

  getMonths(transactions) {
    let months = [];
    let month;
    for (let t of transactions) {
      t.date = new Date(t.date);
      month = new Date(t.date.getFullYear(), t.date.getMonth());
      if (!months.includes(month.toDateString()))
        months.push(month.toDateString());
    }
    return months;
  }

  async componentDidMount() {
    if (this.state.transactions.length === 0) {
      this.props.history.push("/transaction/new");
    }
    const user = await getUserObject();
    if (!user) return;
    const transactions = user.transactions;
    let categories = [];
    for (let t of transactions) {
      t.date = new Date(t.date);
    }
    categories = await getCategories();
    const months = this.getMonths(transactions);
    const budget = user.budget;
    this.setState({ transactions, categories, budget, months });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  newDate(date) {
    const split = date.split(" ");
    const month = this.monthMap.indexOf(split[0]);
    const year = split[2];
    const newDate = new Date(year, month);
    return newDate;
  }

  handleMonthSelect = (date) => {
    this.setState({ currentMonth: date });
  };

  handleDelete = async (transaction) => {
    const originalTransactions = this.state.transactions;
    const transactions = originalTransactions.filter(
      (t) => t._id !== transaction._id
    );
    this.setState({ transactions });
    try {
      await deleteTransaction(transaction._id);
      window.location = "/home";
    } catch (ex) {
      alert("This transaction has already been deleted");

      this.setState({ transactions: originalTransactions });
    }
  };

  getPageData = () => {
    const {
      transactions: allTransactions,
      categories: allCategories,
      sortColumn,
      currentMonth,
    } = this.state;
    let filtered = allTransactions;
    let spent = 0;
    let categories = allCategories;

    if (filtered.length > 0) {
      filtered = allTransactions.filter(
        (t) => new Date(t.date).getMonth() === new Date(currentMonth).getMonth()
      );
      categories = [];
      for (let t of filtered) {
        spent += t.amount;
        if (categories.find((e) => e.name === t.category))
          categories.find((e) => e.name === t.category).amount += t.amount;
        else categories.push({ name: t.category, amount: t.amount });
      }
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    return { sorted, spent, categories };
  };

  render() {
    const { sortColumn, budget, currentMonth, months } = this.state;
    const { sorted: transactions, spent, categories } = this.getPageData();

    return (
      <div className="text-center float-center">
        <h1>This Month's Budget: ${budget}</h1>
        <h1>So Far You've Spent: ${spent}</h1>
        <div className="row mt-5">
          <div className="col-2" style={{ marginLeft: 100 }}>
            <ListGroup
              items={months}
              selectedItem={currentMonth}
              onItemSelect={this.handleMonthSelect}
            />
          </div>
          <div className="col-5">
            <TransactionTable
              transactions={transactions}
              spent={spent}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
          </div>
          <div className="col">
            <Pie transactions={transactions} categories={categories} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
