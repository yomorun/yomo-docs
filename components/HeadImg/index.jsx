import React from 'react'

const HeadImg = () => {
  return (
    <div>
      <div className='img_div'>
      <img src="/171.svg"></img>
      <img src="/121.svg"></img>
      <img src="/201.svg"></img>
      <img src="/206.svg"></img>

      </div>
      <style jsx>
        {`
          img {
            width: 4em;
            height: 4em;
            margin: 1em;
          }
          .img_div {
            display: flex;
            justify-content: center;
          }
        
        `}
      </style>
    </div>
  )
}

export default HeadImg
