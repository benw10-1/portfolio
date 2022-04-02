loadImages(imgS)

window.addEventListener('load', () => {
    if (!isMobile) {
        setTimeout(() => {
            window.scroll(window.innerWidth, 0)
            const old = window.scrollX
            window.scroll({
                left: old + 100,
                behavior: "smooth"
            })
            setTimeout(() => {
                if (window.scrollX === old) loadMobile()
                else loadEls()
                window.scroll(old, 0)
            }, 100)
        }, 5)
    }
    else loadMobile()
    
    window.addEventListener('keydown', event => {
        if (event.target.tagName !== "BODY") return
        if (keyHandler[event.key]) keyHandler[event.key]()
    })
    window.addEventListener("wheel", (event) => {
        if (event.target.tagName == "SECTION") {
            if (event.wheelDelta > 0) slide("u")
            else slide("d")
        }
    })
})
