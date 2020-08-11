import React, { Component } from "react";
import { getMonths } from "../services/monthService";

class MonthsTable extends Component {
  state = {
    months: [],
  };

  async componentDidMount() {
    const months = await getMonths();
    this.setState({ months });
  }

  render() {
    const { months } = this.state;
    return (
      <table className="table text-center">
        <thead>
          <tr>
            <th>Month</th>
            <th>Expected($)</th>
            <th>Actual($)</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month) => (
            <tr>
              <td key={month.name}>{month.name} </td>
              <td key={month.expected}>{month.expected}</td>
              <td key={month.actual}>{month.actual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MonthsTable;
