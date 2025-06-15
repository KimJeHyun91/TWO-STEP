import { useEffect, useState } from "react";

function Weather({ location_x, location_y }) {
  const [weather_list, set_weather_list] = useState([]);

  useEffect(() => {
    const today = new Date();

    // 날짜 포맷 YYYYMMDD
    const formatDate = (date) => {
      const yyyy = date.getFullYear();
      const mm = (date.getMonth() + 1).toString().padStart(2, "0");
      const dd = date.getDate().toString().padStart(2, "0");
      return `${yyyy}${mm}${dd}`;
    };

    const current_date = formatDate(today);

    // 시간대 분기
    let hours = today.getHours() * 60;
    let minutes = today.getMinutes();
    let sum = hours + minutes;
    let current_time = "";

    if (sum >= 0 && sum <= 134) current_time = "2300";
    else if (sum <= 314) current_time = "0200";
    else if (sum <= 494) current_time = "0500";
    else if (sum <= 674) current_time = "0800";
    else if (sum <= 854) current_time = "1100";
    else if (sum <= 1034) current_time = "1400";
    else if (sum <= 1214) current_time = "1700";
    else if (sum <= 1394) current_time = "2000";
    else current_time = "2300";

    // 날씨 API 호출
    const xhr = new XMLHttpRequest();
    const url =
      "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
    let queryParams =
      "?" +
      encodeURIComponent("serviceKey") +
      "=" +
      "SZp6eNNgHHm1Hb4EDzMhh8kDhsRDdX3ITdtxIiOK6jvPjiNBY30pKM9OZv4%2BUbVSX9Pn9iEHS1o04HZ%2Fu4UykA%3D%3D";
    queryParams += "&" + encodeURIComponent("pageNo") + "=1";
    queryParams += "&" + encodeURIComponent("numOfRows") + "=1000";
    queryParams += "&" + encodeURIComponent("dataType") + "=JSON";
    queryParams += "&" + encodeURIComponent("base_date") + "=" + current_date;
    queryParams += "&" + encodeURIComponent("base_time") + "=" + current_time;
    queryParams += "&" + encodeURIComponent("nx") + "=" + location_x;
    queryParams += "&" + encodeURIComponent("ny") + "=" + location_y;

    xhr.open("GET", url + queryParams);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const json = JSON.parse(xhr.responseText);
        const items = json.response?.body?.items?.item;

        if (!items) {
          console.error("날씨 정보가 없습니다.");
          return;
        }

        const temp_time =
          (Math.floor(today.getHours() + 1)).toString().padStart(2, "0") +
          "00";

        const first_filtered_list = items.filter(
          (value) => value.category === "SKY" || value.category === "PTY"
        );

        const four_day_later = new Date(
          today.setDate(today.getDate() + 4)
        );
        const four_day_later_text = formatDate(four_day_later);

        const second_filtered_list = first_filtered_list.filter((value) => {
          if (value.fcstDate === current_date) return value.fcstTime === temp_time;
          if (value.fcstDate === four_day_later_text) return value.fcstTime === "0000";
          return value.fcstTime === "1200";
        });

        let temp_array = [];
        let temp_fcst_value = "";
        let temp_count = 0;

        for (let z = 0; z < second_filtered_list.length; z++) {
          temp_fcst_value += second_filtered_list[z].fcstValue;
          if (z % 2 === 1) {
            let label = "";
            if (temp_count === 0) label = "오늘";
            else if (temp_count === 1) label = "내일";
            else
              label =
                parseInt(second_filtered_list[z].fcstDate.slice(4, 6)) +
                "/" +
                parseInt(second_filtered_list[z].fcstDate.slice(6, 8));
            temp_array.push({
              date: label,
              value: parseInt(temp_fcst_value),
            });
            temp_fcst_value = "";
            temp_count++;
          }
        }

        set_weather_list(temp_array);
      }
    };
    xhr.send();
  }, [location_x, location_y]);

  return (
    <>
      {weather_list.map((value, index) => {
        const iconSrc = `img/weather/w${value.value}.png`;
        return (
          <div key={index}>
            <span style={{ marginLeft: "20px", fontWeight: "600" }}>
              {value.date}
            </span>
            <br />
            <img
              className="weather_img"
              src={iconSrc}
              alt="날씨 아이콘"
              style={{ width: "60px" }}
            />
          </div>
        );
      })}
    </>
  );
}

export default Weather;
