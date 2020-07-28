import React from "react";
import { Media } from "react-bootstrap";
import styles from "./List.module.css";
import Moment from "react-moment";

const List = ({ itemList, handleClickIssue }) => {
  return (
    <ul className="list-unstyled">
      {itemList.map((item) => (
        <Item item={item} key={item.id} handleClick={handleClickIssue} />
      ))}
    </ul>
  );
};

const Item = ({ item, handleClick }) => {
  return (
    <Media
      as="li"
      className={`${styles["issue"]} mb-5`}
      onClick={() => handleClick(item)}
    >
      <img
        src={item.user.avatar_url}
        alt="User Avatar"
        className={`${styles["avatar"]} mr-3`}
      />
      <Media.Body className="text-left">
        <h4>
          <span className="mr-2">#{item.number}</span>
          <span>{item.title}</span>
        </h4>
        <div className="content-body">
          <span className={`${styles["text-grey"]} mr-2`}>
            @{item.user.login}
          </span>
          <span className={styles["text-grey"]}>
            Last update: <Moment fromNow>{item.updated_at}</Moment>
          </span>
          <p>
            {item.body.length <= 99
              ? item.body
              : item.body.slice(0, 99) + "..."}
          </p>
        </div>
        <div className="content-footer">
          {item.labels.map((label) => (
            <span
              className="badge badge-secondary mr-2"
              color={label.color}
              key={label.id}
            >
              {label.name}
            </span>
          ))}
        </div>
      </Media.Body>
    </Media>
  );
};

export default List;

// {
//   "url": "https://api.github.com/repos/facebook/react/issues/19455",
//   "repository_url": "https://api.github.com/repos/facebook/react",
//   "labels_url": "https://api.github.com/repos/facebook/react/issues/19455/labels{/name}",
//   "comments_url": "https://api.github.com/repos/facebook/react/issues/19455/comments",
//   "events_url": "https://api.github.com/repos/facebook/react/issues/19455/events",
//   "html_url": "https://github.com/facebook/react/pull/19455",
//   "id": 665705548,
//   "node_id": "MDExOlB1bGxSZXF1ZXN0NDU2Njk5MTg0",
//   "number": 19455,
//   "title": "Update my mailmap entries",
//   "user": {
//     "login": "rickhanlonii",
//     "id": 2440089,
//     "node_id": "MDQ6VXNlcjI0NDAwODk=",
//     "avatar_url": "https://avatars0.githubusercontent.com/u/2440089?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/rickhanlonii",
//     "html_url": "https://github.com/rickhanlonii",
//     "followers_url": "https://api.github.com/users/rickhanlonii/followers",
//     "following_url": "https://api.github.com/users/rickhanlonii/following{/other_user}",
//     "gists_url": "https://api.github.com/users/rickhanlonii/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/rickhanlonii/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/rickhanlonii/subscriptions",
//     "organizations_url": "https://api.github.com/users/rickhanlonii/orgs",
//     "repos_url": "https://api.github.com/users/rickhanlonii/repos",
//     "events_url": "https://api.github.com/users/rickhanlonii/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/rickhanlonii/received_events",
//     "type": "User",
//     "site_admin": false
//   },
//   "labels": [
//     {
//       "id": 196858374,
//       "node_id": "MDU6TGFiZWwxOTY4NTgzNzQ=",
//       "url": "https://api.github.com/repos/facebook/react/labels/CLA%20Signed",
//       "name": "CLA Signed",
//       "color": "e7e7e7",
//       "default": false,
//       "description": null
//     },
//     {
//       "id": 1775958285,
//       "node_id": "MDU6TGFiZWwxNzc1OTU4Mjg1",
//       "url": "https://api.github.com/repos/facebook/react/labels/React%20Core%20Team",
//       "name": "React Core Team",
//       "color": "9149d1",
//       "default": false,
//       "description": "Opened by a member of the React Core Team"
//     }
//   ],
//   "state": "open",
//   "locked": false,
//   "assignee": null,
//   "assignees": [],
//   "milestone": null,
//   "comments": 3,
//   "created_at": "2020-07-26T04:20:18Z",
//   "updated_at": "2020-07-26T04:28:48Z",
//   "closed_at": null,
//   "author_association": "MEMBER",
//   "active_lock_reason": null,
//   "pull_request": {
//     "url": "https://api.github.com/repos/facebook/react/pulls/19455",
//     "html_url": "https://github.com/facebook/react/pull/19455",
//     "diff_url": "https://github.com/facebook/react/pull/19455.diff",
//     "patch_url": "https://github.com/facebook/react/pull/19455.patch"
//   },
//   "body": "\r\n",
//   "performed_via_github_app": null
// }
