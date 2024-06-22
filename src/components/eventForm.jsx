import React, { useState } from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Box,
} from "@mui/material";

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    isAttendingWithGuest: "No",
    guestName: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is not valid";
    if (!formData.age) tempErrors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age <= 0)
      tempErrors.age = "Age must be a positive number";
    if (formData.isAttendingWithGuest === "Yes" && !formData.guestName)
      tempErrors.guestName = "Guest name is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
      setFormData({
        name: "",
        email: "",
        age: "",
        isAttendingWithGuest: "No",
        guestName: "",
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: "auto", mt: 4 }}
    >
      <Typography variant="h4" gutterBottom>
        Event Registration Form
      </Typography>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        error={!!errors.email}
        helperText={errors.email}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Age"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
        error={!!errors.age}
        helperText={errors.age}
        margin="normal"
        type="number"
      />
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Are you coming with a guest?
      </Typography>
      <RadioGroup
        name="isAttendingWithGuest"
        value={formData.isAttendingWithGuest}
        onChange={handleInputChange}
        row
      >
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
      </RadioGroup>
      {formData.isAttendingWithGuest === "Yes" && (
        <TextField
          fullWidth
          label="Guest Name"
          name="guestName"
          value={formData.guestName}
          onChange={handleInputChange}
          error={!!errors.guestName}
          helperText={errors.guestName}
          margin="normal"
        />
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
      {submittedData && (
        <Box mt={4}>
          <Typography variant="h6">Submitted Data</Typography>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default EventRegistrationForm;
