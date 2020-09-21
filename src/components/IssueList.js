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
