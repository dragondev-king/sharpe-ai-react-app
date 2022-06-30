import { Button } from '@material-ui/core'
import { useEthers } from '@usedapp/core';
import { useState } from 'react';
import ExchangeModal from '../../../ExchangeModal';
import './style.scss'
import { formatUnits } from "@ethersproject/units"
import { utils, ethers, providers } from "ethers"
import SharpeAI from "../../../../SharpeAI.json"


const TaurusCard = ({tokenA, tokenB, tokenC, lp, name, value, percentage, logoLeft, logoRight}) => {
  const [openModal, setOpenModal] = useState(false);
  const { chainId, account } = useEthers();
  const [userBalance, userBalanceState] = useState(0)
    const [tvl, tvlState] = useState(0)
    const [position0, position0State] = useState(0)
    const [position1, position1State] = useState(0)
    const { abi } = SharpeAI
    const nodeAPI = new providers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/aadcb5d49092425b8f6d9835c27a01d3')
    const vaultContract = new ethers.Contract(tokenC.address, abi, nodeAPI)
    const positions = async () => {
        setOpenModal(true)
        if (tokenB.name === "USDT"){
          const [total0, total1] = await vaultContract.getTotalAmounts()
          const tvl0 = parseFloat(formatUnits(total0, 6))
          const tvl1 = parseFloat(formatUnits(total1, 6))
          // console.log(tvl0, tvl1)
          tvlState(tvl0 + tvl1)
          await getBalance()
          const p0 = (tvl0*userBalance) / tvl1
          const p1 = (tvl1*userBalance) / tvl1
          position0State(p0)
          position1State(p1)
        }
        else if(tokenB.name === "FRAX" || tokenB.name === "MIMATIC"){
          const [total0, total1] = await vaultContract.getTotalAmounts()
          const tvl0 = parseFloat(formatUnits(total0, 6))
          const tvl1 = parseFloat(formatUnits(total1, 18))
          // console.log(tvl0, tvl1)
          tvlState(tvl0 + tvl1)
          await getBalance()
          const p0 = (tvl0*userBalance) / tvl1
          const p1 = (tvl1*userBalance) / tvl1
          position0State(p0)
          position1State(p1)
        }
        
    }
    const getBalance = async () => {
        if(tokenB.name === "USDT"){
           const value = await vaultContract.balanceOf(account)
           let newBalance = parseFloat(formatUnits(value, 6))
           userBalanceState(newBalance)
         }
        else if(tokenB.name === "FRAX" || tokenB.name === "MIMATIC") {
           const value = await vaultContract.balanceOf(account)
           let newBalance = parseFloat(formatUnits(value, 18))
           userBalanceState(newBalance)
        }
        
    }

  return (
    <div className="card-container">
      <div className='card-wrapper'>
        <div className='card-header'>
          <div className='values-wrapper'>
            <span>{value ? value : 0} USDC</span>
            <span className='small-value'>${(0).toFixed(2)}</span>
          </div>
          <span>{percentage ? percentage : 20} APY</span>
        </div>
        <div className='logo-container'>
          <img src={logoRight} alt="" className='right'/>
          <img src={logoLeft} alt="" className='left'/>
        </div>
        <p>USDC-{name}</p>
        <div className='btn-wrapper'>
          <Button className='btn' onClick={positions}>Start Earning</Button>
        </div>
      </div>
      <ExchangeModal open={openModal} handleClose={() => setOpenModal(false)} token1={tokenA} token2={tokenB} shareToken={tokenC} poolAddr={lp} 
      position0={position0} position1={position1} tvl={tvl} percentage={percentage} />
    </div>
  )
}

export default TaurusCard
