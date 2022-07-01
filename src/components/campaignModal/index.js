import { useState, useRef, useEffect } from "react";
import { stopPropagation } from "../../utils";
import "./style.css";

const CampaignModal = ({
    errorMessage,
    setVisible,
    onSubmit,
    visible,
    db,
    id,
}) => {
    const textRef = useRef();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onChangeHandler = (e) => {
        const target = e.target;
        textRef.current.style.height = "20vh";
        textRef.current.style.height = `${target.scrollHeight}px`;
        setContent(e.target.value);
    };

    useEffect(() => {
        if (id) {
            const campaignData = db.get().find((item) => item.id == id) || { title: "", content: "" };
            console.log(campaignData);
            setTitle(campaignData.title);
            setContent(campaignData.content);
        }
    }, [id]);

    const clear = () => {
        setTitle("");
        setContent("");
    }

    useEffect(() => {
        if (!visible) {
            clear();
        }
    }, [visible])

    if (!visible) return <></>;
    return <div className="campaignModal" onClick={() => setVisible(false)}>
        <div
            className="campaignForm shadow"
            onClick={stopPropagation}
        >
            <input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Campaign Title"
                className="form-input"
                value={title}
                type="text"
                name="name"
            />
            <textarea
                onChange={(e) => onChangeHandler(e)}
                placeholder="Campaign Description"
                className="form-input"
                ref={textRef}
                type="text"
                rows="6"
                cols="50"
                value={content}
            />

            <button onClick={() => onSubmit({ title, content })} className="button">Save</button>

            {
                errorMessage
                && <p className="errorMessage">{errorMessage}</p>
            }

        </div>
    </div>
}

export default CampaignModal;