// Home Route
app.get("/", (req, res) => {
  res.send("Student Feedback API is Running 🚀");
});

// GET
app.get("/feedback", (req, res) => {
  const feedback = readFeedback();
  res.json(feedback);
});

// POST
app.post("/feedback", (req, res) => {
  const feedback = readFeedback();

  const newFeedback = {
    id: Date.now(),
    name: req.body.name,
    message: req.body.message,
    rating: req.body.rating,
    date: new Date().toLocaleString()
  };

  feedback.push(newFeedback);
  saveFeedback(feedback);

  res.json({
    message: "Feedback Added Successfully",
    data: newFeedback
  });
});

// PUT
app.put("/feedback/:id", (req, res) => {
  let feedback = readFeedback();

  feedback = feedback.map((item) => {
    if (item.id == req.params.id) {
      return {
        ...item,
        name: req.body.name,
        message: req.body.message,
        rating: req.body.rating
      };
    }
    return item;
  });

  saveFeedback(feedback);

  res.json({
    message: "Feedback Updated Successfully"
  });
});

// DELETE
app.delete("/feedback/:id", (req, res) => {
  let feedback = readFeedback();

  feedback = feedback.filter(
    (item) => item.id != req.params.id
  );

  saveFeedback(feedback);

  res.json({
    message: "Feedback Deleted Successfully"
  });
});