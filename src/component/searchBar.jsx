import React from "react";
import { Form } from "semantic-ui-react";

import "./searchbar.css";

const SearchBar = props => {
  return (
    <Form onSubmit={props.onSubmit} className="inputField">
      <Form.Field>
        <label>Video search</label>
        <input
          value={props.searchTerm}
          onChange={props.onSearch}
          placeholder="Search"
        />
      </Form.Field>
    </Form>
  );
};

export default SearchBar;
