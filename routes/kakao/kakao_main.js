const express = require("express");
const router = express.Router();
var myKakao = require("./myKakao");

var kakao, kakao_res, test_text;
// /api/kakao
router.post("/", function (req, res, next) {
  kakao = new myKakao();

  test_text =
    "알림톡 도착\n[북테온] 판매 도서 정보 안내\n" +
    "도서명: 삼국유사\n" +
    "지은이: 일연\n" +
    "옮긴이: 김원중\n" +
    "출판사: 민음사\n" +
    "출판날짜: 2008\n" +
    "ISBN: 9788937461668\n" +
    "신규 도서를 확인하세요!\n";
    
  //set
  kakao.setDes = test_text;
  //get
  kakao_res = kakao.BasicCard;
  console.log(kakao_res);
  res.json(kakao_res);
});

module.exports = router;
