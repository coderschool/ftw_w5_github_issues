import React from "react";
import { Form, Button, Col } from "react-bootstrap";

const SearchForm = ({
  searchInput,
  handleInputChange,
  handleSubmit,
  loading,
}) => {
  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Row>
        <Col>
          <Form.Control
            id="search-input"
            type="text"
            placeholder="Search.."
            value={searchInput}
            onChange={handleInputChange}
          />
        </Col>
        {loading ? (
          <Button variant="primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Searching...
          </Button>
        ) : (
          <Button type="submit" disabled={!searchInput}>
            Search
          </Button>
        )}
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
