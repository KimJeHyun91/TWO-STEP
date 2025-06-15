import React, { useState, useEffect } from "react";
import "./SearchFilter.css";
import axios from "axios";

export default function SearchFilter({ onChange }) {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [difficultyEnabled, setDifficultyEnabled] = useState(false);
    const [timeEnabled, setTimeEnabled] = useState(false);
    const [lengthEnabled, setLengthEnabled] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [time, setTime] = useState(1);
    const [length, setLength] = useState(1);
    const [districtOptions, setDistrictOptions] = useState({});

    useEffect(() => {
        const fetchDistrictOptions = async () => {
            try {
                const response = await axios.get('/national_park/get_all_list');
                const data = response.data;
                const groupedOptions = {};
                data.forEach(item => {
                    const city = item.national_park_address_1;
                    const district = item.national_park_address_2;
                    if (!groupedOptions[city]) groupedOptions[city] = new Set();
                    groupedOptions[city].add(district);
                });
                const result = {};
                for (const city in groupedOptions) {
                    result[city] = Array.from(groupedOptions[city]);
                }
                setDistrictOptions(result);
            } catch (error) {
                console.error('Error fetching district options:', error);
            }
        };
        fetchDistrictOptions();
    }, []);

    useEffect(() => {
        onChange({
            region: selectedCity,
            district: selectedDistrict,
            difficulty: difficultyEnabled ? selectedDifficulty : '',
            time: timeEnabled ? time : null,
            length: lengthEnabled ? length : null
        });
    }, [
        selectedCity, selectedDistrict, selectedDifficulty,
        difficultyEnabled, timeEnabled, lengthEnabled,
        time, length
    ]);

    const handleCityChange = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        setSelectedDistrict('');
    };

    const getTimeLabel = (value) => {
        switch (value) {
            case 1: return "30분 미만";
            case 2: return "30분 ~ 1시간";
            case 3: return "1시간 ~ 1시간 30분";
            case 4: return "2시간 이상";
            default: return "";
        }
    };

    const getLengthLabel = (value) => {
        switch (value) {
            case 1: return "1km 미만";
            case 2: return "1~2km";
            case 3: return "2~3km";
            case 4: return "3~4km";
            case 5: return "4~5km";
            case 6: return "5km 이상";
            default: return "";
        }
    };

    return (
        <div className="search-filter-container">
            {/* 지역 검색 */}
            <div className="filter-section">
                <div className="filter-title">지역검색</div>
                <div className="filter-row">
                    <div className="filter-item">
                        <label className="filter-label">시/도:</label>
                        <select
                            className="filter-select"
                            value={selectedCity}
                            onChange={handleCityChange}
                            >
                            <option value="">전체</option> {/* 전체 선택 추가 */}
                            {Object.keys(districtOptions).map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-item">
                        <label className="filter-label">구:</label>
                        <select
                            className="filter-select"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!selectedCity}
                            >
                            <option value="">전체</option> {/* 전체 선택 추가 */}
                            {selectedCity && districtOptions[selectedCity]?.map(district => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* 상세 코스 */}
            <div className="filter-section">
                <div className="filter-title">상세 코스</div>

                {/* 난이도 */}
                <div className="filter-row">
                    <input
                        type="checkbox"
                        checked={difficultyEnabled}
                        onChange={() => setDifficultyEnabled(!difficultyEnabled)}
                    />
                    <label className="filter-label">코스 난이도</label>
                </div>
                {difficultyEnabled && (
                    <div className="checkbox-group">
                        {["쉬움", "보통", "어려움"].map(level => (
                            <label key={level} className="round-checkbox-label">
                                <input
                                    type="checkbox"
                                    value={level}
                                    checked={selectedDifficulty === level}
                                    onChange={() => setSelectedDifficulty(level)}
                                    className="round-checkbox"
                                />
                                {level}
                            </label>
                        ))}
                    </div>
                )}

                {/* 구간 소요 시간 */}
                <div className="filter-row space-between">
                    <div className="filter-row">
                        <input
                            type="checkbox"
                            checked={timeEnabled}
                            onChange={() => setTimeEnabled(!timeEnabled)}
                        />
                        <label className="filter-label">구간 소요 시간</label>
                    </div>
                    {timeEnabled && (
                        <div className="slider-value-inline">{getTimeLabel(time)}</div>
                    )}
                </div>
                {timeEnabled && (
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="4"
                            step="1"
                            value={time}
                            onChange={(e) => setTime(Number(e.target.value))}
                            className="filter-slider"
                        />
                    </div>
                )}

                {/* 구간 길이 */}
                <div className="filter-row space-between">
                    <div className="filter-row">
                        <input
                            type="checkbox"
                            checked={lengthEnabled}
                            onChange={() => setLengthEnabled(!lengthEnabled)}
                        />
                        <label className="filter-label">구간 길이</label>
                    </div>
                    {lengthEnabled && (
                        <div className="slider-value-inline">{getLengthLabel(length)}</div>
                    )}
                </div>
                {lengthEnabled && (
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="6"
                            step="1"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="filter-slider"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
