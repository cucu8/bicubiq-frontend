import { useNavigate } from "react-router-dom";
import "./style.css";

const Page404 = () => {

    const navigate = useNavigate();
    return <div className="pageNotFound">
        PAGE NOT FOUND
        <button
            className="backButton"
            onClick={() => navigate("/campaignList")}
        >
            Back To Home Page
        </button>
    </div>
}

export default Page404;