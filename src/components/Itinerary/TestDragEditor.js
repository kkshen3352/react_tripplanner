import React, { useState } from 'react'
import SpotsBox from './SpotsBox'
import { Button } from 'react-bootstrap'
import { FaTimesCircle } from 'react-icons/fa'

//
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// SpotsBox({ isEdit, type = 0, title, time1, time2 })
//測試用假資料
import fakeTestingData from './testBoxData'

function ItinEditor({ boxData = fakeTestingData }) {
  const [tempData, setTempData] = useState(boxData)
  function handleOnDragEnd(result) {
    if (!result.destination) return
    console.log(result)
    const wrapSourceIndex = result.source.droppableId.substring(4)
    const wrapDestinIndex = result.destination.droppableId.substring(4)
    console.log(wrapSourceIndex)
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
    console.log(originArray)
    setTempData(originArray)
  }
  return (
    <div className="itin-editor-wrapper">
      <div className="itin-editor-title">
        <p>行程表製作</p>
        <input
          className="form-custom"
          type="text"
          placeholder="請輸入行程標題"
        />
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {tempData.map((data, dayIndex) => (
          <>
            <div key={dayIndex}>
              <div className="itin-editor-daybox d-flex justify-content-between align-items-center">
                <span>{data.title}</span>
                <span className="box-close-btn">
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
                      <Draggable
                        key={index}
                        draggableId={'box' + dayIndex + index}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="testDragBox"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <SpotsBox data={element} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" onClick={() => {}}>
                        +行程
                      </Button>
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </>
        ))}
      </DragDropContext>
    </div>
  )
}
//靜態介面留存
// {
//   return (
//     <>
//       <div className="itin-editor-wrapper">
//         <div className="itin-editor-title">
//           <p>行程表製作</p>
//           <input
//             className="form-custom"
//             type="text"
//             placeholder="請輸入行程標題"
//           />
//         </div>
//         {boxData.map((data, index) => (
//           <div key={index}>
//             <div className="itin-editor-daybox d-flex justify-content-between align-items-center">
//               <span>{data.title}</span>
//               <span className="box-close-btn">
//                 <FaTimesCircle size={26} />
//               </span>
//             </div>
//             <div className="itin-editor-spotsWapper">
//               {data.data.map((element, index) => (
//                 <SpotsBox key={index} data={element} />
//               ))}
//               <div className="d-flex justify-content-center">
//                 <Button variant="primary" onClick={() => {}}>
//                   +行程
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   )
// }
export default ItinEditor
