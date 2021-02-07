import React from 'react'
//測試用父元件框，可以不要管
function TestWrap(props) {
  return (
    <>
      <main role="main" className="flex-shrink-0 test-wrap">
        <div className="container">{props.children}</div>
      </main>
    </>
  )
}

export default TestWrap
// 檔案負責人: 柯政安
