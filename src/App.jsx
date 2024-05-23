import LoginPanel from '@/Containers/LoginPanel/LoginPanel.jsx'
import RegisterPanel from "@/Containers/RegisterPanel/RegisterPanel.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "@/Containers/Header/Header.jsx";
import "./assets/styles/index.css";
import MainPage from "@/Containers/MainPage/MainPage.jsx";
import Footer from "@/Containers/Footer/Footer.jsx";
import {HelmetProvider} from "react-helmet-async";
import {PrivateRoute, PublicRoute} from "@/Components/Auth/Auth.jsx";
import Logout from "@/Containers/Logout/Logout.jsx";
import Rooms from "@/Containers/Rooms/Rooms.jsx";
import Game from "@/Containers/Game/Game.jsx";



function App() {




    return (
        <HelmetProvider>
            <Router>

            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/logowanie" element={<PublicRoute><LoginPanel /></PublicRoute>} />
                <Route path="/rejestracja" element={<PublicRoute><RegisterPanel /></PublicRoute>} />
                <Route path="/wylogowanie" element={<PrivateRoute><Logout /></PrivateRoute>} />
                <Route path="/pokoje" element={<PublicRoute><Rooms /></PublicRoute>} />
                <Route path="/gra" element={<PublicRoute><Game /></PublicRoute>} />
                <Route path="/gra/kpn" element={<PublicRoute><Game /></PublicRoute>} />
                <Route path="/gra/warcaby" element={<PublicRoute><Game /></PublicRoute>} />
                <Route path="/gra/piotrus" element={<PublicRoute><Game /></PublicRoute>} />

                <Route path="*" element={<MainPage />} />

            </Routes>
            <Footer />
        </Router>
        </HelmetProvider>

    )
}

export default App
