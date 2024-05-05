module.exports = {
    lengthOfList: (list = []) =>list.length,
    eq: (val1, val2) => val1 === val2,
    // ISO 날짜 문자열에서 날짜만 반환
    dateString: (isoString) => new Date(isoString).toLocaleDateString(),
};