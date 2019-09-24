exports.grup_kecepatan = (kecepatan) => {
    if (kecepatan == null) return null
    else if (kecepatan <= 0) return 0
    else if (kecepatan < 0.5) return 0.5
    else return kecepatan.toFixed(1) + 0.5
}