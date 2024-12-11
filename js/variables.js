export default {
    success: "success",

    selects: document.querySelectorAll(".select"),

    amountInput: document.getElementById("amount"),

    form: document.querySelector(".form"),
    buttonGetRates: document.getElementById("history-rates"),//**

    resultFrom: document.getElementById("resultFrom"),

    resultTo: document.getElementById("resultTo"),

    historyResultFrom: document.getElementById("historyResultFrom"),

    historyResultTo: document.getElementById("historyResultTo"),

    formResults: document.querySelector(".form-results"),

    rateConversion: document.querySelector(".rate-conversion"),

    historyRateConversion: document.querySelector(".history-rate-conversion"),

    rateLast: document.querySelector(".rate-last"),

    rateLastDate: document.querySelector(".rate-last-date"),


    switchButtons: document.querySelectorAll(".switch-currencies"),



    toSelect: document.querySelector(`[name="to"]`),

    fromSelect: document.querySelector(`[name="from"]`),

    tabs: document.querySelectorAll(".tab"),

    currentCurrency: document.querySelector(".currency-single__item"),

    currentCurrencyList: document.querySelector(".currency-list"),

    singleSelect: document.getElementById("singleSelect"),


    addButton: document.querySelector(".currency-add__button"),

    addCurrencySelect: document.getElementById("addCurrencySelect"),


    monthSelect: document.getElementById('month'),
    yearSelect: document.getElementById('year'),
    daySelect: document.getElementById('day'),



}