import state from "./state.js";
import variables from "./variables.js";
import {renderResult} from "./markups.js";
import {convertTime, formatToCurrency, getFullTitle} from "./utils.js";


const {
    success,
    resultFrom,
    resultTo,
    formResults,
    rateConversion,
    rateLast,
    toSelect,
    fromSelect
}=variables;

///****Выбираем валюту из списка
export const handleChange = ({target: {value, name}}) => {
    state.pair = {
        ...state.pair,
        [name]: value
    };
    console.log(value);
}


 //******* Вводим сумму в инпут
export const handleInput = ({target: {value, name}}) => {
    state[name] = Number(value);
    console.log(value)
};


     // Выводим полученный результат на странице *********************************************
export const insertResult = ({
                            base_code: baseCode,
                             target_code: targetCode,
                          conversion_rate: conversionRate,
                             conversion_result: conversionResult,
                            time_last_update_utc: time,
         }) => {
                      //***
                const from={
                    code: baseCode,
                    amount: state.amount,
                    full_name: getFullTitle(state.codes,baseCode),
                }
                console.log(from)
                    //***
                    const to={
                        code: targetCode,
                        amount: conversionResult,
                        full_name: getFullTitle(state.codes,targetCode),
                    }

 resultFrom.innerHTML=renderResult(from);
 resultTo.innerHTML=renderResult(to);

 const baseValue = formatToCurrency(baseCode,1);
 const targetValue = formatToCurrency(targetCode,conversionRate);

rateConversion.innerText = `${baseValue}= ${targetValue}`;

rateLast.innerText=` Last updated: ${convertTime(time)} `

formResults.classList.add("show");

console.log('baseCode****',getFullTitle(state.codes,baseCode))
}




// По кнопке перевернем валюты! ***********************
export const switchCurrencies=  () => {
  const {pair: {to,from}}=state;
  if (!to ||!from) return;
  state.pair.from = to;
  state.pair.to = from;

  toSelect.value=from;
  fromSelect.value=to;

  console.log('нажали на кнопку "перевернуть валюты" ')
}

// **** При нажатии на кнопку CONVERT !
export const handleSubmit = async (e) => {
    e?.preventDefault();
                const {
                url,
                amount,
                pair: {from, to}
            } = state;
    if (!amount || !from || !to) return;
    console.log(state.pair, state.amount)
    state.loading = true;
    try {
        const response = await fetch(`${url}/pair/${from}/${to}/${amount}`);
        const data = await response.json();
        if(data.result === success) insertResult(data);
state.loading = false;
  console.log('Нажали на Convert! и получили ответ от сервера', data)

    } catch (error) {
        console.log(error)
    }
};





