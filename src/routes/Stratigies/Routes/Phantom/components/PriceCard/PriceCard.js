import './style.scss'

const PriceCard = ({ strikePrice, currentPrice, deposits, maxCapacity }) => {
  return (
    <div className="price-container">
      <div className="price-wrapper">
        <div className='value'>
          <div className='value-data'>
            <span>Strike Price</span>
            <span>${(65).toFixed(2)}</span>
          </div>
          <div className='value-data'>
            <span>Current Price</span>
            <span>${(73).toFixed(2)}</span>
          </div>
        </div>
        <div className='deposit'>
          <span>Deposits</span>
          <span>{deposits ? deposits : `${67.25}K USDC`}</span>
        </div>
        <progress max={100} value={deposits ? deposits : 60} />
        <div className='capacity'>
          <span>Max Capacity</span>
          <span>{maxCapacity ? maxCapacity : `${1.2}M USDC`}</span>
        </div>
      </div>
    </div>
  )
}

export default PriceCard
