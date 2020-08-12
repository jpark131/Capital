import React from "react";
import Joi from "joi-browser";
import "../view/css/transaction.css";
import Form from "./common/form";
import {
  saveTransaction,
  getTransaction,
} from "../services/transactionService";
import { addTransactionToUser } from "../services/userService";

class Transaction extends Form {
  state = {
    data: { date: "", category: "", business: "", amount: "" },
    errors: {},
  };

  schema = {
    date: Joi.date().required().label("Date"),
    category: Joi.string().min(3).max(20).required().label("Category"),
    business: Joi.string().min(3).max(20).required().label("Business Name"),
    amount: Joi.number().min(0).required().label("Transaction Amount"),
  };

  doSubmit = async (transaction) => {
    const transactionInDb = await saveTransaction(
      transaction,
      this.props.match.params.id
    );
    await addTransactionToUser(transactionInDb._id);

    window.location = "/home";
  };
  async populateTransaction() {
    try {
      const transId = this.props.match.params.id;
      if (transId === "new") return;

      const transaction = await getTransaction(transId);
      const toState = {
        date: transaction.date.slice(0, 10),
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
        {errors.date ||
          ((errors.category || errors.business || errors.amount) && (
            <div className="alert text-danger">
              {errors[Object.keys(errors)[0]]}
            </div>
          ))}
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
