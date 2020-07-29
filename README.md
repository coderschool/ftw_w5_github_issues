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
- [x] In the Issue Detail Modal, let implement an **infinite pagination** with a "Show More" button. Fetch 5 more comments whenever user clicks on the button.

## Implementation

### Setup project

- Initialize project

```bash
$ npx create-react-app github-issues
$ cd github-issues
$ npm i react-bootstrap bootstrap
$ npm i moment react-moment
$ npm i react-markdown react-spinners
```

- Add `import "bootstrap/dist/css/bootstrap.min.css";` in `App.js`

### Project structure

How to structure large React apps into folders and files is a highly opinionated topic. There is no right way to do it. However, let set up conventions to structure our React projects.

- Wrap your components in `components/YOUR_COMPONENT_NAME/` folder:

  ```
  |- src\
    |- components\
      |- List\
          |- index.js
          |- List.module.css
      |- IssueModal\
      |- Pagination\
      |- Search\
    |- App.js
    ...
  ```

  ```javascript
  // In src/components/List/index.js
  import React from "react";
  import styles from "./List.module.css";
  ...
  const List = ( ) => {
    ...
  }
  export default List;
  ```

  ```javascript
  // In src/App.js
  import List from "./components/List";
  ```

- **[CSS Module in create-react-app](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet)**: After you have setup your application with create-react-app (e.g. npx create-react-app my-app), you don't need to install anything else to make CSS modules work. However, you have to give your CSS files the "module" prefix prior the extension: e.g. `List.module.css`

  ```css
  /* In src/components/List/List.module.css */
  .avatar {
    width: 128px;
    height: 128px;
  }

  .text-grey {
    color: #657786;
  }
  ```

  Later on in your component:

  ```javascript
  import styles from "./List.module.css";

  // Then you can use css in your JSX like this
  <span className={styles["text-grey"]}>...</span>

  // If you want to concatenate with other classes
  <span className={`${styles["text-grey"]} mr-2`}>...</span>

  ```

  In case of the `avatar` style, you can retrieve it with `styles.avatar` too. However, for the other styles with dashes you need to retrieve them with strings from the object, e.g. `styles["text-grey"]`. 


