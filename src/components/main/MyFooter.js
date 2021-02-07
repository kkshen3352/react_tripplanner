import React from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'

function MyFooter(props) {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>關於我們</h6>
              <p className="text-justify">
                旅歷本著<i>「誠實苦幹、精益求精、堅持品質、轉型升級」</i>
                之經營宗旨，加入台灣旅行業的經營行列。在董事長親率全體員工胼手胝足的努力下，歷經旅遊業的草創期、成長期、穩定期；迄今已
                30 年有成 。現有員工 730 員，2017 年營業淨額 64
                億元。更由於董事長堅持『旅遊高品質、價位中級化』：用心、誠信、專業的服務客群為理念，致力於當旅客的旅遊規劃師。更贏得所有客戶及業界一致的讚譽與肯定的口碑。
              </p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>服務中心</h6>
              <ul className="footer-links">
                <li>
                  <a href="http://google.com">線上客服</a>
                </li>
                <li>
                  <a href="http://google.com">常見問題</a>
                </li>
                <li>
                  <a href="http://google.com">隱私權政策</a>
                </li>
                <li>
                  <a href="http://google.com">Cookie政策</a>
                </li>
                <li>
                  <a href="http://google.com">服務條款</a>
                </li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>常見問題</h6>
              <ul className="footer-links">
                <li>
                  <a href="F">我們的新冠肺炎因應措施</a>
                </li>
                <li>
                  <a href="http://google.com">用戶支援</a>
                </li>
                <li>
                  <a href="http://google.com">退訂選項</a>
                </li>
                <li>
                  <a href="http://google.com">夥伴服務</a>
                </li>
                <li>
                  <a href="http://google.com">信任與安全</a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p>
                Travel Planner &copy; 2021 All Rights Reserved by
                <a href="/">隱私</a>·<a href="/">相關條款</a>·
                <a href="/">網站地圖</a>
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <a className="facebook" href="/">
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a className="twitter" href="/">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a className="dribbble" href="/">
                    <FaYoutube />
                  </a>
                </li>
                <li>
                  <a className="linkedin" href="/">
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default MyFooter
