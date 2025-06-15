import "./Login.css"; // css
import { Link } from "react-router-dom"; // 링크 (페이지 이동)
import { UseLogin } from "../components/join/UseLogin";

const Login = ({onClose}) => {
    const {
        loginId, setLoginId,
        loginPassword, setLoginPassword,
        handleSubmit,
    } = UseLogin();

    return (
        <div className="login-box">
            {onClose && (
                <button className="modal-close" onClick={onClose}>✖︎</button>
            )}
        
        {/* 로그인 인사말 */}
            <div className="login-title"> 
                <h2>🐻  WELCOME</h2>
            </div>

            <img src="/img/rock-bear.jpg" alt="바위절벽에 앉아있는 곰돌이" className="img" />

        {/* 국립공원 로그인 폼 */}
            <div className="login-form">

                <div className="login">
                    <input
                        type="text"
                        placeholder="아이디를 입력해주세요"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        required />

                    <input
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required />
                </div>
                
                    <input
                        type="submit"
                        value="로그인" 
                        className="login-submit"
                        onClick={handleSubmit}/>             
            </div>
                
        {/* 회원가입, 관리자 */ }
            <div className="login-etc">
                <Link to="/Member" className="link-text" onClick={onClose}>회원가입</Link>
            </div>
        
        </div>
        
    );
}

export default Login;