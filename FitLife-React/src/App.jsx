import "./App.css";

function App() {

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

              <form id="booking-form">

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

                <select id="program" required>

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

                <select id="trainerSelect" required>

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