import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ItinEditorHeader from './ItinEditorHeader'
import ItinEditor from './ItinEditor'
import BigMap from './BigMap'
import Spinner from '../main/Spinner'
import NoData from '../main/NoData'
function ItinEditView({ isNew = true }) {
  let history = useHistory()
  const [dataFromUser, setDataFromUser] = useState([
    { title: '第 1 日', data: [] },
  ])
  const [isLoading, setIsLoading] = useState(1)
  const [title, setTitle] = useState()
  let { itin_id } = useParams()
  //取得行程資料
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
        setTitle(data[0].title)
        setDataFromUser(data[1])
        console.log(data[1])
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
  useEffect(() => {
    if (!isNew) {
      getDataFromDB()
    }
  }, [])
  //新增行程
  function handleDataToDB() {
    if (dataFromUser[0].data.length === 0) return
    let dataToDB = []
    let itinData = {
      id: itin_id,
      member_id: 1, //先預設會員0
      title: document.querySelector('.itin-title-input').value
        ? document.querySelector('.itin-title-input').value
        : '我的新行程',
      region: '',
      location: dataFromUser[0].data[0].location,
      duration: dataFromUser.length,
    }
    const boxData = dataFromUser
    boxData.forEach((element, indexDay) => {
      element.data.forEach((ele, indexBox) => {
        ele.day = indexDay
        ele.order = indexBox
      })
    })
    dataToDB = [itinData, boxData]
    sendDataToDB(dataToDB)
  }
  async function sendDataToDB(dataToDB) {
    let reqUrl = `http://localhost:5000/itinerary/createItin`
    let reqBody = {
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToDB),
    }
    if (!isNew) {
      reqUrl = `http://localhost:5000/itinerary/edit`
      reqBody.method = 'put'
    }
    try {
      const response = await fetch(reqUrl, reqBody)
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        history.push(`/itinerary/my/${data.itin_id}`)
      }
    } catch (err) {
      console.log('fetch err')
    }
  }
  const displayNewView = (
    <div className="itin-editview-wrapper">
      <BigMap dataFromUser={dataFromUser} setDataFromUser={setDataFromUser} />
      <ItinEditorHeader
        isEdit={true}
        isPublish={false}
        isMe={true}
        title={title}
        setTitle={setTitle}
        handleSubmit={handleDataToDB}
      />
      <ItinEditor
        isEdit={true}
        tempData={dataFromUser}
        setTempData={setDataFromUser}
        // dataFromUser={dataFromUser}
        // setDataFromUser={setDataFromUser}
      />
    </div>
  )
  // const displayEditView = <></>
  // return isNew ? displayNewView : displayEditView
  if (isNew) {
    return displayNewView
  } else {
    if (isLoading === 1) {
      return <Spinner text={'讀取中'} />
    } else if (isLoading === 0) {
      return displayNewView
    } else {
      return <NoData text={'查無此行程'} />
    }
  }
}

export default ItinEditView
