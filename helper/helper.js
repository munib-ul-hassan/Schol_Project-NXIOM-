const fs = require("fs");
const mime = require("mime");

//for upload profile pics
function uploadImage(profilePics, foldername) {
  const matches = profilePics.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  const response = {};

  if (matches.length !== 3) {
    return res.status(200).json({
      status: "0",
      data: "{}",
      message: "Profile Pics Invalid Input string",
    });
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  let extension = mime.getExtension(type);
  let fileName = Date.now() + "image." + extension;

  try {
    fs.writeFileSync(foldername + fileName, imageBuffer, "utf8");
    return fileName;
  } catch (e) {
    next(e);
  }
}

function createOtp(lenght) {
  var text = "";
  var possible = "0123456789";

  for (var i = 0; i < lenght; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = { uploadImage, createOtp, validateEmail };
