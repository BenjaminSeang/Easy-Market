import { Link } from '@reach/router';
import LogoutButton from './LogoutButton';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeNavBar = (props) => {
    const {user, setUser} = props;
    const username = user.username;

    if(user.type == 'Buyer'){
        return(
            <div className='navBarButtons'>
                <LogoutButton setUser={setUser}/>
            </div>
        )
    }else if(user.type == 'Seller'){
        return(
            <div className='navBarButtons'>
                <Link to={`/seller/panel/${username}`}>
                    <Button className='button'>
                        Seller Panel
                    </Button>
                </Link>
                <LogoutButton setUser={setUser}/>
            </div>
        )
    }else{
        return(
            <div className='navBarButtons'>
                <Link to={"/buyer/login"}>
                    <Button className='button'>Buyer Login</Button>
                </Link>
                <Link to={"/seller/login"}>
                    <Button className='button'>Seller Login</Button>
                </Link>
            </div>
        )
    }

}

export default HomeNavBar;