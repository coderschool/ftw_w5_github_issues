import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import PublicNavbar from "./components/PublicNavbar";
import SearchForm from "./components/SearchForm";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  function getOwnerAndRepo() {
    const repo = searchTerm.substring(searchTerm.lastIndexOf("/") + 1);
    const withoutRepo = searchTerm.substring(0, searchTerm.lastIndexOf("/"));
    const owner = withoutRepo.substring(withoutRepo.lastIndexOf("/") + 1);
    return { repo, owner };
  }

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    const { owner, repo } = getOwnerAndRepo();
    setOwner(owner);
    setRepo(repo);
  };

  return (
    <div className="text-center">
      <PublicNavbar />
      <Container>
        <h1>Github Issues</h1>
        <SearchForm
          searchInput={searchTerm}
          handleInputChange={handleSearchInputChange}
          handleSubmit={handleSearchFormSubmit}
        />
        {/* Showing the owner and repo is for testing only */}
        <h4>Owner: {owner}</h4>
        <h4>Repo: {repo}</h4>
      </Container>
    </div>
  );
};
export default App;
