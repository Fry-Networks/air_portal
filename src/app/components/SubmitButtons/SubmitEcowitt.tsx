import React, { useState } from "react";
import { useWallet } from "@txnlab/use-wallet";
import { EcowittLinkKey } from "@/app/server/Ecowitt";

export function SubmitKeyButton({
    valid,
    appKeyValid,
    appKey,
    apiKey,
    updateMessage,
    disappearInput,
  }: {
    valid: boolean;
    appKeyValid: boolean;
    appKey: string;
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
        onClick={() =>
          handleEcowittSubmit(
            apiKey,
            appKey,
            updateMessage,
            disappearInput,
            activeAddress!
          )
        }
        style={{
          ...buttonStyle,
          backgroundColor: (valid && appKeyValid) ? "cyan" : "gray",
          width: "fit-content",
          alignSelf: "center",
        }}
        disabled={!valid || !appKeyValid}
      >
        Submit
      </button>
    );
  }
  
  const handleEcowittSubmit = async (
    apiKey: string,
    appKey: string,
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
    } = await EcowittLinkKey(apiKey, appKey, activeAddress);
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
  