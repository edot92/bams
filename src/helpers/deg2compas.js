exports.toCompas = (degree) => {
    var val = Math.floor((degree / 45) + 0.5);
    var arr = ["UT", "TL", "TM", "TG", "SL", "BD", "BR", "BL"];
    return arr[(val % 8)];
}
