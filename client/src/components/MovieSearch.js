//http://ericgio.github.io/react-bootstrap-typeahead/#asynchronous-searching
import { useState, useRef } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


const SEARCH_URI = '/api/films/'

const AsyncExample = (props) => {

  const aref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [singleSelections, setSingleSelections] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);

    await fetch(`${SEARCH_URI}?title=${query}`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        setOptions(items);
        setIsLoading(false);
      });
  };

  const handleChange = async (selected) => {

    await setSingleSelections([]);

    await props.onChange(selected);

    try{
      let x = aref.current;
      await x.blur();
    }
    catch(err){
      console.error(err)
    }

  }

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      selected={singleSelections}
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey={option => `${option.Title}`}
      minLength={3}
      onChange={handleChange}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for a SF movie..."
      ref={aref}
      renderMenuItemChildren={(option) => (
        <>
          <span>{option.Title}</span>
        </>
      )}

    />


  );
};

export default AsyncExample;