import React from 'react'

import { FaShoppingCart, FaRegCheckSquare } from 'react-icons/fa'
import { GoCreditCard } from 'react-icons/go'
import { MdKeyboardArrowRight } from 'react-icons/md'
import './cash.scss'

function IconRouter(props) {
  return (
    <>
      <div className="icons">
        <div className="mycar">
          <FaShoppingCart />
          <p>我的購物車</p>
        </div>

        <MdKeyboardArrowRight className="arrow" />

        <div className="howpay">
          <GoCreditCard />
          <p>付款方式</p>
        </div>

        <MdKeyboardArrowRight className="arrow" />

        <div className="okok">
          <FaRegCheckSquare />
          <p>訂單完成</p>
        </div>
      </div>
    </>
  )
}
export default IconRouter
