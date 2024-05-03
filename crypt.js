const CryptoJS = require("crypto-js");
require('dotenv').config()


let key = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_KEY);
let iv = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_IV);

 const encryptData = (data, action,keys) => {
    if (keys) {
        key = CryptoJS.enc.Utf8.parse(keys.key);
        iv = CryptoJS.enc.Utf8.parse(keys.iv);
    }
  let plainText = "";
  if (typeof data === "string") {
    plainText = data;
  } else {
    plainText = JSON.stringify(data);
  }
  const encryptedData = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(plainText),
    key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const result = {
    data: encryptedData.toString(),
  };
  if (action) {
    return encryptedData.toString();
  } else {
    return result;
  }
};

const decryptData = (encryptedText,keys) => {
  if (keys) {
    key = CryptoJS.enc.Utf8.parse(keys.key);
    iv = CryptoJS.enc.Utf8.parse(keys.iv);
}
    const encryptedtext = encryptedText.data||encryptedText.encryptedText
    if (!encryptedtext) {
        return null;
    }
  const decryptedData = CryptoJS.AES.decrypt(encryptedtext, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  
  if (decryptedData) {
    const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);

if(decryptedText)
    {    return JSON.parse(decryptedText);

    }else{
        return null
    }
  } else {
    return null;
  }
};


module.exports = {
    encryptData,
    decryptData,
    };
