import { useEffect, useRef, useState } from 'react';
import NaverMap from './NaverMap';
import './Section.css';
import SideBar from './Sidebar';

const Section = (() => {
    const mapRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const [showTab, setShowTab] = useState('park');
    const [selectedInfo, setSelectedInfo] = useState({});
    const [memberId, setMemberId] = useState("");

    // 사이드바에서 클릭시 실행할 함수
    const handleSearchClick = (national_park_no, track_no, lat, lng) => {
        const position = new window.naver.maps.LatLng(lat, lng);
        window.__naverMap__.morph(position, 12);

        setShowModal(true);
        setShowTab('course');
        setSelectedInfo({ national_park_no, track_no });
    };

    useEffect(() => {
        const loginUserId = localStorage.getItem("loginUserId");
        if (loginUserId) setMemberId(loginUserId);

    }, []);

    const zoomMap = (direction) => {
        const map = window.__naverMap__ // NaverMap.js에서 저장한 객체 전역 변수로 접근
        if (map) {
            const currentZoom = map.getZoom();
            const newZoom = direction === 'in' ? currentZoom + 1 : currentZoom - 1;

            const center = map.getCenter();

            map.morph(center, newZoom);
        }
    }

    return (

        <div className='Sectiondiv'>
            <SideBar onClickSearch={handleSearchClick} />

            <NaverMap
                showModal={showModal}
                setShowModal={setShowModal}
                selectedInfo={selectedInfo}
                setSelectedInfo={setSelectedInfo}
                showTab={showTab}
                setShowTab={setShowTab}
                member_id={memberId}
            />

        </div>

    )
})
export default Section;