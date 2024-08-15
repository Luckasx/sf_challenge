//http://ericgio.github.io/react-bootstrap-typeahead/#asynchronous-searching
import { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


const SEARCH_URI = '/api/films/'

const AsyncExample = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);

    await fetch(`${SEARCH_URI}?title=${query}`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        setOptions(items);
        setIsLoading(false);
      });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey="Title"
      minLength={3}
      onChange={props.onChange}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for a SF movie..."
      renderMenuItemChildren={(option) => (
        <>
          <span>{option.Title}</span>
        </>
      )}

    />


  );
};

export default AsyncExample;