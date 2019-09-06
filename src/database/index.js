exports.insertSensor = (timestamp, bucket) => {
    bucket.insert(timestamp.toString(), {
        "acc1": 0.001,
        "acc2": 0.005,
        "acc3": 0.007,
        "arah": 35.6,
        "grup_kec": 2,
        "kecepatan": 1.5,
        "kompas": "SL",
        "node": "sb2"
    }, (err, result) => {
        if (err) {
            console.log("Error message:", err.message)
        } else {
            console.log("Result:", result)
        }
    })
}
