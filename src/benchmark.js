const startBtn = document.querySelector("#start-btn")
const jsProgressContainer = document.querySelector("#js-progress-container")
const jsProgress = document.querySelector("#js-progress")
const wasmProgressContainer = document.querySelector("#wasm-progress-container")
const wasmProgress = document.querySelector("#wasm-progress")

const waitForUpdate = () => new Promise(r => requestAnimationFrame(r))

startBtn.addEventListener('click', async () => {
    startBtn.style.display = "none"
    jsProgressContainer.style.display = "block"
    wasmProgressContainer.style.display = "block"
    jsProgress.style.width = "1%"
    //jsProgress.style.transition = "0.5"
    wasmProgress.style.width = "1%"

    jsTests = [ JSarrayOperationsTest, JSbubbleSort, JSfindPrimeTest, JSmd5Test,
                JSmd5Test, JSarrayOperationsTest, JSbubbleSort, JSfindPrimeTest,
                JSfindPrimeTest, JSmd5Test, JSarrayOperationsTest, JSbubbleSort,
                JSbubbleSort, JSfindPrimeTest, JSmd5Test, JSarrayOperationsTest ]

    await waitForUpdate()


    let jsTime = 0
    for (let i = 0; i < jsTests.length; ++i) {
        jsTime += jsTests[i]()
        //jsProgress.style.width = ((i + 1) / jsTests.length * 100) + '%'

        await waitForUpdate()
    }

    jsProgress.style.width = "100%"
})