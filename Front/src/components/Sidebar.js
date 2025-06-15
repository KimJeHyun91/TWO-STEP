import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Search from "./search/Search";
import SearchList from "./search/SearchList";

export default function SideBar({onClickSearch}) {
    const [open, setOpen] = useState(false);
    const [courseList, setCourseList] = useState([]);

    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({});

    // 코스 설명 파싱
    const parseTrackDetail = (detail) => {
        const regex = /(.+?)부터/g;
        let match;
        let points = [];
        let lastIndex = 0;

        while ((match = regex.exec(detail)) !== null) {
            points.push(match[1]);
            lastIndex = regex.lastIndex;
        }

        const endPoint = detail.slice(lastIndex);
        if (endPoint) points.push(endPoint);

        if (points.length === 1) {
            return { startPoint: points[0], endPoint: points[0], middlePoint: null };
        } else if (points.length === 2) {
            return { startPoint: points[0], endPoint: points[1], middlePoint: null };
        } else {
            return {
                startPoint: points[0],
                middlePoint: points.slice(1, -1).join(" -> "),
                endPoint: points[points.length - 1],
            };
        }
    };

    const formatTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        if (hours > 0 && minutes > 0) return `${hours}시간 ${minutes}분`;
        else if (hours > 0) return `${hours}시간`;
        else return `${minutes}분`;
    };

    useEffect(() => {
        const fetchCoursesWithRegion = async () => {
            try {
                const [trackRes, parkRes] = await Promise.all([
                    fetch("track/get_all_list"),
                    fetch("national_park/get_all_list")
                ]);

                const tracks = await trackRes.json();
                const parks = await parkRes.json();

                // 공원번호(national_park_no) 기반 주소 매핑
                const parkMap = {};
                parks.forEach(park => {
                    parkMap[park.national_park_no] = {
                        address1: park.national_park_address_1,
                        address2: park.national_park_address_2
                    };
                });

                const mappedData = tracks.map((track) => {
                    const { startPoint, middlePoint, endPoint } = parseTrackDetail(track.track_detail);
                    const park = parkMap[track.national_park_no] || {};

                    return {
                        id: track.track_no,
                        parkNo: track.national_park_no,
                        latitude: track.track_latitude,
                        longitude: track.track_longitude,
                        name: track.track_name,
                        category: "등산코스",
                        startPoint,
                        middlePoint,
                        endPoint,
                        length: track.track_length,
                        difficulty: track.track_difficulty,
                        time: formatTime(track.track_time),
                        timeRaw: track.track_time,
                        elevation: `${track.track_altitude}m`,
                        address1: park.address1 || "",
                        address2: park.address2 || ""
                    };
                });

                setCourseList(mappedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCoursesWithRegion();
    }, []);

    const filterCourses = () => {
        return courseList.filter((course) => {
            if (searchText && !course.name.toLowerCase().includes(searchText.toLowerCase())) return false;
            if (filters.region && filters.region !== "" && course.address1 !== filters.region) return false;
            if (filters.district && filters.district !== "" && course.address2 !== filters.district) return false;
            if (filters.difficulty && filters.difficulty !== "" && course.difficulty !== filters.difficulty) return false;

            if (filters.time !== null && filters.time !== undefined) {
                const m = course.timeRaw;
                if (
                    (filters.time === 1 && m >= 30) ||
                    (filters.time === 2 && (m < 30 || m > 60)) ||
                    (filters.time === 3 && (m < 60 || m > 90)) ||
                    (filters.time === 4 && m <= 120)
                ) return false;
            }

            if (filters.length !== null && filters.length !== undefined) {
                const km = course.length;
                if (
                    (filters.length === 1 && km >= 1) ||
                    (filters.length === 2 && (km < 1 || km > 2)) ||
                    (filters.length === 3 && (km < 2 || km > 3)) ||
                    (filters.length === 4 && (km < 3 || km > 4)) ||
                    (filters.length === 5 && (km < 4 || km > 5)) ||
                    (filters.length === 6 && km <= 5)
                ) return false;
            }

            return true;
        });
    };

    const handleToggle = () => setOpen((prev) => !prev);

    return (
        <div className={`sidebar-wrapper ${open ? "open" : "closed"}`}>
            <div className="sidebar-content" style={{ maxHeight: "100vh", overflowY: "auto" }}>
                <Search
                    searchText={searchText}
                    onSearch={setSearchText}
                    onApplyFilters={setFilters}
                />
                {filterCourses().map((course) => (
                    <SearchList
                        key={`${course.parkNo}-${course.id}`} course={course}
                        onClickSearch={onClickSearch}
                        
                    />
                ))}
            </div>
            <div className="sidebar-toggle" onClick={handleToggle} style={{color:'black'}}>
                {open ? "▶" : "◀"}
            </div>
        </div>
    );
}
