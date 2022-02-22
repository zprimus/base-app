const useDate = (date_time, display, type) => {
    var formattedDate;
    var formattedTime;

    if(date_time) {
        const [ date, time ] = date_time.split('T');
        const [ year, month, day ] = date.split('-');
        if(display === 'date') {
            formattedDate = year + type + month + type + day;
            formattedTime = time;
        } else if(display === 'text') {
            formattedDate = month + type + day + type + year;
            formattedTime = time;
        }
            
    } else {
        formattedDate = '';
        formattedTime = '';
    }

    return { formattedDate, formattedTime };
};

export default useDate;