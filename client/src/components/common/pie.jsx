import React, { Component } from "react";
import { PieChart } from "react-minimal-pie-chart";

class Pie extends Component {
  render() {
    const { categories } = this.props;
    const pieData = categories.map((c) => {
      return {
        title: c.name,
        value: c.amount,
        color: `#${((Math.random() * 0xffffff) << 0)
          .toString(16)
          .padStart(6, "0")}`,
      };
    });
    return (
      <React.Fragment>
        <PieChart
          paddingAngle={7}
          lineWidth="10"
          rounded
          radius="20"
          center={[50, 28]}
          data={pieData}
          label={({ dataEntry }) => `${dataEntry.title} - $${dataEntry.value}`}
          labelStyle={{
            fontSize: "3px",
            textAlign: "center",
          }}
          labelPosition="112"
        />
      </React.Fragment>
    );
  }
}

export default Pie;
