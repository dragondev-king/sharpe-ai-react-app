import SharpeAI from "../routes/Stratigies/SharpeAI.json"
import { useContractFunction, useEthers } from "@usedapp/core"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"

export const useWithdrawTokens = ( vault ) => {
    const { chainId, account } = useEthers()
    const { abi } = SharpeAI
    const SharpeaiInterface = new utils.Interface(abi)
    const SharpeaiContract = new Contract(vault, SharpeaiInterface)

    const { send: shareWithdraw, state: shareWithdrawState } = useContractFunction(SharpeaiContract, "withdraw", {transactionName: "Withdraw Tokens"})
    const shareWithdrawn = (amount) => {
        return shareWithdraw(amount, 0, 0, account)
    }
    return { shareWithdrawn, shareWithdrawState }

} 