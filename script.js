window.onload = () => renderContent();
document.querySelector(".btn").addEventListener("click", executeTransaction);

function renderContent(loc=2){

    let income = 0;
    let expense = 0;
    let balance = 0;
    console.log("-*-Rendering Content-*-")
    // RENDERING TRANSACTION HISTORY
    if(localStorage.length>2){
        console.log("Render: Transaction History ")
        for (let index = loc; index < localStorage.length; index++){
            let temp = JSON.parse(localStorage[index]);
            let li = document.createElement("li");
            let label = document.createElement("span");

            li.innerHTML = temp.name;
            if(temp.amount>=0){
                label.innerHTML = "+$"+temp.amount;
                li.setAttribute("class", "plus");
                income = Number.parseFloat(JSON.parse(localStorage[0]).amount);
            } else{
                label.innerHTML = "-$"+temp.amount;
                li.setAttribute("class", "minus");
                expense = Number.parseFloat(JSON.parse(localStorage[1]).amount);
            }
            li.appendChild(label);
            document.querySelector(".list").appendChild(li);
        }
        document.querySelector("#money-plus").innerHTML = "+$"+income;
        document.querySelector("#money-minus").innerHTML = "-$"+Math.abs(expense);
        balance = Number.parseFloat(JSON.parse(localStorage[0]).amount)-Number.parseFloat(JSON.parse(localStorage[1]).amount);
        document.querySelector("#balance").innerHTML = "+$"+Math.abs(balance);
    }else{
        console.log("No Transaction History exists")
        // ADDING INCOME and EXPENSE to LOCAL STORAGE
        // INCOME key=0 and EXPENSE key=1
        {
            income = (localStorage.getItem("Income")==null) ? 0 : Number.parseFloat(
                document.querySelector("#money-plus").innerHTML.substr(2));
            expense = (localStorage.getItem("Income")==null) ? 0 : Number.parseFloat(
                document.querySelector("#money-minus").innerHTML.substr(2));
            
            localStorage.setItem("0", JSON.stringify({"name":"Income", "amount":income}));
            localStorage.setItem("1", JSON.stringify({"name":"Expense", "amount":expense}));
        }
    }
}

function executeTransaction(){
    let name = document.querySelector("#text").value;
    let amount = Number.parseFloat(document.querySelector("#amount").value);
    localStorage.setItem(localStorage.length, JSON.stringify({"name":name, "amount":amount, "id":Math.floor(Math.random()*99999999)}));
    if(amount>0){
        let income = Number.parseFloat(JSON.parse(localStorage[0]).amount)+amount;
        localStorage.setItem("0", JSON.stringify({"name":"Income", "amount":income}));
    }else{
        let expense = Number.parseFloat(JSON.parse(localStorage[1]).amount)-amount;
        localStorage.setItem("1", JSON.stringify({"name":"Expense", "amount":expense}));
    }
}