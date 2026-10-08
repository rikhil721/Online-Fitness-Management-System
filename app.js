
const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Retrieve field values 
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const programSelect = document.getElementById("program");
        const trainerSelect = document.getElementById("trainerSelect");
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        const programValue = programSelect.value;
        const programText = programSelect.options[programSelect.selectedIndex].text;
        const trainerText = trainerSelect.value ? trainerSelect.options[trainerSelect.selectedIndex].text : "";

        // Validation
        if (!name || !email || !programValue || !trainerSelect.value || !date || !time) {
            alert("Please fill in all fields.");
            return;
        }

        // Calculate price based on selected value
        let price = 0;
        switch (programValue) {
            case "strength":
                price = 500;
                break;
            case "cardio":
                price = 400;
                break;
            case "yoga":
                price = 300;
                break;
            case "weightloss":
                price = 450;
                break;
            case "personal":
                price = 800;
                break;
            default:
                price = 0;
        }


        document.getElementById("summaryName").textContent = name;
        document.getElementById("summaryProgram").textContent = programText;
        document.getElementById("summaryTrainer").textContent = trainerText;
        document.getElementById("summaryDate").textContent = date;
        document.getElementById("summaryTime").textContent = time;
        document.getElementById("summaryPrice").textContent = price;

        //toast notification
        const toast = document.getElementById("toast");
        if (toast) {
            toast.style.display = "block";
            setTimeout(() => {
                toast.style.display = "none";
            }, 3000);
        }

        bookingForm.reset();
    });
}

// Hero button 
const programBtn = document.getElementById("programBtn");
if (programBtn) {
    programBtn.addEventListener("click", () => {
        document.getElementById("programs").scrollIntoView({ behavior: "smooth" });
    });
}

const bookBtn = document.getElementById("bookBtn");
if (bookBtn) {
    bookBtn.addEventListener("click", () => {
        document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
    });
}