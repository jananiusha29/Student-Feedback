import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const [feedback, setFeedback] = useState([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [darkMode, setDarkMode] = useState(false);

  // GET Feedback
  const getFeedback = async () => {
    try {
      const res = await axios.get("http://localhost:5000/feedback");
      setFeedback(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  // ADD / UPDATE
  const addFeedback = async () => {
    if (!name || !message) {
      alert("Please enter all fields");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/feedback/${editingId}`, {
          name,
          message,
          rating,
        });
      } else {
        await axios.post("http://localhost:5000/feedback", {
          name,
          message,
          rating,
        });
      }

      setName("");
      setMessage("");
      setRating(5);
      setEditingId(null);

      getFeedback();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteFeedback = async (id) => {
    await axios.delete(`http://localhost:5000/feedback/${id}`);
    getFeedback();
  };
  const totalFeedback = feedback.length;

const positiveFeedback = feedback.filter(
  (item) => Number(item.rating) >= 4
).length;

const negativeFeedback = feedback.filter(
  (item) => Number(item.rating) < 4
).length;

const averageRating =
  totalFeedback > 0
    ? (
        feedback.reduce(
          (sum, item) => sum + Number(item.rating),
          0
        ) / totalFeedback
      ).toFixed(1)
    : 0;

  return (
    <div className={darkMode ? "container dark" : "container"}>

      <button
        className="themeBtn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>Student Feedback System</h1>

      <div className="form">

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Enter Feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="1">⭐ 1</option>
          <option value="2">⭐⭐ 2</option>
          <option value="3">⭐⭐⭐ 3</option>
          <option value="4">⭐⭐⭐⭐ 4</option>
          <option value="5">⭐⭐⭐⭐⭐ 5</option>
        </select>

        <button className="submit" onClick={addFeedback}>
          {editingId ? "Update Feedback" : "Submit Feedback"}
        </button>

      </div>

      <input
        className="search"
        type="text"
        placeholder="Search Student"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
<div className="dashboard">

  <div className="dashboardCard">
    <h2>{totalFeedback}</h2>
    <p>Total Feedback</p>
  </div>

  <div className="dashboardCard">
    <h2>{averageRating}</h2>
    <p>Average Rating</p>
  </div>

  <div className="dashboardCard">
    <h2>{positiveFeedback}</h2>
    <p>Positive</p>
  </div>

  <div className="dashboardCard">
    <h2>{negativeFeedback}</h2>
    <p>Negative</p>
  </div>

</div>
      
      {feedback
        .filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
        .map(item => (

          <div className="card" key={item.id}>

            <h3>{item.name}</h3>

            <p>{item.message}</p>

            <p>⭐ Rating : {item.rating}</p>

            <p>📅 {item.date}</p>

            <div className="buttons">

              <button
                className="edit"
                onClick={() => {
                  setEditingId(item.id);
                  setName(item.name);
                  setMessage(item.message);
                  setRating(item.rating);
                }}
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() => deleteFeedback(item.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      <footer>
        © 2026 Student Feedback System | Developed by Janani
      </footer>

    </div>
  );
}

export default App;