import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function TBMineButtonDeleteNoMembers() {
  const [tbMineDeleteNo, settbMineDeleteNo] = useState(false)
  return (
    <>
      <Button
        className="tbmine-button-delete"
        onClick={() => settbMineDeleteNo(true)}
      >
        刪除
      </Button>{' '}
      <Modal
        size="lg"
        show={tbMineDeleteNo}
        onHide={() => settbMineDeleteNo(false)}
        aria-labelledby="tbMineDeleteNo"
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title id="tbMineDeleteNo" className="tbmine-delete-title">
              您確定要刪除此旅行揪團嗎？
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="" className="tbmine-button-delete-cancel">
              取消
            </Button>
            <Button variant="" className="tbmine-button-delete-confirm">
              確定
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default TBMineButtonDeleteNoMembers
