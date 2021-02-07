import React from 'react'
import DisplayMap from './DisplayMap'
//測試用假資料
import fakeTestingData from './testBoxData'
import PicUploadRect from './PicUploadRect'
//
function ItinEditorDetail({
  isEdit = true,
  boxData = fakeTestingData,
  setData = () => {},
}) {
  const displayEdit = (
    <div className="itin-detail-wrapper custom-box-shadow">
      <div className="itin-map-header"></div>
      <div className="itin-detail-map-wrapper">
        <DisplayMap
          boxData={boxData}
          center={{
            lat: Number(boxData[0].data[0].lat),
            lng: Number(boxData[0].data[0].lng),
          }}
        />
      </div>
      <hr />
      {boxData.map((element, index) => (
        <h4 className={`dayTitle${index}`} key={index}>
          {element.title}
        </h4>
      ))}
      <form id="detailForm" method="post">
        {boxData.map((element, indexDay) => (
          <div key={indexDay}>
            {element.data.map((ele, indexBox) => {
              let nomalClass = `itin-detail-pictext-wrapper boxInfo${indexDay}${indexBox}`
              let defaultCheck = `itin-detail-pictext-wrapper boxInfo${indexDay}${indexBox} itin-detailPicText-show`
              return (
                <div
                  className={
                    indexDay === 0 && indexBox === 0 ? defaultCheck : nomalClass
                  }
                  key={indexBox}
                >
                  <p>{ele.title}</p>
                  <div className="itin-detail-checkKV">
                    {indexDay === 0 && indexBox === 0 ? (
                      <input
                        defaultChecked
                        type="radio"
                        name="itin-kv"
                        value={`${indexDay}${indexBox}`}
                      />
                    ) : (
                      <input
                        type="radio"
                        name="itin-kv"
                        value={`${indexDay}${indexBox}`}
                      />
                    )}
                    設為主視覺
                  </div>
                  <PicUploadRect
                    originPic={ele.image}
                    giveClassName={{
                      input: `itin-input-${indexDay}${indexBox}`,
                      img: `PicInfo${indexDay}${indexBox}`,
                      wrap: 'detailPic',
                    }}
                  />
                  <textarea
                    className={`textarea-${indexDay}${indexBox}`}
                    placeholder="您可以在此輸入心得或描述"
                    defaultValue={ele.info}
                  />
                </div>
              )
            })}
          </div>
        ))}
      </form>
    </div>
  )
  const displayConst = (
    <div className="itin-detail-wrapper custom-box-shadow">
      <div className="itin-map-header"></div>
      <div className="itin-detail-map-wrapper">
        <DisplayMap
          boxData={boxData}
          center={{
            lat: Number(boxData[0].data[0].lat),
            lng: Number(boxData[0].data[0].lng),
          }}
        />
      </div>
      <hr />
      {boxData.map((element, index) => (
        <h4 className={`dayTitle${index}`} key={index}>
          {element.title}
        </h4>
      ))}
      <form id="detailForm">
        {boxData.map((element, indexDay) => (
          <div key={indexDay}>
            {element.data.map((ele, indexBox) => {
              let nomalClass = `itin-detail-pictext-wrapper boxInfo${indexDay}${indexBox}`
              let defaultCheck = `itin-detail-pictext-wrapper boxInfo${indexDay}${indexBox} itin-detailPicText-show`
              return (
                <div
                  className={
                    indexDay === 0 && indexBox === 0 ? defaultCheck : nomalClass
                  }
                  key={indexBox}
                >
                  <p>{ele.title}</p>
                  {ele.image === '' || ele.image === null ? (
                    <></>
                  ) : (
                    <div className="detailPic">
                      <img
                        src={`http://localhost:5000/images/${ele.image}`}
                        alt={ele.title}
                      />
                    </div>
                  )}
                  <div className="showInfoText">
                    <p>{ele.info}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </form>
    </div>
  )
  return isEdit ? displayEdit : displayConst
}

export default ItinEditorDetail
