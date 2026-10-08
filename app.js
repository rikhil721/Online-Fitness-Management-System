// ---------------------------------------
// PERSONAL TRAINING
// ---------------------------------------


// Get program and trainer dropdowns
const programSelect =
    document.getElementById("program");

const trainerSelect =
    document.getElementById("trainerSelect");


// Change trainer according to program
programSelect.addEventListener("change", function() {

    // Clear old trainers
    trainerSelect.innerHTML =
        '<option value="">Select Trainer</option>';


    // Strength Training
    if (programSelect.value === "strength") {

        trainerSelect.innerHTML +=
            '<option value="rahul">Rahul Sharma</option>';

    }


    // Weight Loss
    else if (programSelect.value === "weightloss") {

        trainerSelect.innerHTML +=
            '<option value="ananya">Ananya Rao</option>';

    }


    // Personal Training
    else if (programSelect.value === "personal") {

        trainerSelect.innerHTML +=
            '<option value="rahul">Rahul Sharma</option>';

    }

});



// ---------------------------------------
// DATE VALIDATION
// ---------------------------------------


const dateInput =
    document.getElementById("date");


// Check selected date
dateInput.addEventListener("change", function() {

    const selectedDate =
        new Date(dateInput.value);

    const today =
        new Date();


    // Remove current time
    today.setHours(0, 0, 0, 0);


    // Check if date is before today
    if (selectedDate < today) {

        alert(
            "Invalid date. Please select today or a future date."
        );

        dateInput.value = "";

    }

});



// ---------------------------------------
// TIME VALIDATION
// ---------------------------------------


const timeInput =
    document.getElementById("time");


timeInput.addEventListener("change", function() {

    const selectedDate =
        dateInput.value;

    const selectedTime =
        timeInput.value;


    // Date must be selected first
    if (!selectedDate) {

        alert("Please select a date first.");

        timeInput.value = "";

        return;

    }


    const today =
        new Date();


    // Create today's date
    const todayDate =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");


    // Only check time when booking for today
    if (selectedDate === todayDate) {

        const currentHours =
            today.getHours();

        const currentMinutes =
            today.getMinutes();


        // Split selected time
        const timeParts =
            selectedTime.split(":");


        const selectedHours =
            Number(timeParts[0]);

        const selectedMinutes =
            Number(timeParts[1]);


        // Check if time has already passed
        if (
            selectedHours < currentHours ||
            (
                selectedHours === currentHours &&
                selectedMinutes <= currentMinutes
            )
        ) {

            alert(
                "Invalid time. Please select a future time."
            );

            timeInput.value = "";

        }

    }

});



// ---------------------------------------
// PERSONAL BOOKING
// ---------------------------------------


const bookingForm =
    document.getElementById("booking-form");


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function(event) {

            // Stop page refresh
            event.preventDefault();


            // Get values
            const name =
                document.getElementById("name")
                    .value.trim();

            const email =
                document.getElementById("email")
                    .value.trim();

            const programValue =
                programSelect.value;

            const trainerValue =
                trainerSelect.value;

            const date =
                dateInput.value;

            const time =
                timeInput.value;


            // Check all fields
            if (
                !name ||
                !email ||
                !programValue ||
                !trainerValue ||
                !date ||
                !time
            ) {

                alert(
                    "Please fill in all fields."
                );

                return;

            }


            // Get program name
            const programText =
                programSelect.options[
                    programSelect.selectedIndex
                ].text;


            // Get trainer name
            const trainerText =
                trainerSelect.options[
                    trainerSelect.selectedIndex
                ].text;


            // Calculate price
            let price = 0;


            if (programValue === "strength") {

                price = 500;

            }

            else if (programValue === "weightloss") {

                price = 450;

            }

            else if (programValue === "personal") {

                price = 800;

            }


            // Show booking summary
            document.getElementById(
                "summaryName"
            ).textContent = name;


            document.getElementById(
                "summaryProgram"
            ).textContent = programText;


            document.getElementById(
                "summaryTrainer"
            ).textContent = trainerText;


            document.getElementById(
                "summaryDate"
            ).textContent = date;


            document.getElementById(
                "summaryTime"
            ).textContent = time;


            document.getElementById(
                "summaryPrice"
            ).textContent = price;


            // Show toast
            showToast(
                "Personal Training Booked Successfully!"
            );


            // Reset form
            bookingForm.reset();


            // Reset trainer dropdown
            trainerSelect.innerHTML =
                '<option value="">Select Trainer</option>';

        }
    );

}



// ---------------------------------------
// GROUP TRAINING
// ---------------------------------------


const groupButtons =
    document.querySelectorAll(
        ".group-book-btn"
    );


groupButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            // Get session information
            const program =
                button.getAttribute(
                    "data-program"
                );

            const day =
                button.getAttribute(
                    "data-day"
                );

            const time =
                button.getAttribute(
                    "data-time"
                );

            const trainer =
                button.getAttribute(
                    "data-trainer"
                );

            const price =
                button.getAttribute(
                    "data-price"
                );


            // Get user's name and email
            const name =
                document.getElementById(
                    "name"
                ).value.trim();

            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            // Name and email are required
            if (!name || !email) {

                alert(
                    "Please enter your name and email first."
                );

                return;

            }


            // Find next session date
            const sessionDate =
                getNextDay(day);


            // Convert time
            let displayTime = time;


            if (time === "07:00") {

                displayTime = "7:00 AM";

            }

            else if (time === "18:00") {

                displayTime = "6:00 PM";

            }


            // Show booking summary
            document.getElementById(
                "summaryName"
            ).textContent = name;


            document.getElementById(
                "summaryProgram"
            ).textContent = program;


            document.getElementById(
                "summaryTrainer"
            ).textContent = trainer;


            document.getElementById(
                "summaryDate"
            ).textContent = sessionDate;


            document.getElementById(
                "summaryTime"
            ).textContent = displayTime;


            document.getElementById(
                "summaryPrice"
            ).textContent = price;


            // Show toast
            showToast(
                "Group Training Booked Successfully!"
            );

        }
    );

});



// ---------------------------------------
// FIND NEXT SESSION DAY
// ---------------------------------------


function getNextDay(dayName) {

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];


    const today =
        new Date();


    const todayNumber =
        today.getDay();


    const targetNumber =
        days.indexOf(dayName);


    let difference =
        targetNumber - todayNumber;


    // If today is the same day,
    // use next week's session
    if (difference <= 0) {

        difference += 7;

    }


    const nextDate =
        new Date();


    nextDate.setDate(
        today.getDate() + difference
    );


    // Format date as YYYY-MM-DD
    const year =
        nextDate.getFullYear();


    const month =
        String(
            nextDate.getMonth() + 1
        ).padStart(2, "0");


    const date =
        String(
            nextDate.getDate()
        ).padStart(2, "0");


    return (
        year +
        "-" +
        month +
        "-" +
        date
    );

}



// ---------------------------------------
// TOAST FUNCTION
// ---------------------------------------


function showToast(message) {

    const toast =
        document.getElementById("toast");


    if (toast) {

        toast.textContent = message;

        toast.style.display = "block";


        setTimeout(function() {

            toast.style.display = "none";

            toast.textContent =
                "Booking Confirmed Successfully!";

        }, 3000);

    }

}



// ---------------------------------------
// HERO BUTTONS
// ---------------------------------------


// View Programs
const programBtn =
    document.getElementById(
        "programBtn"
    );


if (programBtn) {

    programBtn.addEventListener(
        "click",
        function() {

            document.getElementById(
                "programs"
            ).scrollIntoView({

                behavior: "smooth"

            });

        }
    );

}



// Book a Session
const bookBtn =
    document.getElementById(
        "bookBtn"
    );


if (bookBtn) {

    bookBtn.addEventListener(
        "click",
        function() {

            document.getElementById(
                "booking"
            ).scrollIntoView({

                behavior: "smooth"

            });

        }
    );

}
