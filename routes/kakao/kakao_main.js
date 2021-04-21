const express = require("express");
const router = express.Router();
const request = require("request");
var myKakao = require("./myKakao");

var kakao, kakao_res, alarm_text, book_r;

// for test parameter
// 추후 main 서버로 이전
var ISBN_NUM = "9791187142560"; // 8970508864 ISBN은 한 책당 항상 두개!

// test 앎림톡 before
// /api/kakao
router.post("/", async function (req, res, next) {
  kakao = new myKakao();
  book_r = await BookSearch(ISBN_NUM);
  book_r = JSON.parse(book_r);
  book_r = {
    authors: book_r.documents[0].authors[0],
    contents: book_r.documents[0].contents,
    isbn: book_r.documents[0].isbn,
    thumbnail: book_r.documents[0].thumbnail,
    title: book_r.documents[0].title,
    publisher: book_r.documents[0].publisher,
    datetime: book_r.documents[0].datetime,
  };

  alarm_text =
    "[북테온] 신규 도서 등록 안내\n" +
    "도서명: " + book_r.title + "\n" +
    "지은이: " + book_r.authors + "\n" +
    "출판사: " + book_r.publisher + "\n" +
    "출판날짜: " + book_r.datetime + "\n" +
    "ISBN: " +
    ISBN_NUM +
    "\n" +
    "신규 도서를 확인하세요!\n";

  //set
  kakao.setDes = alarm_text;
  kakao.setWeblink =
    "https://booktaeon-mzfyh.run.goorm.io/api/kakao/book/detail?ISBN=" +
    ISBN_NUM;
  //get
  kakao_res = kakao.BasicCard;
  console.log(kakao_res);

  res.json(kakao_res);

  // initialize
  kakao_res = "";
  kakao = "";
  alarm_text = "";
  book_r = "";
});

// test 앎림톡 after
// /api/kakao
router.post("/after", async function (req, res, next) {
  kakao = new myKakao();
  book_r = await BookSearch(ISBN_NUM);
  book_r = JSON.parse(book_r);
  book_r = {
    authors: book_r.documents[0].authors[0],
    contents: book_r.documents[0].contents,
    isbn: book_r.documents[0].isbn,
    thumbnail: book_r.documents[0].thumbnail,
    title: book_r.documents[0].title,
    publisher: book_r.documents[0].publisher,
    datetime: book_r.documents[0].datetime,
  };

  alarm_text =
    "[북테온] 판매 도서 정보 안내\n" +
    "도서명: " + book_r.title + "\n" +
    "지은이: " + book_r.authors + "\n" +
    "출판사: " + book_r.publisher + "\n" +
    "출판날짜: " + book_r.datetime + "\n" +
    "ISBN: " +
    ISBN_NUM +
    "\n" +
    "고객명 : 홍길동\n" +
    "배송지 : 서울시 강남구"
    ;

  //set
  kakao.setDes = alarm_text;
  kakao.setWeblink =
    "https://booktaeon-mzfyh.run.goorm.io/api/kakao/book/detail?ISBN=" +
    ISBN_NUM;
  //get
  kakao_res = kakao.BasicCard;
  console.log(kakao_res);

  res.json(kakao_res);

  // initialize
  kakao_res = "";
  kakao = "";
  alarm_text = "";
  book_r = "";
});

// barcode Read
// /api/kakao/barcode
router.post("/barcode", async function (req, res, next) {
  var barcode = req.body.action.params.barcode;
  barcode = JSON.parse(barcode);
  barcode = barcode.barcodeData;
  // console.log(barcode.barcodeData);
  kakao = new myKakao();
  book_r = await BookSearch(barcode);
  book_r = JSON.parse(book_r);
  book_r = {
    authors: book_r.documents[0].authors[0],
    contents: book_r.documents[0].contents,
    isbn: book_r.documents[0].isbn,
    thumbnail: book_r.documents[0].thumbnail,
    title: book_r.documents[0].title,
    publisher: book_r.documents[0].publisher,
    datetime: book_r.documents[0].datetime,
  };
  console.log(book_r);
  console.log("===============");
  console.log(book_r.isbn);
  console.log(barcode);
  console.log(ISBN_NUM);
  if (ISBN_NUM.includes(barcode)) {
    kakao_res = {
      version: "2.0",
      template: {
        outputs: [
          {
            carousel: {
              type: "basicCard",
              items: [
                {
                  thumbnail: {
                    imageUrl: book_r.thumbnail,
                    fixedRatio: true,
                  },
                },
                {
                  title: book_r.title,
                  description:
                    "저자 : " +
                    book_r.authors +
                    "\n출판사 : " +
                    book_r.publisher +
                    "\nISBN : " +
                    book_r.isbn +
                    "\n출판날짜 : " +
                    book_r.datetime,
                },
              ],
            },
          },
          {
            carousel: {
              type: "basicCard",
              items: [
                {
                  title: "등록된 도서입니다.👍 ",
                  buttons: [
                    {
                      action: "block",
                      label: "도서 등록하기 🟢",
                      blockId: "607f9df2f1a09324e4b37ebb",
                    },
                  ],
                },
              ],
            },
          },
        ],
        quickReplies: [
          {
            action: "block",
            label: "이전으로",
            blockId: "607efc0af1a09324e4b37c58",
          },
          {
            action: "block",
            label: "🏠 홈으로",
            blockId: "607efc0af1a09324e4b37c58",
          },
        ],
      },
    };
    res.json(kakao_res);
    kakao_res = "";
    kakao = "";
  } else {
    kakao_res = {
      version: "2.0",
      template: {
        outputs: [
          {
            carousel: {
              type: "basicCard",
              items: [
                {
                  thumbnail: {
                    imageUrl: book_r.thumbnail,
                    fixedRatio: true,
                  },
                },
                {
                  title: book_r.title,
                  description:
                    "저자 : " +
                    book_r.authors +
                    "\n출판사 : " +
                    book_r.publisher +
                    "\nISBN : " +
                    book_r.isbn +
                    "\n출판날짜 : " +
                    book_r.datetime,
                },
              ],
            },
          },
          {
            carousel: {
              type: "basicCard",
              items: [
                {
                  title: "등록되지 않은 도서입니다. ",
                  buttons: [
                    {
                      action: "block",
                      label: "바코드 다시 인식하기 🔴",
                      blockId: "60497e2db908ae1e731ef137",
                    },
                  ],
                },
              ],
            },
          },
        ],
        quickReplies: [
          {
            action: "block",
            label: "이전으로",
            blockId: "607efc0af1a09324e4b37c58",
          },
          {
            action: "block",
            label: "🏠 홈으로",
            blockId: "607efc0af1a09324e4b37c58",
          },
        ],
      },
    };
    res.json(kakao_res);
    book_r = "";
    kakao_res = "";
    kakao = "";
  }
});

router.post("/book_count", function (req, res, next) {
  var count = req.body.action.params.book_count;
  count = JSON.parse(count);
  count = count.amount;
  console.log(count);
  kakao_res = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: count + "권 입력하셨습니다.",
          },
        },
        {
          carousel: {
            type: "basicCard",
            items: [
              {
                title: "1 번째 도서 상태",
                buttons: [
                  {
                    action: "block",
                    label: "상 🔵",
                    blockId: "607fa7f374273b74cee395c7",
                  },
                  {
                    action: "block",
                    label: "중 🟡",
                    blockId: "607fa7f374273b74cee395c7",
                  },
                  {
                    action: "block",
                    label: "하 🔴",
                    blockId: "607fa7f374273b74cee395c7",
                  },
                ],
              },
              {
                title: "2 번째 도서 상태",
                buttons: [
                  {
                    action: "block",
                    label: "상 🔵",
                    blockId: "607fa7f374273b74cee395c7",
                  },
                  {
                    action: "block",
                    label: "중 🟡",
                    blockId: "607fa7f374273b74cee395c7",
                  },
                  {
                    action: "block",
                    label: "하 🔴",
                    blockId: "607fa7f374273b74cee395c7",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  };
  res.json(kakao_res);
  kakao_res = "";
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
