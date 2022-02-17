import axios from 'axios';
import { navigate} from '@reach/router';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

const LogoutButton = (props) => {

    const {setUser} = props;

    const logout = (e) => {
        axios
        .post(
            "http://localhost:8000/api/users/logout",
            {},
            {
                withCredentials: true,
            },
        )
        .then((res) => {
            console.log(res);
            console.log(res.data);
            if(setUser){
                setUser({});
            }
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return(
        <div className='navBarButtons' style={{display: 'inline'}}>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}
export default LogoutButton