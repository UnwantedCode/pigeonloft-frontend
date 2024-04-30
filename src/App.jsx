import LoginPanel from '@/Containers/LoginPanel/LoginPanel.jsx'
import RegisterPanel from "@/Containers/RegisterPanel/RegisterPanel.jsx";
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "@/Containers/Header/Header.jsx";
import "./assets/styles/index.css";
import MainPage from "@/Containers/MainPage/MainPage.jsx";
import GamingRooms from "@/Containers/GamingRooms/GamingRooms.jsx";
import Footer from "@/Containers/Footer/Footer.jsx";
import {HelmetProvider} from "react-helmet-async";



function App() {

    return (
        <HelmetProvider>
            <Router>

            <Header />
            <Routes>
                <Route path="/" element={< MainPage />} />
                <Route path="/logowanie" element={< LoginPanel />} />
                <Route path="/rejestracja" element={< RegisterPanel />} />
                {/*<Route path="/gaming-rooms" element={< GamingRooms />} />*/}
            </Routes>
            <Footer />
        </Router>
        </HelmetProvider>

    )
}

export default App
