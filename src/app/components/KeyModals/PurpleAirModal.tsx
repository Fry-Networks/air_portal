import React, { useState } from "react";
import Modal from "react-modal";
import { SubmitPurpleAir } from "../SubmitButtons/SubmitPurpleAir";
import WeatherXMTokenInput from "../Inputs/WeatherXMTokenInput";
import KeyInput from "../Inputs/KeyInput";
import PurpleInput from "../Inputs/PurpleInput";
export function PurpleAirModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Function;
}) {
  const [sensorId, setSensorId] = useState("");
  const [readKey, setReadKey] = useState("");
  const [sensorValid, setSensorValid] = useState(false);
  const [readKeyValid, setReadKeyValid] = useState(false);
  const [message, updateMessage] = useState({ message: "", color: "white" });
  const [disappear, setDisappear] = useState(false);
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          backgroundColor: "RGB(12, 167, 229)",
          color: "white",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          display: "grid",
        },
      }}
    >
      <button
        style={{
          fontSize: "20px",
          justifySelf: "flex-end",
          borderRadius: "50%",
          borderColor: "white",
          borderInlineColor: "white",
          borderWidth: "1px", // Add this line
          borderStyle: "solid", // Add this line
          boxShadow: "none",
        }}
        onClick={() => {
          setOpen(false);
        }}
      >
        X
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={"/purple-air.png"}
          alt="Purple Air Logo"
          style={{
            width: "70%",
            marginBottom: "20px",
          }}
        />
        <h1 style={{ fontSize: "25px" }}>
          Please enter your PurpleAir credentials below:
        </h1>
        
        <p style={{ fontSize: "15px", marginBottom: "25px", textAlign: "center" }}>
        Please create your READ-KEY on this {" "}
          <a
            style={{
              textDecoration: "underline",
            }}
            href="https://develop.purpleair.com/keys"
            target="_blank"
          >
            link
          </a>
          <br />
          Your credentials allows access to your devices data.
          You can verify which information we have access to {" "}
          <a
            style={{
              textDecoration: "underline",
            }}
            href="https://api.purpleair.com/#api-sensors-get-sensor-data"
            target="_blank"
          >
            here
          </a>
          .
        </p>

        <PurpleInput
          sensorId={sensorId}
          setSensorId={setSensorId}
          readKey={readKey}
          setReadKey={setReadKey}
          setSensorValid={setSensorValid}
          setReadKeyValid={setReadKeyValid}
          disappear={disappear}
        />

        <SubmitPurpleAir
          valid={sensorValid && readKeyValid}
          sensorId={sensorId}
          readKey={readKey}
          updateMessage={updateMessage}
          disappearInput={setDisappear}
        />

        <p
          style={{
            color: message.color,
            fontSize: "17px",
            marginTop: "10px",
            fontWeight: "bolder",
          }}
        >
          {message.message}
        </p>
      </div>
    </Modal>
  );
}