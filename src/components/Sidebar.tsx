import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setActivePage} from "../redux/navigationSlice";


export default function Sidebar() {
    const navigate = useNavigate();
    const activePage = useSelector((state: RootState) => state.navigation.activePage);
    const dispatch = useDispatch();


    function handleNavigate(page: string) {
        dispatch(setActivePage(page));
        if (page === 'home') {
            navigate('/');
        } else if (page === 'leads') {
            navigate('/leads');
        }
    }

    return (<div className="sidebar-container">
        <ul>
            <li className={`page ${activePage === 'home' ? 'active' : ''}`} id="homePage"
                onClick={() => handleNavigate('home')}>Головна сторінка
            </li>
            <li className={`page ${activePage === 'leads' ? 'active' : ''}`} id="leadsPage"
                onClick={() => handleNavigate('leads')}>Всі ліди
            </li>
        </ul>
    </div>)
}
