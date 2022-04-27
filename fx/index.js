function addDate(date, days) {
    let d = new Date(Number(date))
    d.setDate(date.getDate() + parseInt(days))
    return d;
}
function compareDates(date1, date2, test1 , test2) {
    console.log(`Looking for ${test1} Between ${date1} and ${date2}`);
    console.log(`Looking for ${test2} Between ${date1} and ${date2}`);


    let _date1 = new Date(Number(date1))
    let _date2 = new Date(Number(date2))
    let _test1 = new Date(Number(test1))
    let _test2 = new Date(Number(test2))

    return (_test1 >= _date1 && _test1 <= _date2) || (_test2 >= _date1 && _test2 <= _date2)
    || (_date1 >= _test1 && _date2 <= _test2 ) || (_date2 >= _test1 && _date2 <= _test2)
}

module.exports = { addDate , compareDates};