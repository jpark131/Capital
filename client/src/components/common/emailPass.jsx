import React from "react";

const EmailPass = ({ data, errors, onChange }) => {
  return (
    <React.Fragment>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        value={data.email}
        error={errors.email}
        onChange={onChange}
      />
      <br />
      {errors.email && <div className="alert alert-danger">{errors.email}</div>}
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={data.password}
        error={errors.password}
        onChange={onChange}
      />
      {errors.password && (
        <div className="alert alert-danger">{errors.password}</div>
      )}
    </React.Fragment>
  );
};

export default EmailPass;
