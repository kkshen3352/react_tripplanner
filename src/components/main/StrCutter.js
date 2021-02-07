//字元切割器
//輸入字串與期望長度(全形)，可返回處理過的字串
//半形符號可能會有誤差，英文長句實際會比預想的短一點
function StrCutter(str, cutLength) {
  let outputString = ''
  if (str === '') {
    return outputString
  } else {
    let strLenth = 0
    let strArray = Array.from(str)
    let breakPoint = 0
    for (let i = 0; i < strArray.length; ++i) {
      if (strLenth >= cutLength * 2) {
        breakPoint = i - 1
        break
      }
      if (strArray[i].match(/[^x00-xff\s(),.'"#!$&]/)) {
        strLenth += 2
      } else {
        strLenth++
      }
    }
    if (breakPoint > 0) {
      outputString = strArray.slice(0, breakPoint).join('')
      outputString += '...'
    } else {
      outputString = str
    }
  }

  return outputString
}

export default StrCutter
//檔案負責人 柯政安
