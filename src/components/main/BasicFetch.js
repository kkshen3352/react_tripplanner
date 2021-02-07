async function BasicFetch({ url, method = 'get', data = {} }) {
  let reqBody = { method: method }
  if (method !== 'get') {
    reqBody = {
      method: method,
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  }
  try {
    const response = await fetch(`http://localhost:5000/${url}`, reqBody)
    if (response.ok) {
      let data = await response.json()
      console.log(reqBody)
      if (data.length > 0) {
        return true
      } else {
        return false
      }
    }
  } catch (err) {
    alert('無法得到伺服器資料，請稍後再重試')
    console.log(err)
  }
}

export default BasicFetch
