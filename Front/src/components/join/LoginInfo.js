import { useEffect, useState } from "react";
import "./LoginInfo.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdLogin } from "react-icons/md";

const LoginInfo = () => {
  const [loginUserId, setLoginUserId] = useState(null);

  useEffect(() => {
    const loginInfoId = localStorage.getItem("loginUserId");
    setLoginUserId(loginInfoId);
  }, []);

  const logout = () => {
    localStorage.removeItem("loginUserId");
    setLoginUserId(null);
    window.location.reload();
  };

  if (!loginUserId) {
    return null;
  }

  return (
    <div style={{display:'flex'}}>
      <b style={{fontSize:'30px', color:'black'}}>{loginUserId}님</b>
      <button onClick={logout} style={{ marginLeft: "10px" , background:'none' ,border:'none'}}><MdLogin className='MdLogin' /></button>

      {/* 관리자라면 관리자 페이지 링크 표시 */}
      {loginUserId === "admin" && (
        <div style={{ marginTop: '8px', textAlign:'center'}}>
          <Link to="/admin" style={{ color: "black",textDecoration: "none", fontWeight:'bold', fontSize:'20px'}}>
            [관리자 페이지]
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginInfo;