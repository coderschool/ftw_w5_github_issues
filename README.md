# Weekly project: Github Issues

**Team project**: up to two members each team.

## Introduction

Github has a user-friendly API. It's well designed and familiarizing ourselves with it is a good way to get started on one day building out own APIs.

>Note: The GitHub API is cool because it allows unauthenticated access. However, the rate is severely limited - 60 an hour, which you might exceed while testing. 

## Required Features

**[Demo app](https://gallant-edison-972273.netlify.app/)**

Practicing React with Github API to [list repository issues](https://developer.github.com/v3/issues/#list-repository-issues):

- [x] There are no plan to remove class components from React, but the official website recommend trying Hooks in new code. So from now on, you should **only use function components** with [Hooks](https://reactjs.org/docs/hooks-intro.html).
- [x] The user can enter a repository in a search bar, click "search", and see the associated issues. The repository should be of the format `owner/repo-name`, e.g. `facebook/react`.
- [x] If the repository does not exist, the user should see a proper error message.
- [x] The user should be able to see the following information for each issue:
  * Issue Title with Number of the issue
  * Owner of the Issue
  * Owner Avatar
  * How long ago the issue was updated in a human-friendly format (e.g. 2 days ago) (Hint: [react-moment](https://www.npmjs.com/package/react-moment#installing))
  * Body of the Issue
  * Labels of the issue
- [x] The user should be able to see multiple pages of results, by clicking a pagination control.
- [x] The user can see more details (**[including 5 comments of the issue](https://developer.github.com/v3/issues/comments/)**) in a modal that's opened by clicking on the title of the issue.
- [x] The user should be able to see the body of the issue rendered in markdown. (Hint: [react-markdown](https://github.com/rexxars/react-markdown))
- [x] Fetching is an asynchronous operation, so you should display a loading [spinner](https://www.npmjs.com/package/react-spinners) whenever the app loads data, and hide it once the corresponding API call has been completed.
- [x] Input Fuzzy Matching: the user should be able to type in either https://github.com/facebook/react or facebook/react, BOTH should work.
- [x] In the Issue Detail Modal, let implement an **infinite pagination** with a "Show More" button: Fetch 5 more comments whenever user clicks on the button. The button is disabled or hidden when all the comments have been loaded.

## Implementation

* [Setup a React App](./doc/00_setup_project.md)
* [Project Structure](./doc/01_project_structure.md)
* [The public Navbar](./doc/10_public_navbar.md)
* [The search form](./doc/11_search_form.md)
* [Fetching data from Github API](./doc/12_issue_list.md)

### Step 1 - Searching and showing issues

**Requirements**: 

* User can input `{owner}/{repo}` in the input box and hit `Enter`. 
* The app will send a request to the Github API for list of issues. 
* The request URL should contain `page=1&per_page=20` to get the first 20 issues.
* During the fetching process, the app should show a loading spinner.
* If the request fail, a error message should be showed.
* If the request successed, the app should get the `totalPageNum` available for the Pagination component.

**Implementation**:

- For the search form we need:
  - `searchTerm`: a state to controll the value in the input box
  - `owner` and `repo`: states to store owner and repo (extracted from `searchTerm`)
  - `handleSearchInput()`: a function to handle change in the search input box
  - `handleSearchSubmit()`: a function to handle submit event of the search form

- To prepare for the Pagination component, we need:
  - `pageNum`: a state to controll the current page
  - `totalPageNum`: a state to control the total page number

- To show the list of issues, we need:
  - `loading`: a state to show or hide the loading spinner
  - `errorMsg`: a state to store the error message
  - `issues`: a state that stores the list of issues

- For handling the side-effect of fetching issues, we use the `useEffect` hook. Because we need to get issues whenever user search or change the page in Pagination component, the dependencies array of the `useEffect` should be `[owner, repo, pageNum]`

- In `src/App.js`:

  ```javascript
  // ...
  const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [issues, setIssues] = useState([]);
    const [owner, setOwner] = useState("");
    const [repo, setRepo] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [totalPageNum, setTotalPageNum] = useState(1);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    function getOwnerAndRepo() {
      const repo = searchTerm.substring(searchTerm.lastIndexOf("/") + 1);
      const withoutRepo = searchTerm.substring(0, searchTerm.lastIndexOf("/"));
      const owner = withoutRepo.substring(withoutRepo.lastIndexOf("/") + 1);
      return { repo, owner };
    }

    const handleSearchInput = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
      event.preventDefault();
      const { owner, repo } = getOwnerAndRepo();
      setOwner(owner);
      setRepo(repo);
      setPageNum(1);
      setTotalPageNum(1);
      setIssues([]);
    };

    useEffect(() => {
      const fetchIssueData = async () => {
        if (!owner || !repo) return;
        setLoading(true);
        try {
          const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20`;
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
            setErrorMsg(`FETCH ISSUES ERROR: ${data.message}`);
          }
        } catch (error) {
          setErrorMsg(`FETCH ISSUES ERROR: ${error.message}`);
        }
        setLoading(false);
      };
      fetchIssueData();
    }, [owner, repo, pageNum]);

    // ...

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
        </Container>
      </div>
    );

  export default App;
  ```

- In `src/components/Search/index.js`

  ```javascript
  // ...
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
  ```

- In `src/components/IssueList/index.js`

  ```javascript
  const IssueList = ({ itemList, showDetail }) => {
    return (
      <ul className="list-unstyled">
        {itemList.map((item) => (
          <Item item={item} key={item.id} showDetail={showDetail} />
        ))}
      </ul>
    );
  };

  const Item = ({ item, showDetail }) => {
    return ( ... )

  export default IssueList;
  ```

- In `src/components/PaginationIssue/index.js`

  ```javascript
  const PaginationIssue = ({ pageNum, setPageNum, totalPageNum }) => {
    const handleClick = (page) => {
      setPageNum(parseInt(page));
    };

    const handleClickOnFirst = () => {
      setPageNum(1);
    };

    const handleClickOnLast = () => {
      setPageNum(totalPageNum);
    };
    const handleClickOnNext = () => {
      if (pageNum < totalPageNum) {
        setPageNum((num) => num + 1);
      }
    };
    const handleClickOnPrev = () => {
      if (pageNum > 1) {
        setPageNum((num) => num - 1);
      }
    };

    return (
      <Pagination size="lg" className="justify-content-center">
        <Pagination.First disabled={pageNum === 1} onClick={handleClickOnFirst} />
        <Pagination.Prev disabled={pageNum === 1} onClick={handleClickOnPrev} />
        <Pagination.Item active={pageNum === 1} onClick={() => handleClick(1)}>
          {1}
        </Pagination.Item>

        {pageNum - 1 > 1 && <Pagination.Ellipsis />}
        {pageNum > 1 && pageNum < totalPageNum && (
          <Pagination.Item active>{pageNum}</Pagination.Item>
        )}
        {totalPageNum > pageNum + 1 && <Pagination.Ellipsis />}

        {totalPageNum > 1 && (
          <Pagination.Item
            active={pageNum === totalPageNum}
            onClick={() => handleClick(totalPageNum)}
          >
            {totalPageNum}
          </Pagination.Item>
        )}

        <Pagination.Next
          disabled={pageNum === totalPageNum}
          onClick={handleClickOnNext}
        />
        <Pagination.Last
          disabled={pageNum === totalPageNum}
          onClick={handleClickOnLast}
        />
      </Pagination>
    );
  };

  export default PaginationIssue;
  ```

### Step 2 - Showing issue detail in a modal

**Requirements**:

- User can click on an issue in the list, then a modal pops up and shows the detail of the issue
- The app should start fetching the first five comments of the issue
- A loading spinner should be showed during the fetching process
- If there are more than five comments, a button `Show more` should be seen at the bottom of the list of comments
- When user click on `Show more`, the app should load the next five comments from the Github API

**Implementation**:

- We define some states for this feature:
  - `showModal`: a state to show or hide the modal
  - `selectedIssue`: a state to store the detail info of the selected issue
  - `loadingComments`: a state to show/hide the loading spinner when the app loads comments
  - `urlFetchComments`: a state that stores the url to load more comments.
  - `commentPageNum` and `commentTotalPageNum`: similiar to the pagination feature, we use these two states to control the `Show more` comments feature
  
- We need two function to handle two events:
  - `showDetail()`: this function will handle the event when user click on an issue
  - `handleMoreComments()`: this function will be triggered when user click on `Show more` button

- For the side-effect to load comments, we use another `useEffect` hook. This `useEffect` depends on `urlFetchComments`. When user click on an issue, the app will initialize `urlFetchComments` with the issue number and `commentPageNum = 1`. When user click on `Show more`, the app will increase `commentPageNum` by 1 and modify `urlFetchComments` to trigger the side-effect.

- In `src/App.js`:

  ```javascript
    // ...
    const [commentPageNum, setCommentPageNum] = useState(1);
    const [commentTotalPageNum, setCommentTotalPageNum] = useState(1);
    const [urlFetchComments, setUrlFetchComments] = useState("");
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [loadingComments, setLoadingComments] = useState(false);

    // ...
    const showDetail = (item) => {
      setShowModal(true);
      if (selectedIssue?.number !== item.number) {
        setComments([]);
        setCommentPageNum(1);
        setCommentTotalPageNum(1);
        setSelectedIssue(item);
        setUrlFetchComments(
          `https://api.github.com/repos/${owner}/${repo}/issues/${item.number}/comments?page=1&per_page=5`
        );
      }
    };

    const handleMoreComments = () => {
      if (commentPageNum >= commentTotalPageNum) return;
      const url = `https://api.github.com/repos/${owner}/${repo}/issues/${
        selectedIssue.number
      }/comments?page=${commentPageNum + 1}&per_page=5`;
      setCommentPageNum((num) => num + 1);
      setUrlFetchComments(url);
    };

    useEffect(() => {
      const fetchComments = async () => {
        if (!urlFetchComments) return;
        setLoadingComments(true);
        try {
          const response = await fetch(urlFetchComments);
          const data = await response.json();
          if (response.status === 200) {
            const link = response.headers.get("link");
            if (link) {
              const getTotalPage = link.match(
                /page=(\d+)&per_page=\d+>; rel="last"/
              );
              if (getTotalPage) {
                setCommentTotalPageNum(parseInt(getTotalPage[1]));
              }
            }
            setComments((c) => [...c, ...data]);
            setErrorMsg(null);
          } else {
            setErrorMsg(`FETCH COMMENTS ERROR: ${data.message}`);
            setShowModal(false);
          }
        } catch (error) {
          setErrorMsg(`FETCH COMMENTS ERROR: ${error.message}`);
          setShowModal(false);
        }
        setLoadingComments(false);
      };
      fetchComments();
    }, [urlFetchComments]);

    // ...

    return (
      <div className="App">
          ...
          <IssueModal
            issue={selectedIssue}
            comments={comments}
            loadingComments={loadingComments}
            showModal={showModal}
            setShowModal={setShowModal}
            handleMore={handleMoreComments}
            disableShowMore={commentPageNum === commentTotalPageNum}
          />
        </Container>
      </div>
    );
  };

  export default App;
  ```

- In `src/components/IssueModal/index.js`

  ```javascript
  const IssueModal = ({
    issue,
    comments,
    loadingComments,
    showModal,
    setShowModal,
    handleMore,
    disableShowMore,
  }) => {
    return (
      issue && (
        <Modal
          size="xl"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="issue-detail-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="issue-detail-modal">
              <span className="mr-2">#{issue.number}</span>
              <span>{issue.title}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactMarkdown source={issue.body} />
            <hr />
            <h4>Comments:</h4>
            <ul className="list-unstyled">
              {comments && comments.length ? (
                comments.map((comment) => (
                  <Comments key={comment.id} {...comment} />
                ))
              ) : (
                <li>There are no comments of this issue</li>
              )}
            </ul>
            <div className="d-flex justify-content-center">
              {loadingComments ? (
                <ClipLoader color="#f86c6b" size={75} loading={loadingComments} />
              ) : (
                <>
                  {!disableShowMore && (
                    <Button
                      type="button"
                      onClick={handleMore}
                      disabled={disableShowMore}
                    >
                      Show More
                    </Button>
                  )}
                </>
              )}
            </div>
          </Modal.Body>
        </Modal>
      )
    );
  };

  const Comments = ({ user, body, created_at }) => {
    return (
      <Media as="li" className="mb-3">
        <img
          src={user.avatar_url}
          alt="User Avatar"
          className={`${styles["avatar"]} mr-3`}
        />
        <Media.Body className="text-left">
          <div>
            <span className={`${styles["text-grey"]} mr-2`}>@{user.login}</span>
            <span className={styles["text-grey"]}>
              commented <Moment fromNow>{created_at}</Moment>
            </span>
          </div>
          <ReactMarkdown source={body} />
        </Media.Body>
      </Media>
    );
  };

  export default IssueModal;
  ```

