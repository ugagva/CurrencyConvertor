import state from "./state.js";
import variables from "./variables.js";
import {getCurrencyItemAction} from "./markups.js";
import {getFullTitle} from "./utils.js";



const {success,currentCurrency,currentCurrencyList}= variables;

// *******
export const renderCurrencyItem = ( {code,  base_code: baseCode, oneRate=1}) => {
    const isBase= code === baseCode;

    const action=getCurrencyItemAction(isBase);

    const fullTitle = getFullTitle(state.codes,code);

    return `<div class="currency-item ${isBase? "currency-current" : ""}  " 
                                    data-item="${code}" >

                                    <div class="currency-titles">
                                        <div class="currency-title">${code}</div>
                                        <div class="currency-full">${fullTitle}</div>
                                    </div>
                                    <div class="currency-amount">${oneRate.toFixed(2)} </div>
                                        <div class="currency-action"> ${action}</div>
                                </div>`
}

// ******************
export const insertCurrencyItem = (data)=> {
              currentCurrencyList.insertAdjacentHTML('afterbegin',
                  renderCurrencyItem( data)
              );
}
//  *****************
export const insertCurrencies = () => {
                  const {currency,currencies} = state;

                  const {conversion_rates:conversionRates, base_code:baseCode} = currency;

                  currentCurrency.innerHTML = renderCurrencyItem(currency);
                  currentCurrencyList.innerHTML="";

                  Object.entries(conversionRates).forEach(([code,oneRate]) => {

                     if(code===baseCode || !currencies.includes(code)) return;

                     insertCurrencyItem({...currency,code,oneRate});



  })
}

//***********************************
export const fetchLatest = async () => {
                    const {
                        url,
                        currency:{code}
                    } = state;

                if(!code) return;

                  try{
                      const response = await fetch(`${url}/latest/${code}` )
                      const data = await response.json()

                      if(data.result === success) {
                          state.currency = {...state.currency, ...data};
                         insertCurrencies();
                          console.log(data)
                      }
                  }catch (error) {
                      console.log(error)
  }
}
//**************************
const removeCurrency=(target)=>{
    const parent=target.parentElement.parentElement;
    const {item}= parent.dataset;
    if(!item) return;

    const element= document.querySelector(`[data-item="${item}"]`);
    element.remove();
    console.log(" Удалили валюту ");
};

const changeCurrency=()=>{
    currentCurrency.parentElement.classList.add("active");

}


//**************  Действие при клике на кнопку
export const handleActionClick =({target}) => {
  const {action}= target.dataset;
  if(!action) return;
  const {actions:{remove}}=state;

  action === remove? removeCurrency(target) : changeCurrency(); //Выбор дейстия по кнопке Удалить / Изменить

    console.log( "Действие при клике на кнопку",action);
}

///**************** Меняем валюту в селекте
export const handleSingleSelectChange = ({target}) => {
  target.parentElement.classList.remove("active");
  state.currency={...state.currency, code:target.value};
  fetchLatest().then();
  target.value='';
    console.log("Изменение основной валюты");
}


//***************************** При клике по кнопке "Add currency"
export const addCurrency = ({currentTarget}) => {
        currentTarget.parentElement.classList.add("active");
    console.log(" При клике на кнопку Add currency !")
}


//************************************ Добавляем валюту из селекта
export const handleAddSelectChange = ({target}) => {

    const{
        currency:{ conversion_rates:conversionRates,base_code:baseCode}
    }=state;

    const currency= Object.entries(conversionRates).find(
        ([key]) => key === target.value && key !==baseCode);

    if (currency) {
        const [code,amount] = currency;

        insertCurrencyItem({...currency,code,rate:amount});
        console.log(target.value)
        console.log("Добавили выбранную валюту!")
    }
    target.parentElement.classList.remove("active");
    target.value="";
}
