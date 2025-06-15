import { useState } from "react";
import axios from "axios";

export const UseLogin = () => {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = () => {
    if (!loginId || !loginPassword) {
      alert("아이디와 비밀번호를 정확히 입력하세요!")
      return;
    };

    axios ({
      method:"get"
      , url:"/member/login"
      , params:{
        member_id: loginId,
        member_password: loginPassword,
      },
    })
      .then((result)=>{
        if (result.data === 1010) {
        localStorage.setItem("loginUserId", loginId);  
        alert("로그인 성공");   
          if (loginId === "admin") {
            window.location.href = "/admin";
          } else {
            window.location.href="/";  
          }           
      } else if (result.data === 1011) {
        alert("존재하지 않는 아이디입니다!");
      } else if (result.data === 1012) {
        alert("비밀번호가 틀렸습니다!");
      } else if (result.data === 1900) {
        alert("아이디 또는 비밀번호를 입력해주세요!");
      } else {
        alert("알 수 없는 에러입니다!");
      }
    })
      .catch((error) => {
        console.error("로그인 실패:", error);
        alert("아이디 또는 비밀번호가 일치하지 않습니다");
    });
  };

  return {
    loginId, setLoginId,
    loginPassword, setLoginPassword,
    handleSubmit,
  };
};