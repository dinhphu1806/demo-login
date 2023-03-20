import React from 'react'
import loader from '../../assets/images/loading.gif';

const styleLoader= {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
}
const styleImg = {
  with: '50%',
  height: '50%',
  objectFit: 'cover'
}
const Loading = () => {
  return (
    <div className='loader' style={{position: 'relative', width: '100%', height: '100vh'}}>
        <div className="loader__container" style={styleLoader}>
            <img src={loader} style={styleImg} alt="" />
        </div>
        
    </div>
  )
}

export default Loading