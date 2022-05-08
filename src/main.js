require("@babel/polyfill");
let { ismob, loadEls, loadMobile, loadImages, imgS } = require("./base")

window.addEventListener("load", function () {
    let d = this.document.querySelector(".intro")
    console.log(d)
    try {
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
        throw "No error"
    }
    catch (err) {
        console.log(err)
        d.innerHTML = String(err)
    }
})

loadImages(imgS)