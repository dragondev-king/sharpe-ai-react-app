import './style.scss'

const ComingSoonCard = ({logo, color}) => {
  return (
    <div className="card-container">
      <div className="card-wrapper" style={{ backgroundColor: color }}>
        <div className='image'>
          <img src={logo} alt="" />
        </div>
        <div className='coming-soon'>
          <p>COMING SOON</p>
        </div>
      </div>
    </div>
  )
}

export default ComingSoonCard
