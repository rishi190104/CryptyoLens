
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CoinPage from './pages/CoinPage'




function App() {
  

  return (
    <>
   
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/coins/:id' element={<CoinPage/>}/>
    </Routes>
   </BrowserRouter>
    </>
    
  )
}

export default App
