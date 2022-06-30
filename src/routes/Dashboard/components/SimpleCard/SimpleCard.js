import CountUp from 'react-countup'

import './style.scss'

const SimpleCard = ({IconComponent, text, value, type }) => {
  return (
    <div className={`card card-${type}`}>
      <span className={type}>{IconComponent}</span>
      <div className={`data-wrapper data-wrapper-${type}`}>
        <p className='text'>{text}</p>
        <p className={`value-${type}`}>{text === "VAULTS" || text === "Active Positions" ? (
          <CountUp end={value} duration={1} />
        ) : text === "Projected APY" ? (
          <span><CountUp end={value} duration={1} />%</span>
        ) : (<span>$<CountUp end={value} duration={1} />.00</span>) } </p>
      </div>
    </div>
  )
}

export default SimpleCard
