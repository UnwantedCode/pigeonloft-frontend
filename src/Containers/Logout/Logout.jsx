import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAuth} from "@/Components/Auth/Auth.jsx";

function Logout() {
    const navigate = useNavigate(); // add this line
    const { removeJwtToken } = useAuth();
    useEffect(() => {
        removeJwtToken()
        navigate('/'); // use navigate function here
    },[])

}

export default Logout;