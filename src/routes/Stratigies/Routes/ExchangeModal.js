import { Modal, Box, Grid, Tabs, Tab, makeStyles } from "@material-ui/core";
import {TabContext, TabPanel} from "@material-ui/lab"
import { useEthers } from "@usedapp/core";
import { useState } from "react";
import InventionIcon from "../../../assets/svgs/invention.svg";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    backgroundColor: 'rgba(38, 39, 59, 1)',
    borderRadius: 10,
    padding: "16px 24px",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: "#fff"
};

const useStyles = makeStyles((theme) => ({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(1)
    },
    tabContext: {
        margin: "auto",
        background: "#1B1C31",
        borderRadius: "15px",
        display: "flex",
        alignItems: "center",
        padding: "0.75rem",
        justifyContent: "center",
        textDecoration: "none"
    },
    tabProperty: {
        margin: "auto",
        borderRadius: "15px",
        textDecoration: "none"
    },
    tabPropertyActive: {
        backgroundColor: "#2E2F42",
        border: "3px solid #2E2F42"
    },
    box: {
        height: "310px",
        // width: "500px",
        margin: "auto",
        backgroundColor: "#2E2F42",
        borderRadius: "15px",
        padding: "2rem",
        // marginTop: "-2rem",
        paddingTop: "1rem"
        
    },
    box2: {
        height: "130px",
        width: "500px",
        margin: "auto",
        backgroundColor: "#2E2F42",
        borderRadius: "15px",
        paddingTop: "1rem",
        display: "flex",
        flexDirection: "column",
        padding: "3rem",
        justifyContent: "center",
    },
    wrapHeader: {
        margin: "auto",
        marginTop: "0.8rem",
        backgroundColor: "#1B1C31",
        borderRadius: "15px",
        padding: "0.7rem",
        paddingLeft: "5rem",
        paddingRight: "5rem"
    },
    innerHeader: {
        backgroundColor: "#2E2F42",
        borderRadius: "15px",
        padding: "0.35rem",
        paddingLeft: "2rem",
        paddingRight: "2rem"
    }
}))
const ExchangeModal = ({ open, handleClose, token1, token2, shareToken, poolAddr, position0, position1, tvl, percentage }) => {
    const { chainId, account } = useEthers();
    const classes = useStyles();
    const [SelectedTab, setSelectedTab] = useState("1")
    const switchTab1 = () => {
        setSelectedTab("1")
    }
    const switchTab2 = () => {
        setSelectedTab("2")
    }
    
    return (

        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={style}>
                    <Grid container spacing={2}>
                        <Grid item lg={6} sm={12}>
                            <div className="asset-container">
                                <div>
                                    <p>
                                        Your Assets
                                    </p>
                                    <p>
                                        <span>$</span>{position0 + position1 > 0.01 ? (position0 + position1).toFixed(2) : "0.00"}
                                    </p>
                                </div>
                                <hr style={{ width: "100%" }} />
                                <div>
                                    <p>
                                        Positions
                                    </p>
                                    <div className="position-container">
                                        <div>
                                            <p>
                                                {token1.name}
                                            </p>
                                            <p>
                                                {position0 > 0.01 ? position0.toFixed(2) : "0.00"}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                {token2.name}
                                            </p>
                                            <p>
                                                {position1 > 0.01 ? position1.toFixed(2) : "0.00"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{ width: "100%" }} />
                                <div className="position-container">
                                    <div>
                                        <p>
                                            APY
                                        </p>
                                        <p>
                                            {percentage}
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            TVL
                                        </p>
                                        <p>
                                            <span>$</span>{tvl > 0 ? (tvl).toFixed(2) : "0.00"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="exchange-desc">
                                <p>
                                    {token1.name}-{token2.name} vault automatically manages liquidity on Uniswap v3.
                                </p>
                                <p>
                                    It concentrates its liquidity to earn higher yields and automatically adjusts its range orders as the underlying price moves in order to continue capturing fees.
                                </p>
                            </div>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                        <Box className={classes.box}>
                            <TabContext value={SelectedTab}>
                                <Tabs aria-label="Tabs example" className={classes.tabContext}>
                                    <Tab label="Deposit" value="1" onClick={switchTab1} className={`${classes.tabProperty} exchange-modal-tab ${SelectedTab === "1" ? classes.tabPropertyActive : ""}`}/>
                                    <Tab label="Withdraw" value="2" onClick={switchTab2} className={`${classes.tabProperty} exchange-modal-tab ${SelectedTab === "2" ? classes.tabPropertyActive : ""}`}/>
                                </Tabs>
                                <TabPanel value="1">
                                    <div className={classes.tabContent}>
                                    <DepositForm token1={token1} token2={token2} sharesToken={shareToken} poolAddr={poolAddr} /> 
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <div className={classes.tabContent}>
                                        <WithdrawForm sharesToken={shareToken} />
                                    </div>
                                </TabPanel>
                            </TabContext>
                        </Box>
                        {
                            chainId !== 137 && (
                                <div>
                                    <p className="text-center">
                                        Unsupported Network: Please connect to the Polygon network!
                                    </p>
                                </div>
                            )
                        }
                        </Grid>
                    </Grid>
                    <div className="invention-container">
                        <img src={InventionIcon} alt="invention" />
                        <p>
                            Deposits are in the same ratio as the vault's current holdings and, as a result, are not always in a 1:1 ratio.
                        </p>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ExchangeModal;