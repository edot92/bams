exports.insertSensor = (timestamp, bucket, payload) => {
    bucket.insert(timestamp.toString(), {
        "acc1": payload.acc1,
        "acc2": payload.acc2,
        "acc3": payload.acc3,
        "arah": payload.arah,
        "grup_kec": payload.grup_kec,
        "kecepatan": payload.kecepatan,
        "kompas": payload.kompas,
        "node": payload.node
    }, (err, result) => {
        if (err) {
            console.log(payload.node, timestamp, err.message)
        } else {
            console.log("Result:", result)
        }
    })
}
