class slideShow {
    #target

    constructor(options) {
        if (!options) return
        this.#target = options.target
        if (!this.#target) return

        this.display = document.createElement("div")
        this.#target.appendChild(this.display)

        this.time = options.time
        this.content = typeof options.content === "object" ? options.content : ["Exapmawd", "default"]
        this.i = 1
        this.scrolling = false
        this.display.classList.add("slideshow")

        this.display.innerHTML = "<div class='displayed'>" + this.content[0] + "</div>"
        this.display.style.height = this.display.firstChild.offsetHeight + "px"

        if (this.time) {
            this.interval = setInterval(() => {
                this.slide(1)
            }, this.time * 1000)
        }
    }
    slide(d) {
        if (this.scrolling) return
        if (!d) d = 1
        d = clamp(Math.round(d), -1, 1)
        let temp = document.createElement("div")
        temp.className = "displayed"
        temp.innerHTML = this.content[this.i] ?? "ex"
        let maxH
        if (d > 0) {
            this.display.appendChild(temp)
            maxH = Math.max(this.display.firstChild.offsetHeight, temp.offsetHeight)
            this.display.firstChild.style.height = maxH + "px"
        }
        else {
            this.display.insertBefore(temp, this.display.firstChild)
            maxH = Math.max(this.display.children[1].offsetHeight, temp.offsetHeight)
            this.display.children[1].style.height = maxH + "px"
        }
        temp.style.height = maxH + "px"
        this.display.style.height = maxH + "px"
        this.display.scroll({
            top: d * this.display.offsetHeight,
            behavior: "smooth"
        })
        this.scrolling = true

        this.i = (this.i + d) % this.content.length
        return checkScroll(this.display).then(data => {
            this.scrolling = false
            if (d > 0) {
                this.display.removeChild(this.display.firstChild)
            }
            else {
                this.display.removeChild(this.display.children[1])
            }
        })
    }

    getTarget() {
        return this.#target
    }
}

function clamp(n, min, max) {
    return Math.max(Math.min(n, max), min)
}

function checkScroll(el) {
    let key = el.constructor.name === "Window" ? ["scrollX", "scrollY"] : ["scrollLeft", "scrollTop"]
    let old = [el[key[0]] + 10, el[key[1]] + 10]
    return new Promise((res, rej) => {
        let interval = setInterval(() => {
            if (el[key[0]] === old[0] && el[key[1]] === old[1]) {
                clearInterval(interval)
                res()
            }
            old = [el[key[0]], el[key[1]]]
        }, 100)
    })
}