var scrolling, images, myWork

const rows = 2, columns = 2

function slide(d, done=() => {}) {
    if (scrolling) return
    else scrolling = true

    let dest = [Math.floor(window.scrollX), Math.floor(window.scrollY)]

    if (d === "r") {
        dest[0] = Math.floor(Math.min(window.scrollX + window.innerWidth, window.innerWidth * columns))
        window.scroll({
            left: window.innerWidth,
            behavior: "smooth"
        })
        checkScroll(dest).then(data => {
            done()
        })
    }
    if (d === "l") {
        dest[0] = Math.floor(Math.max(window.scrollX - window.innerWidth, 0))
        window.scroll({
            left: -window.innerWidth,
            behavior: "smooth"
        })
        checkScroll(dest).then(data => {
            done()
        })
    }
    if (d === "d") {
        dest[1] = Math.min(window.scrollY + window.innerHeight, window.innerHeight * rows)
        window.scroll({
            top: window.innerHeight,
            behavior: "smooth"
        })
        checkScroll(dest).then(data => {
            done()
        })
    }
    if (d === "u") {
        dest[1] = Math.max(window.scrollY - window.innerHeight, 0)
        window.scroll({
            top: -window.innerHeight,
            behavior: "smooth"
        })
        checkScroll(dest).then(data => {
            done()
        })
    }
}

function checkScroll() {
    let old = [window.scrollX + .1, window.scrollY + .1]
    return new Promise((res, rej) => {
        let interval = setInterval(() => {
            if (window.scrollX === old[0] && window.scrollY === old[1]) {
                clearInterval(interval)
                scrolling = false
                res("yes")
            }
            old = [window.scrollX, window.scrollY]
        }, 50)
    })
}

function showArrows() {

}

function loadImages() {
    images = {}
    const imgs = ["github.png", "img.jpg", "logo.png"]

    for (const item of imgs) {
        let img = new Image()
        img.src = "../images/" + item
        images[item.split(".")[0]] = img
    }
}

function loadEls() {
    myWork = document.getElementById("work")
}

function genWork(work) {
    work = work ?? {
        name: "Pollution Map",
        about: "Random Text",
        images: ["../images/logo.png"],
        repo: "https://github.com/benw10-1/bluerSkies",
        deployed: "https://benw10-1.github.io/bluerSkies/"
    }
    let container = document.createElement("div")
    container.className = "project"
    myWork.appendChild(container)
    
    let overlay = document.createElement("div")
    overlay.className = "proj-over over-hide"
    let toggleOver = function (event) {
        overlay.classList.toggle("over-hide")
    }
    overlay.addEventListener("mouseenter", toggleOver)
    overlay.addEventListener("mouseleave", toggleOver)
    container.appendChild(overlay)
    
    let inner = document.createElement("div")
    inner.className = "proj-inner"
    inner.style.backgroundImage = "url(" + work["images"][0] + ")"
    container.appendChild(inner)

    let link = document.createElement("span")
    link.className = "lnk"
    link.innerHTML = work["name"]
    link.addEventListener("click", () => {
        window.open(work["deployed"])
    })
    overlay.appendChild(link)

    let info = document.createElement("span")
    info.className = "lnk"
    info.innerHTML = "Info"
    info.addEventListener("click", event => {
        return
    })
    overlay.appendChild(info)

    let gh = images["github"].cloneNode()
    gh.width = "25"
    gh.height = "25"
    gh.style.cursor = "pointer"
    gh.addEventListener("click", () => {
        window.open(work["repo"])
    })
    overlay.appendChild(gh)
}