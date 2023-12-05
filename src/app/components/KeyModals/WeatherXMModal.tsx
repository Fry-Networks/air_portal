import React, { useState } from "react";
import Modal from "react-modal";
import { SubmitWeatherXMKeyButton } from "../SubmitButtons/SubmitWeatherXM";
import WeatherXMTokenInput from "../Inputs/WeatherXMTokenInput";
export function WeatherXMModal({
    isOpen,
    setOpen,
  }: {
    isOpen: boolean;
    setOpen: Function;
  }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validEmail, setEmailValid] = useState(false);
    const [validPassword, setPasswordValid] = useState(false);
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
          {/* <img
            src={logo}
            alt="Ambient Weather Logo"
            style={{
              width: "70%",
              marginBottom: "20px",
            }}
          /> */}
          <h1 style={{ fontSize: "25px" }}>
            Please enter your Weather XM credentials below:
          </h1>
          <p style={{ fontSize: "12px", marginBottom: "25px" }}>
            Your credentials allows access to your devices data.
            You can verify which information we have access to {" "}
             <a
              style={{
                textDecoration: "underline",
              }}
              href="https://api.weatherxm.com/api/v1/docs/#/"
              target="_blank"
            >
              here
            </a>
            . 
          </p>
  
          <WeatherXMTokenInput
            token={username}
            setToken={setUsername}
            setValid={setEmailValid}
            disappear={disappear}
            type="email"
            inputType='text'
            placeholder="Enter email"
          />
          <WeatherXMTokenInput
            token={password}
            setToken={setPassword}
            setValid={setPasswordValid}
            disappear={disappear}
            type="password"
            inputType='password'
            placeholder="Enter password"
          />
  
          <SubmitWeatherXMKeyButton
            valid={validEmail && validPassword}
            username={username}
            password={password}
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