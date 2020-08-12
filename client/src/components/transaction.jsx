import React from "react";
import Joi from "joi-browser";
import "../view/css/transaction.css";
import Form from "./common/form";
import {
  saveTransaction,
  getTransaction,
} from "../services/transactionService";
import { updateUser } from "../services/userService";

class Transaction extends Form {
  state = {
    data: { date: "", category: "", business: "", amount: "" },
    errors: {},
  };

  schema = {
    date: Joi.date().required(),
    category: Joi.string().min(5).max(20).required(),
    business: Joi.string().min(5).max(20).required(),
    amount: Joi.number().min(0).required(),
  };

  doSubmit = (transaction) => {
    saveTransaction(transaction, this.props.match.params.id);
    updateUser();

    //this.props.history.push("/home");
  };

  async populateTransaction() {
    try {
      const transId = this.props.match.params.id;
      if (transId === "new") return;

      const transaction = await getTransaction(transId);
      const toState = {
        date: transaction.date,
        category: transaction.category,
        business: transaction.business,
        amount: transaction.amount,
      };
      this.setState({ data: toState });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateTransaction();
  }

  render() {
    const { data, errors } = this.state;
    return (
      <div className="transaction">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="date"> Date: </label>
          <input
            type="date"
            id="date"
            name="date"
            value={data.date}
            error={errors.date}
            onChange={this.handleChange}
          />
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={data.category}
            error={errors.category}
            onChange={this.handleChange}
          />
          <label htmlFor="business"> Business Name:</label>
          <input
            type="text"
            id="business"
            name="business"
            value={data.business}
            error={errors.business}
            onChange={this.handleChange}
          />
          <label htmlFor="amount"> Transaction Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={data.amount}
            error={errors.amount}
            onChange={this.handleChange}
          />
          <button
            style={{ backgroundColor: "#8684e7" }}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Transaction;
