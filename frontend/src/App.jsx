import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import Navbar from './components/NewNavbar'
import Home from './components/Home'
import Login from './Layout/login'
import Signup from './Layout/signup'
import MyAccount from './components/My Account'
import Profile from './Layout/profile'
import Addresses from './Layout/addresses'
import Orders from './Layout/orders'
import Wishlists from './Layout/wishlist'
import MensWear from './components/MensWear'
import WomansWear from './components/WomansWear'
import KidsAndBaby from './components/KidsAndBaby'
import HomeAndLiving from './components/HomeAndLiving'
import HealthAndBeauty from './components/HealthAndBeauty'
import ProductDetailsPage from './components/ProductDetailsPage'
import CartPage from './components/CartPage'
import { DrawerProvider } from './Context/DrawerContext'
import CheckoutPage from './components/CheckoutPage'

function App () {

  const location = useLocation();

  const hideNavbarRoutes = ["/checkout"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <DrawerProvider>
      { shouldShowNavbar && <Navbar/>}
      <Toaster position='top-right'/>
  
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Login' element={<Login />} ></Route>
        <Route path='/signup' element={<Signup />} ></Route>
        <Route path='/cart' element={<CartPage/>}></Route>
        <Route path='/checkout' element={<CheckoutPage/>}></Route>

        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path='/men' element={<MensWear/>} />
        <Route path='/woman'   element={<WomansWear />}> </Route>
        <Route path='/kids-baby'   element={<KidsAndBaby />}> </Route>
        <Route path='/home-living'   element={<HomeAndLiving />}> </Route>
        <Route path='/health-beauty'   element={<HealthAndBeauty />}> </Route>
        
        <Route path="/my-account" element={<MyAccount />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="orders" element={<Orders />} />
          <Route path="wishlist" element={<Wishlists />} />
        </Route>
        
      </Routes>

      
                    
    </DrawerProvider>
  )
}

export default App
