import {Navigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {jwtDecode} from "jwt-decode";


export function getJwtCookieName() {
    return "JWT";
}
// Custom hook do autentykacji
export function useAuth() {
    const jwtCookieName = getJwtCookieName();
    const [cookie, setCookie, removeCookie] = useCookies([jwtCookieName]);

    const isAuthenticated = () => {

       let result = false;
        if (cookie[jwtCookieName]) {
            if (cookie[jwtCookieName] !== "undefined") {
                const tokenData = jwtDecode(cookie[jwtCookieName]);
                const currentTime = Math.floor(Date.now() / 1000);
                if (currentTime < tokenData.exp) {
                    result = true;
                }
            }
        }
       return result;
    };

    const decodeJwtToken = () => {
        return jwtDecode(cookie[jwtCookieName]);
    };

    const saveJwtToken = (token) => {
        const tokenValue = token;
        const tokenData = jwtDecode(tokenValue);
        const expTime = tokenData.exp;
        const maxAge = expTime - Math.floor(Date.now() / 1000);

        setCookie(jwtCookieName, tokenValue, {
            path: "/",
            maxAge: maxAge,
            sameSite: true,
            //httpOnly: true,
            secure: true,
        });
    };

    const removeJwtToken = () => {
        removeCookie(jwtCookieName);
    };

    const getJwtToken = () => {
        return cookie[jwtCookieName];
    };

    return { isAuthenticated, decodeJwtToken, saveJwtToken, removeJwtToken, getJwtToken };
}
// Komponent dla tras dostępnych tylko dla zalogowanych użytkowników
export function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated() ? children : <Navigate to="/logowanie" replace />;
}

// Komponent dla tras dostępnych tylko dla niezalogowanych użytkowników
export function PublicRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated() ? children : <Navigate to="/" replace />;
}