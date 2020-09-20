import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./Search.module.css";

const Search = ({ searchTerm, onSearch, onSearchSubmit, loading }) => {
  return (
    <Form onSubmit={onSearchSubmit}>
      <Form.Group as={Row}>
        <Form.Label htmlFor="search" column sm="2">
          <p className={styles["button-red"]}>Search:</p>
        </Form.Label>
        <Col sm="8">
          <Form.Control
            id="search"
            type="text"
            value={searchTerm}
            onChange={onSearch}
          />
        </Col>
        <Button
          className={styles["button-red"]}
          type="submit"
          disabled={!searchTerm || loading}
        >
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Search;
