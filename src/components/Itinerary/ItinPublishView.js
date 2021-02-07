import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ItinEditorHeader from './ItinEditorHeader'
import ItinEditorBasicData from './itinEditorBasicData'
import ItinEditor from './ItinEditor'
import ItinEditorDetail from './ItinEditorDetail'
import Spinner from '../main/Spinner'
import NoData from '../main/NoData'
//測試用假資料區
// import fakeTestingData from './testBoxData' //純box陣列
// let memberData = require('../member/member.json')
// let fakeMemberData = memberData[2].data[0] //純member陣列
// let cardData = require('./testJsonData.json')
// let fakeCardData = cardData[2].data[0] //純行程陣列
// let fakeUserId = 0 //預設使用者為0號
//
function ItinPublishView({ isEdit = false }) {
  const [dataFromDB, setgDataFromDB] = useState([])
  const [isLoading, setIsLoading] = useState(1)
  const [isPublish, setIsPublish] = useState(true)
  const [isMe, setIsMe] = useState(false)
  let { itin_id } = useParams()
  let history = useHistory()
  async function getDataFromDB() {
    try {
      const response = await fetch(
        `http://localhost:5000/itinerary/${itin_id}`,
        {
          method: 'get',
          mode: 'cors',
        }
      )
      if (response.ok) {
        const data = await response.json()
        setgDataFromDB(data)
        if (JSON.parse(localStorage.getItem('userData'))) {
          if (
            data[0].member_id ===
            JSON.parse(localStorage.getItem('userData')).newsId
          ) {
            setIsMe(true)
          }
        }
        if (data[0].publish_time === null) {
          setIsPublish(false)
        }
        setTimeout(() => {
          if (data.length === 0) {
            setIsLoading(3)
          } else {
            setIsLoading(0)
          }
        }, 0)
      }
    } catch (err) {
      console.log('fetch err')
    }
  }
  async function handleDataToDB() {
    let dataReadyToSend = []
    let dataItin = {
      id: dataFromDB[1][0].data[0].itinerary_id,
      info: document.querySelector('.itin-basicdata-text').value,
      imageIndex:
        '-1' && document.querySelector('input[name="itin-kv"]:checked').value,
    }
    let dataBox = []
    let formData = new FormData()
    for (let i = 0; i < dataFromDB[1].length; i++) {
      for (let j = 0; j < dataFromDB[1][i].data.length; j++) {
        let text = document.querySelector(`.textarea-${i}${j}`).value
        let image = false
        if (document.querySelector(`.itin-input-${i}${j}`).files[0]) {
          let imgFile = document.querySelector(`.itin-input-${i}${j}`)
          formData.append('file', imgFile.files[0])
          image = true
        }
        dataBox.push({
          day: i,
          order: j,
          image: image,
          text: text,
        })
      }
    }
    try {
      let reqUrl = `http://localhost:5000/upload/itinBox`
      let reqBody = {
        method: 'post',
        body: formData,
      }
      const response = await fetch(reqUrl, reqBody)
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        dataBox.forEach((item) => {
          if (item.image === true) {
            item.image = `${data.url}` + data.name.shift()
          } else {
            item.image = null
          }
        })
        dataReadyToSend = [dataItin, dataBox]
        console.log(dataReadyToSend)
        sendDataToDB(dataReadyToSend)
      }
    } catch (err) {
      console.log('fetch err')
    }
  }
  async function sendDataToDB(dataToDB) {
    let reqUrl = `http://localhost:5000/itinerary/publish/${itin_id}`
    let reqBody = {
      method: 'put',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToDB),
    }
    try {
      const response = await fetch(reqUrl, reqBody)
      if (response.ok) {
        const data = await response.json()
        let tempData = dataFromDB
        tempData[0].publish_time = data.time
        tempData[0].info = dataToDB[0].info
        dataToDB[1].forEach((item) => {
          if (item.text !== tempData[1][item.day].data[item.order].info) {
            tempData[1][item.day].data[item.order].info = item.text
          }
          if (item.image !== null) {
            tempData[1][item.day].data[item.order].image = item.image
          }
        })
        setgDataFromDB(tempData)
        setIsPublish(true)
        isEdit = false
        history.push(`/itinerary/view/${itin_id}`)
      }
    } catch (err) {
      console.log('fetch err')
    }
  }
  async function unPublish(itin_id) {
    let reqUrl = `http://localhost:5000/itinerary/unpublish/${itin_id}`
    let reqBody = {
      method: 'put',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itin_id),
    }
    try {
      const response = await fetch(reqUrl, reqBody)
      if (response.ok) {
        history.push(`/itinerary/my/${itin_id}`)
      }
    } catch (err) {
      console.log('fetch err')
    }
  }

  const displayView = dataFromDB.length > 0 && (
    <div className="itin-editor-frame">
      <ItinEditorHeader
        isEdit={isEdit}
        isPublish={true}
        isMe={isMe}
        title={dataFromDB[0].title}
        handleSubmit={isEdit ? handleDataToDB : unPublish}
      />
      <main className="d-flex justify-content-between">
        <div>
          <ItinEditorBasicData
            isEdit={isEdit}
            isPublish={isPublish}
            itinData={dataFromDB[0]}
          />
          <ItinEditor
            isEdit={false} //任何情況下的publish頁都不需要修改功能
            tempData={dataFromDB[1]}
          />
        </div>
        <div>
          <ItinEditorDetail isEdit={isEdit} boxData={dataFromDB[1]} />
        </div>
      </main>
    </div>
  )

  useEffect(() => {
    getDataFromDB()
  }, [])

  if (isLoading === 0) {
    return displayView
  } else if (isLoading === 1) {
    return <Spinner text={'讀取中'} />
  } else {
    return <NoData text={'查無此行程'} />
  }
}

export default ItinPublishView
