import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
} from "react-bootstrap-icons";

type PaginationProps = {
  total: number;
  offset?: number;
  defaultPage?: number;
  onChange?: (page: number) => void;
};

export default function Pagination({
  total,
  defaultPage = 1,
  offset = 2,
  onChange,
}: PaginationProps) {
  //states
  const [page, setPage] = useState(defaultPage);

  const pageItems = [];

  for (let i = defaultPage - offset; i < defaultPage; i++) {
    const item = <Col>{i}</Col>;
    pageItems.push(item);
  }

  pageItems.push(<Col>{defaultPage}</Col>);

  for (let i = defaultPage + offset; i > defaultPage; i--) {
    const item = <Col>{i}</Col>;
    pageItems.push(item);
  }

  return (
    <Row>
      {/* first */}
      <Col>
        <ChevronDoubleLeft size={20} />
      </Col>
      {/* prev */}
      <Col>
        <ChevronLeft size={20} />
      </Col>

      {/* pages */}

      {pageItems}

      {/* next */}
      <Col>
        <ChevronRight size={20} />
      </Col>

      {/* last */}
      <Col>
        <ChevronDoubleRight size={20} />
      </Col>
    </Row>
  );
}
