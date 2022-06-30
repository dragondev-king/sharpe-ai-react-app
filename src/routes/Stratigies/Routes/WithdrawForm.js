import { Button, Input, CircularProgress, Snackbar, makeStyles, Typography } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { utils, ethers, providers, BigNumber } from "ethers"
import React, { useState, useEffect } from "react"
import { useWithdrawTokens } from "../../../utils/useWithdrawTokens";
import SharpeAI from "../SharpeAI.json"

const THEME = createTheme({
    typography: {
        "fontSize": 14,
        h6: {
           "fontWeight": 600,
    }
  }})
const useStyles = makeStyles((theme) => ({
    miniHeader: {
        display: "block",
        displayDirection: "row",
    },
    btnDiv: {
        margin: "auto",
        width: "100%",
        color: "white"
    },
    button: {
        width: "100%",
        margin: "auto",
        color: "white",
        // paddingLeft: "1.6rem",
        // paddingRight: "1.6rem",
        borderRadius: "1rem",
        background: "#1B1C31",
        padding: "0.6rem",
    },
    circularPStyle: {
        margin: "auto",
    },
    balance: {
        float: "right",
        fontSize: 12,
        marginTop: "-1rem",
    },
    buttonIn: {
        display: "flex",
        flexDirection: "row",
        background: "#1B1C31",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "1rem",
        marginTop: "0.5rem"
    },
    inputted: {
        padding: "0.2rem",
        paddingLeft: "0.8rem",
        paddingRight: "0.8rem",
        color: "white",
        width: "100%",
        background: "none",
    },
    maxBtn: {
        color: "white",
        justifyContent: "center",
        fontSize: 12,
        marginRight: "0.8rem",
        background: "none",
        cursor: "pointer",
    },
    container2: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center"
    }
}))

const WithdrawForm = ({ sharesToken }) => {
    const classes = useStyles()
    const { notifications } = useNotifications()
    const { account } = useEthers()
    const isConnected = account !== undefined
    const { address: sharesTokenAddress } = sharesToken
    const [ sharesBalance, sharesBalanceState ] = useState(0)
    const formattedSharesBalance = Number(sharesBalance) ? Number(sharesBalance).toFixed(2) : "0.00"
    const [ amount, setAmount ] = useState(0)

    const { abi } = SharpeAI
    const nodeAPI = new providers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/aadcb5d49092425b8f6d9835c27a01d3')
    const vaultContract = new ethers.Contract(sharesTokenAddress, abi, nodeAPI)
    const fetchBalance = async () => {
        if (sharesToken.name === "Vault1"){
            const value = await vaultContract.balanceOf(account)
            let enoughSharesBalance = parseFloat(formatUnits(value, 1))
            let eBalance = enoughSharesBalance > 10 ? enoughSharesBalance : 0
            sharesBalanceState(eBalance)
        }
        else if (sharesToken.name === "Vault2" || sharesToken.name === "Vault3"){
            const value = await vaultContract.balanceOf(account)
            let enoughSharesBalance = parseFloat(formatUnits(value, 18))
            sharesBalanceState(enoughSharesBalance)
        }
        
        
    }

    const handleInputChange = (event) => {
        const newAmount = event.target.value === "" ? "" : (event.target.value)
        setAmount(newAmount)
    }
    const maxBalance = () => {
        const newAmount = formattedSharesBalance
        setAmount(newAmount)
    }
    const { shareWithdrawn, shareWithdrawState } = useWithdrawTokens(sharesTokenAddress)
    const isMining = shareWithdrawState.status === "Mining"
    const handleWithdrawSubmit = () => {
        if (sharesToken.name === "Vault1"){
            const amountAsWei = ethers.utils.parseUnits((amount-10).toString(), 1)
            console.log(amountAsWei)
            return [shareWithdrawn(amountAsWei.toString())]
         }
         else if (sharesToken.name === "Vault2" || sharesToken.name === "Vault3"){
            const amountAsWei = utils.parseEther((amount - 0.01).toString())
            console.log(amountAsWei)
            return [shareWithdrawn(amountAsWei.toString())]
         }
    }
    const handleCloseSnack = () => {
        setWithdrawnSnackbar(false)
    }
    const [withdrawnSnackbar, setWithdrawnSnackbar] = useState(false)
    fetchBalance()

    useEffect(() => {
        if (notifications.filter(
            (notification) => notification.type === "transactionSucceed" && notification.transactionName === 
            "Withdraw Tokens").length > 0) {
            setAmount(0)
            setWithdrawnSnackbar(true)
            }
    }, [notifications, withdrawnSnackbar, amount, setAmount])
    return (
        <div className={classes.container2}>
            <span className={classes.miniHeader}><label>Shares</label><br></br><label className={classes.balance}>BALANCE ({isConnected?formattedSharesBalance : "0.00"})</label></span>
            <div className={classes.buttonIn}>
                <Input value={amount} onChange={handleInputChange} className={classes.inputted} disableUnderline={true} placeholder={"0.00"}/>
                <label className={classes.maxBtn} onClick={maxBalance}>MAX</label>
            </div><br></br>
            {isConnected ? (
                <div className={classes.btnDiv}>
                    <Button onClick={handleWithdrawSubmit} className={classes.button} 
                    variant="contained" 
                    size="large" 
                    disabled={isMining}>{isMining ? 
                    <CircularProgress size={26} className={classes.circularPStyle}/> : 
                    <MuiThemeProvider theme={THEME}>
                        <Typography variant="h6" color="inherit">
                            Withdraw
                        </Typography>
                    </MuiThemeProvider>}
                        </Button>
                </div>) : (
                    <div className={classes.btnDiv}>
                        <Button className={classes.button} variant="contained" size="large">
                                <MuiThemeProvider theme={THEME}>
                                <Typography variant="h6" color="inherit">
                                    Withdraw
                                </Typography>
                                </MuiThemeProvider></Button>
                                </div>)}
            <Snackbar
                open={withdrawnSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">Tokens withdrawn</Alert>
            </Snackbar>  
                               

        </div>
    )
};

export default WithdrawForm;