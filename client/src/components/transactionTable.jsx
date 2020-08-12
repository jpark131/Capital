import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class TransactionTable extends Component {
  columns = [
    {
      path: "date",
      label: "Date",
      content: (t) => {
        return `${t.date.toString().split(" ").slice(0, 4).join(" ")}`;
      },
    },
    {
      path: "business",
      label: "Business Name",
    },
    { path: "category", label: "Category" },
    { path: "amount", label: "Amount ($)" },
    {
      key: "edit",
      content: (transaction) => (
        <Link
          className="btn btn-primary"
          to={`/transaction/${transaction._id}`}
        >
          Edit
        </Link>
      ),
    },
    {
      key: "delete",
      content: (transaction) => (
        <button
          onClick={() => this.props.onDelete(transaction)}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { transactions, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={transactions}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default TransactionTable;
