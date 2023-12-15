import React, { useState } from "react";
import { useWallet } from "@txnlab/use-wallet";
import { weatherXMLinkToken } from "@/app/server/Weatherxm";
export function SubmitPurpleAir({
  valid,
  apiKey,
  updateMessage,
  disappearInput,
}: {
  valid: boolean;
  apiKey: string;
  updateMessage: ({
    message,
    color,
  }: {
    message: string;
    color: string;
  }) => void;
  disappearInput: Function;
}) {
  const { activeAddress } = useWallet();
  return (
    <button
      onClick={() =>{}
        // handleWeatherXMSubmit(username, password, updateMessage, disappearInput, activeAddress!)
      }
      style={{
        ...buttonStyle,
        backgroundColor: valid ? "cyan" : "gray",
        width: "fit-content",
        alignSelf: "center",
      }}
      disabled={!valid}
    >
      Submit
    </button>
  );
}

const handleWeatherXMSubmit = async (
  username: string,
  password: string,
  updateMessage: ({
    message,
    color,
  }: {
    message: string;
    color: string;
  }) => void,
  disappearInput: Function,
  activeAddress: string
) => {
  disappearInput(true);
  updateMessage({ message: "Submitting Key...", color: "white" });
  const response: {
    verified: boolean;
    data: { message: string; color: string };
  } = await weatherXMLinkToken(username, password, activeAddress);
  updateMessage(response.data);
  if (!response.verified) disappearInput(false);
};


const buttonStyle = {
  backgroundColor: "yellow",
  border: "none",
  color: "black",
  padding: "15px 32px",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer",
  borderRadius: "5px",
};
