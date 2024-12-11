import variables from "./variables.js";
import state from "./state.js";
import {handleChange} from "./convert.js";
import {fetchLatest} from "./single.js";

const {success, selects,tabs}=variables;

    // Отрисовываем списки валют с сервера
const renderCodeList = () => {
  selects.forEach((select)=>{
      state.codes.forEach(([code])=>{
          const element=document.createElement("option");
          element.value = code;
          element.innerText = code;
          select.insertAdjacentElement("beforeend",element);
      })
      const name=select.getAttribute("name");
      name && select.addEventListener("change", handleChange);
  })

}


// Получаем списки валют для выбора с API
export const fetchCodes = async ()=>{
  try {
     const response=await fetch(`${state.url}/codes`,{method:"GET"});
    const data = await response.json();
      data.supported_codes =Array.from(new Set(data.supported_codes));

    if(data.result === success)    {
        state.codes = data.supported_codes;
        renderCodeList();
        fetchLatest().then();
    }

  }catch (error){console.log(error);
  }
}



        // При нажатии на tab " Convert, Single ,History"
export const handleTabClick = ({currentTarget:target}) => {
  const {tab}= target.dataset;
  const children = document.querySelectorAll(".content");


  if(!tab || tab=== state.currentTab) return;//*****


  tabs.forEach((item)=>{item.classList.remove("active");});
  target.classList.add("active");

    for (const child of children) {
        if(child.dataset.child === tab) child.classList.add('show')
        else child.classList.remove('show');
    }
    state.currentTab=tab;
}