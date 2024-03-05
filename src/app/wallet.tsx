"use client";
import React, { useEffect, useState } from "react";
import {
  reconnectProviders,
  useInitializeProviders,
  WalletProvider,
  PROVIDER_ID,
  algosigner,
  useWallet,
} from "@txnlab/use-wallet";
import Connect from "./components/Connect";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { WalletConnectModalSign } from "@walletconnect/modal-sign-html";

import OpenButton from "./components/OpenButton";
import { AirThingsModal } from "./components/KeyModals/AirthingsModal";
import { PurpleAirModal } from "./components/KeyModals/PurpleAirModal";
import { PebbleModal } from "./components/KeyModals/PebbleModal";
import { AmbientModal } from "./components/KeyModals/AmbientModal";
import { EcowittModal } from "./components/KeyModals/EcowittModal";
import { Chain, mainnet, iotex } from "wagmi/chains";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";
import { WagmiConfig } from "wagmi";

export default function Wallet() {
  const walletProviders = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
      { id: PROVIDER_ID.MYALGO, clientStatic: MyAlgoConnect },
      {
        id: PROVIDER_ID.WALLETCONNECT,
        clientStatic: WalletConnectModalSign,
        clientOptions: {
          projectId: "74761852c2f607c540bb116a1bc9f011",
          metadata: {
            name: "Fry Foundation",
            description: "Authenticate yourself",
            url: "https://weather.fryfoundation.com",
            icons: ["https://walletconnect.com/walletconnect-logo.png"],
          },
        },
      },
    ],
  });
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isAirthingsModalOpen, setisAirthingsModalOpen] = useState(false);
  const [isPurpleAirOpen, setIsPurpleAirOpen] = useState(false);
  const [isPebbleModalOpen, setPebbleModalIsOpen] = useState(false);
  const [isEcowittModalOpen, setIsEcowittModalOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  const { activeAddress } = useWallet();

  const projectId = "74761852c2f607c540bb116a1bc9f011"

  const chains: readonly [Chain, ...Chain[]] = [
    mainnet,
    iotex
    
  ];

  const metadata = {
    name: "Next Starter Template",
    description: "A Next.js starter template with Web3Modal v3 + Wagmi",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  };

  const wagmiConfig = defaultWagmiConfig({ projectId, metadata, chains });

  createWeb3Modal({ wagmiConfig, projectId });






  const showModal = () => {
    setModalIsOpen(true);
  };
  const showAirThingsModal = () => {
    setisAirthingsModalOpen(true);
  };
  const showEcowittModal = () => {
    setIsEcowittModalOpen(true);
  };
  const showPurpleAir = () => {
    setIsPurpleAirOpen(true);
  };
  const showPebbleModal = () => {
    setPebbleModalIsOpen(true);
  };
  useEffect(() => {
    if (walletProviders !== null) {
      reconnectProviders(walletProviders);
    }
  }, []);
  if (!activeAddress) {
    return (
      <div
        style={{
          ...containerStyle,
        }}
      >
        <WagmiConfig config={wagmiConfig}>
          <WalletProvider value={walletProviders}>
            <div style={{ ...cardStyle }}>
              <Connect />
            </div>
          </WalletProvider>
        </WagmiConfig>
      </div>
    );
  }

  return (
    <div
      style={{
        ...containerStyle,
      }}
    >
      <WagmiConfig config={wagmiConfig}>
      <WalletProvider value={walletProviders}>
        <div style={{ ...cardStyle, width: "100vw" }}>
          <Connect />
          <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-evenly" }}>
            <OpenButton
              showModal={showModal}
              text="Ambient"
              logo="/ambient.png"
            />
            <AmbientModal isOpen={isModalOpen} setOpen={setModalIsOpen} />
            <OpenButton
              showModal={showEcowittModal}
              text="Ecowitt / Froggit / MISOL"
              logo="/ecowitt.png"
            />
            <EcowittModal
              isOpen={isEcowittModalOpen}
              setOpen={setIsEcowittModalOpen}
            />
            <PebbleModal isOpen={isPebbleModalOpen} setOpen={setPebbleModalIsOpen} />
            <OpenButton
              showModal={showPebbleModal}
              text="Pebble (IOTEX)"
              logo="/iotex.svg"
              size="150px"
            />
            {/*
            <OpenButton
              showModal={showAirThingsModal}
              text="Airthings"
              logo="/air-things.png"
            />
            
            <AirThingsModal
              isOpen={isAirthingsModalOpen}
              setOpen={setisAirthingsModalOpen}
            />
            */
            }
            <OpenButton
              showModal={showPurpleAir}
              text="Purple Air"
              logo="/purple-air.png"
            />
            <PurpleAirModal
              isOpen={isPurpleAirOpen}
              setOpen={setIsPurpleAirOpen}
            />
          </div>

        </div>
      </WalletProvider>
      </WagmiConfig>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "white",
  background: "rgb(28, 28, 28)",
  padding: "20px",
  margin: "auto",
  width: "90vw", // This will set the width to be the viewport width minus 40px
} as const;

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  background: "#84808a",
  borderRadius: "10px",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
  width: "90vw", // This will set the width to be the parent width (which is the modified viewport width) minus 40px
} as const;
