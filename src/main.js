require("@babel/polyfill");
let { ismob, loadEls, loadMobile, loadImages, imgS } = require("./base")

window.addEventListener("load", function () {
    if (!ismob()) {
        if ("scrollBehavior" in document.documentElement.style) {
            loadEls()
            window.requestAnimationFrame(_ => {
                window.scroll(window.innerWidth, 0)
            })
        }
        else loadMobile()
    }
    else loadMobile()
})

loadImages(imgS)