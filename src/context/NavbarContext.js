import { createContext } from "react";

export const NavbarContext = createContext({
  subIsOpened: false,
  setSubIsOpened: () => {},
  selectedNumber: 1,
  setSelectedNumber: () => {},
  headerText: '',
  setHeaderText: () => {},
  connectedWallet: "",
  setConnectedWallet: () => {  },
  connectedChain: "",
  setConnectedChain: () => {}
})

