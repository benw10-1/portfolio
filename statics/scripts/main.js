window.addEventListener('load', () => {
    // window.scroll({
    //     left: -window.scrollX,
    //     top: -window.scrollY,
    //     behavior: "smooth"
    // })
    loadEls()
    loadImages()
    genWork()
})

window.addEventListener('keydown', event => {
    if (event.key === " ") {
        let d = document.querySelector(".project")

    }

    if (event.key === "ArrowRight") {
        slide("r")
    }
    if (event.key === "ArrowLeft") {
        slide("l")
    }
    if (event.key === "ArrowDown") {
        slide("d")
    }
    if (event.key === "ArrowUp") {
        slide("u")
    }
})
window.addEventListener('resize', event => {
    window.scroll({
        left: -window.scrollX,
        top: -window.scrollY,
        behavior: "smooth"
    })
})
