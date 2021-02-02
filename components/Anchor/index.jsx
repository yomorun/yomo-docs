import React, { useState, useEffect } from 'react'
import languageArr from './navlanguage'

const Anchor = ({ language }) => {
  const [scrolltop, setScrolltop] = useState()
  const [navdata, setNavdata] = useState([
    '1',
    '2',
    '3',
    '2',
    '3',
    '2',
    '3',
    '2',
    '3',
    '2',
    '3',
    '2',
    '3',
  ])

  useEffect(() => {
    document.onmousewheel = function (e) {
      getAnchorPoint(e)
    }
    //火狐浏览器
    document.addEventListener(
      'DOMMouseScroll',
      (e) => {
        getAnchorPoint(e)
      },
      false
    )
  })

  useEffect(() => {}, [scrolltop])

  const getAnchorPoint = (e) => {
    setScrolltop(document.documentElement.scrollTop || window.pageYOffset)
  }

  useEffect(() => {
    console.log(navdata)
  }, [navdata])

  useEffect(() => {
    console.log(languageArr.zh)
    if (language) {
      switch (language) {
        case 'zh':
          setNavdata(languageArr.zh)

          break
        case 'en':
          setNavdata(languageArr.en)

          break
        case 'jp':
          setNavdata(languageArr.jp)

          break

        default:
          break
      }
    }
  }, [])

  return (
    <>
      <div className="anchor_div">
        <div className="back-line"></div>

        <Ball
          text={navdata[0]}
          scrolltop={scrolltop}
          position={{ top: 0, bottom: 204 }}
        ></Ball>
        <Ball
          text={navdata[1]}
          scrolltop={scrolltop}
          position={{ top: 204, bottom: 687 }}
          small
        ></Ball>
        <Ball
          text={navdata[2]}
          scrolltop={scrolltop}
          position={{ top: 687, bottom: 2787 }}
          small
        ></Ball>
        <Ball
          text={navdata[3]}
          scrolltop={scrolltop}
          position={{ top: 2787, bottom: 3432 }}
          small
        ></Ball>
        <Ball
          text={navdata[4]}
          scrolltop={scrolltop}
          position={{ top: 3432, bottom: 4286 }}
          small
        ></Ball>
        <Ball
          text={navdata[5]}
          scrolltop={scrolltop}
          position={{ top: 4286, bottom: 4692 }}
        ></Ball>
        <Ball
          text={navdata[6]}
          scrolltop={scrolltop}
          position={{ top: 4692, bottom: 5194 }}
        ></Ball>
        <Ball
          text={navdata[7]}
          scrolltop={scrolltop}
          position={{ top: 5194, bottom: 5630 }}
        ></Ball>
      </div>
      <style jsx>
        {`
          .anchor_div {
            top: 100px;
            width: 400px;
            height: 600px;
            right: 80px;
            position: fixed;
            border-radius: 1em;
          }
          .back-line {
            position: absolute;
            height: 500px;
            width: 30px;
            background: #efefef;
            right: 16px;
            z-index: -1;
            border-radius: 1em;
          }
        `}
      </style>
    </>
  )
}

const Ball = ({ text, scrolltop, position, small }) => {
  const [isshow, setIsshow] = useState(false)
  useEffect(() => {
    if (position) {
      if (scrolltop >= position.top && scrolltop < position.bottom) {
        setIsshow(true)
      } else {
        setIsshow(false)
      }
    }
  })
    //锚
  // const handleAnthor=()=>{

  //   window.scrollTo(0,position.top);

  // }
  return (
    <div>
      <div className="ball_div">
        <div className={small ? 'ball_small_contain' : 'ball_contain'}>
          {small ? (
            <div
              className={isshow ? 'ball_small ball_small_change' : 'ball_small'}
            ></div>
          ) : (
            <div className={isshow ? 'ball ball_change' : 'ball'}></div>
          )}
        </div>

        <div
          className={isshow ? ' text tracking' : 'text'}
          style={{ display: isshow ? 'block' : 'none' }}
        >
          <p className={small ? 'small_P' : 'dap'}> {text}</p>
        </div>
      </div>
      <style jsx>{`
        .ball {
          border-radius: 50%;
          right: 20px;
          margin: auto;
          width: 18px;
          height: 18px;
          background: #aaa;
        }
        .ball_small {
          border-radius: 50%;
          right: 20px;
          margin: auto;
          width: 12px;
          height: 12px;
          background: #aaa;
        }
        .ball_change {
          transition: width 0.5s, height 0.5s;
          background: #7ed6ff;
          width: 24px;
          height: 24px;
          left: 2px;
        }
        .ball_small_change {
          transition: width 0.5s, height 0.5s;
          background: #7ed6ff;
          width: 18px;
          height: 18px;
          left: 2px;
        }
        .ball_div {
          display: flex;
          right: 0px;
          flex-direction: row-reverse;
        }
        .ball_contain {
          cursor: point;
          right: 20px;
          width: 24px;
          height: 24px;
          margin: 22px 20px;
        }
        .ball_small_contain {
          cursor: point;
          right: 20px;
          width: 20px;
          height: 20px;
          margin: 8px 22px;
        }
        .dap {
          margin: 0px;
          line-height:64px;
          font-weight: 600;
        }
        .small_P {
          margin: 0px;
          line-height:34px;
          font-weight: 600;
        }
        .tracking {
          animation: tracking 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;
        }
        @keyframes tracking {
          0% {
            letter-spacing: -0.5em;
            opacity: 0;
          }
          40% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default Anchor
