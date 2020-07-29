import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Alert } from "react-bootstrap";
import Search from "./components/Search";
import IssueList from "./components/IssueList";
import IssueModal from "./components/IssueModal";
import PaginationIssue from "./components/PaginationIssue";
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [url, setUrl] = useState("");
  const [urlFetchComments, setUrlFetchComments] = useState("");
  const [issues, setIssues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
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

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    const { owner, repo } = getOwnerAndRepo();
    setUrl(
      `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20`
    );
    event.preventDefault();
  };

  useEffect(() => {
    const fetchIssueData = async () => {
      if (!url) return;
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
          const link = response.headers.get("link");
          if (link) {
            const getTotalPage = link.match(
              /page=(\d+)&per_page=\d+>; rel="last"/
            );
            if (getTotalPage) {
              setTotalPageNum(parseInt(getTotalPage[1]));
            }
          }
          setIssues(data);
          setErrorMsg(null);
        } else {
          setErrorMsg(data.message);
        }
        setLoading(false);
      } catch (error) {
        console.log(url);
        setErrorMsg(`FETCH ISSUES ERROR: ${error.message}`);
        setLoading(false);
      }
    };
    fetchIssueData();
  }, [url]);

  const showDetail = async (item) => {
    setShowModal(true);
    setSelectedIssue(item);
    const { owner, repo } = getOwnerAndRepo();
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${item.number}/comments?page=1&per_page=10`;
    setUrlFetchComments(url);
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (!urlFetchComments) return;
      try {
        setLoadingComments(true);
        const response = await fetch(urlFetchComments);
        const data = await response.json();
        if (response.status === 200) {
          setComments(data);
          setErrorMsg(null);
        } else {
          setErrorMsg(data.message);
          setShowModal(false);
        }
        setLoadingComments(false);
      } catch (error) {
        setErrorMsg(`FETCH COMMENTS ERROR: ${error.message}`);
        setShowModal(false);
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [urlFetchComments]);

  return (
    <div className="App">
      <Container>
        <h1>Github Issues</h1>
        <Search
          searchTerm={searchTerm}
          onSearch={handleSearchInput}
          onSearchSubmit={handleSearchSubmit}
          loading={loading}
        />
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        <PaginationIssue
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
        />
        {loading ? (
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        ) : (
          <IssueList itemList={issues} showDetail={showDetail} />
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
