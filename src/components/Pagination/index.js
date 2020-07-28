import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationIssue = ({
  pageNum,
  setPageNum,
  totalPageNum,
  setTotalPageNum,
}) => {
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
      setPageNum(pageNum + 1);
    }
  };
  const handleClickOnPrev = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  return (
    <Pagination size="lg" className="justify-content-center">
      <Pagination.First disabled={pageNum === 1} onClick={handleClickOnFirst} />
      <Pagination.Prev disabled={pageNum === 1} onClick={handleClickOnPrev} />
      <Pagination.Item active={pageNum === 1} onClick={() => handleClick(1)}>
        {1}
      </Pagination.Item>

      {pageNum - 1 > 1 ? <Pagination.Ellipsis /> : null}
      {pageNum > 1 && pageNum < totalPageNum ? (
        <Pagination.Item active>{pageNum}</Pagination.Item>
      ) : null}
      {totalPageNum > pageNum + 1 ? <Pagination.Ellipsis /> : null}

      {totalPageNum > 1 ? (
        <Pagination.Item
          active={pageNum === totalPageNum}
          onClick={() => handleClick(totalPageNum)}
        >
          {totalPageNum}
        </Pagination.Item>
      ) : null}

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
