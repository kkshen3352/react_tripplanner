import React from 'react'

import { pathnameList, pathnameTextList } from './BreadCrumbRouter'

// 高階元件樣式(HOC)，增強元件用的
import { withRouter, Link } from 'react-router-dom'

function MyBreadCrumb(props) {
  const { location } = props

  const convertPathname2Text = (pathname) => {
    const index = pathnameList.findIndex((v, i) => v === pathname)
    return index > -1 ? pathnameTextList[index].split('/') : ''
  }

  const formatText = (textArray) => {
    return textArray.length > 1 ? (
      <>
        <li className="breadcrumb-item">{textArray[0]}</li>
        <li className="breadcrumb-item active" aria-current="page">
          {textArray[1]}
        </li>
      </>
    ) : (
      <>
        <li className="breadcrumb-item active" aria-current="page">
          {textArray[0]}
        </li>
      </>
    )
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          {formatText(convertPathname2Text(location.pathname))}
        </ol>
      </nav>
    </>
  )
}

export default withRouter(MyBreadCrumb)
