"use client";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";
import { PeraWalletConnect } from "@perawallet/connect";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import {
  PROVIDER_ID,
  WalletProvider,
  reconnectProviders,
  useInitializeProviders,
  useWallet,
} from "@txnlab/use-wallet";
import { WalletConnectModalSign } from "@walletconnect/modal-sign-html";
import { useEffect, useState } from "react";
import Connect from "./components/Connect";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";
import { WagmiProvider } from "wagmi";
import { Chain, iotex, mainnet } from "wagmi/chains";
import { AirThingsModal } from "./components/KeyModals/AirthingsModal";
import { AmbientModal } from "./components/KeyModals/AmbientModal";
import { AtmotubeModal } from "./components/KeyModals/AtmotubeModal";
import { AwairModal } from "./components/KeyModals/AwairModal";
import { EcowittModal } from "./components/KeyModals/EcowittModal";
import { KaiterraModal } from "./components/KeyModals/KaiterraModal";
import { NrfModal } from "./components/KeyModals/NrfModal";
import { PebbleModal } from "./components/KeyModals/PebbleModal";
import { PurpleAirModal } from "./components/KeyModals/PurpleAirModal";
import OpenButton from "./components/OpenButton";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


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
  const [isNrfModalOpen, setNrfModalIsOpen] = useState(false);
  const [isEcowittModalOpen, setIsEcowittModalOpen] = useState(false);
  const [isAtmotubeModalOpen, setAtmotubeModalIsOpen] = useState(false);
  const [isAwairModalOpen, setAwairModalIsOpen] = useState(false);
  const [isKaiterraModalOpen, setKaiterraModalIsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  const { activeAddress } = useWallet();

  const projectId = "74761852c2f607c540bb116a1bc9f011";

  const chains: readonly [Chain, ...Chain[]] = [mainnet, iotex];

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
  const showNrfModal = () => {
    setNrfModalIsOpen(true);
  };
  const showAwairModal = () => {
    setAwairModalIsOpen(true);
  };
  const showKaiterraModal = () => {
    setKaiterraModalIsOpen(true);
  };
  const showAtmotubeModal = () => {
    setAtmotubeModalIsOpen(true);
  };
  useEffect(() => {
    if (walletProviders !== null) {
      reconnectProviders(walletProviders);
    }
  }, []);
  if (!activeAddress) {
    return (
      <div className="flex justify-center items-center text-center text-white w-[90vw] bg-[#201c1c] m-auto p-5">
          <WalletProvider value={walletProviders}>
            <div className="flex flex-col p-5 bg-[#84808a] rounded-[10px] w-[90vw] shadow-md">
              <Connect />
            </div>
          </WalletProvider>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center text-center text-white w-[90vw] bg-[#201c1c] m-auto p-5">
      {/* @ts-ignore */}
      <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}> 
        <WalletProvider value={walletProviders}>
          <div className="flex flex-col p-5 bg-[#84808a] rounded-[10px] w-[100vw] shadow-md">
            <Connect />
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

                <PebbleModal
                  isOpen={isPebbleModalOpen}
                  setOpen={setPebbleModalIsOpen}
                />
                <OpenButton
                  showModal={showPebbleModal}
                  text="Pebble (IOTEX)"
                  logo="/iotex.svg"
                  size="150px"
                />

                <OpenButton
                  showModal={showAirThingsModal}
                  text="Airthings"
                  logo="/air-things.png"
                />
                <AirThingsModal
                  isOpen={isAirthingsModalOpen}
                  setOpen={setisAirthingsModalOpen}
                />

                <OpenButton
                  showModal={showPurpleAir}
                  text="Purple Air"
                  logo="/purple-air.png"
                />
                <PurpleAirModal
                  isOpen={isPurpleAirOpen}
                  setOpen={setIsPurpleAirOpen}
                />

                <NrfModal isOpen={isNrfModalOpen} setOpen={setNrfModalIsOpen} />
                <OpenButton
                  showModal={showNrfModal}
                  text="Nrf"
                  logo="/Nrf.png"
                  size="48"
                />

                <OpenButton
                  showModal={showAwairModal}
                  text="Awair"
                  logo="/awair.png"
                />
                <AwairModal
                  isOpen={isAwairModalOpen}
                  setOpen={setAwairModalIsOpen}
                />
                <OpenButton
                  showModal={showKaiterraModal}
                  text="Kaiterra"
                  logo="/kaiterra.png"
                />
                <KaiterraModal
                  isOpen={isKaiterraModalOpen}
                  setOpen={setKaiterraModalIsOpen}
                />
                <OpenButton
                  showModal={showAtmotubeModal}
                  text="Atmotube"
                  logo="/atmotube.png"
                />
                <AtmotubeModal
                  isOpen={isAtmotubeModalOpen}
                  setOpen={setAtmotubeModalIsOpen}
                />
              </div>
            </div>
          </div>
        </WalletProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}
