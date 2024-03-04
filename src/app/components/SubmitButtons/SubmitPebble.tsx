import React, { useState } from "react";
import { useWallet } from "@txnlab/use-wallet";
import { ethers, Provider } from 'ethers';
import { PebbleLinkImei } from "@/app/server/Pebble";
import WalletConnectProvider from "@walletconnect/web3-provider";
const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
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
    const isMobileDevice = () => {
        return (
            (typeof window.orientation !== "undefined") ||
            (navigator.userAgent.indexOf('IEMobile') !== -1)
        );
    };

    const { activeAddress } = useWallet();
    let erc_addr = '';
    const connectWalletHandler = async () => {
        let provider;
        try {
            if (window.ethereum && !isMobileDevice()) {

                await window.ethereum.request({ method: 'eth_requestAccounts' });
                provider = new ethers.BrowserProvider(window.ethereum);
            } else {
                const walletConnectProvider = new WalletConnectProvider({
                    infuraId: "c3d6c0eb97294d8bbe93d433a2c76f36", // Replace with your Infura Project ID
                });
        
                await walletConnectProvider.enable();
                provider = new ethers.InfuraProvider('ethereum', 'c3d6c0eb97294d8bbe93d433a2c76f36');
            }
                const signer = await provider.getSigner();
                const account = await signer.getAddress();
                erc_addr = account;
                console.log(account);
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <button
            onClick={async () => { // handleSubmit(imei, updateMessage, disappearInput, activeAddress!)
                await connectWalletHandler()
                if (!erc_addr) {
                    console.log('erc_addr is empty');
                    return void updateMessage({ message: "Please connect your erc20 wallet to ensure ownership of your pebble tracker", color: "red" });
                }
                else if (activeAddress) {
                    handleSubmit(imei, updateMessage, disappearInput, activeAddress, erc_addr);
                }
                else {
                    return void updateMessage({ message: "Please connect your wallet", color: "red" });
                }
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
    activeAddress: string,
    erc_addr: string
) => {
    console.log('submitting with ' + erc_addr);
    disappearInput(true);
    updateMessage({ message: "Submitting Key...", color: "white" });
    const response: {
        verified: boolean;
        data: { message: string; color: string };
    } = await PebbleLinkImei(apiKey, activeAddress, erc_addr);
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

