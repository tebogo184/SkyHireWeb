import {Home,AboutUs,AboutProduct,Contact,Checkout,Login,Register,Cart,ErrorPage,Order} from "./Component/pages";
import Navbar from "./Component/Navbar";
import ProtectedRoute from "./Component/PrivateRoute";
import {UserProvider} from "./Component/UserContext";
import {BrowserRouter,Route,Routes} from  'react-router-dom';


function App() {
  return (
    < >
    <UserProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/aboutProduct/" element={<AboutProduct/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<ErrorPage/>}/>
        <Route 
        path="/cart"
        element={<ProtectedRoute>
          <Cart/>
        </ProtectedRoute>}/>
         <Route 
         path="/checkout"
         element={
          <ProtectedRoute>
            <Checkout/>
          </ProtectedRoute>
         }
         />
          <Route 
         path="/order"
         element={
          <ProtectedRoute>
            <Order/>
          </ProtectedRoute>
         }
         />
         
      </Routes>
      </BrowserRouter>
    </UserProvider>
    </>
  );
}

export default App;
