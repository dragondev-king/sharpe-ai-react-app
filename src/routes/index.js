import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './Dashboard'
import Indices from './Indices'
import Stratigies from './Stratigies'

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/indices' element={<Indices />} />
        <Route path='/stratigies/*' element={<Stratigies />} />
        <Route path='*' element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Main
