import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

export default function PaginationBlock(props) {
  var pageCount = props.userRecordsData !== undefined
      ? Math.ceil(parseInt(props.userRecordsData) / props.perPage)
      : 0;
      // console.log("betgbe",pageCount);

  const handlePageClick = ({ selected: selectedPage }) => {
    console.log("selectedPage",selectedPage);
      props.callHandlePageClick(selectedPage * props.perPage);
  };
  return (
    <>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={`pagination ${props.containerClassName}`}
        previousLinkClassName={"paginate_button page-link page-item"}
        nextLinkClassName={"paginate_button page-link page-item next"}
        disabledClassName={"paginate_button page-item disabled"}
        activeClassName={"paginate_button page-item active"}
        pageLinkClassName={"page-link"}
      />
    </>
  );
}
