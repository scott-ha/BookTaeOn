// 'use strict';

var fs = require("fs");
var path = require("path");
var response, response_item, imgpath;
/* important */
// kakao response to class!!

module.exports = class myKakao {
  constructor() {
    this.data;
  }
  set setStext(data) {
      this.stext = data;
  }
  get SimpleText() {
    response = {
      "version": "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: this.stext,
            },
          },
        ],
      },
    };
    return response
  }
};

// img exist?
module.exports.check_img = function (img) {
  if (fs.existsSync(path.join(process.cwd(), "public", "img", img + ".jpg"))) {
    imgpath = encodeURI(img);
  } else {
    // need to image change
    imgpath = encodeURI("gachon");
  }
  // image path need to modify
  imgpath = "https://sg-attend-hnnwp.run.goorm.io/img/" + img + ".jpg";
  console.log(imgpath);
  return imgpath;
};
