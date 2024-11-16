import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import SearchPage from './components/SearchPage'
import DrugDetailsPage from './components/DrugDetailsPage'
import './App.css'

const  App = ()=> {

  return (
    <Router>
      <Routes>
        <Route path='/drugs/search' element={<SearchPage/>} />
        <Route path='/drugs/:drugName' element={<DrugDetailsPage/>} />

      </Routes>
    </Router>
  )
}

export default App
