import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Select, Option,
} from '@mui/joy';
import SuggestionsInput from './SuggestionsInput';
import { fetchSuggestionsByTheme, updateFilterTheme } from './helpfulResourcesSlice';

function HelpfulResources() {
  const dispatch = useDispatch();
  const filterTheme = useSelector((state) => state.helpfulResources.filterTheme);

  useEffect(() => {
    dispatch(fetchSuggestionsByTheme());
  }, []);

  return (
    <div>
      <Select
        placeholder="Theme"
        value={filterTheme}
        onChange={(e, n) => (dispatch(updateFilterTheme(n)))}
      >
        <Option value="Food">Food</Option>
        <Option value="Shopping">Shopping</Option>
        <Option value="Museum/Exhibit">Museum/exhibit</Option>
      </Select>
      <SuggestionsInput />
    </div>
  );
}

export default HelpfulResources;
