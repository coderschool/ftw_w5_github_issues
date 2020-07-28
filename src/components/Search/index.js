import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const Search = ({ searchTerm, onSearch, onSearchSubmit, loading }) => {
  return (
    <Form onSubmit={onSearchSubmit}>
      <Form.Group as={Row}>
        <Form.Label htmlFor="search" column sm="2">
          Search:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            id="search"
            type="text"
            value={searchTerm}
            onChange={onSearch}
          />
        </Col>
        <Button type="submit" disabled={!searchTerm || loading}>
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Search;
