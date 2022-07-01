import { useState } from "react";
import { CampaignCard, CampaignModal, SearchBar, SortBar } from "../../components";
import localDB from "../../localDB";
import "./style.css";

const CampaignList = () => {
    const db = localDB("campaings");
    const [campaignList, setCampaignList] = useState(db.get());
    const [modal, setModal] = useState({
        errorMessage: "",
        visible: false,
        id: ""
    });

    const handleDelete = (id) => {
        db.remove(id);
        setCampaignList([...db.get()])
    }

    const handleIncrement = (id, data) => {
        db.update(id, data);
        setCampaignList([...db.get()])
    }

    const handleDecrement = (id, data) => {
        db.update(id, data);
        setCampaignList([...db.get()])
    }

    const onSubmitCampaignModal = ({ title, content }) => {
        if (title.length === 0 || content.length === 0) {
            setModal({
                visible: true,
                id: modal.id,
                errorMessage: "Please fill all fields"
            })
        }

        else if (modal.id) {
            db.update(modal.id, { title, content });
            setModal({
                visible: false,
                id: "",
                errorMessage: ""
            })
            setCampaignList([...db.get()])
        }
        else {
            const now = new Date();
            const campaignObject = {
                title,
                content,
                point: 0,
                createdAt: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`,
            }
            db.insert(campaignObject);
            setModal({
                visible: false,
                id: "",
                errorMessage: ""
            })
            setCampaignList([...db.get()])
        };
    }

    const AddCard = ({ onClick }) => {
        return <div className="addCard shadow" onClick={onClick}>
            <i class="fa fa-plus-circle"></i>
        </div>
    };

    return <div className="campaignListContainer">
        <CampaignModal
            setVisible={(visible) => setModal(({ visible }))}
            errorMessage={modal.errorMessage}
            onSubmit={onSubmitCampaignModal}
            visible={modal.visible}
            id={modal.id}
            db={db}
        />
        <div className="campaignListHeaderContainer">
            <SearchBar
                setCampaignList={setCampaignList}
                campaignList={campaignList}
                db={db}
            />
            <div>
                <SortBar
                    setCampaignList={setCampaignList}
                    campaignList={campaignList}
                    db={db}
                />
            </div>
        </div>
        <div className="campaignListItemsContainer">
            {campaignList.map((campaignItem) => {
                return <CampaignCard
                    title={campaignItem.title}
                    content={campaignItem.content}
                    point={campaignItem.point}
                    onClickDelete={() => handleDelete(campaignItem.id)}
                    onClickUpdate={() => setModal({ visible: true, id: campaignItem.id })}
                    onClickIncrement={() => handleIncrement(campaignItem.id, { point: campaignItem.point + 1 })}
                    onClickDecrement={() => handleDecrement(campaignItem.id, { point: campaignItem.point - 1 })}
                    key={campaignItem.id}
                />
            })}
            <AddCard
                onClick={() => setModal({
                    visible: true,
                })}
            />
        </div>
    </div>
}

export default CampaignList;