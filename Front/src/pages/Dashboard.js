// Admin으로 로그인했을때 연결되는 페이지
import axios from 'axios'
import { useEffect, useState } from 'react'

import React from 'react'

import './Dashboard.css'

import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
} from '@coreui/react'

import EditableTable from '../components/Table/EditableTable'

const Dashboard = () => {

  const [nationalParkData, setNationalParkData] = useState([])
  const [nationalParkOfficeData, setNationalParkOfficeData] = useState([])
  const [reviewData, setReviewData] = useState([])
  const [trackData, setTrackData] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [editRowKey,setEditRowKey] = useState(null);


  // 수정중인 행의 ID
  const [editId, setEditId] = useState(null);
  // 수정할 값
  const [editRow, setEditRow] = useState({});

  const [addTable, setAddTable] = useState('');
  const [newData, setNewData] = useState({})


  // national_park 테이블 정보 불러오는 함수(useEffect에서 사용)

  const fetchNationalParkData = () => {
    axios.get('/national_park/get_all_list')
      .then((response) => {
      console.log(response)
         setNationalParkData(response.data) })
      .catch(error => console.error(error));
  }

  // national_park_office 테이블 정보 불러오기
  const fetchNationalParkOfficeData = () => {
    axios.get('/national_park_office/get_all_list')
      .then((response) => {
        console.log(response)
        setNationalParkOfficeData(response.data)})
      .catch(error => console.error(error));
  }
  // review 테이블 정보 불러오기 
  const fetchReviewData = () => {
    axios.get('/review/get_all_list')
      .then((response) => {
        console.log(response)
        setReviewData(response.data)})
      .catch(error => console.error(error));
  }
  // track 테이블 정보 불러오기
  const fetchTrackData = () => {
    axios.get('/track/get_all_list')
      .then((response) => {
        console.log(response)
        setTrackData(response.data)})
      .catch(error => console.error(error));
  }

  // weather 테이블 정보 불러오기
  const fetchWeatherData = () => {
    axios.get('/weather/get_all_list')
      .then((response) => {
        console.log(response)
        setWeatherData(response.data)})
      .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchNationalParkData();
    fetchNationalParkOfficeData();
    fetchReviewData();
    fetchTrackData();
    fetchWeatherData();
  }, [])

  // 수정 버튼 눌렀을때 공통적으로 사용할 함수
  // (각 테이블마다 handleEdit 함수를 써야하는데 각각 만들기엔 유지보수가 어려움)
  // (따라서 공통 handleEdit함수를 사용)
  // (아래 코드에서 수정버튼에 handleEdit 사용하여 값을 넘겨줌)
  const handleEdit = (item, table, idField, index) => {
    setEditId({ id: item[idField], table, index });
    setEditRow({ ...item });
    setEditRowKey(index);
  }

  const handleRowChange = (field, value) => {
    setEditRow(prev => ({ ...prev, [field]: value })) // prev : 이전 상태값을 참조할때 사용하는 매개변수
  }

  const handleCancle = () => {
    setEditId(null)
    setEditRow({})
  }

  // 데이터 수정 기능
  const handleSave = () => {
    const { id, table } = editId;
    let url = '';
    if (table === 'review') url = '/review/modify';
    else if (table === 'track') url = '/track/modify';
    else if (table === 'national_park') url = '/national_park/modify';
    else if (table === 'national_park_office') url = '/national_park_office/modify';
    else if (table === 'weather') url = '/weather/modify';
    axios.put(url, editRow)
      .then((response) => {
        console.log(response)
        alert('수정 완료')
        setEditId(null)
        setEditRow({})
        if (table === 'review') fetchReviewData();
        else if (table === 'track') fetchTrackData();
        else if (table === 'national_park') fetchNationalParkData();
        else if (table === 'national_park_office') fetchNationalParkOfficeData();
        else if (table === 'weather') fetchWeatherData();
      })
      .catch(err => console.error(err))
  }

  // 데이터 추가 기능
  const handleAdd = () => {
    const urlMap = {
      review: '/review/add',
      track: '/track/add',
      national_park: '/national_park/add',
      national_park_office: '/national_park_office/add',
      weather: '/weather/add'
    }
    console.log(newData);

    const fetchMap = {
      review: fetchReviewData,
      track: fetchTrackData,
      national_park: fetchNationalParkData,
      national_park_office: fetchNationalParkOfficeData,
      weather: fetchWeatherData
    }

    const url = urlMap[addTable];
    const fetchFn = fetchMap[addTable];

    if (!url) return;

    axios.post(url, newData)
      .then((result) => {
        console.log(result)
        alert('추가 완료')
        fetchFn()
        setNewData({})
        setAddTable(null)
      })
      .catch(err => console.error(err))
  }

  //데이터 삭제 기능
  const handleDelete = (item, table) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    const urlMap = {
      review: '/review/delete',
      track: '/track/delete',
      national_park: '/national_park/delete',
      national_park_office: '/national_park_office/delete',
      weather: '/weather/delete'
    }

    const fetchMap = {
      review: fetchReviewData,
      track: fetchTrackData,
      national_park: fetchNationalParkData,
      national_park_office: fetchNationalParkOfficeData,
      weather: fetchWeatherData
    }
    const url = urlMap[table];
    const fetchFn = fetchMap[table];

    if (!url) return;

    let deleteData = {};
    if (table === 'track') {
      deleteData = {
        track_no: item.track_no,
        national_park_no: item.national_park_no
      };
    } else if (table === 'review') {
      deleteData = { review_no: item.review_no };
    } else if (table === 'national_park') {
      deleteData = { national_park_no: item.national_park_no };
    } else if (table === 'national_park_office') {
      deleteData = {
        national_park_office_no: item.national_park_office_no,
        national_park_no: item.national_park_no
      };
    } else if (table === 'weather') {
      deleteData = { weather_no: item.weather_no };
    }

    axios({
      method: "delete"
      , url: url
      , data: deleteData
    })

      .then((response) => {
        console.log(response)
        alert('삭제 완료!');
        fetchFn();
      })
      .catch(err => {
        console.error('삭제 실패:', err);
        alert('삭제 실패');
      });
  }

  
  
  return (
    <>
      {/* 상단 관리자 페이지 제목 + 홈으로 버튼 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#343a40',
        color: 'white'
      }}>
        <h2 style={{ margin: 0, textAlign:'center'}}>관리자 페이지</h2>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#6c757d',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          홈으로 🏠
        </button>
      </div>

    
    

    <div style={{ padding: '20px' }} className='bg-dark'>

      {/* 국립 공원 테이블 */}
      <EditableTable
        title="국립공원 테이블 (national_park)"
        tableKey="national_park"
        columns={[
          { key: 'national_park_no', label: '번호' },
          { key: 'national_park_name', label: '이름' },
          { key: 'national_park_official_website', label: '홈페이지' },
          { key: 'national_park_introduce', label: '소개', type: 'textarea' },
          { key: 'national_park_latitude', label: '위도' },
          { key: 'national_park_longitude', label: '경도' },
          { key: 'national_park_address_1', label: '주소1' },
          { key: 'national_park_address_2', label: '주소2' },
          { key: 'national_park_address_3', label: '주소3' },
        ]}
        data={nationalParkData}
        fetchData={fetchNationalParkData}
        editId={editId}
        setEditId={setEditId}
        editRow={editRow}
        setEditRow={setEditRow}
        newData={newData}
        setNewData={setNewData}
        addTable={addTable}
        setAddTable={setAddTable}
        handleRowChange={handleRowChange}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleAdd={handleAdd}
        handleCancle={handleCancle}
        handleDelete={handleDelete}
      />

      {/* 국립공원 사무소 테이블 */}
      <EditableTable
        title="국립공원 사무소 (national_park_office table)"
        tableKey="national_park_office"
        columns={[
          { key: 'national_park_no', label: '공원 번호' },
          { key: 'national_park_office_no', label: '공원사무소 번호' },
          { key: 'national_park_office_name', label: '사무소 이름' },
          { key: 'national_park_office_address', label: '사무소 주소' },
          { key: 'national_park_office_phone', label: '사무소 번호' },
        ]}
        data={nationalParkOfficeData}
        fetchData={fetchNationalParkOfficeData}
        editId={editId}
        setEditId={setEditId}
        editRow={editRow}
        setEditRow={setEditRow}
        newData={newData}
        setNewData={setNewData}
        addTable={addTable}
        setAddTable={setAddTable}
        handleRowChange={handleRowChange}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleAdd={handleAdd}
        handleCancle={handleCancle}
        handleDelete={handleDelete}
      />

      {/* 코스 테이블 */}
      <EditableTable
        title="코스 테이블 (track table)"
        tableKey="track"
        columns={[
          { key: 'national_park_no', label: '공원 번호' },
          { key: 'track_no', label: '트랙 번호' },
          { key: 'track_name', label: '트랙 이름' },
          { key: 'track_detail', label: '트랙 상세정보', },
          { key: 'track_difficulty', label: '난이도' },
          { key: 'track_time', label: '소요시간' },
          { key: 'track_length', label: '길이' },
          { key: 'track_altitude', label: '고도' },
          { key: 'track_latitude', label: '위도' },
          { key: 'track_longitude', label: '경도' },
          { key: 'track_find', label: '주소' }
        ]}

        data={trackData}
        fetchData={fetchTrackData}
        editId={editId}
        setEditId={setEditId}
        editRow={editRow}
        setEditRow={setEditRow}
        newData={newData}
        setNewData={setNewData}
        addTable={addTable}
        setAddTable={setAddTable}
        handleRowChange={handleRowChange}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleAdd={handleAdd}
        handleCancle={handleCancle}
        handleDelete={handleDelete}
      />

      {/* 리뷰 테이블 */}
      <EditableTable
        title="리뷰 테이블 (review table)"
        tableKey="review"
        columns={[
          
          { key: 'review_no', label: '리뷰 번호' },
          { key: 'national_park_no', label: '공원 번호' },
          { key: 'track_no', label: '트랙 번호'},
          { key: 'review_created_date', label: '날짜' },
          { key: 'review_last_modified_date', label: '마지막 수정일' },
          { key: 'member_id', label: '유저 아이디' },
          { key: 'review_content', label: '리뷰 내용' }

        ]}
        data={reviewData}
        fetchData={fetchReviewData}
        editId={editId}
        setEditId={setEditId}
        editRow={editRow}
        setEditRow={setEditRow}
        newData={newData}
        setNewData={setNewData}
        addTable={addTable}
        setAddTable={setAddTable}
        handleRowChange={handleRowChange}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleAdd={handleAdd}
        handleCancle={handleCancle}
        handleDelete={handleDelete}
        showAdd={false}
        showEdit={false}
      />

      <EditableTable
        title="날씨 (weather table)"
        tableKey="weather"
        columns={[
          { key: 'weather_no', label: '날씨 번호' },
          { key: 'national_park_no', label: '공원 번호' },
          { key: 'weather_location_x', label: '날씨 x 좌표' },
          { key: 'weather_location_y', label: '날씨 y 좌표' },
        ]}
        data={weatherData}
        fetchData={fetchWeatherData}
        editId={editId}
        setEditId={setEditId}
        editRow={editRow}
        setEditRow={setEditRow}
        newData={newData}
        setNewData={setNewData}
        addTable={addTable}
        setAddTable={setAddTable}
        handleRowChange={handleRowChange}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleAdd={handleAdd}
        handleCancle={handleCancle}
        handleDelete={handleDelete}
      />


    </div>
    
  </>
  )
}

export default Dashboard;
