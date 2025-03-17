const typeRadios = document.querySelectorAll(".type-radios");
const InvalidFeedback = document.querySelectorAll(".invalid-feedback");
const formControls = document.querySelectorAll(".form-control");

function customValidation(control) {
    const inputGroup = control.closest(".input-group");
    let span = inputGroup.querySelector(".mortgage-spans");
    const message = inputGroup.parentElement.querySelector(".invalid-feedback");


    const checkInput = control.checkValidity();
    if (!checkInput) {
        inputGroup.classList.add("invalid");
        span.classList.add("invalid");
        message.style.display = "block"
          
    }else{
        inputGroup.classList.remove("invalid");
        span.classList.remove("invalid");
        message.style.display = "none"
    }

}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          
          formControls.forEach(control => customValidation(control));

          const isRadioChecked = document.querySelector('input[name="flexRadioDefault"]:checked');
          const mortgageTypeBox = document.querySelector(".MortageTypeBox");
          const radioError = mortgageTypeBox.querySelector(".invalid-feedback");
          if (!isRadioChecked) {
              radioError.style.display = "block";
          }

        }else{
            event.preventDefault();
            repayment(event);
        }
  
        form.classList.add('was-validated')
        formControls.forEach(control => {
            control.addEventListener("input", () => customValidation(control));
        });
            
      }, false)
    })
})();
// document.addEventListener("DOMContentLoaded", function () {
//     const inputs = document.querySelectorAll(".form-control");

//     inputs.forEach(input => {
//         input.addEventListener("input", function () {
//             const inputGroup = this.closest(".input-group");

//             if (this.classList.contains("is-invalid")) {
//                 inputGroup.classList.add("invalid"); // Add class to input-group
//             } else {
//                 inputGroup.classList.remove("invalid"); // Remove class if valid
//             }
//         });
//     });
// });
//removing invalid characters in the input 
var invalidChars = ["-", "e", "+", "E"];

$("input[type='number']").on("keydown", function(e){ 
    if(invalidChars.includes(e.key)){
         e.preventDefault();
    }
});

const amountFormatted = document.getElementById("amountFormatted");
const amountRaw = document.getElementById("amount");

amountFormatted.addEventListener("input", function (event) {
    let rawValue = event.target.value.replace(/,/g, ""); // regex expression to Remove commas

    // Ensure the input is a valid number
    if (!isNaN(rawValue) && rawValue !== "") {
        let formattedValue = Number(rawValue).toLocaleString("en-GB"); // Format with commas

        amountFormatted.value = formattedValue; // Update visible input
        amountRaw.value = rawValue; // Store raw value for calculations
    } else {
        event.target.value = event.target.value.slice(0, -1); // Remove last invalid character
    }
});

typeRadios.forEach(radio => {
    radio.addEventListener("change", function () {
        // Remove 'picked' class from all typeBar elements
        document.querySelectorAll(".typeBar").forEach(bar => bar.classList.remove("picked"));

        // Add 'picked' class to the parent typeBar of the selected radio
        let typeBar = radio.closest(".typeBar");
        let invalidMessage = typeBar.parentElement.querySelector(".invalid-feedback");
        if (radio.checked) {
            typeBar.classList.add("picked");
            invalidMessage.style.display = "none";
            
        }else{
            invalidMessage.style.display = "block";
        }
    });
});

formControls.forEach(form => {
    form.addEventListener("focus", function () {
        const inputGroup = form.closest(".input-group");

        inputGroup.classList.add("onfocus");

        let span = inputGroup.querySelector(".mortgage-spans");
        if (span) {
            span.classList.add("onfocus");
        }
    });

    form.addEventListener("blur", function () {
        const inputGroup = form.closest(".input-group");
        inputGroup.classList.remove("onfocus");

        let span = inputGroup.querySelector(".mortgage-spans");
        if (span) {
            span.classList.remove("onfocus");
        }
    });
    // form.addEventListener("input",function(){
    //     const inputGroup = form.closest(".input-group");
    //     let span = inputGroup.querySelector(".mortgage-spans");
    //     const message = inputGroup.parentElement.querySelector(".invalid-feedback");


    //     const checkInput = form.reportValidity();
    //     if (!checkInput) {
    //         inputGroup.classList.add("invalid");
    //         span.classList.add("invalid");
    //         message.style.display = "block"
              
    //     }else{
    //         inputGroup.classList.remove("invalid");
    //         span.classList.remove("invalid");
    //         message.style.display = "none"
    //     }

    // });
});
//-----Repayment------
// formula => M = P * ( r(1 + r)^n/ (1 + r)^n - 1);
// let TotalRepayment = M * n;

//-----Interest Only------
// formula => M = P * r
// let TotalRepayment = M * n + P;


const resultEmpty = document.getElementById("resultEmpty");
const repaymentPage = document.getElementById("repaymentPage");

function repayment(event) {

    event.preventDefault()
    resultEmpty.classList.remove("d-flex");
    resultEmpty.classList.add("d-none");
    
    console.log(document.getElementById("resultEmpty"));


    const amount = parseInt(amountRaw.value);
    const years = parseInt(document.getElementById("years").value);
    const rate = parseFloat(document.getElementById("rate").value);

    //to check if user picked repayment or interest only
    const isRepayment = document.querySelector("#flexRadioDefault1").checked;

     
    let n = 12 * years;
    let r = (rate / 100) / 12;
    let x = Math.pow((1 + r), n);

    //declare monthly and total repayment variables
    let MonthlyRepayment;
    let TotalRepayment;

    if (isRepayment) {
        MonthlyRepayment= (amount * ((r * x) / (x - 1)));
        TotalRepayment = (MonthlyRepayment * n);    
    } else{
        MonthlyRepayment = amount * r;  
        TotalRepayment = MonthlyRepayment * n + amount;
    }


    MonthlyRepayment = MonthlyRepayment.toFixed(2);
    TotalRepayment = TotalRepayment.toFixed(2);
    console.log("monthlyRepayment is "+ MonthlyRepayment);
    console.log("TotalRepayment is "+ TotalRepayment);
      
    //to display the repayment page
    repaymentPage.style.display = "block";

    //to add thousands separator to the results
    let formattedMonR = Number(MonthlyRepayment).toLocaleString("en-GB");
    let formattedTotR = Number(TotalRepayment).toLocaleString("en-GB"); 
    
    //to display the result in the h1 and h5 tags of the main result repayment page
    repaymentPage.querySelector("h1").innerHTML = `£${formattedMonR}`;
    repaymentPage.querySelector("h5").innerHTML = `£${formattedTotR}`;

    
}

function clearAll() {
    //to clear all the values in the form
    formControls.forEach(form => {
        form.value = "";
    });
    typeRadios.forEach(radio => {
        radio.checked = false;
    });
    
    //to display the empty UI
    resultEmpty.classList.remove("d-none");
    resultEmpty.classList.add("d-flex");

    //to hide the repayment page
    repaymentPage.style.display = "none";
     
    //to remove the styles  for the selected mortgage type
    document.querySelectorAll(".typeBar").forEach(bar => bar.classList.remove("picked"));
}