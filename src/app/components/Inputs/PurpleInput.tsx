import React from "react";

const PurpleInput = ({
    sensorId,
    setSensorId,
    readKey,
    setReadKey,
    setSensorValid,
    setReadKeyValid,
    disappear,
}: {
    sensorId: string;
    setSensorId: Function;
    readKey: string;
    setReadKey: Function;
    setSensorValid: Function;   
    setReadKeyValid: Function;
    disappear: boolean;
}) => (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <input
            type="text"
            value={sensorId}
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            onChange={(e) => {
                setSensorId(e.target.value);
                setSensorValid(
                    /^\d+$/.test(e.target.value)
                )
            }}
            placeholder="Enter your Sensor ID"
            style={keyInputStyle}
            className={disappear ? "fade-out" : ""}
        />
        <input
            type="text"
            value={readKey}
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            onChange={(e) => {
                setReadKey(e.target.value);
                setReadKeyValid(
                    /^[0-9A-F]{8}-[0-9A-F]{4}-[1-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(e.target.value)
                )
            }}
            placeholder="Enter your Read Key"
            style={keyInputStyle}
            className={disappear ? "fade-out" : ""}
        />
    </div>
);

const keyInputStyle = {
    color: "black",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
};

export default PurpleInput;
