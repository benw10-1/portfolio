loadImages(imgS)

window.addEventListener('load', () => {
    if (!ismob()) {
        window.requestAnimationFrame(_ => {
            window.scroll(window.innerWidth, 0)
            if ('scrollBehavior' in document.documentElement.style) loadEls()
            else loadMobile()
        })
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
