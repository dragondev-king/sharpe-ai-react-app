import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import SharpeAI from "../routes/Stratigies/SharpeAI.json";
import ERC20 from "../routes/Stratigies/WethToken.json";

export const useDepositTokens = (tokenAddress1, tokenAddress2, vault) => {
    const { chainId, account } = useEthers()
    const { abi } = SharpeAI
    const SharpeaiInterface = new utils.Interface(abi)
    const SharpeaiContract = new Contract(vault, SharpeaiInterface)

    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract1 = new Contract(tokenAddress1, erc20Interface)
    const erc20Contract2 = new Contract(tokenAddress2, erc20Interface)
    
    const {send: approvingToken1, state: approvingToken1State} = useContractFunction(erc20Contract1, "approve", {transactionName: "Approve token1 transfer"})
    
    const approveToken1 = (amount1) => {
        return approvingToken1(vault, amount1)
    }
    const [state1, setState1] = useState(approvingToken1State)

    const {send: approvingToken2, state: approvingToken2State} = useContractFunction(erc20Contract2, "approve", {transactionName: "Approve token2 transfer"})
    const approveToken2 = (amount2) => {
        return approvingToken2(vault, amount2)
    }
    const [state2, setState2] = useState(approvingToken2State)
    
    const { send: deposit, state: depositState } = useContractFunction(SharpeaiContract, "deposit", {transactionName: "Deposit Tokens"})
    const depositTokens = (amountA, amountB) => {
        return deposit(amountA, amountB, 0, 0, account)
    }
    
    return {approveToken1, approvingToken1State, approveToken2, approvingToken2State, depositTokens, depositState}
}