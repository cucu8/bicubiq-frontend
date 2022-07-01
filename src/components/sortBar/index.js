import { useEffect, useState } from "react"
import { cloneObject } from "../../utils";
import "./style.css"

const SortBar = ({ campaignList, setCampaignList }) => {
    const [sort, setSort] = useState("");

    useEffect(() => {
        const sortedList = campaignList.sort((a, b) => (a.point > b.point) ? 1 : -1);
        if (sort === "moreToLess") {
            const clonedSortedObject = cloneObject(sortedList);
            setCampaignList(clonedSortedObject);
        }
        else if (sort === "lessToMore") {
            const reversedList = cloneObject([...sortedList].reverse());
            setCampaignList(reversedList);
        };
    }, [sort]);

    return <div>
        <select
            className="selectComponent shadow"
            defaultValue=""
            onChange={(e) => setSort(e.target.value)}
        >
            <option disabled selected value="">Select Sort Point </option>
            <option value="moreToLess">Less to More</option>
            <option value="lessToMore">More to Less</option>
        </select>
    </div >
}

export default SortBar;