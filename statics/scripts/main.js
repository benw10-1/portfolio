window.addEventListener('load', () => {
    setTimeout(() => {
        window.scroll({
            left: -window.scrollX,
            top: -window.scrollY,
            behavior: "auto"
        })
    }, 5)
    
    loadEls()
    window.addEventListener('keydown', event => {
        if (keyHandler[event.key]) keyHandler[event.key]()
    })
    window.addEventListener("wheel", (event) => {
        if (event.target.tagName == "SECTION") {
            if (event.wheelDelta > 0) slide("u")
            else slide("d")
        }
    })
})

window.addEventListener('resize', event => {
    selected = 0
    loadArrows()
    loadArrows("Intro")
    window.scroll({
        left: -window.scrollX,
        top: -window.scrollY,
        behavior: "auto"
    })
})
