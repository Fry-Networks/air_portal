import React from "react";

const KeyInput = ({
  imei,
  set_imei,
  setValid,
  disappear,
}: {
  imei: string;
  set_imei: Function;
  setValid: Function;
  disappear: boolean;
}) => (
  <input
    type="text"
    value={imei}
    autoComplete="off"
    data-lpignore="true"
    data-form-type="other"
    onChange={(e) => {
      set_imei(e.target.value);
      setValid(/^[0-9]{15}$/.test(e.target.value))
    }}
    placeholder="Enter your Imei"
    style={keyInputStyle}
    className={disappear ? "fade-out" : ""}
  />
);

const keyInputStyle = {
  color: "black",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
};

export default KeyInput;
