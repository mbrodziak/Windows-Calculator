let click_operator = false;
let prev_value = 0;
let value = 0;
let result = 0;
let first_click = true;
let op = "";
let prev_op = "";
let percentage = false;
let comma = false;
let memory = "Brak elementów zapisanych w pamięci";
let history = "Nie ma jeszcze historii";
let actual_history = "";
let is_memory = false;
let tab_click_button = [];
let click_result = false;

function initial() {
    document.getElementById("saved-history-memory").value = history;
    document.querySelector("#btn-history").classList.toggle("btn-click");
    document.querySelector(".del-history").classList.toggle("disabled-del-history")
    disabledButton();
}

function checkValue() {
    value = document.getElementById("number").value;
    return value;
}

function checkCommaInValue() {
    value = checkValue();

    for (let i = 0; i < value.length; i++) {
        if (value[i] === ".") {
            return true;
        }
    }
    return false;
} 

function calculator(clickValue) {
    value = checkValue();

    if (click_result === true) {
        document.getElementById("actual-history").value = actual_history;
    }

    if (value === "0" || click_operator === true || click_result === true) {
        document.getElementById("number").value = clickValue;
        click_operator = false;
        click_result = false;
    }
    else {
        document.getElementById("number").value = value + clickValue;
    }
} 

function operation(operator) {
    click_operator = true;

    if (click_result === false) {
        value = checkValue();
        value = parseFloat(value);
    }

    if (percentage === true) {
        result = prev_value;
    }

    if (history === "Nie ma jeszcze historii") {
        history = "";
    }
    
    if (percentage === false) {
        if (first_click === false) {
            history = history + " " + operator + " " + value;
        }
        else {
            history = history + " " + value;
        }
    }

    switch(operator) {
        case "+":
            if (percentage === false) {
                result = prev_value + value;    
            }
            prev_value = result; 
            break;
        case "-":
            if (first_click === false) {
                if (percentage === false) {
                    result = prev_value - value;
                }
            }
            else {
                result = value;
            }
            prev_value = result;
            break;
        case "*":
            if (first_click === false) {
                if (percentage === false) {
                    result = prev_value * value;
                }
            }
            else {
                result = value;
            }
            prev_value = result;
            break;
        case "/":
            if (first_click === false) {
                if (value === 0) {
                    if (prev_value === 0) {
                        result = "Nieokreślony wynik"
                    }
                    else {
                        result = "Nie można dzielić przez zero"
                    }
                } 
                else {
                    if (percentage === false) {
                        result = prev_value / value;
                    }
                }
            }
            else {
                result = value;
            }
            prev_value = result;
            break;
    }
    first_click = false;
    percentage = false;
    return result;
}

function execute() {
    let result = 0;
    if (prev_op === "") {
        first_change_click = true;
        result = operation(op);
    }
    else {
        result = operation(prev_op);
    }
    document.getElementById("number").value = result;
}

function enableButton() {
    let mc = document.querySelector("#MC");
    let mr = document.querySelector("#MR");
    mc.disabled = false;
    mr.disabled = false;
    mc.classList.remove("disabled-button");
    mr.classList.remove("disabled-button");

    if (is_memory === true) {
        document.querySelector(".del-history").classList.remove("disabled-del-history");
    }
}

function disabledButton() {
    let mc = document.querySelector("#MC");
    let mr = document.querySelector("#MR");
    mc.disabled = true;
    mr.disabled = true;
    mc.classList.toggle("disabled-button");
    mr.classList.toggle("disabled-button");

    if (is_memory === true) {
        document.querySelector(".del-history").classList.toggle("disabled-del-history")
    }
}


function enabledButtonOperation() {
    let operation_array = ["#add", "#sub", "#multiply", "#divide", "#percentage", "#one-divide-x", "#pow", "#sqrt"];
    let rest_button = ["#comma", "#plus-minus"];
    let memory_button = ["#MADD", "#MSUB", "#MS"];

    for (let i = 0; i < operation_array.length; i++) {
        document.querySelector(operation_array[i]).classList.remove("disabled-button-operator");
        document.querySelector(operation_array[i]).disabled = false;
    }

    for (let i = 0; i < rest_button.length; i++) {
        document.querySelector(rest_button[i]).classList.remove("disabled-button-rest");
        document.querySelector(rest_button[i]).disabled = false;
    }


    for (let i = 0; i < memory_button.length; i++) {
        document.querySelector(memory_button[i]).classList.remove("disabled-button");
        document.querySelector(memory_button[i]).disabled = false;
    }

    if (memory !== "Brak elementów zapisanych w pamięci") {
        enableButton();
    }
}

function disabledButtonOperation() {
    let operation_array = ["#add", "#sub", "#multiply", "#divide", "#percentage", "#one-divide-x", "#pow", "#sqrt"];
    let rest_button = ["#comma", "#plus-minus"];
    let memory_button = ["#MADD", "#MSUB", "#MS"];

    for (let i = 0; i < operation_array.length; i++) {
        document.querySelector(operation_array[i]).classList.toggle("disabled-button-operator");
        document.querySelector(operation_array[i]).disabled = true;
    }

    for (let i = 0; i < rest_button.length; i++) {
        document.querySelector(rest_button[i]).classList.toggle("disabled-button-rest");
        document.querySelector(rest_button[i]).disabled = true;
    }

    for (let i = 0; i < memory_button.length; i++) {
        document.querySelector(memory_button[i]).classList.toggle("disabled-button");
        document.querySelector(memory_button[i]).disabled = true;
    }

    if (memory !== "Brak elementów zapisanych w pamięci") {
        disabledButton();
    }
}

function checkOperation() {

    if (click_result === true) {
        tab_click_button.unshift(result);
    }

    for (let i = 0; i < tab_click_button.length; i++) {
        if (i < tab_click_button.length) {
            if (tab_click_button[i] === "+" && (tab_click_button[i + 1] === "+" || tab_click_button[i + 1] === "-" || 
            tab_click_button[i + 1] === "*" || tab_click_button[i + 1] === "/")) {
                tab_click_button[i] = tab_click_button[i + 1];
                tab_clik_button = tab_click_button.pop();
                return true;
            }
            else if (tab_click_button[i] === "-" && (tab_click_button[i + 1] === "+" || tab_click_button[i + 1] === "-" || 
            tab_click_button[i + 1] === "*" || tab_click_button[i + 1] === "/")) {
                tab_click_button[i] = tab_click_button[i + 1];
                tab_clik_button = tab_click_button.pop();
                return true;
            }
            else if (tab_click_button[i] === "*" && (tab_click_button[i + 1] === "+" || tab_click_button[i + 1] === "-" || 
            tab_click_button[i + 1] === "*" || tab_click_button[i + 1] === "/")) {
                tab_click_button[i] = tab_click_button[i + 1];
                tab_clik_button = tab_click_button.pop();
                return true;
            }
            else if (tab_click_button[i] === "/" && (tab_click_button[i + 1] === "+" || tab_click_button[i + 1] === "-" || 
            tab_click_button[i + 1] === "*" || tab_click_button[i + 1] === "/")) {
                tab_click_button[i] = tab_click_button[i + 1];
                tab_clik_button = tab_click_button.pop();
                return true;
            }
        }
    }
    return false;
}


document.getElementById("zero").addEventListener("click", function() {
    tab_click_button.push("0");
    enabledButtonOperation()
    calculator(0);
});

document.getElementById("one").addEventListener("click", function() {
    tab_click_button.push("1");
    enabledButtonOperation()
    calculator(1);
});

document.getElementById("two").addEventListener("click", function() {
    tab_click_button.push("2");
    enabledButtonOperation()
    calculator(2)
});

document.getElementById("three").addEventListener("click", function() {
    tab_click_button.push("3");
    enabledButtonOperation()
    calculator(3);
});

document.getElementById("four").addEventListener("click", function() {
    tab_click_button.push("4");
    enabledButtonOperation()
    calculator(4);
});

document.getElementById("five").addEventListener("click", function() {
    tab_click_button.push("5");
    enabledButtonOperation()
    calculator(5);
});

document.getElementById("six").addEventListener("click", function() {
    tab_click_button.push("6");
    enabledButtonOperation()
    calculator(6);
});

document.getElementById("seven").addEventListener("click", function() {
    tab_click_button.push("7");
    enabledButtonOperation()
    calculator(7);
});

document.getElementById("eight").addEventListener("click", function() {
    tab_click_button.push("8");
    enabledButtonOperation()
    calculator(8);
});

document.getElementById("nine").addEventListener("click", function() {
   tab_click_button.push("9");
   enabledButtonOperation()
   calculator(9);
});

document.getElementById("add").addEventListener("click", function() {
    tab_click_button.push("+");
    is_second_op = checkOperation();

    if (first_click === true) {
        value = 0;
    }

    if (click_result === true) {
        value = result;
        click_operator = true;
    }

    if (is_second_op === true) {
        prev_op = "";
        op = "+"
    }
    else {
        prev_op = op;
        op = "+";
        execute();
    }

    if (tab_click_button[0] !== "+") {
        actual_history = tab_click_button.join("");
        document.getElementById("actual-history").value = actual_history;
    }
});

document.getElementById("sub").addEventListener("click", function() {
    tab_click_button.push("-");
    is_second_op = checkOperation();

    if (click_result === true) {
        value = result;
        click_operator = true;
    }

    if (is_second_op === true) {
        prev_op = "";
        op = "-"
    }
    else {
        prev_op = op;
        op = "-";
        execute();
    }

    if (tab_click_button[0] !== "-") {
        actual_history = tab_click_button.join("");
        document.getElementById("actual-history").value = actual_history;
    }

});

document.getElementById("multiply").addEventListener("click", function() {
    tab_click_button.push("*");
    is_second_op = checkOperation();

    if (click_result === true) {
        value = result;
        click_operator = true;
    }

    if (is_second_op === true) {
        prev_op = "";
        op = "*"
    }
    else {
        prev_op = op;
        op = "*";
        execute();
    }

    if (tab_click_button[0] !== "*") {
        actual_history = tab_click_button.join("");
        document.getElementById("actual-history").value = actual_history;
    }
});

document.getElementById("divide").addEventListener("click", function() {
    tab_click_button.push("/");
    is_second_op = checkOperation();

    if (click_result === true) {
        value = result;
        click_operator = true;
    }

    if (is_second_op === true) {
        prev_op = "";
        op = "/"
    }
    else {
        prev_op = op;
        op = "/";
        execute();
    }

    if (tab_click_button[0] !== "/") {
        actual_history = tab_click_button.join("");
        document.getElementById("actual-history").value = actual_history;
    }
});

document.getElementById("pow").addEventListener("click", function() {
    click_result = true;
    tab_click_button = [];
    actual_history = "";
    value = checkValue();
    value = parseFloat(value);
    document.getElementById("number").value = Math.pow(value, 2);
    document.getElementById("actual-history").value = actual_history;
});

document.getElementById("sqrt").addEventListener("click", function() {
    click_result = true;
    tab_click_button = [];
    actual_history = "";
    value = checkValue();
    value = parseFloat(value);
    document.getElementById("number").value = Math.sqrt(value);
    document.getElementById("actual-history").value = actual_history;
});

document.getElementById("one-divide-x").addEventListener("click", function() {
    click_result = true;
    tab_click_button = [];
    value = checkValue();
    value = parseFloat(value);
    actual_history = "";
    result = 1 / value;
    document.getElementById("number").value = result;
    document.getElementById("actual-history").value = actual_history;
});

document.getElementById("percentage").addEventListener("click", function() {
    percentage = true;
    value = checkValue();
    value = parseFloat(value);
    if (op === "") {
        result = 0;
    }
    else {
        if (op === "+" || op === "-") {
            value = (prev_value / 100) * value;
            document.getElementById("number").value = value; 
        }
        else if (op === "*" || op === "/") {
            value = (value / 100);
            document.getElementById("number").value = value; 
        }
        i = tab_click_button.length;
        tab_clik_button = tab_click_button.pop();
        tab_click_button.push(String(value));
    }
    document.getElementById("actual-history").value = actual_history + value;
    operation(op);
});


document.getElementById("ce").addEventListener("click", function() {
    document.getElementById("number").value = 0;
    enabledButtonOperation();
    click_operator = false;
    prev_value = 0;
    value = 0;
    first_click = true;
    actual_history = ""; 
    tab_click_button = [];
    history = "";
    document.getElementById("actual-history").value = actual_history;
});

document.getElementById("c").addEventListener("click", function() {
    enabledButtonOperation();
    document.getElementById("number").value = 0;
    click_operator = false;
    prev_value = 0;
    value = 0;
    first_click = true;
    actual_history = ""; 
    tab_click_button = [];
    history = "";
    document.getElementById("actual-history").value = actual_history;
});

document.getElementById("del").addEventListener("click", function() {
    enabledButtonOperation();
    value = checkValue();
    let new_value = "";
    let length_value = value.length;

    if (value === "Nie można dzielić przez zero") {
        new_value = 0;
    }
    else {
        if (length_value == 1) {
            new_value = 0;
        }
        else if (length_value > 1) {
            for (let i = 0; i < length_value - 1; i++) {
                new_value = new_value + value[i]; 
            }
        }
    }
    document.getElementById("number").value = new_value;
});

document.getElementById("plus-minus").addEventListener("click", function() {
    value = checkValue();
    value = parseFloat(value);
    if (value <= 0) {
        value = Math.abs(value);
    }
    else {
        value = -value;
    }
    document.getElementById("number").value = value;
});

document.getElementById("comma").addEventListener("click", function() {
    tab_click_button.push(".");
    value = checkValue();
    comma = checkCommaInValue();

    if (comma === false) {
        document.getElementById("number").value = value + ".";
    }
});

document.getElementById("MS").addEventListener("click", function() {
    value = checkValue();
    memory = parseFloat(value);
    if (is_memory === true) {
        document.getElementById("saved-history-memory").value = memory;
    }
    enableButton();
});

document.getElementById("MC").addEventListener("click", function() {
    memory = "Brak elementów zapisanych w pamięci";
    if (is_memory === true) {
        document.getElementById("saved-history-memory").value = "Brak elementów zapisanych w pamięci";
    }
    disabledButton();
});

document.getElementById("MR").addEventListener("click", function() {
    if (memory !== "Brak elementów zapisanych w pamięci") {
        document.getElementById("number").value = memory;
    }
});

document.getElementById("MADD").addEventListener("click", function() {
    value = checkValue();
    if (memory !== "Brak elementów zapisanych w pamięci") {
        memory = memory + parseFloat(value);
    }
    if (is_memory === true) {
            document.getElementById("saved-history-memory").value = memory;
    }
});

document.getElementById("MSUB").addEventListener("click", function() {
    value = checkValue();
    if (memory !== "Brak elementów zapisanych w pamięci") {
        memory = memory - parseFloat(value);
    }
    if (is_memory === true) {
        document.getElementById("saved-history-memory").value = memory;
    }
});

document.getElementById("result").addEventListener("click", function() {
    enabledButtonOperation();

    if (tab_click_button.length !== 0) {
        if (click_result === true) {
            console.log(prev_op);
            console.log(op);
            prev_value = result;
            first_click = false;
            actual_history = result + op;
            history = history + result;
            result = operation(op);
            first_click = true;
            click_operator = false;
        }
        else {
            value = checkValue();
            value = parseFloat(value);
            result = operation(op);
            prev_value = 0;
      
        }
    
        if (result === "Nie można dzielić przez zero" || result === "Nieokreślony wynik") {
            disabledButtonOperation();
            history = "Nie ma jeszcze historii";
            actual_history = "";
        }
        else {
            actual_history = actual_history + value + "=";
            history = history + " = " + result + " \n";
        }
    
        document.getElementById("number").value = result;
        document.getElementById("actual-history").value = actual_history;
        tab_click_button = [];
        actual_history = "";
    
        if (is_memory === false) {
            document.getElementById("saved-history-memory").value = history;
            document.querySelector(".del-history").classList.remove("disabled-del-history");
        }
    
        first_click = true;
        click_operator = false;
        click_result = true;
    }
});

document.getElementById("btn-history").addEventListener("click", function() {
    if (is_memory === true) {
        document.querySelector("#btn-history").classList.toggle("btn-click");
        document.querySelector("#btn-memory").classList.remove("btn-click");
    }
    is_memory = false;
    document.getElementById("saved-history-memory").value = history;

    if (history !== "Nie ma jeszcze historii") {
        document.querySelector(".del-history").classList.toggle("disabled-del-history");
    }

    if (memory != "Brak elementów zapisanych w pamięci") {
        document.querySelector(".del-history").classList.toggle("disabled-del-history");
    }
});

document.getElementById("btn-memory").addEventListener("click", function() {
    if (is_memory === false) {
        document.querySelector("#btn-memory").classList.toggle("btn-click");
        document.querySelector("#btn-history").classList.remove("btn-click");
    }
    is_memory = true;
    document.getElementById("saved-history-memory").value = memory;

    if (memory !== "Brak elementów zapisanych w pamięci") {
        document.querySelector(".del-history").classList.toggle("disabled-del-history");
    }

    if (history != "Nie ma jeszcze historii") {
        document.querySelector(".del-history").classList.toggle("disabled-del-history");
    }
});


document.getElementById("del-history").addEventListener("click", function() {
    if (is_memory === true) {
        memory = "Brak elementów zapisanych w pamięci";
        document.getElementById("saved-history-memory").value = memory;
        disabledButton();
    }
    else {
        history = "Nie ma jeszcze historii";
        document.getElementById("saved-history-memory").value = history;
        document.querySelector(".del-history").classList.toggle("disabled-del-history");
    }
});

initial();