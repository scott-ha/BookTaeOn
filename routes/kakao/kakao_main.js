const express = require("express");
const router = express.Router();
const request = require("request");
var myKakao = require("./myKakao");

var kakao, kakao_res, test_text;

// for test parameter
// 추후 main 서버로 이전
var ISBN_NUM = "9788970508863"; // 8970508864 ISBN은 한 책당 항상 두개!

// /api/kakao
router.post("/", function (req, res, next) {
  kakao = new myKakao();

  test_text =
    "[북테온] 판매 도서 정보 안내\n" +
    "도서명: 삼국유사\n" +
    "지은이: 일연\n" +
    "옮긴이: 김원중\n" +
    "출판사: 민음사\n" +
    "출판날짜: 2008\n" +
    "ISBN: " +
    ISBN_NUM +
    "\n";
  ("신규 도서를 확인하세요!\n");

  //set
  kakao.setDes = test_text;
  kakao.setWeblink =
    "https://booktaeon-mzfyh.run.goorm.io/api/kakao/book/detail?ISBN=" +
    ISBN_NUM;
  //get
  kakao_res = kakao.BasicCard;
  console.log(kakao_res);
  res.json(kakao_res);
});

/* ------------------------------------------------------ */
// 추후 main 서버로 기능 코드 이전 0421
// KAKAO API 도서 검색 BY ISBN
const API_INFO = {
  url: "https://dapi.kakao.com/v3/search/book",
  AUTH_KEY: "cdb9619875c94bd69dd7754a6d303642",
};
var result, data;
// /api/kakao/book/detail?ISBN=
router.get("/book/detail", async function (req, res, next) {
  ISBN_NUM = req.query.ISBN;
  result = await BookSearch(ISBN_NUM);
  result = JSON.parse(result);
  console.log(result);
  result = {
    authors: result.documents[0].authors[0],
    contents: result.documents[0].contents,
    isbn: result.documents[0].isbn,
    thumbnail: result.documents[0].thumbnail,
    title: result.documents[0].title,
  };
  res.render("book_detail", { result: result });
  result = "";
  // res.send(result.documents[0].authors);
});

function BookSearch(ISBN_NUM) {
  return new Promise((resolve, reject) => {
    // request to kakao API
    request(
      {
        url: API_INFO.url,
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "KakaoAK " + API_INFO.AUTH_KEY,
        },
        form: {
          query: ISBN_NUM,
        },
      },
      function (err, res, r) {
        try {
          console.log("----kakao api---");
          console.log(r);
          resolve(r);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      }
    );
  });
}
/* ------------------------------------------------------ */
module.exports = router;
