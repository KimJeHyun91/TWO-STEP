import axios from "axios";
import { useState } from "react";

export const UseMember = () => {
  const [id, setId] = useState("");
  const [idError,setIdError] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [name, setName] = useState("");

  const [selectedCity, setSelectedCity] = useState(""); 
  const [selectedDistrict, setSelectedDistrict] = useState(""); 

  const [phone, setPhone] = useState(""); 
  const [phoneError, setPhoneError] = useState(false);

  const [emailId, setEmailId] = useState("");  
  const [domain, setDomain] = useState("");  
  const [selfDomain, setSelfDomain] = useState("");  
  const [selectSelfDomain, setSelectSelfDomain] = useState(false);  

  const handleSubmit = () => {
    const fullEmail = `${emailId}@${selectSelfDomain ? selfDomain : domain}`;
    const fullAddress = `${selectedCity}${selectedDistrict}`;

      axios({
        method:"post"
        , url:"/member/enroll"
        , data:{
          member_id: id,
          member_password: password,
          member_name: name,
          member_address: fullAddress,
          member_phone: phone,
          member_email: fullEmail,
        },
      })
        .then((result)=>{
          console.log("회원가입 결과:", result.data);
            if (result.data === 1000) {
              alert("회원가입에 성공하였습니다");
            } else if (result.data === 1001) {
              alert("회원가입 실패! 다시 시도 해주세요");
            }
      })     
        .catch((error) => {
          console.error("회원가입 실패:", error);
          alert("회원가입 실패! 다시 시도 해주세요");
    });
  };

  const handleCheckId = () => {
    if (!id) {
      alert("아이디를 먼저 입력하세요!");
      return;
    }

    axios({
      method:"get"
      , url:"/member/id_check"
      , params:{
        member_id: id,
      },
    })
    .then((result)=>{
      console.log("중복확인 결과:", result.data);
        if (result.data === 1020) {
          alert("사용 가능한 아이디입니다")
          setIdCheck(true);
        } else if (result.data === 1021) {
          alert("이미 사용중인 아이디입니다")
          setIdCheck(false);
        }
    })
    .catch((error) => {
      console.error("중복확인 실패:", error);
      alert("서버 오류로 중복확인 실패! 다시 시도 해주세요");
    });

    console.log("아이디 중복확인 시도");
    console.log("현재 입력한 아이디:", id);
  };

  const memberFormValid =
    id &&
    !idError &&
    idCheck &&
    password &&
    passwordConfirm &&
    !passwordError &&
    name &&
    selectedCity &&
    selectedDistrict &&
    emailId &&
    (domain || selfDomain);

  return {
    id, setId,
    idError, setIdError,
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
    memberFormValid,
  };
};
