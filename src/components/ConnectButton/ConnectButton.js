import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Web3 from "web3";
import './style.scss';

const ConnectButton = (props) => {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [providerWC, setProvider] = useState(null);
  const [wallet, setWallet] = useState(null);
  const disconnectWallet = () => {
    localStorage.removeItem("wallet");
    localStorage.removeItem("chain");
    setWallet(null);
    deactivate();
  };
  const onConnectWallet = async (forced = false) => {
    if (wallet !== null || account) return;
    if (isLoginLoading) return;
    setIsLoginLoading(true);
    const providerOptions = {
      walletconnect: {
        display: {
          name: 'Mobile',
          description: 'Connect with your Meta Mask mobile wallet',
        },
        package: WalletConnectProvider,
        options: {
          rpc: {
            137: "https://polygon-mainnet.infura.io/v3/aadcb5d49092425b8f6d9835c27a01d3",
          },
          bridge: "https://bridge.walletconnect.org",
          qrcodeModalOptions: {
            mobileLinks: [
              "metamask"
            ],
          },
          theme: "dark"
        },
        theme: "dark"
      }
    };
    const web3Modal = new Web3Modal({
      providerOptions,
      theme: "dark"
    });
    try {
      activateBrowserWallet();
      let provider = await web3Modal.connect();
      setProvider(provider);
      props.setProvider(provider);
      try {
        await provider.enable();
      } catch (error) {
        setIsLoginLoading(false);
        return;
      }
      const web3Provider = new Web3(provider);
      const accounts = await web3Provider.eth.getAccounts();
      if (accounts.length) {
        setWallet(accounts[0]);
        localStorage.setItem("wallet", accounts[0]);
        setIsLoginLoading(false);
      } else {
        setIsLoginLoading(false);
      }
    } catch (error) {
      setIsLoginLoading(false);
    }
  };
  useEffect(() => {
    if (providerWC && providerWC !== null) {
      providerWC.on("accountsChanged", (accounts) => {
        setWallet(accounts[0]);
        localStorage.setItem("wallet", accounts[0]);
      });
    }
  }, [wallet, providerWC]);
  return (
    <button className='connect-button' onClick={!account ? onConnectWallet : disconnectWallet}>
      {
        account ? `${account.substr(0, 6)}....${account.substr(account.length - 4, account.length)}` : "Connect Wallet"
      }
      {/* <svg width="11" style={{ marginLeft: 4 }} height="5" viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 1L5.5 4L9.5 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg> */}
    </button>
  )
}

export default ConnectButton
