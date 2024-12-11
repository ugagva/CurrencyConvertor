
import state from "./state.js";




export const renderResult = ({code,amount,full_name}) => {

    return  `<div class="form-result_item-icon icon" > 
                <img src="images/arrow-from-top-svgrepo-com (1) 1.svg" alt="">
                </div>
            <div class="form-result_item-titles"> 
            <div class="form-result_item-title">${code}</div>
             <div class="form-result_item-full">${full_name}</div>
            </div>
        <div class="form-result_item-value">${amount.toFixed(2)}</div>
        </div>`

};


// export const renderHistoricalResult = ({code,amount,full_name}) => {
//
//     return  `<div class="form-result_item-icon icon" >
//                 <img src="images/arrow-from-top-svgrepo-com (1) 1.svg" alt="">
//                 </div>
//             <div class="form-result_item-titles">
//             <div class="form-result_item-title">${code}</div>
//              <div class="form-result_item-full">${full_name}</div>
//             </div>
//           <div class="form-result_item-value">${amount}</div>
//         </div>`
//
// };


export const getCurrencyItemAction = (isBase)=>{
    const {
        actions:{remove,change}
    }=state;
    const actionName= isBase ? change: remove ;

    return `<button data-action="${actionName}" class="currency-${actionName} currency-button ">
                ${actionName}
                </button>`
}

