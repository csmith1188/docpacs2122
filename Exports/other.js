let dateA = '01/22/71';
let dateB = 'Jan 22, 1977';


function getAge(str){
let getDate = new Date(str);
let currentDate = new Date;
let yearDiff = currentDate.getYear() - getDate.getYear()
let monthDiff = currentDate.getMonth() - getDate.getMonth()
return monthDiff < 0 || (!monthDiff && currentDate.getDate() < getDate.getDate()) ? yearDiff - 1 : yearDiff;

}

console.log(getAge(dateB));
