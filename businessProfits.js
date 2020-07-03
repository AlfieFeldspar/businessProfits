const finances = [
  { date: 1546300800, revenue: 10000, expenses: 9000 },
  { date: 1546387200, expenses: 8500 },
  { date: 1548979200, revenue: 20000, expenses: 8000 },
  { date: 1551398400, revenue: 15352, expenses: 5425 },
  { date: 1555286400, revenue: 6, expenses: 10000 },
  { date: 1556841600, revenue: 23000, expenses: 15000 },
  { date: 1559692800, expenses: 2000 },
  { date: 1563062400, revenue: 8500, expenses: 150 },
  { date: 1565827200, revenue: 46000, expenses: 20000 },
  { date: 1568505600, revenue: 34000, expenses: 18000 },
  { date: 1572048000, revenue: 34000, expenses: 18000 },
  { date: 1577664000, revenue: 34000, expenses: 18000 },
  { date: 1577664000, expenses: 18000 },
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//add month and profit to original object
let newFinances;
const arrayPrep = (rawArray) => {
  //extract month from UNIX timestamp (date field) & add to original obj
  let longDate;
  let month;
  const timeConverter = (timeStamp) => {
    longDate = new Date(timeStamp * 1000);
    month = months[longDate.getMonth()];
    return month;
  };
  for (i = 0; i < rawArray.length; i++) {
    rawArray[i].month = timeConverter(rawArray[i].date);
  }

  //calc monthly profit and add to original obj
  for (i = 0; i < rawArray.length; i++) {
    if (rawArray[i].revenue == undefined) {
      rawArray[i].revenue = 0;
    }
    if (rawArray[i].expenses == undefined) {
      rawArray[i].expenses = 0;
    }
    rawArray[i].profit = rawArray[i].revenue - rawArray[i].expenses;
  }
  newFinances = rawArray;
  return newFinances;
};
arrayPrep(finances);
//console.log(newFinances);

//calc most profitable month
let max = 0;
let finalMonthValue;
const maxProfitMonth = (nestedArr, time) => {
  let monthlyTotals = {};
  for (i = 0; i < nestedArr.length; i++) {
    for (j = 0; j < time.length; j++) {
      if (nestedArr[i].month === time[j]) {
        monthlyTotals[time[j]] = 0;
      }
    }
  }
  for (i = 0; i < nestedArr.length; i++) {
    for (j = 0; j < time.length; j++) {
      if (nestedArr[i].month === time[j]) {
        monthlyTotals[time[j]] += nestedArr[i].profit;
      }
    }
  }
  const monArray = Object.entries(monthlyTotals);
  for (let i = 0; i < monArray.length; i++) {
    if (monArray[i][1] > max) {
      max = monArray[i][1];
      finalMonthValue = monArray[i];
      continue;
    }
  }
  return finalMonthValue;
};
maxProfitMonth(newFinances, months);
console.log(
  `${finalMonthValue[0]} was the most profitable month, bringing in $${finalMonthValue[1]}.`
);

//tally all profits for the year
const profitLoss = (nestedArr) => {
  let sumProfit = 0;
  for (i = 0; i < newFinances.length; i++) {
    sumProfit += newFinances[i].profit;
  }
  return sumProfit;
};
console.log(
  `Revenue-loss (profit) for the year was $${profitLoss(newFinances)}.`
);
