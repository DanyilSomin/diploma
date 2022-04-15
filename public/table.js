const startPage = document.querySelector("#start-page")
const tablePage = document.querySelector("#table-page")

const showTable = () => {
    var xmlHttp = new XMLHttpRequest()
    url = "https://somin-dipl-2022.web.app/getMarks"

    //xmlHttp.responseType = 'json'
    xmlHttp.onload = () => {
        let responseObj = xmlHttp.response
        console.log(responseObj)
    
        console.log("here1")
    }

    console.log("here")

    xmlHttp.open("GET", url)
    xmlHttp.send()
}

showTable()