import React, { useState } from 'react'
import Card from './Card'
import Pages from './Pages'
import { Col, Row, Container } from 'react-bootstrap'
//測試資料可以做成JSON檔之後用這個方式引入
//
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()
//
let cardData = require('../Itinerary/testJsonData.json')
let handleTestData = cardData[2].data
//
//
function CardListPublic({
  data = handleTestData,
  type = 'itinerary',
  itemPerPage = 9,
}) {
  let [showRange, setShowRange] = useState([0, itemPerPage])
  let dataLength = data.length
  let totalPage = Math.floor(dataLength / itemPerPage) + 1
  if (dataLength % itemPerPage === 0) totalPage -= 1
  function changePage(orderPage) {
    setShowRange([(orderPage - 1) * itemPerPage, orderPage * itemPerPage])
    window.scrollTo(0, 0)
  }
  let display = <></>
  if (type === 'itinerary') {
    display = data.map((element, index) => {
      if (index < showRange[0] || index >= showRange[1]) {
        return null
      } else {
        return (
          <Col key={index} xs={6} md={4}>
            <Card
              imgFrom={'back'}
              id={element.itin_id}
              title={element.title}
              text={element.info}
              duration={element.duration}
              location={element.location}
              image={element.image}
              person={element.nickname}
              like={element.heart}
              mark={element.keep}
            />
          </Col>
        )
      }
    })
  } else if (type === 'travelBuddies') {
    display = data.map((element, index) => (
      <Col key={index} xs={6} md={4}>
        <Card
          id={element.id}
          title={element.title}
          location={'中壢市'} //此行連接後端後請修正
          image={'testImage.jpg'} //此行連接後端後請修正
          time1={element.time1}
          time2={element.time2}
          duration={element.duration}
          person={'王大明'} //此行連接後端後請修正
          like={element.heart}
          mark={element.keep}
        />
      </Col>
    ))
  }
  return (
    <div
      data-aos-easing="ease-in"
      data-aos="fade-in"
      data-aos-delay="50"
      data-aos-duration="800"
    >
      <div>
        <Row>{display}</Row>
        <Pages pages={totalPage} changePage={changePage} />
      </div>
    </div>
  )
}
export default CardListPublic
// 檔案負責人: 柯政安
