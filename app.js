const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/set-cookie", (req, res) => { // 클라이언트에게 쿠키 전달
  let expires = new Date();
  expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정

  res.cookie("name", "sparta", {
    // name, value
    expires: expires,
  });
  return res.status(200).end();
});

app.get("/get-cookie", (req, res) => { // 클라이언트가 서버에 전달한 정보 받아서 출력
 // const cookie = req.headers.cookie; // req.headers 클라이언트가 요청한 req 헤더
 const cookies = req.cookies; // cookie-parser 미들웨어 사용
  console.log(cookies); // name = sparta
  return res.status(200).json({ cookies });
});

// 사용자의 정보를 저장할 자물쇠 => 데이터를 저장하는 부분
let session = {}; // Key - Value()
app. get('/set-session', (req, res) => {
    const name = "sparta"; // 세션에 저장할 데이터
    const uniqueInt = Date.now(); // 사용자의 현재시간 할당 => 클라이언트에게 할당한 열쇠
    session[uniqueInt] = name; // 세션에 데이터 저장
    
    res.cookie("sessionKey", uniqueInt);
    res.status(200).end();

});

app.get('/get-session', (req, res)=>{
    const {sessionKey} = req.cookies; // 사용자의 쿠키정보를 받음
    const sessionItem = session[sessionKey] // session을 sessionKey 쿠키로 열어 결과값 할당

    console.log(sessionItem);
    return res.status(200).json({sessionItem : sessionItem});
});

app.listen(5002, () => {
  console.log(5002, "포트로 서버가 실행되었습니다.");
});
