import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography, Card, Button, Option, Select,
} from '@mui/joy';
import { addSuggestion } from './helpfulResourcesSlice';
// import { setSuggestions, getSuggestions } from './suggestionsSlice';

function SuggestionsInput() {
  const dispatch = useDispatch();

  const [suggestion, setSuggestion] = useState({
    name: '',
    description: '',
    theme: '',
    link: '',
  });

  const handleChange = (attribute, value) => {
    setSuggestion((prevState) => ({
      ...prevState,
      [attribute]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(addSuggestion(suggestion));
    setSuggestion({
      name: '',
      description: '',
      theme: '',
      link: '',
    });
  };

  return (
    <Card variant="outlined"
      sx={{
        px: 3, py: 1.5, borderRadius: 'sm', backgroundColor: 'background.level1',
      }}
    >
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        New Suggestion
      </Typography>
      <input label="Name" value={suggestion.name} type="text" onChange={(e) => { handleChange('name', e.target.value); }} />
      <input label="Description" value={suggestion.description} type="text" onChange={(e) => { handleChange('description', e.target.value); }} />
      <input label="Link" value={suggestion.link} type="text" onChange={(e) => { handleChange('link', e.target.value); }} />
      <Select
        placeholder="Theme"
        value={suggestion.theme}
        onChange={(e) => handleChange('theme', e.target.value)}
      >
        <Option value="Food">Food</Option>
        <Option value="Shopping">Shopping</Option>
        <Option value="Museum/Exhibit">Museum/exhibit</Option>
      </Select>
      {/* <input value={goal} type="text" onChange={(e) => { setGoalState(e.target.value); }} /> */}
      <Button onClick={handleSubmit}>Add Suggestion</Button>
    </Card>
  );
}

export default SuggestionsInput;
