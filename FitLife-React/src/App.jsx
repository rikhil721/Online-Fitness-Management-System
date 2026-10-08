import "./App.css";
import { supabase } from "./supabaseClient";

function App() {

  // Personal training prices
  const prices = {
    strength: 500,
    weightloss: 450,
    personal: 800
  };

  // Trainer for each personal program
  const trainers = {
    strength: "Rahul Sharma",
    weightloss: "Ananya Rao",
    personal: "Rahul Sharma"
  };

  // Handle personal booking
  const handleBooking = async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    const programSelect = document.getElementById("program");
    const trainerSelect = document.getElementById("trainerSelect");
    const dateInput = document.getElementById("date");
    const timeSelect = document.getElementById("time");

    const program = programSelect.value;
    const trainer = trainerSelect.value;
    const date = dateInput.value;
    const time = timeSelect.value;

    // Basic validation
    if (!name || !email || !program || !trainer || !date || !time) {
      alert("Please fill all the booking details.");
      return;
    }

    // Get price
    const price = prices[program];

    // -----------------------------------------
    // 1. CHECK IF TRAINER IS ALREADY BOOKED
    // -----------------------------------------

    const personalPrograms = [
      "Strength Training",
      "Weight Loss",
      "Personal Training"
    ];

    const { data: existingBooking, error: checkError } = await supabase
      .from("bookings")
      .select("id")
      .eq("trainer", trainer)
      .eq("date", date)
      .eq("time", time)
      .in("program", personalPrograms)
      .limit(1);

    if (checkError) {
      console.error("Error checking booking:", checkError);

      alert("Could not check trainer availability. Please try again.");

      return;
    }

    // -----------------------------------------
    // 2. IF ALREADY BOOKED, STOP
    // -----------------------------------------

    if (existingBooking.length > 0) {

      alert(
        `${trainer} is already booked on ${date} at ${time}. Please select another time.`
      );

      return;
    }

    // -----------------------------------------
    // 3. SAVE BOOKING TO SUPABASE
    // -----------------------------------------

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name: name,
          email: email,
          program:
            program === "strength"
              ? "Strength Training"
              : program === "weightloss"
              ? "Weight Loss"
              : "Personal Training",
          trainer: trainer,
          date: date,
          time: time,
          price: price
        }
      ])
      .select();

    // -----------------------------------------
    // 4. HANDLE DATABASE ERROR
    // -----------------------------------------

    if (error) {

      console.error("Booking error:", error);

      // PostgreSQL duplicate error
      if (error.code === "23505") {

        alert(
          "Sorry, this trainer was just booked for this time slot."
        );

      } else {

        alert("Booking failed. Please try again.");

      }

      return;
    }

    console.log("Booking saved:", data);

    // -----------------------------------------
    // 5. UPDATE BOOKING SUMMARY
    // -----------------------------------------

    document.getElementById("summaryName").textContent = name;

    document.getElementById("summaryProgram").textContent =
      program === "strength"
        ? "Strength Training"
        : program === "weightloss"
        ? "Weight Loss"
        : "Personal Training";

    document.getElementById("summaryTrainer").textContent = trainer;

    document.getElementById("summaryDate").textContent = date;

    document.getElementById("summaryTime").textContent = time;

    document.getElementById("summaryPrice").textContent = price;

    // -----------------------------------------
    // 6. SHOW SUCCESS MESSAGE
    // -----------------------------------------

    const toast = document.getElementById("toast");

    toast.textContent = "Booking Confirmed Successfully!";

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);

  };


  // -----------------------------------------
  // UPDATE TRAINER WHEN PROGRAM CHANGES
  // -----------------------------------------

  const handleProgramChange = (e) => {

    const program = e.target.value;

    const trainerSelect = document.getElementById("trainerSelect");

    trainerSelect.innerHTML = `
      <option value="">Select Trainer</option>
    `;

    if (program && trainers[program]) {

      const option = document.createElement("option");

      option.value = trainers[program];

      option.textContent = trainers[program];

      trainerSelect.appendChild(option);
    }

  };


  return (
    <>
      {/* Navigation */}
      <nav className="main-nav">
        <div className="nav-container">

          <div className="logo">
            FitLife
          </div>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#programs">Programs</a>
            <a href="#trainers">Trainers</a>
            <a href="#schedule">Schedule</a>
            <a href="#booking">Book Now</a>
          </div>

        </div>
      </nav>


      {/* Hero */}
      <header id="home">

        <h1>Welcome to FitLife</h1>

        <h2>Online Fitness Management System</h2>

        <p>
          Manage your workouts, trainers and fitness sessions
          in one place.
        </p>

        <div className="hero-buttons">

          <button id="programBtn">
            View Programs
          </button>

          <button id="bookBtn">
            Book a Session
          </button>

        </div>

      </header>


      <main>

        {/* About */}
        <section id="about">

          <h2>About FitLife</h2>

          <p>
            FitLife is a modern fitness management system
            designed to streamline workout schedules,
            personal trainer bookings, and fitness sessions
            in one workspace.
          </p>

        </section>


        {/* Programs */}
        <section id="programs">

          <h2>Fitness Programs</h2>

          <ul className="program-list">

            <li>Strength Training</li>
            <li>Weight Loss</li>
            <li>Personal Training</li>
            <li>Yoga</li>
            <li>Cardio Training</li>

          </ul>

        </section>


        {/* Trainers */}
        <section id="trainers">

          <h2>Our Trainers</h2>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Rahul Sharma</td>
                  <td>Strength Training</td>
                  <td>5 Years</td>
                </tr>

                <tr>
                  <td>Priya Menon</td>
                  <td>Yoga</td>
                  <td>4 Years</td>
                </tr>

                <tr>
                  <td>Arjun Kumar</td>
                  <td>Cardio Training</td>
                  <td>6 Years</td>
                </tr>

                <tr>
                  <td>Ananya Rao</td>
                  <td>Weight Loss</td>
                  <td>3 Years</td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>


        {/* Group Training Schedule */}
        <section id="schedule">

          <h2>Group Training Schedule</h2>

          <p>
            Choose a group training session and click
            <strong> Book </strong>
            to reserve your session.
          </p>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Program</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Trainer</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Yoga</td>
                  <td>Tuesday</td>
                  <td>7:00 AM</td>
                  <td>Priya Menon</td>

                  <td>
                    <button className="group-book-btn">
                      Book
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>Cardio Training</td>
                  <td>Wednesday</td>
                  <td>6:00 PM</td>
                  <td>Arjun Kumar</td>

                  <td>
                    <button className="group-book-btn">
                      Book
                    </button>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>


        {/* Booking */}
        <section id="booking">

          <h2>Personal Training</h2>

          <div className="booking-grid">

            <div className="booking-form">

              <form
                id="booking-form"
                onSubmit={handleBooking}
              >

                <label htmlFor="name">
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  required
                />


                <label htmlFor="email">
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  required
                />


                <label htmlFor="program">
                  Program
                </label>

                <select
                  id="program"
                  onChange={handleProgramChange}
                  required
                >

                  <option value="">
                    Select Program
                  </option>

                  <option value="strength">
                    Strength Training
                  </option>

                  <option value="weightloss">
                    Weight Loss
                  </option>

                  <option value="personal">
                    Personal Training
                  </option>

                </select>


                <label htmlFor="trainerSelect">
                  Select Trainer
                </label>

                <select
                  id="trainerSelect"
                  required
                >

                  <option value="">
                    Select Trainer
                  </option>

                </select>


                <label htmlFor="date">
                  Select Date
                </label>

                <input
                  type="date"
                  id="date"
                  required
                />


                <label htmlFor="time">
                  Select Time
                </label>

                <select id="time" required>

                  <option value="">
                    Select Time
                  </option>

                  <option value="07:00">
                    7:00 AM
                  </option>

                  <option value="09:00">
                    9:00 AM
                  </option>

                  <option value="17:00">
                    5:00 PM
                  </option>

                  <option value="19:00">
                    7:00 PM
                  </option>

                </select>


                <button type="submit">
                  Confirm Personal Booking
                </button>

              </form>

            </div>


            {/* Booking Summary */}
            <div className="booking-summary">

              <h3>
                Booking Summary
              </h3>

              <p>
                <strong>Name:</strong>
                <span id="summaryName">-</span>
              </p>

              <p>
                <strong>Program:</strong>
                <span id="summaryProgram">-</span>
              </p>

              <p>
                <strong>Trainer:</strong>
                <span id="summaryTrainer">-</span>
              </p>

              <p>
                <strong>Date:</strong>
                <span id="summaryDate">-</span>
              </p>

              <p>
                <strong>Time:</strong>
                <span id="summaryTime">-</span>
              </p>

              <div className="price-badge">

                <strong>
                  Total Fee:
                </strong>

                <span>
                  ₹<span id="summaryPrice">0</span>
                </span>

              </div>

            </div>

          </div>

        </section>


        <p id="toast">
          Booking Confirmed Successfully!
        </p>

      </main>


      {/* Footer */}
      <footer>

        <p>
          &copy; 2026 FitLife Center.
          All rights reserved. CSE E10
        </p>

        <nav className="footer-nav">

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#programs">Programs</a>
          <a href="#trainers">Trainers</a>
          <a href="#schedule">Schedule</a>
          <a href="#booking">Book Now</a>

        </nav>

      </footer>

    </>
  );
}

export default App;