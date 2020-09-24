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
* [Showing issue detail in a modal](./doc/20_issue_modal.md)
