import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import SimpleCard from "./components/SimpleCard";
import TotalViewChart from "./components/TotalViewChart";
import HistoryChart from "./components/HistoryChart";
import DefaultLayout from "../../components/DefaultLayout";
import "./style.scss";
import { ReactComponent as DepositIcon } from "../../assets/svgs/deposit.svg";
import { ReactComponent as VaultEarningIcon } from "../../assets/svgs/vault-earning.svg";
import { ReactComponent as TotalNetWorthIcon } from "../../assets/svgs/total-net-worth.svg";
import { ReactComponent as TotalWorthIcon } from "../../assets/svgs/total-worth.svg";
import { ReactComponent as ProjectedAPYIcon } from "../../assets/svgs/projected-apy.svg";
import { ReactComponent as ActivePositionsIcon } from "../../assets/svgs/active-positions.svg";
import { ReactComponent as VaultsIcon } from "../../assets/svgs/vaults.svg";
import { ReactComponent as TotalValueLockedIcon } from "../../assets/svgs/total-value-locked.svg";
import networkMapping from "../Stratigies/map.json"
import { useEthers } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { utils, ethers, providers } from "ethers"
import SharpeAI from "../Stratigies/SharpeAI.json"

const helperConfig = {
  "42": "kovan",
  "4": "rinkeby",
  "1": "mainnet",
  "137": "matic"
};

const DashboardContent = () => {
  const { chainId, error, account } = useEthers()
  const [v1LTv0, setV1LTvl0] = useState(0)
  const [v1LTv1, setV1LTvl1] = useState(0)
  const [v2LTv0, setV2LTvl0] = useState(0)
  const [v2LTv1, setV2LTvl1] = useState(0)
  const [v3LTv0, setV3LTvl0] = useState(0)
  const [v3LTv1, setV3LTvl1] = useState(0)
  
  const [v1fees0, setV1fees0] = useState(0)
  const [v1fees1, setV1fees1] = useState(0)
  const [v2fees0, setV2fees0] = useState(0)
  const [v2fees1, setV2fees1] = useState(0)
  const [v3fees0, setV3fees0] = useState(0)
  const [v3fees1, setV3fees1] = useState(0)
  const [userBalance1, userBalance1State] = useState(0)
  const [userBalance2, userBalance2State] = useState(0)
  const [userBalance3, userBalance3State] = useState(0)
  const [lockedV1, lockedStateV1] = useState(0)
  const [lockedV2, lockedStateV2] = useState(0)
  const [lockedV3, lockedStateV3] = useState(0)

  const [vaultYields, vaultYieldsState] = useState(0)
  const [tNetworth, tNetworthState] = useState(0)
  const [tWorth, tWorthState] = useState(0)
  const [annual, annualState] = useState(0)
  const [activePos, activePosState] = useState(0)
  const [vaultHold, vaultHoldState] = useState(3)

  const [totalValue, totalValueState] = useState(0)
  const [income, incomeState] = useState(0)
  const [vol, volState] = useState(0)

  const networkName = chainId ? helperConfig[chainId] : console.log("ChainId doesn't exist!")
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
    
  const { abi } = SharpeAI
  const nodeAPI = new providers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/aadcb5d49092425b8f6d9835c27a01d3')
  const vaultContract1 = new ethers.Contract(v1, abi, nodeAPI)
  const vaultContract2 = new ethers.Contract(v2, abi, nodeAPI)
  const vaultContract3 = new ethers.Contract(v3, abi, nodeAPI)

 
  useEffect(() => {
    if (chainId !== null){
      const fetchTvl = async () => {
        const [total0V1, total1V1] = await vaultContract1.getTotalAmounts()
        const tvl0V1 = parseFloat(formatUnits(total0V1, 6))
        const tvl1V1 = parseFloat(formatUnits(total1V1, 6))
        setV1LTvl0(tvl0V1)
        setV1LTvl1(tvl1V1)
        lockedStateV1(tvl0V1 + tvl1V1) 
    
        const [total0V2, total1V2] = await vaultContract2.getTotalAmounts()
        const tvl0V2 = parseFloat(formatUnits(total0V2, 6))
        const tvl1V2 = parseFloat(formatUnits(total1V2, 18))
        setV2LTvl0(tvl0V2)
        setV2LTvl1(tvl1V2)
        lockedStateV2(tvl0V2 + tvl1V2)
    
        const [total0V3, total1V3] = await vaultContract3.getTotalAmounts()
        const tvl0V3 = parseFloat(formatUnits(total0V3, 6))
        const tvl1V3 = parseFloat(formatUnits(total1V3, 18))
        setV3LTvl0(tvl0V3)
        setV3LTvl1(tvl1V3)
        lockedStateV3(tvl0V3 + tvl1V3)
        totalValueState(tvl0V1 + tvl1V1 + tvl0V2 + tvl1V2 + tvl0V3 + tvl1V3)
        fetchVolume()
        fetchIncome()
      }
      const fetchRanges = async (vContract) => {
        const lower = await vContract.baseLower()
        const upper = await vContract.baseUpper()
        return [lower, upper]
      }
      const fetchVolume = async () => {
        const [v1Range1, v1Range2] = await fetchRanges(vaultContract1)
        const [v1Vol1, v1Vol2] = await vaultContract1.getPositionAmounts(v1Range1, v1Range2)
        const v1Value = parseFloat(formatUnits(v1Vol1, 6)) + parseFloat(formatUnits(v1Vol2, 6))
    
        const [v2Range1, v2Range2] = await fetchRanges(vaultContract2)
        const [v2Vol1, v2Vol2] = await vaultContract2.getPositionAmounts(v2Range1, v2Range2)
        const v2Value = parseFloat(formatUnits(v2Vol1, 6)) + parseFloat(formatUnits(v2Vol2, 18))
    
        const [v3Range1, v3Range2] = await fetchRanges(vaultContract3)
        const [v3Vol1, v3Vol2] = await vaultContract3.getPositionAmounts(v3Range1, v3Range2)
        const v3Value = parseFloat(formatUnits(v3Vol1, 6)) + parseFloat(formatUnits(v3Vol2, 18))
        const totalVolume = v1Value + v2Value + v3Value
        volState(totalVolume)
      }
      const fetchTotalWorth = async () => {
        
        console.log(v1LTv0)
        const value1 = await vaultContract1.balanceOf(account)
        const balance1 = parseFloat(formatUnits(value1, 6))
        const balanceCalc1 = ((v1LTv0*balance1) / v1LTv1) + ((v1LTv1*balance1) / v1LTv1)
        userBalance1State(balance1)
    
        const value2 = await vaultContract2.balanceOf(account)
        const balance2 = parseFloat(formatUnits(value2, 18))
        const balanceCalc2 = ((v2LTv0*balance2) / v2LTv1) + ((v2LTv1*balance2) / v2LTv1)
        userBalance2State(balance2)
    
        const value3 = await vaultContract3.balanceOf(account)
        const balance3 = parseFloat(formatUnits(value3, 18))
        const balanceCalc3 = ((v3LTv0*balance3) / v3LTv1) + ((v3LTv1*balance3) / v3LTv1)
    
        const totalBalance = balance1 + balance2 + balance3
        const worth = balanceCalc1 + balanceCalc2 + balanceCalc3
        userBalance3State(balance3)
        tWorthState(worth)
        console.log(worth)
        console.log(tWorth)
    }
      const fetchActivePos = () => {
        const b1 = userBalance1
        const b2 = userBalance2
        const b3 = userBalance3
        let activeArray = []
        if(b1>0.01){
          activeArray.push(b1)
        }
        if(b2>0.01){
          activeArray.push(b2)
        }
        if(b3>0.01){
          activeArray.push(b3)
        }
        activePosState(parseInt(activeArray.length))
      }
      const fetchIncome = async () => {
        const v1feesEarned1 = await vaultContract1.accruedProtocolFees0()
        const v1feesEarned2 = await vaultContract1.accruedProtocolFees1()
        const v1FirstFee = parseFloat(formatUnits(v1feesEarned1, 6))
        const v1SecondFee = parseFloat(formatUnits(v1feesEarned2, 6))
        const income1 = v1FirstFee + v1SecondFee
        setV1fees0(v1FirstFee)
        setV1fees1(v1SecondFee)
        
        const v2feesEarned1 = await vaultContract2.accruedProtocolFees0()
        const v2feesEarned2 = await vaultContract2.accruedProtocolFees1()
        const v2FirstFee = parseFloat(formatUnits(v2feesEarned1, 6)) 
        const v2SecondFee = parseFloat(formatUnits(v2feesEarned2, 18))
        const income2 = v2FirstFee + v2SecondFee
        setV2fees0(v2FirstFee)
        setV2fees1(v2SecondFee)
        
        const v3feesEarned1 = await vaultContract3.accruedProtocolFees0()
        const v3feesEarned2 = await vaultContract3.accruedProtocolFees1()
        const v3FirstFee = parseFloat(formatUnits(v3feesEarned1, 6))
        const v3SecondFee = parseFloat(formatUnits(v3feesEarned2, 18))
        const income3 = v3FirstFee + v3SecondFee
        setV3fees0(v3FirstFee)
        setV3fees1(v3SecondFee)
        const totalIncome = income1 + income2 + income3
        incomeState(totalIncome)
      }
      const fetchEarnedFees = () => {
        const feesCalc1 = ((v1fees0*userBalance1) / v1fees1) + ((v1fees1*userBalance1) / v1fees1)
        const feesCalc2 = ((v2fees0*userBalance2) / v2fees1) + ((v2fees1*userBalance2) / v2fees1)
        const feesCalc3 = ((v3fees0*userBalance3) / v3fees1) + ((v3fees1*userBalance3) / v3fees1)
        const totalYields = feesCalc1 + feesCalc2 + feesCalc3
        vaultYieldsState(totalYields)
      }
      const fetchTotalNetworth = () => {
        const netWorth = vaultYields > 0 ? tWorth - vaultYields : tWorth
        tNetworthState(netWorth)
      }
      const fetchAPY = () => {
        const apy = (vaultYields / (tWorth * 1)) * 100
        annualState(apy)
      }
      fetchTvl()
      fetchTvl()
      fetchTotalWorth()
      fetchTotalWorth()
      fetchEarnedFees()
      fetchEarnedFees()
      fetchTotalNetworth()
      fetchTotalNetworth()
      fetchAPY()
      fetchAPY()
      fetchActivePos()
  }
  }, [chainId, account, tWorth, userBalance1, userBalance2, userBalance3, v1LTv0, v1LTv1, v1fees0, v1fees1, v2LTv0, v2LTv1, v2fees0, v2fees1, v3LTv0, v3LTv1, v3fees0, v3fees1, vaultContract1, vaultContract2, vaultContract3, vaultYields])

  return (
    <Grid container>
      <Grid item sm={12} md={6} lg={6}>
        <div className="dashboard dashboard-left">
          <div className="card-wrapper card-wrapper__first">
            <SimpleCard
              IconComponent={<DepositIcon />}
              type="middle"
              text="DEPOSITS"
              value={tNetworth}
            />
            <SimpleCard
              IconComponent={<VaultEarningIcon />}
              type="middle"
              text="VAULT EARNING"
              value={vaultYields}
            />
          </div>
          <div className="card-wrapper">
            <SimpleCard
              IconComponent={<TotalNetWorthIcon />}
              type="large"
              text="Total net worth"
              value={tNetworth}
            />
            <SimpleCard
              IconComponent={<TotalWorthIcon />}
              type="large"
              text="Total Worth"
              value={tWorth}
            />
          </div>
          <div className="card-wrapper">
            <SimpleCard
              IconComponent={<ProjectedAPYIcon />}
              type="large"
              text="Projected APY"
              value={annual}
            />
            <SimpleCard
              IconComponent={<ActivePositionsIcon />}
              type="large"
              text="Active Positions"
              value={activePos}
            />
          </div>
          <div>
            <TotalViewChart title={totalValue} />
          </div>
        </div>
      </Grid>
      <Grid item sm={12} md={6} lg={6}>
        <div className="dashboard dashboard-right">
          <p className="text-wrapper">Statistics</p>
          <div className="card-wrapper">
            <SimpleCard
              IconComponent={<VaultsIcon />}
              type="small"
              text="VAULTS"
              value={vaultHold}
            />
            <SimpleCard
              IconComponent={<TotalValueLockedIcon />}
              type="small"
              text="TOTAL VALUE LOCKED"
              value={totalValue}
            />
          </div>
          <div className="history-chart-wrapper">
            <HistoryChart
              value={income}
              text="Income Generated"
              graphColor="#F9896B"
            />
            <HistoryChart value={vol} text="Volume" graphColor="#FC75FF" />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

const Dashboard = () => {
  return <DefaultLayout component={<DashboardContent />} />;
};

export default Dashboard;
