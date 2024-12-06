const conversionRates = {
    USD: { PKR: 280, EUR: 0.85 },
    EUR: { PKR: 300, USD: 1.18 },
    PKR: { USD: 0.0036, EUR: 0.0033 }
  };
  
  const amountInput = document.getElementById("amount");
  const sourceCurrency = document.getElementById("source-currency");
  const targetCurrency = document.getElementById("target-currency");
  const resultDisplay = document.getElementById("result");
  const convertButton = document.getElementById("convert");
  const clearButton = document.getElementById("clear");
  const historyList = document.getElementById("history-list");
  const clearStorageBtn=document.getElementById("clearStorageBtn")
  let history=document.getElementById("history")
  // Function to store data in local storage
  function storeHistory(amount, source, target, result) {
    const storage = JSON.parse(localStorage.getItem("history")) || [];
    storage.push({
      amount,
      source,
      target,
      result,
      date: new Date().toLocaleString()
    });
    localStorage.setItem("history", JSON.stringify(storage));
  }
  
  // Function to display history
  function displayHistory() {
    const storage = JSON.parse(localStorage.getItem("history")) || [];
    historyList.innerHTML = "";
  
    storage.forEach((entry) => {
      const historyItem = document.createElement("p");
      historyItem.textContent = `${entry.amount} ${entry.source} = ${entry.result} ${entry.target} (on ${entry.date})`;
      historyList.appendChild(historyItem);
    });
  }
  
clearStorageBtn.addEventListener("click",function(){
    localStorage.clear("history")
    history.removeChild(historyList)
})

  // Convert currency
  convertButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const source = sourceCurrency.value;
    const target = targetCurrency.value;
  
    if (isNaN(amount) || amount <= 0) {
      resultDisplay.textContent = "Enter a valid amount.";
      return;
    }
  
    if (source === target) {
      resultDisplay.textContent = "Source and target currencies must differ.";
      return;
    }
  
    const rate = conversionRates[source][target];
    const result = (amount * rate).toFixed(2);
    resultDisplay.textContent = `${amount} ${source} = ${result} ${target}`;
    storeHistory(amount, source, target, result);
    displayHistory();
  });
  
  // Clear input and result
  clearButton.addEventListener("click", () => {
    amountInput.value = "";
    sourceCurrency.value = "USD";
    targetCurrency.value = "USD";
    resultDisplay.textContent = "";
  });
  
  // Load history on page load
  document.addEventListener("DOMContentLoaded", displayHistory);
  