import { BiSearch, BiChevronDown, BiChevronUp } from "react-icons/bi";
import React, { useState } from "react";
import SearchFilter from "./SearchFilter";
import "./Search.css";

export default function Search({ searchText, onSearch, onApplyFilters }) {
    const [text, setText] = useState(searchText);
    const [showFilter, setShowFilter] = useState(false);
    const [tempFilters, setTempFilters] = useState({});

    const handleSearchClick = () => {
        onSearch(text);
    };

    const handleApplyClick = () => {
        onApplyFilters(tempFilters);
    };

    return (
        <div>
            <div className="searching-style">
                <div className="searching-input-box">
                    &ensp;
                    <BiSearch style={{ marginTop: "4px" }} />
                    <input
                        type="text"
                        placeholder="국립공원, 산, 코스 이름 검색"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="search-input"
                    />
                </div>
                <button className="filter-button" onClick={() => setShowFilter(!showFilter)}>
                    상세조건 {showFilter ? <BiChevronDown /> : <BiChevronUp />}
                </button>
                <button className="search-button" onClick={handleSearchClick}>
                    검색
                </button>
            </div>

            {showFilter && (
                <div className="filter-container">
                    <div className="filter-box">
                        <SearchFilter onChange={setTempFilters} />
                        <div className="apply-button-wrapper">
                            <button className="apply-button" onClick={handleApplyClick}>
                                적용
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
