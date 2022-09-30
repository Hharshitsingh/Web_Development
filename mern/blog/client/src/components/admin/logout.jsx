import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { DataContext } from '../../context/dataProvider';

const LogoutUser = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const { setAcc } = useContext(DataContext);

    setIsAuthenticated(false);
    sessionStorage.removeItem('accesstoken');
    sessionStorage.removeItem('refreshtoken');
    localStorage.removeItem('user');
    localStorage.removeItem('fullname');
    localStorage.removeItem('email');
    localStorage.removeItem('isAuthenticated');
    useEffect(() => {
        setAcc({
            fullname: '',
            username: ''
        });
        if (!sessionStorage.getItem('accesstoken')) {
            navigate('/');
        }
    }, [navigate, setAcc]);

}

export default LogoutUser;