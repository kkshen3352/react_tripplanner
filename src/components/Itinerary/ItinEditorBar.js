import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function ItinEditorBar() {
  let history = useHistory()
  return (
    <div className="itin-editbar-wrapper">
      <div className="itin-editbar-btnwapper custom-box-shadow d-flex justify-content-around">
        {/* <Button variant="primary" onClick={() => {}}>
          總覽
        </Button> */}
        <Button variant="info" onClick={() => {}}>
          儲存
        </Button>
        <Button
          variant="danger"
          onClick={(e) => {
            history.push('/itinerary/')
          }}
        >
          放棄
        </Button>
      </div>
      <input className="form-custom" type="text" />
      <p className="itin-editbar-searchresult">測試待選</p>
      <p className="itin-editbar-searchresult">測試待選</p>
    </div>
  )
}

export default ItinEditorBar
