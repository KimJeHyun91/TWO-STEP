// ✅ DetailModal.jsx
import { useEffect, useState, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './DetailModal.css';
import imgMountain1 from "../sample_data/SampleMap1.png";
import AddReviewComponent from "../components/review/Review";
import NationalParkInfo from "./NationalParkInfo";
import axios from 'axios';

const DetailModal = ({ show, onHide, showTab, national_park_no, track_no, member_id }) => {
    const [courses, setCourse] = useState([{ member_id: member_id, name: "", url: "", national_park_no: national_park_no, track_no: "", time: "", distance: "", altitude: "", difficulty: "", mapImage: imgMountain1, reviews: [] }]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showAddReview, setShowAddReview] = useState(false);
    const [activeTab, setActiveTab] = useState(showTab || 'course');
    const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const [contentFade, setContentFade] = useState(true);

    const formatTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return hours > 0 ? `${hours}시간${minutes > 0 ? ` ${minutes}분` : ''}` : `${minutes}분`;
    };

    const formatAltitude = (altitude) => altitude >= 1000 ? `${(altitude / 1000).toFixed(2)}km` : `${altitude}m`;

    const fetchCoursesAndReviews = useCallback(async () => {
        try {
            const courseRes = await axios.get("/track/get_list_national_park", {
                params: { national_park_no }
            });
            const rawCourses = courseRes.data;
            const trackNos = rawCourses.map((course) => course.track_no);

            const reviewPromises = trackNos.map((trackNo) =>
                axios.get("/review/get_list_track", {
                    params: { national_park_no, track_no: trackNo }
                }).then(res => ({
                    track_no: trackNo,
                    reviews: res.data.map((r) => r.review_content)
                }))
            );

            const allReviewData = await Promise.all(reviewPromises);
            const reviewMap = allReviewData.reduce((acc, { track_no, reviews }) => {
                acc[track_no] = reviews;
                return acc;
            }, {});

            const updatedCourses = rawCourses.map((item) => ({
                name: item.track_name,
                track_no: item.track_no,
                url: item.track_find,
                national_park_no: item.national_park_no,
                time: formatTime(item.track_time),
                distance: `${item.track_length}km`,
                altitude: formatAltitude(item.track_altitude),
                difficulty: item.track_difficulty,
                mapImage: `/img/track/${item.national_park_no}${item.track_no}.png`,
                reviews: reviewMap[item.track_no] || []
            }));

            setCourse(updatedCourses);
            if (track_no) {
                const index = updatedCourses.findIndex(c => c.track_no === track_no);
                if (index !== -1) {
                    setCurrentCourseIndex(index)
                }
            }
        } catch (error) {
            console.error("데이터 호출 오류", error.response?.data || error.message);
        }
    }, [national_park_no]);

    useEffect(() => {
        if (show) fetchCoursesAndReviews();
    }, [show, fetchCoursesAndReviews]);

    useEffect(() => {
        setFade(show);
    }, [show]);

    const toggleExpand = () => setIsExpanded(prev => !prev);
    const handleAddReview = (newReview) => {
        courses[currentCourseIndex].reviews.push(newReview);
    };

    const handlePrevCourse = () => {
        if (currentCourseIndex > 0) {
            setContentFade(false);
            setTimeout(() => {
                setCurrentCourseIndex(currentCourseIndex - 1);
                setContentFade(true);
            }, 300);
        }
    };

    const handleNextCourse = () => {
        if (currentCourseIndex < courses.length - 1) {
            setContentFade(false);
            setTimeout(() => {
                setCurrentCourseIndex(currentCourseIndex + 1);
                setContentFade(true);
            }, 300);
        }
    };

    const switchTab = (tab) => {
        if (tab !== activeTab) {
            setContentFade(false);
            setTimeout(() => {
                setActiveTab(tab);
                setContentFade(true);
            }, 300);
        }
    };

    const currentCourse = courses[currentCourseIndex];

    return (
        <>
            <Modal show={show} onHide={onHide} className={fade ? "fade-in" : "fade-out"} dialogClassName="detail-modal-custom">
                <div className="ModalTopWrapper">
                    <div className="TabWrapper">
                        <button className={`TabButton ${activeTab === 'course' ? "ActiveTab" : ""}`} onClick={() => switchTab('course')}>코스 정보</button>
                        <button className={`TabButton ${activeTab === 'park' ? "ActiveTab" : ""}`} onClick={() => switchTab('park')}>국립공원 소개</button>
                    </div>
                    <div className="ModalCloseWrapper">
                        <Button variant="light" className="CloseBtn" onClick={onHide}>✕</Button>
                    </div>
                </div>

                <div className={contentFade ? "content-fade-in" : "content-fade-out"}>
                    {activeTab === 'course' ? (
                        <>
                            <div className="ModalImageWrapper">
                                <img src={process.env.PUBLIC_URL + currentCourse.mapImage} alt="코스 지도" className="MapImage" />
                            </div>
                            <Modal.Body className="Modalbody">
                                <div className="CourseInfo">
                                    <strong>{currentCourse.name}</strong>
                                    <button className="FindRouteBtn" onClick={() => window.open(currentCourse.url)}>길찾기</button>
                                </div>
                                <table className="CourseTable">
                                    <thead>
                                        <tr><th>난이도</th><th>소요시간</th><th>등산길이</th><th>고도</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span className={`Tag ${currentCourse.difficulty === "쉬움" ? "Easy" : currentCourse.difficulty === "보통" ? "Medium" : "Hard"}`}>{currentCourse.difficulty}</span></td>
                                            <td>{currentCourse.time}</td>
                                            <td>{currentCourse.distance}</td>
                                            <td>{currentCourse.altitude}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="ReviewSection">
                                    <div className="CourseInfo">
                                        <strong>리뷰 ({currentCourse.reviews.length})</strong>
                                        <div className="ReviewButtons">
                                            <button className="reload" onClick={fetchCoursesAndReviews}>새로고침</button>
                                            <button className="MoreLink" onClick={toggleExpand}>{isExpanded ? "접기" : "자세히"}</button>
                                            <button className="WriteBtn" onClick={() => setShowAddReview(true)}>리뷰 수정/추가</button>
                                        </div>
                                    </div>
                                    {currentCourse.reviews.map((text, idx) => (
                                        <div key={idx} className={`SpeechBubble ${!isExpanded ? "CutText" : ""}`}>{text}</div>
                                    ))}
                                </div>
                            </Modal.Body>
                        </>
                    ) : (
                        <NationalParkInfo national_park_no={currentCourse.national_park_no} />
                    )}
                </div>

                {activeTab === 'course' && (
                    <Modal.Footer className="PaginationFooter">
                        <Button variant="light" onClick={handlePrevCourse} disabled={currentCourseIndex === 0}>◀ 이전</Button>
                        <span>{currentCourseIndex + 1} / {courses.length}</span>
                        <Button variant="light" onClick={handleNextCourse} disabled={currentCourseIndex === courses.length - 1}>다음 ▶</Button>
                    </Modal.Footer>
                )}
            </Modal>

            <AddReviewComponent
                show={showAddReview}
                onHide={() => setShowAddReview(false)}
                onRefresh={fetchCoursesAndReviews} // ⭐ 리뷰 모달 닫힐 때 새로고침
                national_park_no={currentCourse.national_park_no}
                track_no={currentCourse.track_no}
                member_id={member_id}
            />
        </>
    );
};

export default DetailModal;
