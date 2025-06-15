import './Header.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailModal from '../pages/DetailModal';
import { Link, Links, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import JoinModal from "./join/JoinModal"
import { RiInfoCardLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import LoginInfo from "./join/LoginInfo";

const Header = (() => {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // 지영 로그인 모달 추가
  const loginUserId = localStorage.getItem("loginUserId");
  const [showVideo, setShowVideo] = useState(false);
  const videoUrl = "/video/guide.mp4"
  const iframeContent = `
    <!DOCTYPE html>
    <html>
    <head><style>body { margin: 0; background: black; }</style></head>
    <body>
      <video width="100%" height="100%" controls autoplay>
        <source src='${videoUrl}' type='video/mp4' />
        브라우저가 video 태그를 지원하지 않습니다.
      </video>
    </body>
    </html>
  `;

  return (
    <div className='Header'>
      <div className='HeadDiv'>

        <div className='LeftDiv'>

        </div>

        {showVideo && (
          <div className="VideoOverlay">
            <div className="VideoWrapper">
              <button className="CloseButton" onClick={() => setShowVideo(false)}>✕</button>
              <iframe
                title="video-frame"
                width="100%"
                height="100%"
                srcDoc={iframeContent}
                allow="autoplay"
                allowFullScreen
              />
            </div>
          </div>
        )}


        <div className='CenterDiv'>

        </div>

        <div className='RightDiv'>

          <div className='Login'>
            {!loginUserId && (
              <>
                <Link to="/"><FaHome className='FaHome' style={{ paddingTop: '6px' }} /></Link>
                {/* 지영 로그인 모달 */}
                <button className="LoginButton" onClick={() => setShowLogin(true)}>
                  <MdLogin className="MdLogin"  />
                </button>
                <JoinModal show={showLogin} onHide={() => setShowLogin(false)}>
                  <Login onClose={() => setShowLogin(false)} />
                </JoinModal>

                <Link to="/member" className="MemberButton" style={{ paddingBottom: '5px' }}>
                  <FaUserPlus className="FaUserPlus" />
                </Link>
              </>
            )}
            <LoginInfo />
            <button onClick={() => setShowVideo(true)} className='guidebtn' ><RiInfoCardLine className='RiInfoCardLine' style={{ fontSize: '46px' }} /></button>
          </div>

        </div>

        {/* <Button className='ModalButton' variant="primary" onClick={(DetailModal) => setShowModal(true)}> 디테일 모달 </Button> */}
        <DetailModal show={showModal} onHide={() => setShowModal(false)} />

      </div>

    </div>
  )
})
export default Header;