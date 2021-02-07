import React from 'react'
function NoData({ text }) {
  return (
    <div className="d-flex flex-column align-items-center my-5">
      <figure>
        <img src="/images/noData.png" alt="no data" />
      </figure>
      <h2>{text}</h2>
    </div>
  )
}

export default NoData
