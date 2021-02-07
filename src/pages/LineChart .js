import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'

function LineChart() {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          {/* email */}
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>email</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="請輸入email"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {/* 密碼 */}
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>密碼</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="請輸入密碼"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {/* 姓名 */}
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>姓名</Form.Label>
            <Form.Control
              type="text"
              placeholder="請輸入姓名"
              aria-describedby=""
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {/* 地區 */}
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>地區</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {/* 電話 */}
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>電話</Form.Label>
            <Form.Control type="text" placeholder="" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {/* 出生日期 */}
        <Form.Row>
          <Form.Group as={Col} md="2" controlId="validationCustom05">
            <Form.Label>出生日期</Form.Label>
            <Form.Control type="date" placeholder="" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {/* 性別 */}
        <Form>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              checked
            />
            <label className="form-check-label" for="flexRadioDefault1">
              男性
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
            />
            <label className="form-check-label" for="flexRadioDefault2">
              女性
            </label>
          </div>
        </Form>
        {/* 暱稱 */}
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>暱稱</Form.Label>
            <Form.Control required type="text" placeholder="" defaultValue="" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {/* 自我介紹 */}
        <Form.Row>
          <Form.Group
            className="Med-Input-height"
            as={Col}
            md="4"
            controlId="validationCustom01"
          >
            <Form.Label>自我介紹</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="我是大木小智"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Button type="submit">Submit form</Button>
      </Form>
    </>
  )
}

export default LineChart
