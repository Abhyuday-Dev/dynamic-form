import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Typography, Box, FormControl, InputLabel, Select } from '@mui/material';
import axios from 'axios';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
  });

  const [errors, setErrors] = useState({});
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await axios.get(`http://localhost:5000/questions?topic=${topic}`);
      setAdditionalQuestions(response.data.questions);
      console.log(response.data.questions);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.fullName) tempErrors.fullName = 'Full Name is required';
    if (!formData.email) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is not valid';
    if (!formData.surveyTopic) tempErrors.surveyTopic = 'Survey Topic is required';
    if (formData.surveyTopic === 'Technology') {
      if (!formData.favoriteProgrammingLanguage) tempErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      if (!formData.yearsOfExperience) tempErrors.yearsOfExperience = 'Years of Experience is required';
    }
    if (formData.surveyTopic === 'Health') {
      if (!formData.exerciseFrequency) tempErrors.exerciseFrequency = 'Exercise Frequency is required';
      if (!formData.dietPreference) tempErrors.dietPreference = 'Diet Preference is required';
    }
    if (formData.surveyTopic === 'Education') {
      if (!formData.highestQualification) tempErrors.highestQualification = 'Highest Qualification is required';
      if (!formData.fieldOfStudy) tempErrors.fieldOfStudy = 'Field of Study is required';
    }
    if (!formData.feedback) tempErrors.feedback = 'Feedback is required';
    else if (formData.feedback.length < 50) tempErrors.feedback = 'Feedback must be at least 50 characters';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:5000/submit', formData);
        setSubmittedData({ ...formData, additionalQuestions: response.data.additionalQuestions });
        setFormData({
          fullName: '',
          email: '',
          surveyTopic: '',
          favoriteProgrammingLanguage: '',
          yearsOfExperience: '',
          exerciseFrequency: '',
          dietPreference: '',
          highestQualification: '',
          fieldOfStudy: '',
          feedback: '',
        }
        )
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Survey Form</Typography>
      <TextField
        fullWidth
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        error={!!errors.fullName}
        helperText={errors.fullName}
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
      <FormControl fullWidth margin="normal">
        <InputLabel>Survey Topic</InputLabel>
        <Select
          name="surveyTopic"
          value={formData.surveyTopic}
          onChange={handleInputChange}
          error={!!errors.surveyTopic}
        >
          <MenuItem value="Technology">Technology</MenuItem>
          <MenuItem value="Health">Health</MenuItem>
          <MenuItem value="Education">Education</MenuItem>
        </Select>
        {errors.surveyTopic && <Typography color="error">{errors.surveyTopic}</Typography>}
      </FormControl>

      {formData.surveyTopic === 'Technology' && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Favorite Programming Language</InputLabel>
            <Select
              name="favoriteProgrammingLanguage"
              value={formData.favoriteProgrammingLanguage}
              onChange={handleInputChange}
              error={!!errors.favoriteProgrammingLanguage}
            >
              <MenuItem value="JavaScript">JavaScript</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="C#">C#</MenuItem>
            </Select>
            {errors.favoriteProgrammingLanguage && <Typography color="error">{errors.favoriteProgrammingLanguage}</Typography>}
          </FormControl>
          <TextField
            fullWidth
            label="Years of Experience"
            name="yearsOfExperience"
            type="number"
            value={formData.yearsOfExperience}
            onChange={handleInputChange}
            error={!!errors.yearsOfExperience}
            helperText={errors.yearsOfExperience}
            margin="normal"
          />
        </>
      )}

      {formData.surveyTopic === 'Health' && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Exercise Frequency</InputLabel>
            <Select
              name="exerciseFrequency"
              value={formData.exerciseFrequency}
              onChange={handleInputChange}
              error={!!errors.exerciseFrequency}
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Rarely">Rarely</MenuItem>
            </Select>
            {errors.exerciseFrequency && <Typography color="error">{errors.exerciseFrequency}</Typography>}
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Diet Preference</InputLabel>
            <Select
              name="dietPreference"
              value={formData.dietPreference}
              onChange={handleInputChange}
              error={!!errors.dietPreference}
            >
              <MenuItem value="Vegetarian">Vegetarian</MenuItem>
              <MenuItem value="Vegan">Vegan</MenuItem>
              <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
            </Select>
            {errors.dietPreference && <Typography color="error">{errors.dietPreference}</Typography>}
          </FormControl>
        </>
      )}

      {formData.surveyTopic === 'Education' && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Highest Qualification</InputLabel>
            <Select
              name="highestQualification"
              value={formData.highestQualification}
              onChange={handleInputChange}
              error={!!errors.highestQualification}
            >
              <MenuItem value="High School">High School</MenuItem>
              <MenuItem value="Bachelor's">Bachelor's</MenuItem>
              <MenuItem value="Master's">Master's</MenuItem>
              <MenuItem value="PhD">PhD</MenuItem>
            </Select>
            {errors.highestQualification && <Typography color="error">{errors.highestQualification}</Typography>}
          </FormControl>
          <TextField
            fullWidth
            label="Field of Study"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleInputChange}
            error={!!errors.fieldOfStudy}
            helperText={errors.fieldOfStudy}
            margin="normal"
          />
        </>
      )}

      <TextField
        fullWidth
        label="Feedback"
        name="feedback"
        multiline
        rows={4}
        value={formData.feedback}
        onChange={handleInputChange}
        error={!!errors.feedback}
        helperText={errors.feedback}
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>

      {submittedData && (
        <Box mt={4}>
          <Typography variant="h6">Submitted Data</Typography>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </Box>
      )}

      {additionalQuestions.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Additional Questions</Typography>
          <ul>
            {additionalQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default SurveyForm;
