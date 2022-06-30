import Header from '../Header'
import Navbar from "../Navbar"
import './style.scss'
import { screenHeight } from '../../utils/helpers'

const DefaultLayout = ({component}) => {
  return (
    <div className='main-container' style={{minHeight: screenHeight}}>
      <Navbar/>
      <div className="dashboardnavbar-wrapper">
        <Header />
        {component}
      </div>
    </div>
  )
}

export default DefaultLayout
