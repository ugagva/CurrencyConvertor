import variables from "./variables.js";
import state from "./state.js";

import {convertTime, formatToCurrency, getFullTitle} from "./utils.js";
import { renderResult} from "./markups.js";



const {daySelect,monthSelect,yearSelect, historyResultFrom,
    historyResultTo,formResults,
    historyRateConversion,rateLastDate

   }=variables;



const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

let date=new Date();
let currentYear= (date.getFullYear());
let currentMonth= (date.getMonth()+1);
let currentDay= (date.getDate());




const fillSelect=(select,arr)=>{
  arr.forEach((element)=>{
      select.add(new Option(element));
  })
}

const rangeSelect = (from, to) => {
  let result=[]
    for(let i = from; i <= to; i++)
        result.push(i);
    return result;
}



fillSelect(daySelect,rangeSelect(1,31))
// monthSelect.append(...months.map(el=>new Option(el)))
fillSelect(monthSelect,rangeSelect(1,12))
fillSelect(yearSelect,rangeSelect(2005,2026))


// yearSelect.value =currentYear;
// monthSelect.value = currentMonth;
// daySelect.value = currentDay;


//Получаем значение при измении селекта с датой!
export const selectDateChangeHandle = ({target:value, name}) => {
    state.year = {...Number(value)};
    state.month={...Number(value)};
    state.date={...Number(value)};

state.currency={
    ...state.currency
}
    state.pair = {
        ...state.pair,
        [name]: value

    };

       console.log("Выбрали в селекте-",yearSelect.value,monthSelect.value,daySelect.value);
    // console.log("Текущий месяц",date.toLocaleString('en-US', { month: 'long' }));
}



// function checkDate(year, month, day) {
//     let date = new Date(year, month - 1, day);
//     return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
// }


// ****************************************************
export const insertHistoricalResult= ({
                            base_code: baseCode,
                            target_code: targetCode,
                             conversion_rate: conversionHistoryRate,

         }) => {

    //***
    const from = {
     code: baseCode,
        amount: 1,
        full_name: getFullTitle(state.codes, baseCode),
    }
    console.log(from)

    const to = {
       code: targetCode,
        amount: conversionHistoryRate,
        full_name: getFullTitle(state.codes, targetCode),
    }
    console.log(to)

    historyResultFrom.innerHTML =  renderResult(from);
    historyResultTo.innerHTML = renderResult(to);


    const baseValue = formatToCurrency(baseCode,1);

    const targetValue = formatToCurrency(targetCode,conversionHistoryRate);

    historyRateConversion.innerText = `${baseValue} / ${targetValue}`;

    rateLastDate.innerText=` Date:`;

    formResults.classList.add("show");

    console.log('Выбрали валюту-',getFullTitle(state.codes,baseCode))
}




///*******************************************************************************************
 export const  handleSubmitHistoricalCurrencies = async (e)=> {
     e?.preventDefault();
     console.log('Нажали на GATE RATES!')
         state.loading=true;

     const {
         url,
        day,
         month,
         year,

         currency:{code},
         pair: {from, to}
     } = state;
     if (!code) return;
     console.log(state.pair.from, state.code)
         try {
             const response=await fetch(`${url}/pair/${from}/${to}`,{method:"GET"});

             const data= await response.json();
             if (data.result==='success') insertHistoricalResult(data)

                 console.log(data);

             state.loading=false;


         }catch(error){
             console.error(error)
         }
     }