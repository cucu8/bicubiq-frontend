import { useState, useEffect } from "react";
import { ModalComponent } from "../../components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import "./style.css";

const Login = ({ userObject }) => {
    const [authState, setAuthState] = useAuth();

    let navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userName === "" || password === "") {
            setErrorMessage("Please fill all fields")
        }
        else {
            if (userObject.name !== userName || userObject.password !== +password) {
                setErrorMessage("Username or Password is Incorrect")
            }
            else {
                localStorage.setItem("userIsLogin", "true");
                setAuthState({ isLogin: true });
            }
        }
    }

    return <div className="login shadow">
        <form className="form">
            <input
                className="form-input"
                placeholder="Username"
                type="text"
                name="name"
                onChange={(e) => {
                    setErrorMessage(false);
                    setUserName(e.target.value);
                }}
            />
            <input
                className="form-input"
                placeholder="Password"
                type="password"
                name="password"
                onChange={(e) => {
                    setErrorMessage(false);
                    setPassword(e.target.value);
                }}
            />

            <button onClick={handleSubmit} className="button">LOGIN</button>

            {
                errorMessage
                && <p className="errorMessage">{errorMessage}</p>
            }

        </form>
    </div>
}

export default Login;