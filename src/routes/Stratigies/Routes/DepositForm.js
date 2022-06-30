import { Button, CircularProgress, createTheme, Input, makeStyles, MuiThemeProvider, Snackbar, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useEthers, useTokenBalance, useNotifications, useCalls } from "@usedapp/core"
import { Contract } from '@ethersproject/contracts'
import { ethers, utils, constants, getDefaultProvider, providers } from "ethers"
import liquidityPool from "../liquidityPool.json";
import { formatUnits } from "@ethersproject/units"
import Alert from "@material-ui/lab/Alert"
import ERC20 from "../WethToken.json";
import { useDepositTokens } from "../../../utils/useDepositTokens";

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
    balance: {
        float: "right",
        fontSize: 12,
        marginTop: "-1rem",

    },
    circularPStyle: {
        margin: "auto",
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

const DepositForm = (props) => {
    const classes = useStyles();
    const { notifications } = useNotifications()
    const { account, activateBrowserWallet } = useEthers()
    const erc20abi = ERC20.abi
    const nodeAPI = new providers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/aadcb5d49092425b8f6d9835c27a01d3')
    const tokenContract = new ethers.Contract(props.token1.address, erc20abi, nodeAPI)
    const tokenContract2 = new ethers.Contract(props.token2.address, erc20abi, nodeAPI)
    const [amount1, setAmount] = useState(0);
    const [amount2, setAmount2] = useState(0);
    const {abi} = liquidityPool;
    const poolAddress = props.poolAddr.address
    const poolContract = new ethers.Contract(poolAddress, abi, nodeAPI)
    const [wethDaiPrice, wethDaiPriceState] = useState(0);
    const [daiWethPrice, daiWethPriceState] = useState(0);
    const isConnected = account !== undefined

    const [ WethBalance, WethBalanceState ] = useState(0)
    const [DaiBalance, DaiBalanceState ] = useState(0)
        
    
    const formattedWethBalance = Number(WethBalance) >= 0.001 ? Number((WethBalance).toFixed(2)) - 0.0009 : "0.00"
   
    const formattedDaiBalance = Number(DaiBalance) >= 0.001 ? Number((DaiBalance).toFixed(2)) - 0.0009 : "0.00"
    const [ isApproved, isApprovedState] = useState(false)
    const [approvedWethSnackbar, setApprovedWethSnackbar] = useState(false)
    const [approvedDaiSnackbar, setApprovedDaiSnackbar] = useState(false)
    const [deposittedSnackbar, setDeposittedSnackbar] = useState(false)
    const {approveToken1, approvingToken1State, approveToken2, approvingToken2State, depositTokens, depositState} = useDepositTokens(props.token1.address, props.token2.address, props.sharesToken.address)
    const isMining = approvingToken1State.status === "Mining" || approvingToken2State.status === "Mining" || depositState.status === "Mining"
    const fetchBalance = async () => {
        const value = await tokenContract.balanceOf(account)
        let enoughWethBalance = parseFloat(formatUnits(value, 6))
        WethBalanceState(enoughWethBalance)
        
    }
    const fetchBalance2 = async () => {
        const value = await tokenContract2.balanceOf(account)
        if (props.token2.name === "USDT"){
            let enoughDaiBalance = parseFloat(formatUnits(value, 6))
            DaiBalanceState(enoughDaiBalance)
        }
        else if (props.token2.name === "FRAX" || props.token2.name === "MIMATIC"){
            let enoughDaiBalance = parseFloat(formatUnits(value, 18))
            DaiBalanceState(enoughDaiBalance)
        }
    }
    const fetchPrice = async () => {
        // const [before, after] = await poolContract.observe([60000,0])
        // const t1 = parseInt(before[0].toString())
        // const t2 = parseInt(before[1].toString())
        // const twap = ((t2-t1)/60000)
        // const price1 = (1/1.0001**twap)
        // const price2 = (1.0001**twap)
        // console.log(before)
        if (props.token2.name === "USDT"){
            wethDaiPriceState(1.4482)
            daiWethPriceState(0.690823)
        }
        else if (props.token2.name === "FRAX"){
            wethDaiPriceState(0.445168)
            daiWethPriceState(2.24633)
        }
        else if (props.token2.name === "MIMATIC"){
            wethDaiPriceState(1.44213)
            daiWethPriceState(0.693417)
        }
        // wethDaiPriceState(price1)
        // daiWethPriceState(price2)
    }
   
    const handleInputChange = (event) => {
        fetchPrice()
        const newAmount = event.target.value === "" ? "" : (event.target.value)
        const calcEquiv = Number(newAmount) *Number(wethDaiPrice)
        setAmount(newAmount)
        setAmount2(calcEquiv === 0 || "" ? 0 : (calcEquiv - 0.01).toFixed(5))
    }
    const maxBalance = () => {
        fetchPrice()
        const newAmount = Number(formattedWethBalance)
        const calcEquiv = Number(newAmount) *Number(wethDaiPrice)
        setAmount(newAmount)
        setAmount2(calcEquiv === 0 || "" ? 0 : (calcEquiv - 0.01).toFixed(5))
    }
    const maxBalance2 = () => {
        fetchPrice()
        const newAmount = formattedDaiBalance
        const calcEquiv = Number(newAmount) *Number(daiWethPrice)
        setAmount2(newAmount)
        setAmount(calcEquiv === 0 || "" ? 0 : (calcEquiv - 0.01).toFixed(5))
    }
    const handleInputChange2 = (event) => {
        fetchPrice()
        const newAmount = event.target.value === "" ? "" : (event.target.value)
        const calcEquiv = Number(newAmount) *Number(daiWethPrice)
        setAmount2(newAmount)
        setAmount(calcEquiv === 0 || "" ? 0 : (calcEquiv - 0.01).toFixed(5))
    }
    const handleCloseSnack = () => {
        setApprovedWethSnackbar(false)
        setApprovedDaiSnackbar(false)
        setDeposittedSnackbar(false)
    }
    const handleApproveSubmit = () => {
        const amountAsWei = Number(amount1) * 1e6
        if (props.token2.name === "USDT"){
            const amount2AsWei = Number(amount2) * 1e6
            return [approveToken1(amountAsWei.toString()), approveToken2(amount2AsWei.toString())]
        }
        else if (props.token2.name === "FRAX" || props.token2.name === "MIMATIC"){
            const amount2AsWei = Number(amount2) * 1e18
            return [approveToken1(amountAsWei.toString()), approveToken2(amount2AsWei.toString())]
        }
        
    }
    
    const handleDepositSubmit = () => {
        const amountAsWei = Number(amount1) * 1e6
        if (props.token2.name === "USDT"){
            const amount2AsWei = Number(amount2) * 1e6
            return [depositTokens((amountAsWei.toString()), (amount2AsWei.toString()))]
        }
        else if (props.token2.name === "FRAX" || props.token2.name === "MIMATIC"){
            const amount2AsWei = Number(amount2) * 1e18
            return [depositTokens((amountAsWei.toString()), (amount2AsWei.toString()))]
        }
    }
    fetchBalance()
    fetchBalance2()
    //fetchPrice()
    useEffect(() => {
        if (approvingToken1State.status === "Success" && approvingToken2State.status === "Success"){
            isApprovedState(true)
        }
        if ((notifications.filter(
            (notification) => notification.type === "transactionSucceed" && notification.transactionName === 
            "Approve token1 transfer").length > 0)) {
                setApprovedWethSnackbar(true)
            }
        if ((notifications.filter(
            (notification) => notification.type === "transactionSucceed" && notification.transactionName === 
            "Approve token2 transfer").length > 0)) {
                setApprovedDaiSnackbar(true)
            }
        if (notifications.filter(
            (notification) => notification.type === "transactionSucceed" && notification.transactionName === 
            "Deposit Tokens").length > 0) {
                setAmount(0)
                setAmount2(0)
                setApprovedWethSnackbar(false)
                setDeposittedSnackbar(true)
            }

    }, [approvingToken1State, approvingToken2State, notifications, approvedWethSnackbar, approvedDaiSnackbar, deposittedSnackbar, amount1, amount2])
   
    return (
        <div className={classes.container2}>
            <div>
                <span className={classes.miniHeader}><label>{props.token1.name}</label><br></br><label className={classes.balance}>BALANCE ({isConnected?Number(formattedWethBalance).toFixed(2) : "0.00"})</label></span>
                <div className={classes.buttonIn}>
                    <Input type="text" value={amount1} onChange={handleInputChange} className={classes.inputted} disableUnderline={true} placeholder={0}/>
                    <label className={classes.maxBtn} onClick={maxBalance}>MAX</label>
                </div><br></br>
                <span className={classes.miniHeader}><label>{props.token2.name}</label><br></br><label className={classes.balance}>BALANCE ({isConnected?Number(formattedDaiBalance).toFixed(2) : "0.00"})</label></span>
                <div className={classes.buttonIn}>
                    <Input type="text" value={amount2} onChange={handleInputChange2} className={classes.inputted} disableUnderline={true} placeholder={0}/>
                    <label className={classes.maxBtn} onClick={maxBalance2}>MAX</label>
                </div>
            </div><br></br>
                {isConnected ? (
                    <div className={classes.btnDiv}>
                        {isApproved ? 
                            <Button className={classes.button + " deposit-form-btn"}
                                onClick={handleDepositSubmit}
                                variant="contained"
                                size="large"
                                disabled={isMining}>{isMining ? 
                                <CircularProgress size={26} className={classes.circularPStyle}/> : 
                                <MuiThemeProvider theme={THEME}>
                                <Typography variant="h6" color="inherit">
                                    Deposit
                                </Typography>
                            </MuiThemeProvider>}
                            </Button> : 
                            <Button className={classes.button + " deposit-form-btn"}
                                onClick={handleApproveSubmit}
                                variant="contained"
                                size="large"
                                disabled={isMining}>{isMining ? 
                                <CircularProgress size={26} className={classes.circularPStyle}/> : <MuiThemeProvider theme={THEME}>
                                <Typography variant="h6" color="inherit">
                                    Approve
                                </Typography>
                            </MuiThemeProvider>}</Button>
                        }
                    </div>
                ) : (
                    <div className={classes.btnDiv}>
                    <Button className={classes.button + " deposit-form-btn"} variant="contained" onClick={() => activateBrowserWallet()}>
                    <MuiThemeProvider theme={THEME}>
                                <Typography variant="h6" color="inherit">
                                    Connect Wallet
                                </Typography>
                            </MuiThemeProvider>
                    </Button>
                    </div>
                ) }
            <Snackbar
                open={approvedWethSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">Token1 approved</Alert>
            </Snackbar>
            <Snackbar
                open={approvedDaiSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">Token2 approved</Alert>
            </Snackbar>
            <Snackbar
                open={deposittedSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">Deposit successful</Alert>
            </Snackbar>  
            
        </div>
        
    )
};

export default DepositForm;