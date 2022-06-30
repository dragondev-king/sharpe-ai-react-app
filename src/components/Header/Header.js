import { useContext, useEffect, useState } from 'react'

import { NavbarContext } from '../../context/NavbarContext'
import ChainSelector from '../ChainSelector'
import ConnectButton from '../ConnectButton'
import './style.scss'

const Header = () => {
  const { headerText } = useContext(NavbarContext)
  const [providerWC, setProviderWC] = useState(null);
  return (
    <div className="header">
      <div className='header-left'>
        <div className='dashboard-text'>{headerText}</div>
      </div>
      <div className='header-right'>
        <ChainSelector providerWC={providerWC} />
        <ConnectButton setProvider={setProviderWC} />
      </div>
    </div>
  )
}

export default Header
