import { useState } from "react";
import { cloneObject } from "../../utils";
import "./style.css";

const SearchBar = ({ campaignList, setCampaignList, db }) => {
    const [search, setSearch] = useState("")

    const handleSearch = (e) => {
        const value = e.target.value;
        const campaignItems = db.get();
        setSearch(value);
        if (value.length !== 0) {
            let filteredList = campaignItems.filter(item => item.title.includes(value))
            setCampaignList(cloneObject(filteredList));
        } else {
            setCampaignList(campaignItems);
        };
    };

    return <input
        className="form-input searchInput shadow"
        onChange={handleSearch}
        placeholder="Search"
        value={search}
        type="text"
    />
}

export default SearchBar;