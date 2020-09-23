import React from "react";
import { Media } from "react-bootstrap";
import Moment from "react-moment";

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
  return (
    <Media as="li" className="issue mb-5" onClick={() => showDetail(item)}>
      <img
        src={item.user.avatar_url}
        alt="User Avatar"
        className="avatar mr-3"
      />
      <Media.Body className="text-left">
        <h4>
          <span className="mr-2">#{item.number}</span>
          <span>{item.title}</span>
        </h4>
        <div className="content-body">
          <span className="text-grey mr-2">@{item.user.login}</span>
          <span className="text-grey mr-2">
            Last update: <Moment fromNow>{item.updated_at}</Moment>
          </span>
          <span className="text-grey">Comment: {item.comments}</span>
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

export default IssueList;
