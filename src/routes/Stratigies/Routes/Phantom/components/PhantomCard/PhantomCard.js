import PriceCard from "../PriceCard";
import "./style.scss";

const PhantomCard = ({
  logo,
  color,
  title,
  value,
  percentage,
  name,
  strikePrice,
  currentPrice,
  deposits,
  maxCapacity,
}) => {
  return (
    <div className="card-container">
      <div className="card-wrapper"  style={{backgroundColor: color}}>
        <div className="title-wrapper" style={{backgroundColor: color}}><span>{title}</span></div>
        <div className="card-header">
          <div className="values-wrapper">
            <span>{value ? value : 0} USDC</span>
            <span className="small-value">${(0).toFixed(2)}</span>
          </div>
          <span>{percentage ? percentage : 20} % APY</span>
        </div>
        <div className="image phantom-image">
          <img src={logo} alt="" />
          <div>{name}</div>
        </div>
        <PriceCard strikePrice={strikePrice} currentPrice={currentPrice} deposits={deposits} maxCapacity={maxCapacity} />
      </div>
    </div>
  );
};

export default PhantomCard;
