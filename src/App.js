import { useState, useMemo } from 'react';
import { DAppProvider, Polygon } from "@usedapp/core";
import { getDefaultProvider } from "ethers"
import Main from './routes';
import { NavbarContext } from './context/NavbarContext';
import './App.scss';


function App() {
  const [subIsOpened, setSubIsOpened] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState(1)
  const [headerText, setHeaderText] = useState('Dashboard')
  const [connectedWallet, setConnectedWallet] = useState(null)
  const [connectedChain, setConnectedChain] = useState(null)
  const value = useMemo(() => ({
    subIsOpened,
    setSubIsOpened,
    selectedNumber,
    setSelectedNumber,
    headerText,
    setHeaderText,
    setConnectedChain,
    connectedChain,
    setConnectedWallet,
    connectedWallet
  }), [subIsOpened, selectedNumber, headerText, connectedChain, connectedWallet])

  const config = {
    readOnlyChainId: (Polygon.chainId),
    readOnlyUrls: {
      [Polygon.chainId]: "https://polygon-mainnet.g.alchemy.com/v2/2VsZl1VcrmWJ44CvrD9pt1HFieK6TQfZ"
    },
    notifications: {
      expirationPeriod: 1000,
      checkInterval: 1000
    }
  }

  return (
    <DAppProvider config={config}>
      <NavbarContext.Provider value={value}>
        <div className='main'>
          <Main />
        </div>
      </NavbarContext.Provider>
    </DAppProvider>
  );
}

export default App;
