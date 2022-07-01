import { stopPropagation } from "../../utils";
import "./style.css";

const CampaignCard = ({
    title = "",
    content = "",
    point = 0,
    onClickDelete,
    onClickUpdate,
    onClickIncrement,
    onClickDecrement,
}) => {
    const CounterButton = ({ text, onClick, disabled }) => <button
        className="counterButton"
        onClick={(e) => {
            stopPropagation(e);
            onClick();
        }}
        disabled={disabled}
    >
        {text}
    </button>;
    return <div className="campaignCardContainer shadow" onClick={() => onClickUpdate()}>
        <div className="campaignCardDeleteContainer">
            <button className="campaignCardDeleteButton" onClick={(e) => {
                stopPropagation(e)
                onClickDelete()
            }}>
                <i class="fa fa-trash"></i>
            </button>
        </div>
        <div className="campaignCardContentsContainer">
            <div>
                <p className="campaignCardTitle">{title}</p>
                <p className="campaignCardContent">{content}</p>
            </div>
            <div className="pointCounterContainer">
                <CounterButton text="-" onClick={onClickDecrement} disabled={point === 0} />
                <div className="pointCounterContent">{point} Point</div>
                <CounterButton text="+" onClick={onClickIncrement} />
            </div>
        </div>

    </div>
};

export default CampaignCard;