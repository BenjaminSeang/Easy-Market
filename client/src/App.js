import './App.css';
import {Router} from '@reach/router';
import BuyerLogin from './components/BuyerLogin';
import SellerLogin from './components/SellerLogin';
import Register from './components/Register';
import Home from './components/Home';
import SellerPanel from './components/SellerPanel';
import NewItem from './components/NewItem';
import EditItem from './components/EditItem';
import ItemDetail from './components/ItemDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/"/>
        <Register path = "/register"/>
        <BuyerLogin path = "/buyer/login"/>
        <SellerLogin path = "/seller/login"/>
        <SellerPanel path="/seller/panel/:username"/>
        <NewItem path="/seller/newlisting/:username"/>
        <EditItem path="/seller/edititem/:username/:id"/>
        <ItemDetail path="/itemdetail/:id"/>
      </Router>
      
    </div>
  );
}

export default App;
