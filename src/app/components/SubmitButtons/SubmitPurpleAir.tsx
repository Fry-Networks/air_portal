import React, { useState } from "react";
import { useWallet } from "@txnlab/use-wallet";
import { weatherXMLinkToken } from "@/app/server/Weatherxm";
import { PurpleLink } from "@/app/server/Purple";
export function SubmitPurpleAir({
  valid,
  sensorId,
  readKey,
  updateMessage,
  disappearInput,
}: {
  valid: boolean;
  sensorId: string;
  readKey: string;
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
      onClick={() =>{
        handlePurpleSubmit(sensorId, readKey, updateMessage, disappearInput, activeAddress!);
      }
       
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

const handlePurpleSubmit = async (
  sensorId: string,
  readKey: string,
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
  } = await PurpleLink(activeAddress, sensorId, readKey);
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
