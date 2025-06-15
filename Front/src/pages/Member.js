import "./Member.css"; // css
import Header from "../components/Header"; // 헤더 고정
import { Link } from "react-router-dom"; // 링크 (페이지 이동)
import { CityData } from "../components/join/CityData"; // 주소선택 지역목록
import { UseMember } from "../components/join/UseMember";

const Member = () => {
    const {
        id, setId,
        idError, setIdError,
        idCheck, setIdCheck,
        password, setPassword,
        passwordConfirm, setPasswordConfirm,
        passwordError, setPasswordError,
        name, setName,
        selectedCity, setSelectedCity,
        selectedDistrict, setSelectedDistrict,
        phone, setPhone,
        phoneError, setPhoneError,
        emailId, setEmailId,
        domain, setDomain,
        selfDomain, setSelfDomain,
        selectSelfDomain, setSelectSelfDomain,
        handleSubmit,
        handleCheckId,
        memberFormValid
    } = UseMember();

    return (
        <>
        <Header/>

        <div className="member">
        
        {/* 회원가입 인사말 */}
            <div className="join-title"> 
                <h1>🐻 우리 함께해요</h1>
            </div>

        {/* 회원가입 기재사항 */}
            <div className="join-write">
            <img src="/img/peak-happy-bear.jpg" alt="정상에 도착해서 행복한 곰돌이와 동물친구들" className="img" />

                {/* input */} 
                <div className="join-input"ww>
                <label>* 아이디 (영문, 숫자만 가능)</label>
                    <div className="id-check-row">
                        <input
                            type="text"
                            placeholder="사용하고자 하는 아이디 입력"
                            value={id}
                            onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[A-Za-z0-9]+$/;
                                    if (value === "" || regex.test(value)){
                                        setId(value);
                                        setIdError(false);
                                    } else {
                                        setIdError(true);
                                    }
                                }}
                            required />                     
                        <button type="button" onClick={handleCheckId} className="double-id">중복확인</button>                      
                    </div>

                    {idError && (
                            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                                아이디는 영문과 숫자만 입력 가능합니다
                            </div>
                    )}

                    <label>* 비밀번호</label>
                    <input
                        type="password"
                        placeholder="사용하고자 하는 비밀번호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required /> 

                    <label>* 비밀번호 확인</label>
                    <input
                        type="password"
                        placeholder="비밀번호 입력"
                        value={passwordConfirm}
                        onChange={(e) => {
                            const value = e.target.value;
                            setPasswordConfirm(value);
                            setPasswordError(password !== value);
                        }}
                        required />

                    {passwordConfirm && password !== passwordConfirm && (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                        비밀번호가 일치하지 않습니다
                        </div>
                    )}

                    <label>* 이름</label>
                    <input
                        type="text"
                        placeholder="이름 입력"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required /> 

                    <label>* 주소 선택</label>
                    <div className="address-row">
                        <select className="address-select"
                            value={selectedCity}
                            onChange={(e) => {
                                setSelectedCity(e.target.value);
                                setSelectedDistrict("");
                            }}>
                                <option value="">시/도 선택</option>
                                {Object.keys(CityData).map((city) => (
                                    <option key={city} value={city}>{city}</option>
                            ))}
                        </select>

                        <select className="address-select"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!selectedCity}>
                                <option value="">구/군 선택</option>
                                    {selectedCity &&
                                    CityData[selectedCity].map((gugun) => (
                                        <option key={gugun} value={gugun}>{gugun}</option>
                            ))}
                        </select>
                    </div>

                    <label>전화번호 (선택 : 숫자만 입력가능)</label>
                    <input
                        type="text"
                        placeholder="전화번호 입력"
                        value={phone}
                        onChange={(e) => {
                            const value = e.target.value
                            const regex = /^[0-9]+$/;
                                if (value === "" || regex.test(value)){
                                    setPhone(value);
                                    setPhoneError(false);
                                } else {
                                    setPhoneError(true);
                                }
                                }}
                        required />

                    {phoneError && (
                            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                                숫자만 입력 가능합니다
                            </div>
                    )}

                    <label>* 이메일</label>
                        <div className="email-box">
                            <input
                                type="text" 
                                placeholder="이메일 아이디 입력"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)} required /> 

                            <span>@</span>

                            <select value={selectSelfDomain ? "custom" : domain}
                                onChange={(e) => {
                                    const value = e.target.value;
                                        if(value === "custom") {
                                            setSelectSelfDomain(true);
                                            setDomain("");
                                        } else {
                                            setSelectSelfDomain(false);
                                            setDomain(value);
                                        }
                                }} required>
                                    <option value="">선택</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="kakao.com">kakao.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="nate.com">nate.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="custom">직접입력</option>
                            </select>

                            {selectSelfDomain && (
                                <input type="text" placeholder="직접 입력"
                                    value={selfDomain}
                                    onChange={(e) => setSelfDomain(e.target.value)}
                                    className="email-self"
                                    required/>
                            )}                             
                        </div>
                </div>
            </div>
            <div className="member-button">
                <Link to="/">
                    <button>취소</button>    
                </Link>
                    <button onClick={handleSubmit} disabled={!memberFormValid}>회원가입</button>
            </div>
        </div>
        </>
    );
}

export default Member;