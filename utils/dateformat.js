const dateFormat = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDate();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    const formatDate = month + '/' + day + '/' + year;

    return formatDate;
}

module.exports = dateFormat;