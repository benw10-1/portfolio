const { slideShow, checkScroll } = require("./slideshow")

var scrolling, myWork, logo, ssEl, social, icons, info, selected, arrows, logoAni, projects, modal1, disp, modalled, pages, mouseTip, mouseTm
var images = {}

const qs = [["Talent wins games, but teamwork and intelligence win championships.", "Michael Jordan"], 
["Live as if you were to die tomorrow. Learn as if you were to live forever.", "Mahatma Gandhi"], 
["The person who says it cannot be done should not interrupt the person who is doing it.", "Anonymous"],
["Success is liking yourself, liking what you do, and liking how you do it.", "Maya Angelou"]]

const socialS = [["github", "https://github.com/benw10-1"], 
["linkedIn", "https://www.linkedin.com/in/benjamin-wirth-10/"], 
["email", "mailto:benwirthdevelops@gmail.com?subject=Inquiry&body=Hi I need you for something..."], 
["discord", "benjamin10#1851"], 
["hackerRank", "https://www.hackerrank.com/benjaminwirth10"], 
["leetcode", "https://leetcode.com/ben_wirth10/"]]
const baseWords = ["love", "JavaScript", "developer", "Python", "Express", "documentation", "API", "modular code", "Node", "js", "summary", "passionate", "Django", "Neo4J", "dynamically", "Hackerrank", "LeetCode", "problem solving", "critical thinking", "OpenLayers", "C", "Object Oriented Programming", "Unity", "programming"]
const ics = ["info", "javascript", "python", "c"]
const punc = /(?<!<[^>]*)[.,\/#!$%\^&\*;:{}=\-_`~()\"\'“”]+(?![^<]*>)/g
const mail = /[A-Za-z0-9!#$%&'*+-/=?^_`{|}~\.]{2,}@[A-Za-z0-9\-]+\.[a-z]+/
const txt = {
    "info": genAbout("I'm a self-taught software/web developer born and raised in California. I got into computer programming when I saw YouTube videos of people making simple games like Snake using JavaScript in 5 minutes (which is still crazy to me). I didn't know about Node.js before I started web development, so I ended up starting with Python because it was independant from a browser. I love exploring new concepts and this curiosity has pushed me through hours of reading documentation for APIs and libraries and this has become a skill that I am proud of. I am more specific about what libraries and APIs I have explored in my JavaScript and Python sections. I also find writing modular code enjoyable because I can just reuse my old code into new projects, and it allows me to build off of previous projects. In summary, I'm a developer who writes modular and efficient code, who is able to learn new libraries and components quickly, and who has a passionate attitude.", "About Me", baseWords), 
    "javascript": genAbout("JavaScript is my primary language as of now due to its versitility. It can be run as part of a webpage as a script, or can be ran in a runtime like Node.js. I have with many libraries, frameworks, and APIs such as React, OpenLayers, Wikimedia, JSdom, Moment, Mongoose, Sequelize, Express, and Google Maps. In addition to this, I have strong knowledge of JavaScript fundamentals. This includes knowledge about callback functions, promises, asyncronous programming, data types, OOP, interacting with the DOM, and regular expressions. Knowledge of these concepts has allowed me to create not only this portfolio, but many other projects (displayed on my projects page!) as well. JavaScript has also allowed me to use my knowledge of algorithms to process information and visualize it. I plan to greatly expand my JavaScript projects once I gain enough capital to start scaling.", "JavaScript (Intermediate)", baseWords),
    "python": genAbout("Python was the first language I learned and it is what I have done most of my coding volume in. Some of the libraries that I have worked with and how I've used them are as follows: I've used the pandas and requests libraries to manipulate and view google sheets, the requests library, BeautifulSoup, and Neo4J to creater a Wikipedia scraper that creates a relational database based off of where each page points, PyGame to create a chess game, Panda3D to create a virtual Rubik's Cube (with the assistance of Blender as well), Django to create simple APIs which dynamically store data for other applications, PyQt5 and smtplib to create an application that sends out formatted emails automatically, and finally NumPy for general array transformations. In addition to this, I have also put many hours into solving coding challenges on Hackerrank and LeetCode in order to improve my problem solving skills and critical thinking.", "Python (Intermediate)", baseWords),
    "c": genAbout("I have taken CS - 131 Which covers C++ Object Oriented Programming. I have basic knowledge of C++ application development and programming concepts. In addition to this, I have basic knowledge of C# as I have coded Unity snippets and miniprojects. I plan to learn C so that I can make a real Chess engine from scratch.", "C Family (Beginner)", baseWords),
}
const sections = {
    "Intro": [null, "Projects", "About", "Connect"],
    "About": ["Intro", null, null, null],
    "Connect": [null, "Intro", null, null],
    "Projects": [null, null, null, "Intro"]
}
const secs = ["Connect", "Intro", "Projects", "About"]
const msecs = ["Intro", "About", "Projects", "Connect"]
const ds = ["u", "r", "d", "l"]
const imgS = ["github.png", "logo.png", "favicon.ico", "hackerRank.png", "leetcode.png", "linkedIn.png", "email.png", "discord.png", "c#.png", "c++.png", "discord.png", "django.png", "info.png", "python.png", "javascript.png", "logo1.png", "logo2.png", "c.png"]
const ts = ["Data Visualization"]

const keyHandler = {
    "ArrowLeft": () => {slide("l")},
    "ArrowRight": () => {slide("r")},
    "ArrowDown": () => {slide("d")},
    "ArrowUp": () => {slide("u")},

}
const moveHandle = function (event) {
    let [xOff, yOff] = [mouseTip.offsetWidth, mouseTip.offsetHeight]
    if (yOff === 0) yOff = 24
    mouseTip.style.left = event.pageX + 5 + "px"
    mouseTip.style.top = event.pageY - yOff - 5 + "px"
}
const inputCheck = {
    "name": (name) => {
        if (!name || !(2 <= name.trim().length && name.trim().length <= 64)) {
            setTip("Name is too short!", "#E76F51")
            return
        }
        return true
    },
    "email": (email) => {
        if (!email || !email.trim().match(mail)) {
            setTip("Not a valid email!", "#E76F51")
            return
        }
        return true
    },
    "msg": (msg) => {
        if (!msg || !(32 <= msg.trim().length && msg.trim().length <= 5000)) {
            let trimmed = msg ? msg.trim().length : 0
            setTip("Message too short! Need " + (32 - trimmed) + " more characters", "#E76F51")
            return
        }
        return true
    }
}

function ismob() {
    const ua = navigator.userAgent

    if (window.matchMedia("only screen and (max-width: 768px)").matches) return true
    if(/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return true
    if(/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return true

    return false
}

function slide(d) {
    if (scrolling || modalled) return
    else scrolling = true

    let opt = {behavior: "smooth"}
    let failed = new Promise((res, rej) => {
        res()
    })
    if (d === "r") {
        if (selected === 0 || selected === 1) selected += 1
        else {scrolling = false; return failed}
        let width = document.querySelectorAll("section")[selected].offsetWidth
        opt["left"] = width + (selected - 1) * width
    }
    if (d === "l") {
        if (selected > 0 && selected !== 3) selected -= 1
        else {scrolling = false; return failed}
        let width = document.querySelectorAll("section")[selected].offsetWidth
        opt["left"] = width + (selected - 1) * width
    }
    if (d === "d") {
        if (selected === 1) selected += 2
        else {scrolling = false; return failed}
        opt["top"] = document.querySelectorAll("section")[selected].offsetHeight
    }
    if (d === "u") {
        if (selected === 3) selected -= 2
        else {scrolling = false; return failed}
        opt["top"] = -document.querySelectorAll("section")[selected].offsetHeight
    }
    window.scroll(opt)
    loadArrows()
    aniLogo()
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

function loadImages(imgs) {
    if (!imgs) return
    imgs = imgs.map(item => {
        let split = item.split("/")
        return split[split.length - 1]
    })

    for (const item of imgs) {
        let img = new Image()
        img.src = window.location + "./images/" + item
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
        if (x[1].indexOf("://") >= 0) {
            img.addEventListener("click", event => {
                window.open(x[1])
            })
        }
        else {
            img.addEventListener("click", event => {
                if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(x[1])
                if (!ismob()) {
                    moveHandle(event)
                    setTip("Copied " + x[0] + " ID to clipboard!")
                }
                else window.open(x[1])
            })
            img.title = "Click to copy to clipboard"
        }
        social.appendChild(img)
    }
}

function loadMobile() {
    let styleEl = document.createElement("link")
    styleEl.href = "style/mobile.css"
    styleEl.rel = "stylesheet"
    document.querySelector("head").appendChild(styleEl)

    let body = document.querySelector(".body")
    body.classList.add("mobile")
    let sarr = []
    for (const x of msecs) {
        sarr.push(document.querySelector("section[name='" + x + "']").cloneNode(true))
    }
    body.innerHTML = ""
    for (const x of sarr) {
        body.appendChild(x)
    }
    body.querySelector(".tip").remove()

    ssEl = document.getElementById("ssTarget")
    myWork = document.querySelector(".work")
    logo = document.getElementById("logo")
    social = document.querySelector(".socials-in")
    me = document.querySelector(".me")
    icons = document.querySelector(".aboutMe .icons")
    info = document.querySelector(".info-cont")
    pages = document.querySelector(".pages")
    let img = images["logo2"].cloneNode()
    let dim = ismob() ? "75" : "100"
    img.width = dim
    img.height = dim
    logo.appendChild(img)
    img = images["logo1"].cloneNode()
    img.width = dim
    img.height = dim
    logo.appendChild(img)

    logo.addEventListener("click", function (event) {
        if (scrolling) return
        window.scroll({
            left: window.innerWidth,
            top: 0,
            behavior: "smooth"
        })
        aniLogo()
        checkScroll(window).then(() => {
            scrolling = false
            loadArrows(secs[selected])
        })
    })
    projects = {}
    ss = new slideShow({target:ssEl, isMobile: true, content:qs.map(x => {
        return genQuote(x[0], x[1])
    }), time:8})

    getWork().then(data => {
        loadTabs(document.querySelector(".tabs"), ts)
    })
    genInfo()
    loadSocials()
}

function loadEls() {
    myWork = document.querySelector(".work")
    logo = document.getElementById("logo")
    ssEl = document.getElementById("ssTarget")
    social = document.querySelector(".socials-in")
    me = document.querySelector(".me")
    icons = document.querySelector(".aboutMe .icons")
    info = document.querySelector(".info-cont")
    bod = document.querySelector("body")
    modal1 = document.querySelector(".modal-1")
    disp = document.querySelector(".modal-disp")
    pages = document.querySelector(".pages")
    mouseTip = document.querySelector(".mouse-tip")

    let img = images["logo2"].cloneNode()
    img.width = "100"
    img.height = "100"
    logo.appendChild(img)
    img = images["logo1"].cloneNode()
    img.width = "100"
    img.height = "100"
    logo.appendChild(img)

    logo.addEventListener("click", function (event) {
        if (scrolling || selected === 1) return
        scrolling = true
        aniLogo()
        loadArrows()
        window.scroll({
            left: window.innerWidth,
            top: 0,
            behavior: "smooth"
        })
        checkScroll(window).then(() => {
            scrolling = false
            selected = 1
            loadArrows(secs[selected])
        })
    })
    selected = 1
    projects = {}
    ss = new slideShow({target:ssEl, content:qs.map(x => {
        return genQuote(x[0], x[1])
    }), time:8})

    modal1.children[0].addEventListener("click", function (event) {
        if (event.target !== this) return
        displayModal(false)
    })

    getWork().then(data => {
        loadTabs(document.querySelector(".tabs"), ts)
    })
    genInfo()
    loadArrows(secs[selected])
    loadSocials()
    window.addEventListener("scroll", (event) => {
        if (!scrolling) event.preventDefault()
    })
    
    window.addEventListener("resize", event => {
        selected = 1
        displayModal(false)
        loadArrows()
        loadArrows("Intro")
        window.scroll({
            left: window.innerWidth,
            top: 0,
            behavior: "auto"
        })
    })
    window.addEventListener("keydown", event => {
        if (event.target.tagName !== "BODY") return
        if (keyHandler[event.key]) keyHandler[event.key]()
    })
    window.addEventListener("wheel", (event) => {
        if (event.target.tagName == "SECTION") {
            if (event.wheelDelta > 0) slide("u")
            else slide("d")
        }
    })
}

async function getWork() {
    const link = "projects.json"
    return fetch(link).then((data) => {return data.json()}).then((data) => {
        for (const x of data) {
            let work = loadWork(x)
            if (!x.name || projects[x.name]) continue
            loadImages(x.images)

            projects[x.name] = {el:work, data:x}
        }
    }).catch((err) => {console.log(err)})
}

function displayWork(els) {
    myWork.innerHTML = ""
    for (let i = 0; i < els.length; i++) {
        if (i > 5) return
        myWork.appendChild(els[i])
    }
}

function loadWork(work) {
    let container = document.createElement("div")
    container.className = "project"
    
    let overlay = document.createElement("div")
    overlay.name = work.name
    overlay.className = "proj-over over-hide"
    let toggleOver = function (event) {
        overlay.classList.toggle("over-hide")
    }
    overlay.addEventListener("mouseenter", toggleOver)
    overlay.addEventListener("mouseleave", toggleOver)
    container.appendChild(overlay)
    overlay.addEventListener("click", function (event) {
        if (event.target !== this) return
        disp.innerHTML = ""

        let data = projects[this.name].data
        let goto = () => {window.open(data.deployed)}

        let exit = document.createElement("span")
        exit.className = "x"
        exit.innerHTML = "✖"
        exit.addEventListener("click", function (event) {
            displayModal(false)
        })
        disp.appendChild(exit)

        let banner = document.createElement("div")
        banner.classList.add("modal-banner")
        if (data.images.length > 1) banner.style.backgroundImage = "url(" + data.images[1] + ")"
        else banner.style.backgroundImage = "url(" + data.images[0] + ")"
        disp.appendChild(banner)

        let name = document.createElement("div")
        name.innerHTML = markUp(data.name)
        name.classList.add("info-header")
        name.onclick = goto
        disp.appendChild(name)

        let about = document.createElement("div")
        about.innerHTML = markUp(data.about, data.tags)
        about.classList.add("info")
        disp.appendChild(about)

        displayModal(true)
    })
    
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

    let gh = images["github"].cloneNode()
    gh.width = 50
    gh.height = 50
    gh.style.cursor = "pointer"
    gh.addEventListener("click", () => {
        window.open(work["repo"])
    })
    overlay.appendChild(gh)

    return container
}

function displayModal(state) {
    if (ismob()) return
    if (state) {
        modal1.classList.remove("hidden")
        loadArrows()
    }
    else {
        modal1.classList.add("hidden")
        loadArrows(secs[selected])
    }
    modalled = state
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
        if (!x) continue
        //[^\s]*
        let reg = new RegExp("(?<!<[^>]*)" + x + "[^\\s$]*(?![^<]*>)", "g")
        let matches = text.match(reg)
        if (!matches) continue
        text = text.replace(reg, "<strong>$&</strong>")
    }

    return text
}

function aniLogo() {
    let ani = onceAround()
    if (!ani) return
    ani.then(() => {
        if (scrolling) aniLogo()
    })
}

function onceAround(rate=.75) {
    if (logoAni) return
    logoAni = true
    let elapsed = 0, old = Date.now(), pos = 0
    const fr = 144
    return new Promise((res, rej) => {
        let inter = setInterval(() => {
            if (Math.round(pos) >= 360) {
                logo.children[0].style.transform = "rotate(" + 0 + "deg)"
                logo.children[1].style.transform = "rotate(" + 0 + "deg)"
                clearInterval(inter)
                res()
                logoAni = false
                return
            }
            elapsed = Date.now() - old
            pos = 360 * ((elapsed * rate)/1000)
            logo.children[0].style.transform = "rotate(" + pos + "deg)"
            logo.children[1].style.transform = "rotate(" + -pos + "deg)"
        }, (1/fr) * 1000)
    })
}

function loadTabs(target, tabAr) {
    let tabs = {}

    let cont = document.createElement("div")
    target.appendChild(cont)

    tabs["all"] = []
    for (const key in projects) {
        let item = projects[key]
        if (item.data.name && item.data.tags) {
            tabs["all"].push(item.el)
            for (let t of item.data.tags) {
                t = t.toLowerCase()
                if (tabs[t]) tabs[t].push(item.el)
                else tabs[t] = [item.el]
            }
        }
    }
    function displayPages(tab) {
        pages.innerHTML = ""
        if (tab.length < 7) return
        let pCount = Math.floor((tab.length - 1)/6) + 1
        console.log(pCount)
        for (i = 0; i < pCount; i++) {
            let txt = document.createElement("span")
            txt.classList.add("num")
            txt.innerHTML = i + 1
            if (txt.innerHTML == tab.page) txt.classList.add("selected-num")
            pages.appendChild(txt)
            txt.addEventListener("click", function (event) {
                if (this.classList.contains("selected-num")) return
                let sel = document.querySelector(".selected-num")
                if (sel) sel.classList.remove("selected-num")
                this.classList.add("selected-num")

                let parsed = parseInt(this.innerHTML)
                tab.page = parsed
                
                displayWork(tab.slice((parsed - 1) * 6, (parsed - 1) * 6 + 6))
            })
        }
    }

    function activateTab(el) {
        if (el.classList.contains("selected-tab")) return
        let sel = document.querySelector(".selected-tab")
        if (sel) sel.classList.remove("selected-tab")
        el.classList.add("selected-tab")
        let tab = tabs[el.tab]
        if (!tab.page) tab.page = 1
        displayPages(tab)
        let sliced = tab.slice((tab.page - 1) * 6, (tab.page - 1) * 6 + 6)
        displayWork(sliced)
    }
    let tab
    // tab =  document.createElement("div")
    // tab.classList.add("tab")
    // tab.innerHTML = "Featured(" + Object.keys(tabs["featured"] ?? []).length + ")"
    // target.appendChild(tab)
    // tab.tab = "featured"
    // tab.addEventListener("click", function (event) {
    //     activateTab(this)
    // })
    // 

    tab =  document.createElement("div")
    tab.classList.add("tab")
    tab.innerHTML = "All(" + Object.keys(projects).length + ")"
    target.appendChild(tab)
    tab.tab = "all"
    tab.addEventListener("click", function (event) {
        activateTab(this)
    })
    activateTab(tab)

    for (let item of tabAr) {
        let temp = tabs[item.toLowerCase()]
        if (!temp || item.toLowerCase() === "featured") continue
        tab = document.createElement("div")
        tab.classList.add("tab")
        tab.innerHTML = item + "(" + temp.length + ")"
        tab.tab = item.toLowerCase()
        tab.addEventListener("click", function (event) {
            activateTab(this)
        })
        target.appendChild(tab)
    }
    tabVar = tabs
}

function setTip(tip, color, fadeTime=1000) {
    window.addEventListener("mousemove", moveHandle)

    clearTimeout(mouseTm)
    clearInterval(mouseTip.inter)

    mouseTip.classList.remove("hidden")
    mouseTip.style.color = color ?? ""
    mouseTip.style.opacity = 1
    mouseTip.innerHTML = tip

    mouseTm = setTimeout(() => {
        mouseTip.removeEventListener("mousemove", moveHandle)

        let pr = new Promise((res, rej) => {
            let first = Date.now()
            mouseTip.inter = setInterval(() => {
                let framestart = Date.now()
                mouseTip.style.opacity = 1 - ((framestart - first)/fadeTime)
                if (mouseTip.style.opacity <= 0) {
                    clearInterval(mouseTip.inter)
                    res()
                }
            }, 1/60)
        })
        pr.then(() => {
            mouseTm = undefined
            window.removeEventListener("mousemove", moveHandle)
            mouseTip.classList.add("hidden")
        })
    }, 2000)
}

module.exports = { ismob, loadEls, loadMobile, loadImages, imgS }