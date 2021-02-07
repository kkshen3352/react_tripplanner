import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

//引入 API key
// import { Key } from '../../Key'

//marker元件
const PlaceMarker = ({ id, title }) => (
  <div className="map-markerWrap d-flex flex-column align-items-center">
    <div
      className={`map-marker-info display-info custom-box-shadow markerInfo${id}`}
    >
      <h5>{title}</h5>
    </div>
    <div className="d-flex flex-column align-items-center">
      <img
        className="map-markerIcon"
        src={'/images/marker.png'}
        alt={title}
        onClick={(e) => {
          e.stopPropagation()
          if (document.querySelector('.map-info-open')) {
            if (
              document.querySelector('.map-info-open') ===
              document.querySelector(`.markerInfo${id}`)
            ) {
              document
                .querySelector('.map-info-open')
                .classList.remove('map-info-open')
              return
            } else {
              document
                .querySelector('.map-info-open')
                .classList.remove('map-info-open')
            }
          }
          document
            .querySelector(`.markerInfo${id}`)
            .classList.add('map-info-open')
        }}
      />
      <h5>{title}</h5>
    </div>
  </div>
)

//本體
function DisplayMap({
  center,
  zoom = 18, //越大放越大
  size = '100',
  boxData,
}) {
  //
  //   預設位置
  const [myPosition, setMyPosition] = useState({
    lat: Number(boxData[0].data[0].lat),
    lng: Number(boxData[0].data[0].lng),
  })
  //
  //地圖樣式
  //   const mapOptions = { styles: null } //包含原生POI
  //
  //建立鉤子
  const [mapApiLoaded, setMapApiLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  // const [mapApi, setMapApi] = useState(null)
  const [currentCenter, setCurrentCenter] = useState(center)
  //
  // 當地圖載入完成，將地圖實體與地圖 API 傳入 state 供之後使用
  const apiHasLoaded = (map, maps) => {
    setMapInstance(map) //map = 地圖實體
    // setMapApi(maps) //maps = 各種map API
    setMapApiLoaded(true)
  }
  //處理改變中心點
  const handleCenterChange = () => {
    if (mapApiLoaded) {
      const newPosition = {
        lat: mapInstance.center.lat(),
        lng: mapInstance.center.lng(),
      }
      //   setCurrentCenter(newPosition) // 改變地圖視角位置
      setMyPosition(newPosition) // 改變 MyPosition
    }
  }
  function handleBoxList(originData) {
    if (originData.length < 1) return originData
    let returnData = []
    originData.forEach((element) => {
      element.data.forEach((ele) => {
        returnData.push(ele)
      })
    })
    return returnData
  }
  return (
    <div className={size === '100' ? 'itin-display-map' : 'map-comp-wrapper'}>
      <GoogleMapReact
        bootstrapURLKeys={{
          // key: Key,
          libraries: ['places'], // 要在這邊放入要使用的 API
        }}
        // center={currentCenter}
        onBoundsChange={handleCenterChange} //移動地圖邊界時觸發 handleCenterChange
        defaultCenter={myPosition}
        defaultZoom={zoom}
        // options={mapOptions}
        yesIWantToUseGoogleMapApiInternals // 設定為 true
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)} // 載入完成後執行
        onClick={() => {
          if (document.querySelector('.map-info-open')) {
            document
              .querySelector('.map-info-open')
              .classList.remove('map-info-open')
          }
        }}
      >
        {handleBoxList(boxData).map((item) => (
          <PlaceMarker
            key={item.id}
            id={item.place_id}
            lat={item.lat} //JSON引入版本
            lng={item.lng}
            title={item.title}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default DisplayMap
