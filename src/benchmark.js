const startBtn = document.querySelector("#start-btn")
const jsProgressContainer = document.querySelector("#js-progress-container")
const jsProgress = document.querySelector("#js-progress")
const jsMarkText = document.querySelector("#js-mark-text")
const wasmProgressContainer = document.querySelector("#wasm-progress-container")
const wasmProgress = document.querySelector("#wasm-progress")
const wasmMarkText = document.querySelector("#wasm-mark-text")
const resultsContainer = document.querySelector("#results-container")

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
            await (jsTime += jsTests[i]())
            jsProgress.style.width = ((i + 1) / jsTests.length * 100) + '%'

            await waitForUpdate()
        }

    jsProgress.style.width = "100%"

    return jsTime
}

const doWASMTest = async () => {
    const wasmTests = [ WASM.arrayOperationsTest, WASM.bubbleSortTest, WASM.findPrimeTest, WASM.md5Test,
        WASM.md5Test, WASM.arrayOperationsTest, WASM.bubbleSortTest, WASM.findPrimeTest,
        WASM.findPrimeTest, WASM.md5Test, WASM.arrayOperationsTest, WASM.bubbleSortTest,
        WASM.bubbleSortTest, WASM.findPrimeTest, WASM.md5Test, WASM.arrayOperationsTest ]

    let wasmTime = 0
    for (let i = 0; i < wasmTests.length; ++i) {
        await (wasmTime += wasmTests[i]())
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
    jsMarkText.innerHTML = "Js: " + Math.round(jsTime)
    wasmMarkText.innerHTML = "WASM: " + Math.round(wasmTime)
})