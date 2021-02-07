import React from 'react'
import { Button } from 'react-bootstrap'
import { FaTruckMonster } from 'react-icons/fa'
import { useHistory, useParams } from 'react-router-dom'
import BasicFetch from '../main/BasicFetch'

function ItinEditorHeader({
  isEdit = false,
  isPublish = false,
  isMe = false,
  title = '行程表',
  setTitle,
  handleSubmit,
}) {
  let history = useHistory()
  let { itin_id } = useParams()
  const displayPublish = (
    <div className="itin-editor-title publish-title d-flex justify-content-between">
      <div>
        {isEdit && <h2>發表我的行程表</h2>}
        <h1>{title}</h1>
      </div>
      {isEdit && (
        <div className="d-flex align-items-center">
          <Button
            variant="info"
            onClick={() => {
              handleSubmit()
            }}
          >
            送出
          </Button>
          <Button
            variant="danger"
            onClick={(e) => {
              history.goBack()
            }}
          >
            取消
          </Button>
        </div>
      )}
      {isMe && !isEdit && (
        <div className="d-flex align-items-center">
          <Button
            variant="info"
            onClick={() => {
              history.push(`/itinerary/publish/${itin_id}`)
            }}
          >
            修改
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (
                BasicFetch({
                  url: `itinerary/unpublish/${itin_id}`,
                  method: 'put',
                  data: { id: itin_id },
                })
              ) {
                history.push(`/itinerary/my/${itin_id}`)
              }
            }}
          >
            取消發布
          </Button>
        </div>
      )}
    </div>
  )
  const displayPrivate = (
    <div className="itin-editor-title custom-box-shadow">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {isEdit ? <p>行程表製作</p> : <p>我的行程表</p>}
        {isEdit ? (
          <span>
            <Button
              variant="info"
              onClick={() => {
                handleSubmit()
              }}
            >
              送出
            </Button>
            <Button
              variant="danger"
              onClick={(e) => {
                history.goBack()
              }}
            >
              取消
            </Button>
          </span>
        ) : (
          <div className="d-flex align-items-center justify-content-between">
            <span>
              <Button
                variant="info"
                onClick={() => {
                  history.push(`/itinerary/edit/${itin_id}`)
                }}
              >
                修改
              </Button>
              <Button
                variant="info"
                onClick={() => {
                  history.push(`/itinerary/publish/${itin_id}`)
                }}
              >
                發布
              </Button>
            </span>
          </div>
        )}
      </div>
      {isEdit ? (
        <input
          className="form-custom itin-title-input"
          type="text"
          placeholder="請輸入行程標題"
          defaultValue={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
      ) : (
        <h2>{title}</h2>
      )}
    </div>
  )
  return <>{isPublish ? displayPublish : displayPrivate}</>
}

export default ItinEditorHeader
