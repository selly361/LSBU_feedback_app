import { useEffect, useState } from 'react'

const useScreenSize = () => {

    const [isMobileSize, setMobileSize] = useState(false)
    const [isTabletSize, setTabletSize] = useState(false)
    const [isDesktopSize, setDesktopSize] = useState(false)


    useEffect(() => {
        
        function handleScreenChange(){
            setDesktopSize(window.innerWidth > 1068)
            setTabletSize(window.innerWidth < 1068 && window.innerWidth > 480)
            setMobileSize(window.innerWidth < 480)
        }


        handleScreenChange()

        
        window.addEventListener("resize", handleScreenChange)
        
        return () => window.removeEventListener("resize", handleScreenChange)

        
    }, [])
    

    return { isMobileSize, isTabletSize, isDesktopSize }
}

export { useScreenSize }