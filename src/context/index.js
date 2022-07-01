import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const initialParams = {
    isLogin: false
};

const AuthContextProvider = (props) => {
    const [authState, setAuthState] = useState(initialParams);

    return (
        <AuthContext.Provider value={[authState, setAuthState]}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
