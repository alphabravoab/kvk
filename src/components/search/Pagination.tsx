import React from "react";
import "./pagination.css";
type RenderProps = {
    currentPage: number,
    setPage: (page: number) => void,
    totalPages: number,
}

function numberArray(num: number): number[] {
    const result: number[] = [];
  
    for (let i = 1; i < num + 1; i++) {
      result.push(i);
    }
  
    return result;
  }

function Pagination({currentPage, setPage, totalPages}: RenderProps) {
    if (totalPages <= 1) {
        return null;
    }
    return (
        <div className="pagination-container">
            {currentPage !== 1 ? <button className="spacer" onClick={() => setPage(currentPage - 1)}>&#8592;</button>: <div className="spacer" />}
            {numberArray(totalPages).map(number => (
                <button className={currentPage === number ? "current" : "page-button"} key={number} onClick={() => setPage(number)}>{number}</button>
            ))}
            {currentPage !== totalPages ? <button className="spacer" onClick={() => setPage(currentPage + 1)}>&#8594;</button>: <div className="spacer" />}
        </div>
    )
}

export default Pagination;