/* eslint-disable no-lonely-if */
import React from 'react';
import PropTypes from 'prop-types';

import BsPagination from 'react-bootstrap/Pagination';

import './Pagination.scss';

const Pagination = ({ items, initialPage, pageSize, placement, onPageChange }) => {
  const [state, setState] = React.useState({});

  const getPager = React.useCallback(
    (currentPage) => {
      const totalItems = items.length;
      // calculate total pages
      const totalPages = Math.ceil(totalItems / pageSize);

      let startPage;
      let endPage;

      if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
      } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
        } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
        }
      }

      // calculate start and end item indexes
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // create an array of pages to ng-repeat in the pager control
      const pages = [...Array(endPage + 1 - startPage).keys()].map((i) => startPage + i);

      // return object with all pager properties required by the view
      return {
        totalItems,
        currentPage,
        pageSize,
        totalPages,
        startPage,
        endPage,
        startIndex,
        endIndex,
        pages,
      };
    },
    [items.length, pageSize]
  );

  const setPage = React.useCallback(
    (page) => {
      const pager = getPager(page);
      const pageItems = items.slice(pager.startIndex, pager.endIndex + 1);

      setState(pager);
      onPageChange(pageItems);
    },
    [items, getPager, onPageChange]
  );

  React.useEffect(() => {
    setPage(initialPage);
  }, [items, initialPage, setPage]);

  if (!state.pages || state.pages.length <= 1) {
    // don't display pager if there is only 1 page
    return null;
  }

  return (
    <div className="pagination-wrapper" style={{ textAlign: placement }}>
      <BsPagination>
        <BsPagination.First disabled={state.currentPage === 1} onClick={() => setPage(1)} />
        <BsPagination.Prev
          disabled={state.currentPage === 1}
          onClick={() => setPage(state.currentPage - 1)}
        />

        {state.pages.map((page) => (
          <BsPagination.Item
            key={page}
            active={state.currentPage === page}
            onClick={() => setPage(page)}
          >
            {page}
          </BsPagination.Item>
        ))}

        <BsPagination.Next
          disabled={state.currentPage === state.totalPages}
          onClick={() => setPage(state.currentPage + 1)}
        />
        <BsPagination.Last
          disabled={state.currentPage === state.totalPages}
          onClick={() => setPage(state.totalPages)}
        />
      </BsPagination>
    </div>
  );
};

Pagination.defaultProps = {
  initialPage: 1,
  pageSize: 10,
  placement: 'right',
};

Pagination.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
  placement: PropTypes.oneOf(['left', 'center', 'right']),
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
