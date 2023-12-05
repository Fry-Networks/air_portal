import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import KeyInput from "../Inputs/KeyInput";
import { SubmitKeyButton } from "../SubmitButtons/SubmitAmbient";


const logo =
  "https://ambientweather.com/media/logo/stores/8/ambientweather-logo2.png";
export function AmbientModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Function;
}) {
  const [apiKey, setApiKey] = useState("");
  const [valid, setValid] = useState(false);
  const [message, updateMessage] = useState({ message: "", color: "white" });
  const [disappear, setDisappear] = useState(false);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)} // Handle closing of the modal
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          transition: 'opacity 300ms ease-in-out',
          animation: "fade 2s linear",
        },
        content: {
          backgroundColor: "RGB(12, 167, 229)",
          transition: 'opacity 300ms ease-in-out',
          animation: "fade 2s linear",
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
          src={logo}
          alt="Ambient Weather Logo"
          style={{
            width: "70%",
            marginBottom: "20px",
          }}
        />
        <h1 style={{ fontSize: "25px" }}>
          Please enter your Ambient Weather API Key below:
        </h1>
        <p style={{ fontSize: "12px", marginBottom: "25px" }}>
          Your API Key only allows access to your devices data, nothing more.
          You can verify that{" "}
          <a
            style={{
              textDecoration: "underline",
            }}
            href="https://ambientweather.docs.apiary.io/#reference/0/devices"
            target="_blank"
          >
            here
          </a>
          .
        </p>

        <KeyInput
          apiKey={apiKey}
          setApiKey={setApiKey}
          setValid={setValid}
          disappear={disappear}
          type="ambient"
        />

        <SubmitKeyButton
          valid={valid}
          apiKey={apiKey}
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