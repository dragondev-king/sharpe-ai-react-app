import { Grid } from "@material-ui/core"

import './style.scss'
import DefaultLayout from "../../../../components/DefaultLayout"
import ComingSoonCard from "../../../../components/ComingSoonCard"
import TaurusCard from "./components/TaurusCard"
import { cardColors } from "../../../../utils/helpers"

import UsdcLogo  from '../../../../assets/svgs/chains/usdc-logo.svg'
import UsdtLogo  from '../../../../assets/pngs/usdt.png'
import DaiLogo from '../../../../assets/svgs/chains/dai-logo.svg'
import FraxLogo from '../../../../assets/svgs/chains/frax-logo.svg'
// import PolygonMaticLogo from '../../../../assets/svgs/chains/polygon-matic-logo.svg'
import UniswapLogo from '../../../../assets/svgs/chains/uniswap-logo.svg'
import EthereumLogo from '../../../../assets/svgs/chains/ethereum-logo.svg'
import BitcoinLogo from '../../../../assets/svgs/chains/bitcoin-logo.svg'
import MaticLogo from '../../../../assets/svgs/mimatic-red.svg'
import networkMapping from "../../map.json";
import { useEthers } from "@usedapp/core"


const helperConfig = {
  "42": "kovan",
  "4": "rinkeby",
  "1": "mainnet",
  "137": "matic"
};

const TaurusContent = () => {

  const { chainId, error } = useEthers()
  const networkName = chainId ? helperConfig[chainId] : console.log("ChainId doesn't exist!")
  // const wethTokenAddress = chainId && chainId === 42 ? networkMapping[String(chainId)]["WethToken"][0] : "0x0000000000000000000000000000000000000000"
  // const daiTokenAddress = chainId && chainId === 42 ? networkMapping[String(chainId)]["DaiToken"][0] : "0x0000000000000000000000000000000000000000"
  // const sharesTokenAddress = chainId && chainId === 42 ? networkMapping[String(chainId)]["SharpeAI"][0] : "0x0000000000000000000000000000000000000000"
  // const poolAddress = chainId && chainId === 42 ? networkMapping[String(chainId)]["PoolAddress"][0] : "0x0000000000000000000000000000000000000000"
  
  const usdc = chainId && chainId === 137 ? networkMapping[String(chainId)]["USDC"][0] : "0x0000000000000000000000000000000000000000"
  const usdt = chainId && chainId === 137 ? networkMapping[String(chainId)]["USDT"][0] : "0x0000000000000000000000000000000000000000"
  const v1 = chainId && chainId === 137 ? networkMapping[String(chainId)]["Vault1"][0] : "0x0000000000000000000000000000000000000000"
  const lp1 = chainId && chainId === 137 ? networkMapping[String(chainId)]["Pool1"][0] : "0x0000000000000000000000000000000000000000"

  const frax = chainId && chainId === 137 ? networkMapping[String(chainId)]["FRAX"][0] : "0x0000000000000000000000000000000000000000"
  const v2 = chainId && chainId === 137 ? networkMapping[String(chainId)]["Vault2"][0] : "0x0000000000000000000000000000000000000000"
  const lp2 = chainId && chainId === 137 ? networkMapping[String(chainId)]["Pool2"][0] : "0x0000000000000000000000000000000000000000"
  
  const miMatic = chainId && chainId === 137 ? networkMapping[String(chainId)]["MIMATIC"][0] : "0x0000000000000000000000000000000000000000"
  const v3 = chainId && chainId === 137 ? networkMapping[String(chainId)]["Vault3"][0] : "0x0000000000000000000000000000000000000000"
  const lp3 = chainId && chainId === 137 ? networkMapping[String(chainId)]["Pool3"][0] : "0x0000000000000000000000000000000000000000"

  const supportedTokens = [
    {
        address: usdc,
        name: "USDC"
    },
    {
        address: usdt,
        name: "USDT"
    },
    {
        address: v1,
        name: "Vault1"
    },
    {
        address: lp1,
        name: "Pool1"
    },
    {
      address: frax,
      name: "FRAX"
    },{
      address: v2,
      name: "Vault2"
     },
     {
      address: lp2,
      name: "Pool2"
    },
    {
      address: miMatic,
      name: "MIMATIC"
    },
    {
      address: v3,
      name: "Vault3"
    },
    {
      address: lp3,
      name: "Pool3"
    }

  
    
]
//   const supportedTokens = [
//     {
//         address: wethTokenAddress,
//         name: "WETH"
//     },
//     {
//         address: daiTokenAddress,
//         name: "DAI"
//     },
//     {
//         address: sharesTokenAddress,
//         name: "SharpeAI"
//     },
//     {
//         address: poolAddress,
//         name: "PoolAddress"
//     }
// ]

  return (
    <div className="taurus-container">
      <Grid container>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <TaurusCard tokenA={supportedTokens[0]} tokenB={supportedTokens[1]} tokenC={supportedTokens[2]} lp={supportedTokens[3]} name={'USDT'} logoLeft={UsdcLogo} logoRight={UsdtLogo} percentage="8.21%" />
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <TaurusCard tokenA={supportedTokens[0]} tokenB={supportedTokens[4]} tokenC={supportedTokens[5]} lp={supportedTokens[6]} name={'FRAX'} logoLeft={UsdcLogo} logoRight={FraxLogo} percentage="20.39%" />
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <TaurusCard tokenA={supportedTokens[0]} tokenB={supportedTokens[7]} tokenC={supportedTokens[8]} lp={supportedTokens[9]} name={'miMATIC'} logoLeft={UsdcLogo} logoRight={MaticLogo} percentage="24.57%" />
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <ComingSoonCard logo={UniswapLogo} color={cardColors.uniswap} />
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <ComingSoonCard logo={EthereumLogo} color={cardColors.ethereum} />
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <ComingSoonCard logo={BitcoinLogo} color={cardColors.bitcoin} />
        </Grid>
      </Grid>
    </div>
  )
}

const Taurus = () => {
  return (
    <>
      <DefaultLayout component={<TaurusContent />} /> 
    </>
  )
}

export default Taurus
