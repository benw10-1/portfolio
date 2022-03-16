var scrolling, images, myWork, logo, ssEl, ss, social, me, icons, info, selected, bod, arrows

const rows = 2, columns = 2
const qs = [["Talent wins games, but teamwork and intelligence win championchips.", "Michael Jordan"], 
["Live as if you were to die tomorrow. Learn as if you were to live forever.", "Mahatma Gandhi"], 
["The person who says it cannot be done should not interrupt the person who is doing it.", "Chinese Proverb"],
["Success is liking yourself, liking what you do, and liking how you do it.", "Maya Angelou"]]

const socialS = [["github", "https://github.com/benw10-1"], 
["linkedIn", "https://www.linkedin.com/in/benjamin-wirth-10/"], 
["email", "benjaminwirth4@gmail.com"], 
["discord", "benjamin10#1851"], 
["hackerRank", "https://www.hackerrank.com/benjaminwirth10"], 
["leetcode", "https://leetcode.com/ben_wirth10/"]]
const baseWords = ["love", "JavaScript", "developer", "Python", "documentation", "API", "modular code", "Node", "js", "summary", "passionate"]
const ics = ["info", "python", "javascript"]
const punc = /[.,\/#!$%\^&\*;:{}=\-_`~()\"\'“”]+/g
const txt = {
    "info": genAbout("I'm a self-taught software/web developer born and raised in California. \
I got into computer programming when I saw YouTube videos of people making simple games like Snake using JavaScript in 5 minutes \
(which is still crazy to me). I didn't know about Node.js before I started web development, so I ended up starting with Python \
because it was independant from a browser. Python has taught me that there is a module/framework for everything and that even though there is a module \
for everything, it doesn't mean the documentation is user-friendly. I love exploring new concepts and this curiosity has pushed me through hours of reading \
documentation for APIs and libraries and this has become a skill that I am proud of. I am more specific about what libraries and APIs I have explored in my \
JavaScript and Python sections. I also find writing modular code enjoyable because I can just copy paste my old code into new projects. In summary, I'm \
a developer who writes modular and efficient Python/JavaScript code, who is able to learn new libraries and components quickly, and who has a passionate attitude.", "About Me", baseWords), 
    "python": genAbout("asd", "Python", baseWords),
    "javascript": genAbout("asd1", "JavaScript", baseWords)
}
const sections = {
    "Intro": [null, "Projects", "About", null],
    "About": ["Intro", "Connect", null, null],
    "Connect": ["Projects", null, null, "About"],
    "Projects": [null, null, "Connect", "Intro"]
}
const secs = ["Intro", "Projects", "About", "Connect"]
const ds = ["u", "r", "d", "l"]
const keyHandler = {
    "ArrowLeft": () => {slide("l")},
    "ArrowRight": () => {slide("r")},
    "ArrowDown": () => {slide("d")},
    "ArrowUp": () => {slide("u")},
    // " ": () => {
    //     for(const item of document.querySelectorAll(".arrow-cont")) {
    //         item.classList.toggle("animate-text")
            
    //     }
    // },
    
}

function slide(d) {
    if (scrolling) return
    else scrolling = true

    let opt = {behavior: "smooth"}
    let failed = new Promise((res, rej) => {
        res()
    })

    if (d === "r") {
        if (selected === 0 || selected === 2) selected += 1
        else {scrolling = false; return failed}
        opt['left'] = document.querySelector("section").offsetWidth
    }
    if (d === "l") {
        if (selected === 1 || selected === 3) selected -= 1
        else {scrolling = false; return failed}
        opt['left'] = -document.querySelector("section").offsetWidth
    }
    if (d === "d") {
        if (selected === 0 || selected === 1) selected += 2
        else {scrolling = false; return failed}
        opt['top'] = document.querySelector("section").offsetHeight
    }
    if (d === "u") {
        if (selected === 2 || selected === 3) selected -= 2
        else {scrolling = false; return failed}
        opt['top'] = -document.querySelector("section").offsetHeight
    }

    window.scroll(opt)
    loadArrows()
    return checkScroll(window).then(data => {
        loadArrows(secs[selected])
        scrolling = false
    })
}

function loadArrows(section) {
    arrows = arrows ?? []
    for (const x of arrows) {
        x.remove()
    }

    if (!section) return

    let sec = document.querySelector("section[name='" + section + "']")
    for (let i = 0; i < sections[section].length; i++) {
        if (!sections[section][i]) continue
        let cont = document.createElement("div")
        cont.className = "arrow-cont " + ds[i]
    
        let arrow = document.createElement("p")
        arrow.className = "arrow"
        arrow.innerHTML = "^"

        cont.appendChild(arrow)
        cont.innerHTML += sections[section][i]
    
        const dir = ds[i]
        cont.addEventListener("mouseenter", function (event) {
            this.classList.add("animate-text")
            this.tmo = setTimeout(() => {
                slide(dir)
            }, 750)
        })
        cont.addEventListener("mouseleave", function (event) {
            clearTimeout(this.tmo)
            this.tmo = undefined
            this.classList.remove("animate-text")
        })
        cont.addEventListener("click", function (event) {
            clearTimeout(this.tmo)
            this.tmo = undefined
            this.classList.remove("animate-text")
            slide(dir)
        })
    
        arrows.push(cont)
        sec.insertBefore(cont, sec.firstChild)
    }

    
}

function loadImages() {
    images = {}
    const imgs = ["github.png", "logo.png", "favicon.ico", "hackerRank.png", "leetcode.png", "linkedIn.png", "email.png", "discord.png",
                  "c#.png", "c++.png", "discord.png", "django.png", "info.png", "python.png", "javascript.png"]

    for (const item of imgs) {
        let img = new Image()
        img.src = "../images/" + item
        images[item.split(".")[0]] = img
    }
}

function genQuote(q, person, strong=[]) {
    q = "“" + q + "”"
    
    q = markUp(q, strong)

    return q + "<br><strong><span class='punc' style='font-size: 1.25em;'>–</span> " + person + "</strong>"
}

function loadSocials() {
    let img
    for (const x of socialS) {
        img = images[x[0]].cloneNode()
        img.width = 60
        img.style.height = "auto"
        img.alt = x[0]
        img.title = x[0].toUpperCase()
        social.appendChild(img)
    }
}

function loadEls() {
    loadImages()

    myWork = document.querySelector(".work")
    logo = document.getElementById("logo")
    ssEl = document.getElementById("ssTarget")
    social = document.querySelector(".socials-in")
    me = document.querySelector(".me")
    icons = document.querySelector(".aboutMe .icons")
    info = document.querySelector(".info-cont")
    bod = document.querySelector("body")

    let img = images["logo"].cloneNode()
    img.width = "100"
    img.height = "100"
    bod.insertBefore(img, document.querySelector(".body"))
    img.id = "logo"

    selected = 0
    ss = new slideShow({target:ssEl, content:qs.map(x => {
        return genQuote(x[0], x[1])
    }), time:8})

    genWork()
    genInfo()
    loadArrows(secs[selected])
    loadSocials()
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

function genInfo() {
    for (const i in ics) {
        let cont = document.createElement("div")
        cont.name = ics[i]
        if (i == 0) {
            cont.className = "selected"
            info.innerHTML = txt[ics[i]]
        }
        let img = images[ics[i]].cloneNode()
        img.width = 50
        img.height = 50

        cont.appendChild(img)
        icons.appendChild(cont)

        cont.addEventListener("click", function (event) {
            for (const x of icons.children) {
                x.classList.remove("selected")
            }
            info.innerHTML = txt[this.name]
            this.classList.add("selected")
        })
    }
}

function genAbout(text, title, bolded=[]) {
    let temp = document.createElement("div")

    let head = document.createElement("div")
    head.innerHTML = title
    head.classList.add("cont-head")
    temp.appendChild(head)
    
    text = markUp(text, bolded)
    
    let content = document.createElement("div")
    content.classList = "cont-body"
    content.innerHTML = text
    temp.appendChild(content)
    return temp.innerHTML
}

function markUp(text, strong=[]) {
    text = text.replace(punc, (match) => {
        return "<span class='punc'>" + match.trim() + "</span>"
    })
    for (const x of strong) {
        let reg = new RegExp(x, "g")
        text = text.replace(reg, "<strong>" + x + "</strong>")
    }

    return text
}

function aniLogo() {

}
