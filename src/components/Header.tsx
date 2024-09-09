import LogoImage from "../assets/images/logo.svg"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setActivePage} from "../redux/navigationSlice";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigateHome = () => {
        dispatch(setActivePage('home'));
        navigate('/');
    }

    return (
        <div className="header-container">
            <img style={{
                cursor: "pointer"
            }} onClick={handleNavigateHome} src={LogoImage} alt="logo"/>
        </div>
    )
}