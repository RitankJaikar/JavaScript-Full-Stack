import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchParamsExample = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get a specific query parameter
  const name = searchParams.get('name');
  const age = searchParams.get('age');

  // Function to update search parameters
  const updateParams = () => {
    setSearchParams({ name: 'John', age: '25' });
  };

  return (
    <div>
      <h1>Query Parameters</h1>
      <p>Name: {name || 'Not provided'}</p>
      <p>Age: {age || 'Not provided'}</p>
      <button onClick={updateParams}>Update Query Params</button>
    </div>
  );
};

export default SearchParamsExample;