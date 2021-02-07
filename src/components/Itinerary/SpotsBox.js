import React, { useEffect } from 'react'
import { FaMapMarkerAlt, FaTimesCircle } from 'react-icons/fa' //  FaCar,FaTrain,FaWalking,
let testData = {
  order: 0,
  type: 0,
  title: '測試標題可以幾個字',
  time: '0900',
  lat: 24.96517,
  lng: 121.19192,
  image: '',
  info: '',
}

function SpotsBox({
  isEdit = false,
  data,
  index,
  dataFromUser,
  setDataFromUser,
  doDelete,
}) {
  const { title, begin } = data
  // const tempData = dataFromUser
  function handleTime(begin) {
    if (begin.length === 4) {
      let temp = Array.from(begin)
      temp.splice(2, 0, ':')
      return temp.join('')
    } else {
      return begin
    }
  }
  const inputTimeClass = `box-input-time time${index[0]}${index[1]}`
  const inputTitleClass = `box-input-title input${index[0]}${index[1]}`
  useEffect(() => {
    // if (isEdit && dataFromUser[0].data.length > 0) {
    if (isEdit) {
      if (
        document.querySelector(`.input${index[0]}${index[1]}`).value ===
          dataFromUser[index[0]].data[index[1]].title &&
        document.querySelector(`.time${index[0]}${index[1]}`).value ===
          handleTime(dataFromUser[index[0]].data[index[1]].begin)
      ) {
        return
      } else {
        document.querySelector(`.input${index[0]}${index[1]}`).value =
          dataFromUser[index[0]].data[index[1]].title
        document.querySelector(
          `.time${index[0]}${index[1]}`
        ).value = handleTime(dataFromUser[index[0]].data[index[1]].begin)
      }
    }
  }, [dataFromUser])

  const typeIcon = <FaMapMarkerAlt size={26} />
  const displyEdit = (
    <div className="spotsbox-wrapper custom-box-shadow d-flex justify-content-between align-items-center">
      <span className="spotsbox-type">{typeIcon}</span>
      <span className="spotsbox-content">
        <input
          className={inputTimeClass}
          type="time"
          onChange={(e) => {
            dataFromUser[index[0]].data[index[1]].begin = e.target.value
            setDataFromUser(dataFromUser)
          }}
        />
        <input
          className={inputTitleClass}
          type="text"
          maxLength="12"
          onChange={(e) => {
            dataFromUser[index[0]].data[index[1]].title = e.target.value
            setDataFromUser(dataFromUser)
          }}
        />
      </span>
      <span
        className="box-close-btn"
        onClick={() => {
          doDelete()
        }}
      >
        <FaTimesCircle size={20} />
      </span>
    </div>
  )
  const displyConst = (
    <div className="spotsbox-wrapper custom-box-shadow d-flex justify-content-between align-items-center">
      <span className="d-flex align-items-center">
        {typeIcon}
        &emsp; &emsp;
        <h3 className="d-inline">{begin}</h3>
      </span>
      <span className="w-100 text-center">
        <h4 className="d-inline">{title}</h4>
      </span>
    </div>
  )
  return isEdit ? displyEdit : displyConst
}

export default SpotsBox
// 檔案負責人: 柯政安
