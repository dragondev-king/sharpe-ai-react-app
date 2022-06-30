import { useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { MenuItem, MenuList } from '@material-ui/core'

import { NavbarContext } from '../../context/NavbarContext'
import SocialIcons from '../SocialIcons'
import './style.scss'
import { menus } from '../../utils/helpers'
import { ReactComponent as CategoryIcon } from '../../assets/svgs/category.svg'
import { ReactComponent as FolderIcon } from '../../assets/svgs/folder.svg'
import { ReactComponent as HomeIcon } from '../../assets/svgs/home.svg'
import { ReactComponent as Logo } from '../../assets/svgs/logo.svg'

const Navbar = () => {
  const {subIsOpened, setSubIsOpened,headerText, setHeaderText} = useContext(NavbarContext)
  const handleNavClick = useCallback((e) => {
    setSubIsOpened(false)
    setHeaderText(e.target.innerText)
  }, [setSubIsOpened, setHeaderText])
  
  const handleSubClick = useCallback((e) => {
    setSubIsOpened(!subIsOpened)
    setHeaderText('Taurus')
  }, [subIsOpened, setSubIsOpened, setHeaderText])

  const handleSubItemClick = useCallback((e) => {
    setHeaderText(e.target.innerText)
  }, [setHeaderText])

  const handleClassName = ((menuName) => {
    if(headerText === menuName) return 'selected'
    else return ''
  })

  const handleSubClassName = (() => {
    const subNames = [menus.taurus, menus.phantom, menus.helios, menus.vela, menus.centauri]
    if(subNames.includes(headerText)) return 'selected'
    else return ''
  })

  return (
    <div className='navbar-container'>
      <div className='navbar-wrapper'>
        <div className='logo-container'>
          <Link to='/' onClick={() => setHeaderText(menus.dashboard)}>
              <Logo className='logo'/>
          </Link>
        </div>
        <div className="navbar">
          <MenuList>
            <MenuItem onClick={handleNavClick} component={Link} to='/dashboard' className={handleClassName(menus.dashboard)}><HomeIcon className='menuicon'/><span>Dashboard</span></MenuItem>
            <MenuItem onClick={handleSubClick} component={Link} to='/stratigies' className={handleSubClassName()}>
              <CategoryIcon className='menuicon' />
              <span>Strategies</span>
              <svg className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined">
                  <path d="M7 10l5 5 5-5z" />
              </svg>
            </MenuItem>
              <div className='sub-group' style={{display: subIsOpened ? 'block' : 'none'}}>
                <MenuList>
                  <MenuItem onClick={handleSubItemClick} component={Link} to='/stratigies/taurus' className={handleClassName(menus.taurus)}>Taurus</MenuItem>
                  <MenuItem onClick={handleSubItemClick} component={Link} to='/stratigies/phantom' className={handleClassName(menus.phantom)}>Phantom</MenuItem>
                  <MenuItem onClick={handleSubItemClick} component={Link} to='/stratigies/helios' className={handleClassName(menus.helios)}>Helios</MenuItem>
                  <MenuItem onClick={handleSubItemClick} component={Link} to='/stratigies/vela' className={handleClassName(menus.vela)}>Vela</MenuItem>
                  <MenuItem onClick={handleSubItemClick} component={Link} to='/stratigies/centauri' className={handleClassName(menus.centauri)}>Centauri</MenuItem>
                </MenuList>
              </div>
            <MenuItem onClick={handleNavClick} component={Link} to='/indices' className={handleClassName(menus.indicies)}><FolderIcon className='menuicon' /><span>Indices</span></MenuItem>
          </MenuList>
          <SocialIcons />
        </div>
      </div>
    </div>
  )
}

export default Navbar
