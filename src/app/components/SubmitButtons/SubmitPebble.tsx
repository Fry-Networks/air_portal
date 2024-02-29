import React, { useState } from "react";
import { AmbientLinkKey } from "../../server/AmbientWeather";
import { useWallet } from "@txnlab/use-wallet";
import  {ethers, Provider}  from 'ethers';

export function SubmitImeiButton({
    valid,
    imei,
    updateMessage,
    disappearInput,
}: {
    valid: boolean;
    imei: string;
    updateMessage: ({
        message,
        color,
    }: {
        message: string;
        color: string;
    }) => void;
    disappearInput: Function;
}) {
    const [userAddress, setUserAddress] = useState('');
    const { activeAddress } = useWallet();

    const connectWalletHandler = async () => {
        if (window.ethereum) {
            try {
                const test = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const account = await signer.getAddress();
                console.log(account);
                setUserAddress(account);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('Ethereum object does not exist!');
        }
    };




    return (
        <button
            onClick={() =>
               // handleSubmit(imei, updateMessage, disappearInput, activeAddress!)
                connectWalletHandler()
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

const handleSubmit = async (
    apiKey: string,
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
    } = await AmbientLinkKey(apiKey, activeAddress);
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

