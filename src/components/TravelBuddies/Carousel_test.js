import React, { useState } from 'react'
import Slider from 'react-slick'
import Yilan001 from '../../images/travelBuddy/yilan_001.jpg'
import Yilan002 from '../../images/travelBuddy/yilan_002.jpg'
import Newtp001 from '../../images/travelBuddy/newtp_001.jpg'
import Newtp002 from '../../images/travelBuddy/newtp_002.jpg'
import Brunch001 from '../../images/travelBuddy/brunch_001.jpg'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const images = [Yilan001, Yilan002, Newtp001, Newtp002, Brunch001]

function Carousel() {
  const [imgIndex, setImgIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(images.length - 1)
  const [nextIndex, setNextIndex] = useState(imgIndex + 1)
  if (imgIndex <= 0) {
    setPrevIndex(images.length - 1)
  } else {
    setPrevIndex(imgIndex - 1)
  }

  if (imgIndex >= images.length - 1) {
    setNextIndex(0)
  } else {
    setNextIndex(imgIndex + 1)
  }

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="carousel-arrow carousel-arrow-left" onClick={onClick}>
        <FaArrowLeft />
      </div>
    )
  }

  const NextArrow = ({ onClick }) => {
    return (
      <div className="carousel-arrow carousel-arrow-right" onClick={onClick}>
        <FaArrowRight />
      </div>
    )
  }

  const settings = {
    infinite: true,
    lazyload: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    variableHeight: true,
    centerPadding: '250px',
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (current, next) => setImgIndex(next),
  }

  return (
    <>
      <div className="carousel-main">
        <Slider {...settings} className="carousel-outbox row">
          {images.map((img, i) => {
            var status = ''
            if (i === imgIndex) {
              status = 'carousel-active-slide'
            } else if (i === prevIndex) {
              status = 'carousel-prev-slide'
            } else if (i === nextIndex) {
              status = 'carousel-next-slide'
            }
            ;<div
              className={
                i === imgIndex ? 'carousel-active-slide' : 'carousel-prev-slide'
              }
            >
              <img src={img} alt={img} />
            </div>
          })}
        </Slider>
      </div>
    </>
  )
}

export default Carousel
