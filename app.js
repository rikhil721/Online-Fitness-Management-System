// ---------------------------------------
// SUPABASE CONFIGURATION
// ---------------------------------------
const SUPABASE_URL = "https://aaoeluigrecmxubukpko.supabase.co";
const SUPABASE_KEY = "sb_publishable_MjuNvNNjkHCGbFP6_8CPxg_O4lF5uKE";

function getSupabase() {
    if (window.supabase) {
        return window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    return null;
}

// ---------------------------------------
// PERSONAL TRAINING
// ---------------------------------------

const programSelect = document.getElementById("program");
const trainerSelect = document.getElementById("trainerSelect");

if (programSelect && trainerSelect) {
    programSelect.addEventListener("change", function() {
        trainerSelect.innerHTML = '<option value="">Select Trainer</option>';

        if (programSelect.value === "strength") {
            trainerSelect.innerHTML += '<option value="rahul">Rahul Sharma</option>';
        } else if (programSelect.value === "weightloss") {
            trainerSelect.innerHTML += '<option value="ananya">Ananya Rao</option>';
        } else if (programSelect.value === "personal") {
            trainerSelect.innerHTML += '<option value="rahul">Rahul Sharma</option>';
        }
    });
}

// ---------------------------------------
// DATE VALIDATION
// ---------------------------------------

const dateInput = document.getElementById("date");

if (dateInput) {
    dateInput.addEventListener("change", function() {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert("Invalid date. Please select today or a future date.");
            dateInput.value = "";
        }
    });
}

// ---------------------------------------
// TIME VALIDATION
// ---------------------------------------

const timeInput = document.getElementById("time");

if (timeInput && dateInput) {
    timeInput.addEventListener("change", function() {
        const selectedDate = dateInput.value;
        const selectedTime = timeInput.value;

        if (!selectedDate) {
            alert("Please select a date first.");
            timeInput.value = "";
            return;
        }

        const today = new Date();
        const todayDate =
            today.getFullYear() +
            "-" +
            String(today.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(today.getDate()).padStart(2, "0");

        if (selectedDate === todayDate) {
            const currentHours = today.getHours();
            const currentMinutes = today.getMinutes();
            const timeParts = selectedTime.split(":");
            const selectedHours = Number(timeParts[0]);
            const selectedMinutes = Number(timeParts[1]);

            if (
                selectedHours < currentHours ||
                (selectedHours === currentHours && selectedMinutes <= currentMinutes)
            ) {
                alert("Invalid time. Please select a future time.");
                timeInput.value = "";
            }
        }
    });
}

// ---------------------------------------
// PERSONAL BOOKING (WITH DUPLICATE CHECK)
// ---------------------------------------

const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const programValue = programSelect.value;
        const trainerValue = trainerSelect.value;
        const date = dateInput.value;
        const time = timeInput.value;

        if (!name || !email || !programValue || !trainerValue || !date || !time) {
            alert("Please fill in all fields.");
            return;
        }

        const client = getSupabase();
        if (!client) {
            alert("Error: Supabase is not connected. Make sure the script tag is in index.html");
            return;
        }

        const programText = programSelect.options[programSelect.selectedIndex].text;
        const trainerText = trainerSelect.options[trainerSelect.selectedIndex].text;

        let price = 0;
        if (programValue === "strength") price = 500;
        else if (programValue === "weightloss") price = 450;
        else if (programValue === "personal") price = 800;

        // 1. Check for duplicate booking first
        client
            .from("bookings")
            .select("id")
            .eq("email", email)
            .eq("date", date)
            .eq("time", time)
            .then(function(checkRes) {
                if (checkRes.data && checkRes.data.length > 0) {
                    alert("Duplicate booking! You already have a booking scheduled for this date and time.");
                    return;
                }

                // 2. Insert into Supabase
                client
                    .from("bookings")
                    .insert([
                        {
                            name: name,
                            email: email,
                            program: programText,
                            trainer: trainerText,
                            date: date,
                            time: time,
                            price: price
                        }
                    ])
                    .then(function(insertRes) {
                        if (insertRes.error) {
                            if (insertRes.error.code === "23505") {
                                alert("Duplicate booking! You already have a booking scheduled for this date and time.");
                            } else {
                                alert("Database Error: " + insertRes.error.message);
                            }
                            return;
                        }

                        // Update UI Summary
                        const sName = document.getElementById("summaryName");
                        if (sName) sName.textContent = name;
                        const sProg = document.getElementById("summaryProgram");
                        if (sProg) sProg.textContent = programText;
                        const sTrain = document.getElementById("summaryTrainer");
                        if (sTrain) sTrain.textContent = trainerText;
                        const sDate = document.getElementById("summaryDate");
                        if (sDate) sDate.textContent = date;
                        const sTime = document.getElementById("summaryTime");
                        if (sTime) sTime.textContent = time;
                        const sPrice = document.getElementById("summaryPrice");
                        if (sPrice) sPrice.textContent = price;

                        alert("Booking confirmed and successfully saved to Supabase!");
                        showToast("Personal Training Booked Successfully!");

                        bookingForm.reset();
                        trainerSelect.innerHTML = '<option value="">Select Trainer</option>';
                    });
            });
    });
}

// ---------------------------------------
// GROUP TRAINING
// ---------------------------------------

const groupButtons = document.querySelectorAll(".group-book-btn");

groupButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const program = button.getAttribute("data-program");
        const day = button.getAttribute("data-day");
        const time = button.getAttribute("data-time");
        const trainer = button.getAttribute("data-trainer");
        const price = button.getAttribute("data-price");

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";

        if (!name || !email) {
            alert("Please enter your name and email first.");
            return;
        }

        const sessionDate = getNextDay(day);

        let displayTime = time;
        if (time === "07:00") displayTime = "7:00 AM";
        else if (time === "18:00") displayTime = "6:00 PM";

        const numericPrice = Number(String(price).replace(/[^0-9.]/g, "")) || 0;

        const client = getSupabase();
        if (client) {
            // Check duplicate
            client
                .from("bookings")
                .select("id")
                .eq("email", email)
                .eq("date", sessionDate)
                .eq("time", displayTime)
                .then(function(checkRes) {
                    if (checkRes.data && checkRes.data.length > 0) {
                        alert("Duplicate booking! You already have a booking for this session.");
                        return;
                    }

                    client
                        .from("bookings")
                        .insert([
                            {
                                name: name,
                                email: email,
                                program: program,
                                trainer: trainer,
                                date: sessionDate,
                                time: displayTime,
                                price: numericPrice
                            }
                        ])
                        .then(function(insertRes) {
                            if (insertRes.error) {
                                if (insertRes.error.code === "23505") {
                                    alert("Duplicate booking! You already reserved this session.");
                                } else {
                                    alert("Database Error: " + insertRes.error.message);
                                }
                                return;
                            }

                            const sName = document.getElementById("summaryName");
                            if (sName) sName.textContent = name;
                            const sProg = document.getElementById("summaryProgram");
                            if (sProg) sProg.textContent = program;
                            const sTrain = document.getElementById("summaryTrainer");
                            if (sTrain) sTrain.textContent = trainer;
                            const sDate = document.getElementById("summaryDate");
                            if (sDate) sDate.textContent = sessionDate;
                            const sTime = document.getElementById("summaryTime");
                            if (sTime) sTime.textContent = displayTime;
                            const sPrice = document.getElementById("summaryPrice");
                            if (sPrice) sPrice.textContent = price;

                            alert("Group session booked and saved to Supabase!");
                            showToast("Group Training Booked Successfully!");
                        });
                });
        }
    });
});

// ---------------------------------------
// FIND NEXT SESSION DAY
// ---------------------------------------

function getNextDay(dayName) {
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    const today = new Date();
    const todayNumber = today.getDay();
    const targetNumber = days.indexOf(dayName);

    let difference = targetNumber - todayNumber;
    if (difference <= 0) difference += 7;

    const nextDate = new Date();
    nextDate.setDate(today.getDate() + difference);

    const year = nextDate.getFullYear();
    const month = String(nextDate.getMonth() + 1).padStart(2, "0");
    const date = String(nextDate.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + date;
}

// ---------------------------------------
// TOAST FUNCTION
// ---------------------------------------

function showToast(message) {
    const toast = document.getElementById("toast");
    if (toast) {
        toast.textContent = message;
        toast.style.display = "block";

        setTimeout(function() {
            toast.style.display = "none";
            toast.textContent = "Booking Confirmed Successfully!";
        }, 3000);
    }
}

// ---------------------------------------
// HERO BUTTONS
// ---------------------------------------

const programBtn = document.getElementById("programBtn");
if (programBtn) {
    programBtn.addEventListener("click", function() {
        document.getElementById("programs").scrollIntoView({ behavior: "smooth" });
    });
}

const bookBtn = document.getElementById("bookBtn");
if (bookBtn) {
    bookBtn.addEventListener("click", function() {
        document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
    });
}