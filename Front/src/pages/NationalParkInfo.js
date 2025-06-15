import React, { useEffect, useState } from 'react';
import './NationalParkInfo.css';
import Weather from '../components/Weather';
import axios from 'axios';

const NationalParkInfo = ({ national_park_no }) => {

    const [useParkInfo, setParkInfo] = useState({
        national_park_name: "",
        national_park_introduce: "",
        national_park_office_name: "",
        national_park_office_address: "",
        national_park_office_phone: "",
        allReviews: [],
        location_x: 0,
        location_y: 0,
    });

    useEffect(() => {
        if (!national_park_no) return;

        // 국립공원 기본 정보
        axios.get("/national_park/get_one_object", { params: { national_park_no } })
            .then((res) => {
                const { national_park_name, national_park_introduce } = res.data;
                setParkInfo((prev) => ({
                    ...prev,
                    national_park_name,
                    national_park_introduce,
                }));
            })
            .catch((err) => console.error("국립공원 데이터 요청 실패", err));

        // 국립공원 사무소 정보
        axios.get("/national_park_office/get_list_national_park", { params: { national_park_no } })
            .then((res) => {
                const [office] = res.data;
                setParkInfo((prev) => ({
                    ...prev,
                    national_park_office_name: office.national_park_office_name,
                    national_park_office_address: office.national_park_office_address,
                    national_park_office_phone: office.national_park_office_phone,
                }));
            })
            .catch((err) => console.error("국립공원 사무실 데이터 요청 실패", err));

        // 날씨 위치 정보
        axios.get("/weather/get_one_object_national_park_no", { params: { national_park_no } })
            .then((res) => {
                const { weather_location_x, weather_location_y } = res.data;
                setParkInfo((prev) => ({
                    ...prev,
                    location_x: weather_location_x,
                    location_y: weather_location_y,
                }));
            })
            .catch((err) => console.error("기상 데이터 요청 실패", err));

        // 리뷰 정보
        axios.get("/review/get_list_national_park", { params: { national_park_no } })
            .then((res) => {
                const allReviews = res.data.map(item => item.review_content);
                setParkInfo((prev) => ({
                    ...prev,
                    allReviews,
                }));
            })
            .catch((err) => console.error("리뷰 데이터 요청 실패", err));
    }, [national_park_no]);

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(prev => !prev);

    return (
        <>
            <div className="ModalImageWrapper">
                <img
                    src={process.env.PUBLIC_URL + `/img/national_park/${national_park_no}.jpg`}
                    alt="국립공원 사진"
                    className="MapImage"
                />
            </div>

            <div className="Modalbody">
                <div className="ParkInfo">
                    <strong>{useParkInfo.national_park_name}</strong>
                </div>
                <>
                    <div className="ParkInfoBubble">
                        {useParkInfo.national_park_introduce}
                    </div>
                </>
                <>
                    <div className="ParkContact">
                        <strong>{useParkInfo.national_park_office_name}</strong><br />
                        주소 : {useParkInfo.national_park_office_address}<br />
                        연락처 : {useParkInfo.national_park_office_phone}
                    </div>
                </>
                <div>
                    <div className="WeatherSection">
                        <strong>날씨</strong>
                        <div className="WeatherTags">
                            <Weather location_x={useParkInfo.location_x} location_y={useParkInfo.location_y} />
                        </div>
                    </div>

                    <div className="ReviewSection">
                        <div className="CourseInfo">
                            <strong>리뷰 ({useParkInfo.allReviews.length})</strong>
                            <div className="ReviewButtons">
                                <button className="MoreLink" onClick={toggleExpand}>
                                    {isExpanded ? "접기" : "자세히"}
                                </button>
                            </div>
                        </div>

                        {useParkInfo.allReviews.map((text, idx) => (
                            <div key={idx} className={`SpeechBubble ${!isExpanded ? "CutText" : ""}`}>
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NationalParkInfo;

