import { useState } from "react";
import { BsDot } from "react-icons/bs";
import "./SearchList.css";
import React from "react";

export default function SearchList({ course, onClickSearch}) {
    const [isHovering, setIsHovering] = useState(true);

    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);


    const handleClick = () => {
        if (
          onClickSearch &&
          course.parkNo !== undefined &&
          course.id !== undefined &&
          course.latitude !== undefined &&
          course.longitude !== undefined
        ) {
          onClickSearch(course.parkNo, course.id, course.latitude, course.longitude);
        } else {
          console.warn("위치 정보 부족:", course);
        }
      };
      
    return (
        
        <div>
            <div
                className={isHovering ? "searching-box" : "searching-list"}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={handleClick}
            >
                <div>
                    <span className="track-name">{course.name}</span>
                    <span className="track-name-info"> {course.category}</span><br />
                    <span className="track-detail">
                        {course.startPoint}
                        {course.middlePoint && ` -> ${course.middlePoint}`}
                        {` -> ${course.endPoint}`}
                    </span><br />
                    <span className="track-length">{course.length} Km</span><br />
                    <div className="trail-info">
                        <span className={`Tag ${
                            course.difficulty === "쉬움"
                                ? "Easy"
                                : course.difficulty === "보통"
                                    ? "Medium"
                                    : "Hard"
                        }`}>
                            {course.difficulty}
                        </span>
                        <span className="track-info-data">{course.time}</span><BsDot />
                        <span className="track-info-col">길이</span>
                        <span className="track-info-data">{course.length}km</span><BsDot />
                        <span className="track-info-col">고도</span>
                        <span className="track-info-data">{course.elevation}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
