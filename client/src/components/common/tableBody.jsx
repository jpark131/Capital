import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, { content, path }) => {
    if (content) return content(item);
    return _.get(item, path);
  };

  createKey = ({ _id }, { path, key }) => {
    return _id + (path || key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
