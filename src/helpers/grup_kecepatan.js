exports.grup_kecepatan = (kecepatan) => {
    if (kecepatan == null) return null
    else if (parseFloat(kecepatan) <= 0) return 0
    else if (parseFloat(kecepatan) < 0.5) return 0.5
    else if(parseFloat(kecepatan) > 0.5) return parseFloat(kecepatan.toFixed(1)) + 0.5
}