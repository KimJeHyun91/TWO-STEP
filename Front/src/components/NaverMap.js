import React, { useEffect, useState } from 'react';
import axios from 'axios';

import DetailModal from './../pages/DetailModal';

const NaverMap = ({showModal,setShowModal, selectedInfo, setSelectedInfo, showTab, setShowTab, member_id}) => {
  useEffect(() => {


    const redMarkers = [];
    const blueMarkers = [];

    const naverApiKey = process.env.REACT_APP_NAVER_MAP_KEY;
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverApiKey}&submodules=geocoder,coord,animation`;
    script.async = true;

    script.onload = () => {
      if (!window.naver || !window.naver.maps) {
        console.error("네이버 지도 객체를 불러오지 못했습니다.");
        return;
      }

      const map = new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(36.9665, 127.1780),
        zoom: 8,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT
        }
      });

      window.__naverMap__ = map;

      // 국립공원 마커
      axios.get("/national_park/get_all_list")
        .then((res) => {
          const data = res.data;
          data.forEach((item) => {
            const name = item.national_park_name;
            const position = new window.naver.maps.LatLng(item.national_park_latitude, item.national_park_longitude);

            const marker = new window.naver.maps.Marker({
              position,
              map,
              title: name
            });

            blueMarkers.push(marker);

            const infowindow = new window.naver.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:13px;">${name}</div>`,
            });

            window.naver.maps.Event.addListener(marker, "mouseover", () => infowindow.open(map, marker));
            window.naver.maps.Event.addListener(marker, "mouseout", () => infowindow.close());
            window.naver.maps.Event.addListener(marker, "click", () => {
              map.morph(position, 12);
              setShowModal(true);
              setShowTab('park');
              setSelectedInfo({ national_park_no: item.national_park_no });

              blueMarkers.forEach((m) => m.setAnimation(null));
              redMarkers.forEach((m) => m.setAnimation(null));
              marker.setAnimation(window.naver.maps.Animation.BOUNCE);
            });
          });
        })
        .catch((error) => console.error("국립공원 마커 요청 실패", error));

      // 코스 마커
      axios.get("/track/get_all_list")
        .then((res) => {
          const data = res.data;
          const groupedByPosition = {};
          data.forEach((item) => {
            const key = `${item.track_latitude}_${item.track_longitude}`;
            if (!groupedByPosition[key]) groupedByPosition[key] = [];
            groupedByPosition[key].push(item);
          });

          const offset = 0.00115;
          Object.values(groupedByPosition).forEach(group => {
            const count = group.length;
            const mid = Math.floor(count / 2);

            group.forEach((item, index) => {
              const baseLat = parseFloat(item.track_latitude);
              const baseLng = parseFloat(item.track_longitude);
              const shift = (index - mid) * offset;
              const position = new window.naver.maps.LatLng(baseLat, baseLng + shift);
              const trackName = item.track_name;

              const marker = new window.naver.maps.Marker({
                position,
                map: null,
                title: trackName,
                icon: {
                  url: process.env.PUBLIC_URL + '/img/marker.png',
                  size: new window.naver.maps.Size(24, 24),
                  scaledSize: new window.naver.maps.Size(24, 24),
                  anchor: new window.naver.maps.Point(12, 24),
                }
              });

              redMarkers.push(marker);

              const infowindow = new window.naver.maps.InfoWindow({
                content: `<div style="padding:5px;font-size:13px;">${trackName}</div>`,
              });

              window.naver.maps.Event.addListener(marker, "mouseover", () => infowindow.open(map, marker));
              window.naver.maps.Event.addListener(marker, "mouseout", () => infowindow.close());
              window.naver.maps.Event.addListener(marker, "click", () => {
                map.morph(position, 15);
                redMarkers.forEach((m) => m.setAnimation(null));
                setShowModal(true);
                setShowTab('course');
                setSelectedInfo({
                  national_park_no: item.national_park_no,
                  track_no: item.track_no,
                  member_id: item.member_id
                });
                marker.setAnimation(window.naver.maps.Animation.BOUNCE);
              });
            });
          });

          window.naver.maps.Event.addListener(map, 'zoom_changed', () => {
            const zoom = map.getZoom();
            redMarkers.forEach((m) => {
              m.setMap(zoom >= 12 ? map : null);
            });
          });
        })
        .catch((error) => console.error("트랙 마커 요청 실패", error));
    };
    document.head.appendChild(script);

    // 클린업
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      {showModal && (
        <DetailModal national_park_no={selectedInfo.national_park_no}
          member_id ={member_id}
          track_no={selectedInfo.track_no}
          show={showModal}
          onHide={() => setShowModal(false)}
          showTab={showTab}
          selectedInfo={selectedInfo}
          
        />
      )}
      <div
        id="map"
        style={{
          width: '100%',
          height: '100%',
          
          
          margin: 'auto',
        }}
      ></div>
    </>
  );
};

export default NaverMap;
