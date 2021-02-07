import React from 'react'
import {
  FaMapMarkerAlt,
  FaRegCalendarCheck,
  FaRegClock,
  FaEye,
} from 'react-icons/fa'
function ItinEditorBasicData({ itinData, isEdit = false, isPublish }) {
  let timeAll
  let timeClock
  if (isPublish) {
    timeAll = Array.from(itinData.publish_time.substr(0, 8))
    timeAll.splice(6, 0, '/')
    timeAll.splice(4, 0, '/')
    timeClock = Array.from(itinData.publish_time.substr(8))
    timeClock.splice(2, 0, ':')
  }
  const headData = (
    <div className="itin-basic-headdata d-flex justify-content-between align-items-center w-100 my-1">
      <span>
        <FaRegCalendarCheck />
        &emsp;
        {timeAll}
      </span>
      <span>
        <FaRegClock />
        &emsp;
        {timeClock}
      </span>
      <span>
        <FaEye />
        &emsp;
        {itinData.view}
      </span>
    </div>
  )
  return (
    <div className="itin-BasicData-wapper custom-box-shadow">
      <div className="itin-BasicData-head d-flex justify-content-between">
        <figure className="itin-BasicData-avatar">
          <img
            src={`http://localhost:5000/images/member/${itinData.member_photo_id}`}
            alt={itinData.member_name}
          />
        </figure>
        <div className="w-100 d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-between align-items-center w-100 my-1">
            <h4 className="itin-BasicData-member">{itinData.member_name}</h4>
            <div className="itin-BasicData-area">
              <p className="itin-BasicData-label content-small">
                <FaMapMarkerAlt />
                <span> {itinData.region}</span>
              </p>
              <p className="itin-BasicData-label content-small">
                <FaMapMarkerAlt />
                <span> {itinData.location}</span>
              </p>
            </div>
          </div>
          {!isEdit && headData}
        </div>
      </div>
      <hr />
      {isEdit ? (
        <textarea
          className="itin-basicdata-text"
          placeholder="行程簡介"
          defaultValue={itinData.info}
        />
      ) : (
        <p>{itinData.info}</p>
      )}
    </div>
  )
}

export default ItinEditorBasicData
