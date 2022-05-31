let inited = false;

const showTable = () => {
    var xmlHttp = new XMLHttpRequest()
    url = "https://somin-dipl-2022.web.app/getMarks"

    xmlHttp.onload = () => {
        const startPage = document.querySelector("#start-page")
        const tablePage = document.querySelector("#table-page")
        const homeImg = document.querySelector("#home-img")
        const infoPage = document.querySelector("#info-page")

        startPage.style.display = "none"
        tablePage.style.display = "block"
        homeImg.style.display = "block"
        infoPage.style.display = "none"

        if (inited) return 
        else inited = true

        let responseObj = JSON.parse(xmlHttp.response)
        console.log(responseObj)

        let rowNumber = 1
        responseObj.response.forEach(element => {
            const tr = document.createElement("tr")

            const rowCol = document.createElement("th")
            rowCol.innerHTML = rowNumber
            tr.appendChild(rowCol)

            const dateCol = document.createElement("td")
            dateCol.innerHTML = new Date(element.date).toLocaleDateString("uk-UA")
            tr.appendChild(dateCol)

            const jsMarkCol = document.createElement("td")
            jsMarkCol.innerHTML = element.jsmark
            tr.appendChild(jsMarkCol)

            const jsTimeMs = document.createElement("td")
            jsTimeMs.innerHTML = element.jstimems
            tr.appendChild(jsTimeMs)

            const wasmMark = document.createElement("td")
            wasmMark.innerHTML = element.wasmmark
            tr.appendChild(wasmMark)

            const wasmTimeMs = document.createElement("td")
            wasmTimeMs.innerHTML = element.wasmtimems
            tr.appendChild(wasmTimeMs)

            const browser = document.createElement("td")
            browser.innerHTML = element.browser
            tr.appendChild(browser)

            const browserVersion = document.createElement("td")
            browserVersion.innerHTML = element.browserversion
            tr.appendChild(browserVersion)

            const os = document.createElement("td")
            os.innerHTML = element.os
            tr.appendChild(os)

            const osVersion = document.createElement("td")
            osVersion.innerHTML = element.osversion
            tr.appendChild(osVersion)

            const vendor = document.createElement("td")
            vendor.innerHTML = element.vendor
            tr.appendChild(vendor)

            const model = document.createElement("td")
            model.innerHTML = element.model
            tr.appendChild(model)

            const arch = document.createElement("td")
            arch.innerHTML = element.arch
            tr.appendChild(arch)

            const table = document.querySelector("#tablebody")
            table.appendChild(tr)

            rowNumber += 1
        });
    }

    xmlHttp.open("GET", url)
    xmlHttp.send()
}

const doDownload = () => {
    var xmlHttp = new XMLHttpRequest()
    url = "https://somin-dipl-2022.web.app/getMarks"

    xmlHttp.onload = () => {
        let responseObj = JSON.parse(xmlHttp.response)

        let resStr = "Date, JS Mark, JS Time ms, WASM Mark, WASM Time ms, Browser, Browser version, OS, OS version, Vendor, Model, Arch, \n"

        responseObj.response.forEach(element => {
            resStr += element.date
            resStr += ","

            resStr += element.jsmark
            resStr += ","
            
            resStr += element.jstimems
            resStr += ","

            resStr += element.wasmmark
            resStr += ","

            resStr += element.wasmtimems
            resStr += ","
            
            resStr += element.browser
            resStr += ","
            
            resStr += element.browserversion
            resStr += ","

            resStr += element.os
            resStr += ","
            
            resStr +=  element.osversion
            resStr += ","
            
            resStr +=  element.vendor
            resStr += ","
            
            resStr +=  element.model
            resStr += ","
            
            resStr +=  element.arch
            resStr += ","

            resStr += "\n"
        });

        var bb = new Blob([resStr ], { type: 'text/plain' })
        var a = document.createElement('a')
        a.download = 'stats.csv'
        a.href = window.URL.createObjectURL(bb)
        a.click() 
    }

    xmlHttp.open("GET", url)
    xmlHttp.send()
}
