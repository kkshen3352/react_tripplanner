import React, { useEffect, useState } from 'react'
import SpotsBox from './SpotsBox'
import ConfirmBox from '../main/ConfirmBox'
import { FaTimesCircle, FaPlusCircle } from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
//
//測試用假資料
import fakeTestingData from './testBoxData'

function ItinEditor({
  isEdit = false,
  tempData = fakeTestingData,
  setTempData,
}) {
  // const [tempData, setTempData] = useState(boxData)
  //
  //處理confirm
  const [modalShow, setModalShow] = useState(false)
  const [modalType, setModalType] = useState(<></>)
  function createModal(props) {
    setModalType(
      <ConfirmBox
        show={modalShow}
        onHide={setModalShow}
        resetdom={setModalType}
        {...props}
      />
    )
  }
  useEffect(() => {
    if (modalType !== <></>) {
      setModalShow(true)
    }
  }, [modalType])
  //
  //處理bar開關
  const classIsClose = [
    'itin-editor-daybox d-flex justify-content-between align-items-center',
    'itin-editor-daybox d-flex justify-content-between align-items-center daybox-close',
  ]
  //處理box選擇
  const classIsSelect = ['testDragBox', 'testDragBox box-select']
  //拖曳後處理數據
  function handleOnDragEnd(result) {
    if (!result.destination) return
    const wrapSourceIndex = result.source.droppableId.substring(4)
    const wrapDestinIndex = result.destination.droppableId.substring(4)
    const originArray = Array.from(tempData)
    const [reorderItem] = originArray[wrapSourceIndex].data.splice(
      result.source.index,
      1
    )
    originArray[wrapDestinIndex].data.splice(
      result.destination.index,
      0,
      reorderItem
    )
    setTempData(originArray) //當下所有數據
    console.log(originArray)
  }
  function dayPlus() {
    const originArray = Array.from(tempData)
    const nowDay = originArray.length
    originArray.push({ title: `第 ${nowDay + 1} 日`, data: [] })
    setTempData(originArray)
  }
  function dayDelete(day) {
    const originArray = Array.from(tempData)
    const nowDay = originArray.length
    if (nowDay <= 1) {
      return
    } else {
      originArray.splice(day, 1)
      setTempData(originArray)
    }
  }
  function boxDelete(day, box) {
    const originArray = Array.from(tempData)
    originArray[day].data.splice(box, 1)
    setTempData(originArray)
  }
  const displayEdit = (
    <div className="itin-editor-wrapper custom-box-shadow">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {tempData.map((data, dayIndex) => (
          <div key={dayIndex}>
            <div
              onClick={(e) => {
                if (e.target.className === classIsClose[0]) {
                  e.target.className = classIsClose[1]
                } else if (e.target.className === classIsClose[1]) {
                  e.target.className = classIsClose[0]
                } else {
                  return
                }
              }}
              className={classIsClose[0]}
            >
              <span>{`第 ${dayIndex + 1} 日`}</span>
              <span
                className="box-close-btn"
                onClick={() => {
                  if (tempData.length > 1) {
                    createModal({
                      header: '請再次確認',
                      text: `是否刪除第 ${dayIndex + 1} 日？`,
                      cb: dayDelete,
                      cbprops: [dayIndex],
                    })
                  }
                }}
              >
                <FaTimesCircle size={26} />
              </span>
            </div>
            <Droppable droppableId={'wrap' + dayIndex}>
              {(provided) => (
                <div
                  className="itin-editor-spotsWapper"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {data.data.map((element, index) => (
                    <div key={index}>
                      <Draggable
                        draggableId={'box' + dayIndex + index}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className={classIsSelect[0]}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <SpotsBox
                              index={[dayIndex, index]}
                              data={element}
                              isEdit={isEdit}
                              dataFromUser={tempData}
                              setDataFromUser={setTempData}
                              doDelete={() => {
                                createModal({
                                  header: '請再次確認',
                                  text: `是否刪除此行程？`,
                                  cb: boxDelete,
                                  cbprops: [dayIndex, index],
                                })
                              }}
                            />
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ))}
                  {provided.placeholder}
                  {/* <div className="d-flex justify-content-center">
                    <Button variant="primary" onClick={() => {}}>
                      +行程
                    </Button>
                  </div> */}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
      <div className="itin-editor-daybox dayPlus d-flex align-items-center">
        <span onClick={dayPlus}>
          <FaPlusCircle size={26} />
        </span>
      </div>
      {modalType}
    </div>
  )
  const displayNotEdit = (
    <div className="itin-editor-wrapper custom-box-shadow">
      {tempData.map((data, dayIndex) => (
        <div key={dayIndex}>
          <div
            onClick={(e) => {
              if (e.target.className === classIsClose[0]) {
                e.target.className = classIsClose[1]
              } else if (e.target.className === classIsClose[1]) {
                e.target.className = classIsClose[0]
              } else {
                return
              }
            }}
            className={classIsClose[0]}
          >
            <span>{data.title}</span>
          </div>
          <div className="itin-editor-spotsWapper">
            {data.data.map((element, index) => (
              <div
                key={index}
                className={classIsSelect[0]}
                onClick={(e) => {
                  document
                    .querySelectorAll('.itin-detailPicText-show')
                    .forEach((element) => {
                      element.classList.remove('itin-detailPicText-show')
                    })
                  if (document.querySelector('.box-select')) {
                    document.querySelector('.box-select').className =
                      classIsSelect[0]
                  }
                  e.currentTarget.className = classIsSelect[1]
                  if (document.querySelector(`.boxInfo${dayIndex}${index}`))
                    document
                      .querySelector(`.boxInfo${dayIndex}${index}`)
                      .classList.add('itin-detailPicText-show')
                  if (document.querySelector(`.dayTitle${dayIndex}`))
                    document
                      .querySelector(`.dayTitle${dayIndex}`)
                      .classList.add('itin-detailPicText-show')
                }}
              >
                <SpotsBox
                  index={[dayIndex, index]}
                  data={element}
                  isEdit={isEdit}
                  dataFromUser={tempData}
                  setDataFromUser={setTempData}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
  return isEdit ? displayEdit : displayNotEdit
}

export default ItinEditor
// 檔案負責人: 柯政安
