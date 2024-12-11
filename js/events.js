import variables from "./variables.js";
import {fetchCodes, handleTabClick} from "./index.js";
import {handleInput, handleSubmit, switchCurrencies} from "./convert.js";
import {addCurrency, handleActionClick, handleAddSelectChange, handleSingleSelectChange} from "./single.js";
import {handleSubmitHistoricalCurrencies, selectDateChangeHandle,} from "./history.js";






const {
    amountInput,
    form,
    buttonGetRates,
    switchButtons,
    tabs,    currentCurrencyList,
    currentCurrency,
    singleSelect,
    addButton,
    addCurrencySelect,
    yearSelect,
    monthSelect,
    daySelect,

} = variables;


fetchCodes().then()

amountInput.addEventListener("keyup", handleInput);
form.addEventListener("submit", handleSubmit);
buttonGetRates.addEventListener("click", handleSubmitHistoricalCurrencies);

switchButtons.forEach((switchButton)=>switchButton.addEventListener("click",switchCurrencies));

tabs.forEach((tab) =>tab.addEventListener("click", handleTabClick));


currentCurrency.addEventListener('click', handleActionClick);
currentCurrencyList.addEventListener('click', handleActionClick);
singleSelect.addEventListener('change', handleSingleSelectChange);

addButton.addEventListener('click', addCurrency);
addCurrencySelect.addEventListener('change', handleAddSelectChange);


daySelect.addEventListener('change', selectDateChangeHandle );
monthSelect.addEventListener('change',selectDateChangeHandle );
yearSelect.addEventListener('change',selectDateChangeHandle );


