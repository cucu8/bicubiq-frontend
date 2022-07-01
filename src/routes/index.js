import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CampaignList, Login } from "../pages";
import { Page404 } from "../components";
import { useAuth } from "../context";

const RequireAuth = ({ element }) => {
    const [authState] = useAuth();

    if (!authState.isLogin) {
        return <Navigate to="/" replace />;
    };

    return element;
};

const AppRoutes = (props) => {
    const [authState, setAuthState] = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { userObject } = props;

    useEffect(() => {
        const userIsLogin = localStorage.getItem("userIsLogin");
        if (userIsLogin) {
            setAuthState({
                isLogin: true
            });
        }
    }, []);

    useEffect(() => {
        if (authState.isLogin && location.pathname === "/") {
            navigate("/campaignList")
        };
    }, [authState]);

    return (
        <Routes>
            {!authState.isLogin && (<Route path="/" element={<Login userObject={userObject} />} />)}
            <Route
                path="/campaignList"
                element={<RequireAuth element={<CampaignList />} />}
            />
            < Route path="*" element={< Page404 />} />
        </Routes >
    );
};
export default AppRoutes;