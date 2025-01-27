export const convertNumber = (number) => {
    const numberWithCommas = number.toLocaleString();
    var arr = numberWithCommas.split(",");
    if(arr.length == 5) {
        //Trillion
        return arr[0] + "." + arr[1].slice(0,2) + "T";
    } else if (arr.length == 4) {
        //Billion
        return arr[0] + "." + arr[1].slice(0,2) + "B";
    } else if (arr.length == 3) {
        //Million
        return arr[0] + "." + arr[1].slice(0,2) + "M";
    }  else if (arr.length == 2) {
        //Thousands
        return arr[0] + "." + arr[1].slice(0,2) + "K";
    }  else {
        //Hundreds
        return number.toLocaleString();
    }
};