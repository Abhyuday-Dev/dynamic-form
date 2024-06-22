import React, { useState } from 'react';
import { TextField, MenuItem, Checkbox, FormControlLabel, Button, FormGroup, Typography, Box } from '@mui/material';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    preferredInterviewTime: '',
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

  const handleSkillChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      additionalSkills: {
        ...formData.additionalSkills,
        [name]: checked,
      },
    });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.fullName) tempErrors.fullName = 'Full Name is required';
    if (!formData.email) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is not valid';
    if (!formData.phoneNumber) tempErrors.phoneNumber = 'Phone Number is required';
    if ((formData.position === 'Developer' || formData.position === 'Designer') && !formData.relevantExperience)
      tempErrors.relevantExperience = 'Relevant Experience is required';
    if (formData.position === 'Designer' && !formData.portfolioURL) tempErrors.portfolioURL = 'Portfolio URL is required';
    else if (formData.portfolioURL && !/^https?:\/\/.+\..+$/.test(formData.portfolioURL)) tempErrors.portfolioURL = 'Portfolio URL is not valid';
    if (formData.position === 'Manager' && !formData.managementExperience) tempErrors.managementExperience = 'Management Experience is required';
    if (!Object.values(formData.additionalSkills).some((skill) => skill)) tempErrors.additionalSkills = 'At least one skill must be selected';
    if (!formData.preferredInterviewTime) tempErrors.preferredInterviewTime = 'Preferred Interview Time is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioURL: '',
        managementExperience: '',
        additionalSkills: {
          JavaScript: false,
          CSS: false,
          Python: false,
        },
        preferredInterviewTime: '',
      })
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Job Application Form</Typography>
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
      <TextField
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
        margin="normal"
      />
      <TextField
        select
        fullWidth
        label="Applying for Position"
        name="position"
        value={formData.position}
        onChange={handleInputChange}
        margin="normal"
      >
        <MenuItem value="Developer">Developer</MenuItem>
        <MenuItem value="Designer">Designer</MenuItem>
        <MenuItem value="Manager">Manager</MenuItem>
      </TextField>
      {(formData.position === 'Developer' || formData.position === 'Designer') && (
        <TextField
          fullWidth
          label="Relevant Experience (years)"
          name="relevantExperience"
          value={formData.relevantExperience}
          onChange={handleInputChange}
          error={!!errors.relevantExperience}
          helperText={errors.relevantExperience}
          margin="normal"
          type="number"
        />
      )}
      {formData.position === 'Designer' && (
        <TextField
          fullWidth
          label="Portfolio URL"
          name="portfolioURL"
          value={formData.portfolioURL}
          onChange={handleInputChange}
          error={!!errors.portfolioURL}
          helperText={errors.portfolioURL}
          margin="normal"
        />
      )}
      {formData.position === 'Manager' && (
        <TextField
          fullWidth
          label="Management Experience"
          name="managementExperience"
          value={formData.managementExperience}
          onChange={handleInputChange}
          error={!!errors.managementExperience}
          helperText={errors.managementExperience}
          margin="normal"
        />
      )}
      <FormGroup>
        <Typography>Additional Skills</Typography>
        {Object.keys(formData.additionalSkills).map((skill) => (
          <FormControlLabel
            key={skill}
            control={<Checkbox checked={formData.additionalSkills[skill]} onChange={handleSkillChange} name={skill} />}
            label={skill}
          />
        ))}
        {errors.additionalSkills && <Typography color="error">{errors.additionalSkills}</Typography>}
      </FormGroup>
      <TextField
        fullWidth
        label="Preferred Interview Time"
        name="preferredInterviewTime"
        type="datetime-local"
        value={formData.preferredInterviewTime}
        onChange={handleInputChange}
        error={!!errors.preferredInterviewTime}
        helperText={errors.preferredInterviewTime}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
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
    </Box>
  );
};

export default JobApplicationForm;
