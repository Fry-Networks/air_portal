import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { SubmitImeiButton } from "../SubmitButtons/SubmitPebble";
import ImeiInput from "../Inputs/ImeiInput";
import { Connector, useConnect } from 'wagmi'

const logo =
  "/iotex.svg";
export function PebbleModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Function;
}) {
  const [imei, set_imei] = useState("");
  const [valid, setValid] = useState(false);
  const [message, updateMessage] = useState({ message: "", color: "white" });
  const [disappear, setDisappear] = useState(false);
  const { connectors, connect } = useConnect()
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
          alt="Iotex Logo"
          style={{
            width: "10%",
            marginBottom: "20px",
          }}
        />
        <h1 style={{ fontSize: "25px" }}>
          Please enter your Pebble Device IMEI below:
        </h1>
        <h3 style={{ fontSize: "15px" }}>
          Your imei on the box in which your device came in.
          You will have to connect with the wallet you used to register your Pebble Tracker (on the Machine Fi portal) to ensure ownserhip of the device.
        </h3>
        <p style={{ fontSize: "12px", marginBottom: "25px" }}>
          Your imei only allows access to your devices data, nothing more.
          You can verify that {" "}
          <a
            style={{
              textDecoration: "underline",
            }}
            href="https://docs.iotex.io/dev-toolkit/web3-smart-devices/pebble-tracker/endpoints"
            target="_blank"
          >
            here
          </a>
          .
        </p>

        <ImeiInput
          imei={imei}
          set_imei={set_imei}
          setValid={setValid}
          disappear={disappear}
        />
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
        {connectors.map((connector) => (
          <button key={connector.uid} onClick={() => connect({ connector })}>
            {connector.name}
          </button>
        ))}
        </div>
        <SubmitImeiButton
          valid={valid}
          imei={imei}
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