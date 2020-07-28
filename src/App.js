import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Alert } from "react-bootstrap";
import Search from "./components/Search";
import List from "./components/List";
import IssueModal from "./components/IssueModal";
import PaginationIssue from "./components/Pagination";
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [issues, setIssues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [comments, setComments] = useState([]);

  const getOwnerAndRepo = () => {
    const repo = searchTerm.substring(searchTerm.lastIndexOf("/") + 1);
    const withoutRepo = searchTerm.substring(0, searchTerm.lastIndexOf("/"));
    const owner = withoutRepo.substring(withoutRepo.lastIndexOf("/") + 1);
    return { repo, owner };
  };

  const fetchIssueData = async () => {
    if (!searchTerm) {
      return;
    }
    try {
      setLoading(true);
      const { owner, repo } = getOwnerAndRepo();
      const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20`;
      const response = await fetch(url);
      // console.log("response", response);
      const data = await response.json();
      if (response.status === 200) {
        const link = response.headers.get("link");
        // console.log(link);
        const getTotalPage = link.match(/page=(\d+)&per_page=\d+>; rel="last"/);
        if (getTotalPage) {
          setTotalPageNum(parseInt(getTotalPage[1]));
        }
        setIssues(data);
        setErrorMsg("");
      } else {
        setErrorMsg(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    fetchIssueData();
  };

  const showDetail = async (item) => {
    setSelectedIssue(item);
    setShowModal(true);
    try {
      setLoadingComments(true);
      const { owner, repo } = getOwnerAndRepo();
      const url = `https://api.github.com/repos/${owner}/${repo}/issues/${item.number}/comments?page=1&per_page=10`;
      const response = await fetch(url);
      // console.log("response", response);
      const data = await response.json();
      if (response.status === 200) {
        setComments(data);
        setErrorMsg("");
      } else {
        setErrorMsg(data.message);
        setShowModal(false);
      }
      setLoadingComments(false);
    } catch (error) {
      console.log(error);
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchIssueData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  return (
    <div className="App">
      <Container>
        <h1>Github Issues</h1>
        <Search
          searchTerm={searchTerm}
          onSearch={handleSearchInput}
          onSearchSubmit={handleSearch}
          loading={loading}
        />
        {errorMsg ? <Alert variant="danger">{errorMsg}</Alert> : <div></div>}
        <PaginationIssue
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
          setTotalPageNum={setTotalPageNum}
        />
        {loading ? (
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        ) : (
          <List itemList={issues} handleClickIssue={showDetail} />
        )}
        <IssueModal
          issue={selectedIssue}
          comments={comments}
          loadingComments={loadingComments}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </Container>
    </div>
  );
};

export default App;
