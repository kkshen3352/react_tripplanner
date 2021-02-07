import React, { useState } from 'react'

function TravelBuddiesLiked() {
  const [liked, setLiked] = useState(0)
  const [count, setCount] = useState(100)

  const tbLiked = (value) => {
    if (value === 0) {
      setLiked(1)
      setCount(count + 1)
    } else {
      setLiked(0)
      setCount(count - 1)
    }
  }

  return (
    <>
      <div className="d-flex tb-liked-wrapper">
        <span onClick={() => tbLiked(liked)}>{liked === 1 ? '♥' : '♡'}</span>
        <div>{count}</div>
      </div>
    </>
  )
}
export default TravelBuddiesLiked
