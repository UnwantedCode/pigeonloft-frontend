import LoginPanel from '@/Containers/LoginPanel/LoginPanel.jsx'
import RegisterPanel from "@/Containers/RegisterPanel/RegisterPanel.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "@/Containers/Header/Header.jsx";
import "./assets/styles/index.css";
import MainPage from "@/Containers/MainPage/MainPage.jsx";
import GamingRooms from "@/Containers/GamingRooms/GamingRooms.jsx";
import Footer from "@/Containers/Footer/Footer.jsx";
import {HelmetProvider} from "react-helmet-async";
import {PrivateRoute, PublicRoute} from "@/Components/Auth/Auth.jsx";
import Logout from "@/Containers/Logout/Logout.jsx";



function App() {




    return (
        <HelmetProvider>
            <Router>

            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/logowanie" element={<PublicRoute><LoginPanel /></PublicRoute>} />
                <Route path="/rejestracja" element={<PublicRoute><RegisterPanel /></PublicRoute>} />
                <Route path="/gaming-rooms" element={<PrivateRoute><GamingRooms /></PrivateRoute>} />
                <Route path="/wylogowanie" element={<PrivateRoute><Logout /></PrivateRoute>} />

            </Routes>
            <Footer />
        </Router>
        </HelmetProvider>

    )
}

export default App
