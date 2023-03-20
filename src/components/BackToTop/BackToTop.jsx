import React, { useEffect } from 'react'


const BackToTop = () => {

    const [ isVisible, setIsVisible ] = useState(false)

    const handleBackTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    const handleScroll = () =>{
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

        if(winScroll > 120) {
            setIsVisible(true)
        } else{
            setIsVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })
  return (
    <>
    {isVisible && (
        <div onClick={handleBackTop}>BackToTop</div>
    )}
    </>
  )
}

export default BackToTop