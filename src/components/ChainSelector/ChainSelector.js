import { useState, useCallback, useEffect } from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { useEthers } from "@usedapp/core"
import './style.scss'
import EthereumLogo from '../../assets/svgs/ethereum-logo.svg'
import FantomLogo from '../../assets/svgs/fantom-logo.svg'
import PolygonLogo from '../../assets/svgs/polygon-logo.svg'
import BNBLogo from '../../assets/svgs/bsc-logo.svg'
import AvancheLogo from '../../assets/svgs/avalanche-logo.png'
import GreenDot from "../../assets/svgs/Green_dot.svg";

const chains = [
  {
    value: "mainnet",
    logo: EthereumLogo,
    label: "Ethereum",
    id: "1"
  },
  {
    value: "fantom",
    logo: FantomLogo,
    label: "Fantom",
    id: "250"
  },
  {
    value: "polygon",
    logo: PolygonLogo,
    label: "Polygon",
    id: "137"
  },
  {
    value: "bnb",
    logo: BNBLogo,
    label: "BNB Chain",
    id: "56"
  },
  {
    value: "avalanche",
    logo: AvancheLogo,
    label: "Avalanche",
    id: "43114"
  }
]

const ChainSelector = (props) => {
  const [chain, setChain] = useState("137");
  const { chainId, switchNetwork } = useEthers();
  const handleChainChange = (e) =>{
    setChain(e.target.value);
    switchNetwork(e.target.value);
  };
  useEffect(() => {
    if (props.providerWC) {
      props.providerWC.on("chainChanged", (chainId) => {
        if (Number(chainId) !== chain) {
          setChain(Number(chainId));
        }
      });
    }
  }, [props, setChain, chain]);
  const renderGreenDot = () => {
    return (
      <label style={{ marginLeft: 3, display: "flex", alignItems: "center" }}>
        <img src={GreenDot} alt="current" height={15} />
        {/* <svg height="20" width="20">
          <circle cx="10" cy="10" r="5" stroke="#00FF57" stroke-width="1" fill="#00FF57" />
        </svg> */}
      </label>
    );
  };
  return (
    <div className='select-wrapper'>
      <Select value={chainId || chain} onChange={handleChainChange} className='select' variant='outlined'>
        {
          chains.map((item, index) =>  (
              <MenuItem key={index} value={item.id}>
                <img src={item.logo} alt=''/>
                  <span>{item.label}
                  </span>
                  {
                    Number(item.id) === chainId && renderGreenDot()
                  }
              </MenuItem>
          ))
        }
      </Select>
    </div>
  )
}

export default ChainSelector
