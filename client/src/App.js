import './App.css';
import { Route, Routes } from 'react-router-dom';
import CreateProduct from './Views/CreateProduct';
import ProductsList from './Views/ProductsList';
import EditProduct from './Views/EditProduct';
import CreateOrder from './Views/CreateOrder';
import OrdersList from './Views/OrdersList';
import EditOrder from './Views/EditOrder';
import CreateOrderProduct from './Views/CreateOrderProduct';
import EditOrderProduct from './Views/EditOrderProduct';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/create-product" element={<CreateProduct />}/>
        <Route path="/products" element={<ProductsList />}/>
        <Route path="/edit-product/:id" element={<EditProduct />}/>

        <Route path="/create-order" element={<CreateOrder />}/>
        <Route path="/orders" element={<OrdersList />}/>
        <Route path="/orders/:id" element={<EditOrder />}/>

        <Route path='/create/order-product/:idOrder' element={<CreateOrderProduct />} />
        <Route path='/edit/order-product/:id' element={<EditOrderProduct />} />
      </Routes>
    </div>
  );
}

export default App;
