const startBtn = document.querySelector("#start-btn")
const statsBtn = document.querySelector("#stats-btn")
const downloadBtn = document.querySelector("#download-btn")
const descriptionBtn = document.querySelector("#description-btn")
const homeImg = document.querySelector("#home-img")
const jsProgressContainer = document.querySelector("#js-progress-container")
const jsProgress = document.querySelector("#js-progress")
const jsMarkText = document.querySelector("#js-mark-text")
const jsHintText = document.querySelector("#js-hint-text")
const wasmProgressContainer = document.querySelector("#wasm-progress-container")
const wasmProgress = document.querySelector("#wasm-progress")
const wasmMarkText = document.querySelector("#wasm-mark-text")
const wasmHintText = document.querySelector("#wasm-hint-text")
const resultsContainer = document.querySelector("#results-container")

const showHome = () => {
    const startPage = document.querySelector("#start-page")
    const tablePage = document.querySelector("#table-page")
    const infoPage = document.querySelector("#info-page")
    const homeImg = document.querySelector("#home-img")

    tablePage.style.display = "none"
    startPage.style.display = "flex"
    infoPage.style.display = "none"
    homeImg.style.display = "none"
}

const showInfo = () => {
    const startPage = document.querySelector("#start-page")
    const tablePage = document.querySelector("#table-page")
    const infoPage = document.querySelector("#info-page")
    const homeImg = document.querySelector("#home-img")

    tablePage.style.display = "none"
    startPage.style.display = "none"
    infoPage.style.display = "block"
    homeImg.style.display = "flex"
}

homeImg.addEventListener("click", () => {
    showHome();
})

const markByTime = (time) => {
    return Math.round(Math.pow(1 / time, 0.8) * 10_000_000);
}

const waitForUpdate = () => new Promise(r => requestAnimationFrame(r))

let WASM
createWasmBench().then(function(Module) {
    WASM = Module
})

const doJSTest = async () => {
    const jsTests = [ JSarrayOperationsTest, JSbubbleSort, JSfindPrimeTest, JSmd5Test,
        JSmd5Test, JSarrayOperationsTest, JSbubbleSort, JSfindPrimeTest,
        JSfindPrimeTest, JSmd5Test, JSarrayOperationsTest, JSbubbleSort,
        JSbubbleSort, JSfindPrimeTest, JSmd5Test, JSarrayOperationsTest ]

        await waitForUpdate()

        let jsTime = 0
        for (let i = 0; i < jsTests.length; ++i) {
            jsTime += jsTests[i]()
            jsProgress.style.width = ((i + 1) / jsTests.length * 100) + '%'

            await waitForUpdate()
        }

    jsProgress.style.width = "100%"

    return jsTime
}

const doWASMTest = async () => {
    await new Promise(r => setTimeout(r, 1000));

    const wasmTests = [ WASM.arrayOperationsTest, WASM.bubbleSortTest, WASM.findPrimeTest, WASM.md5Test,
        WASM.md5Test, WASM.arrayOperationsTest, WASM.bubbleSortTest, WASM.findPrimeTest,
        WASM.findPrimeTest, WASM.md5Test, WASM.arrayOperationsTest, WASM.bubbleSortTest,
        WASM.bubbleSortTest, WASM.findPrimeTest, WASM.md5Test, WASM.arrayOperationsTest ]

    let wasmTime = 0
    for (let i = 0; i < wasmTests.length; ++i) {
        wasmTime += wasmTests[i]()
        wasmProgress.style.width = ((i + 1) / wasmTests.length * 100) + '%'

        await waitForUpdate()
    }

    return wasmTime
}

startBtn.addEventListener('click', async () => {
    startBtn.style.display = "none"
    jsProgressContainer.style.display = "block"
    wasmProgressContainer.style.display = "block"
    jsProgress.style.width = "1%"
    wasmProgress.style.width = "1%"
    wasmProgress.style.transition.width = "0"

    const jsTime = await doJSTest()
    const wasmTime = await doWASMTest()

    jsProgressContainer.style.display = "none"
    wasmProgressContainer.style.display = "none"

    resultsContainer.style.display = "flex"
    jsMarkText.innerHTML = "Js: " + markByTime(jsTime)
    jsHintText.innerHTML = "(" + Math.round(jsTime) + " ms" + ")"
    wasmMarkText.innerHTML = "WASM: " + markByTime(wasmTime)
    wasmHintText.innerHTML = "(" + Math.round(wasmTime) + " ms" + ")"

    const ua = new UAParser(navigator.userAgent).getResult()

    console.log(ua)

    var xmlHttp = new XMLHttpRequest()
    url = "https://somin-dipl-2022.web.app/registerMarks"
        + "?arch=" + (ua.cpu.architecture ? ua.cpu.architecture : "no_info")
        + "&browser=" + (ua.browser.name ? ua.browser.name : "no_info")
        + "&browserversion=" + (ua.browser.version ? ua.browser.version : "no_info")
        + "&jstimems=" + (Math.round(jsTime) ? Math.round(jsTime) : "no_info")
        + "&wasmtimems=" + (Math.round(wasmTime) ? Math.round(wasmTime) : "no_info")
        + "&jsmark=" + (markByTime(jsTime) ? markByTime(jsTime) : "no_info")
        + "&wasmmark=" + (markByTime(wasmTime) ? markByTime(wasmTime) : "no_info")
        + "&model=" + (ua.device.model ? ua.device.model : "no_info")
        + "&os=" + (ua.os.name ? ua.os.name : "no_info")
        + "&osversion=" + (ua.os.version ? ua.os.version : "no_info")
        + "&vendor=" + (ua.device.vendor ? ua.device.vendor : "no_info")

    xmlHttp.open("GET", url)
    xmlHttp.send()

    statsBtn.style.display = "block"
    downloadBtn.style.display = "block"
    descriptionBtn.style.display = "block"
})