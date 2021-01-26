import React from 'react'

const ScrollDown = (prop) => {
  return (
    <div>
      <span>{prop.content}</span>
      <div className="img_div">
        <img src="/downArrow.svg"></img>
        <img src="/downArrow.svg"></img>
        <img src="/downArrow.svg"></img>
      </div>
      <style jsx>
        {`
          img {
            width: 2.5em;
            height: 2.5em;
            margin: 1em;
          }
          .img_div {
            display: flex;
            justify-content: center;
          }
          span {
            display: block;
            text-align: center;
            margin-top: 2em;
          }
        `}
      </style>
    </div>
  )
}

export default ScrollDown
