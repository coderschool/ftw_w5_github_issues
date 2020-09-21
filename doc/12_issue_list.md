## useEffect and the issue list

In this step, we will put the `owner` and `repo` in a request and send it to the Github API to get the list of issues.

**Requirements**: 

* The app will send a request to the Github API for list of issues. 
* The request URL should contain `page=1&per_page=20` to get the first 20 issues.
* During the fetching process, the app should show a loading spinner.
* If the request fail, an error message should be showed.

### The list of issue component

- Create `src/components/IssueList.js`:

```javascript
import React from "react";

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
  const { title } = item;
  return (
    <li>
      <h4>{title}</h4>
    </li>
  );
};

export default IssueList;
```