import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({
  pageCount,
  forcePage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={(event) => onPageChange(event.selected + 1)}
      forcePage={forcePage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}