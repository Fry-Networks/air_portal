
import { createConfig, http } from 'wagmi'
import { mainnet, iotex } from 'wagmi/chains'
import { coinbaseWallet, injected, metaMask, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, iotex],
  connectors: [
    walletConnect({
      projectId: '74761852c2f607c540bb116a1bc9f011',
    }),
    injected(),
    coinbaseWallet(),
  ],
  transports: {
    [mainnet.id]: http(),
    [iotex.id]: http(),
  },
})