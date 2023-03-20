import React, { useEffect, useRef} from 'react'

const Sticky = () => {

    const headerRef = useRef(null)

    const handleScroll = () => {
        if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            headerRef.current.clasList.add("sticky")
        } else{
            headerRef.current.clasList.remove("sticky")
        }
    }

   useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll". handleScroll)
   })
    
  return (
    <div className='header'>
        <div className="header__container"ref={headerRef}></div>
    </div>
  )
}

export default Sticky