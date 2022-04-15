const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({origin: true})

admin.initializeApp()

exports.getMarks = functions.https.onRequest(async (req, res) => {
    const result = await admin.firestore()
                              .collection("benchmarks")
                              .orderBy("date", "desc")
                              .limitToLast(100).get()

    let response = []
    result.forEach(doc => {
        response.push(doc.data())
    })   

    return res.send( { response } )
})

exports.registerMarks = functions.https.onRequest(async (req, res) => {
    await admin.firestore().collection('benchmarks').add({
        "arch" : req.query.arch,
        "browser" : req.query.browser,
        "browserversion" : req.query.browserversion,
        "date" : Date.now(),
        "jstimems" : req.query.jstimems,
        "jsmark" : req.query.jsmark,
        "model" : req.query.model,
        "os" : req.query.os,
        "osversion" : req.query.osversion,
        "vendor" : req.query.vendor,
        "wasmmark" : req.query.wasmmark,
        "wasmtimems" : req.query.wasmtime
    })

    res.json({ "OK" : "OK" })
})