import React from 'react'
import { BarLoader, HashLoader } from 'react-spinners'

function Loading({ loader }) {

  return (
    <>
      {loader === 1 &&
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-4 rounded-lg'>
          <HashLoader
            color='#F765A3'
            size={150}
            speedMultiplier={0.8} />
        </div>}
      {loader === 2 &&
        <div className=''>
          <BarLoader
            color="#F765A3"
          />
        </div>
      }
    </>


  )
}

export default Loading
