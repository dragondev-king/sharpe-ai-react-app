import { Grid } from "@material-ui/core";

import DefaultLayout from "../../../../components/DefaultLayout";
import ComingSoonCard from "../../../../components/ComingSoonCard";
import PhantomCard from "./components/PhantomCard";
import "./style.scss";
import { cardColors } from "../../../../utils/helpers";

import UsdcLogo from "../../../../assets/svgs/chains/usdc-logo.svg";  
import DaiLogo from "../../../../assets/svgs/chains/dai-logo.svg";
import PolygonMaticLogo from "../../../../assets/svgs/chains/polygon-matic-logo.svg";
import UniswapLogo from "../../../../assets/svgs/chains/uniswap-logo.svg";
import EthereumLogo from "../../../../assets/svgs/chains/ethereum-logo.svg";
import BitcoinLogo from "../../../../assets/svgs/chains/bitcoin-logo.svg";
import ComingSoonSimpleCard from "../../../../components/ComingSoonSimpleCard";

const PhantomContent = () => {
  return (
    <>
      
      <ComingSoonSimpleCard />
    </>
  )
  // return (
  //   <div className="phantom-container">
  //     <Grid container>
  //       <Grid item lg={4} md={6} sm={12} xs={12}>
  //         <PhantomCard title={'PUT-SELLING'} logo={UsdcLogo} color={cardColors.usdc} name="T-USDC-P-AVAX" />
  //       </Grid>
  //       <Grid item lg={4} md={6} sm={12} xs={12}>
  //         <PhantomCard title={'COVERED-CALL'} logo={PolygonMaticLogo} color={cardColors.polygon} name="WMATIC" />
  //       </Grid>
  //       <Grid item lg={4} md={6} sm={12} xs={12}>
  //         <ComingSoonCard color={cardColors.bitcoin} logo={BitcoinLogo} />
  //       </Grid>
  //       <Grid item lg={4} md={6} sm={12} xs={12}>
  //         <ComingSoonCard color={cardColors.uniswap} logo={UniswapLogo} />
  //       </Grid>
  //       <Grid item lg={4} md={6} sm={12} xs={12}>
  //         <ComingSoonCard color={cardColors.ethereum} logo={EthereumLogo} />
  //       </Grid>
  //       <Grid item lg={4} md={6} sm={12} xs={12}>
  //         <ComingSoonCard color={cardColors.dai} logo={DaiLogo} />
  //       </Grid>
  //     </Grid>
  //   </div>
  // );
};

const Phantom = () => {
  return <DefaultLayout component={<PhantomContent />} />;
};

export default Phantom;
