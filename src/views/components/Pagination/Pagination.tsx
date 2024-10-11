import React, {useEffect, useState} from "react";
import {IoChevronBack, IoChevronForward} from "react-icons/io5";
import './pagination.css'

type PaginationProps = {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

const maxPagesToShow = 4; // Số lượng trang tối đa hiển thị


export default function ({totalPages, onPageChange}: PaginationProps) {
    //state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pages, setPages] = useState<(string|number)[]>()

    //handle
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            // onPageChange(currentPage + 1); // Gọi hàm onPageChange để cập nhật trang
            goToPage(currentPage + 1);
        }
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            // onPageChange(currentPage - 1);
            goToPage(currentPage - 1);
        }
    };

    const goToPage = (page: number) => {
        // onPageChange(page);
        setCurrentPage(page);
    };

    const goToFirstPage = () => {
        goToPage(1);
    };

    const goToLastPage = () => {
        goToPage(totalPages);
    };

    useEffect(() => {
        const getPageNumber = ()  => {
            let pages: (number | string)[] = [];

            if (totalPages <= maxPagesToShow) {
                pages = [...Array(totalPages)].map((_, index) => index + 1);
            } else {
                const startPage = Math.max(1, currentPage - 2);
                const endPage = Math.min(totalPages, currentPage + 2);

                // Trang đầu tiên luôn hiển thị
                if (startPage > 1) {
                    pages.push(1);
                }

                // Dấu ba chấm trước các trang giữa
                if (startPage > 2) {
                    pages.push('...');
                }

                // Các trang gần với trang hiện tại
                for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }

                // Dấu ba chấm sau các trang giữa
                if (endPage < totalPages - 1) {
                    pages.push('...');
                }

                // Trang cuối cùng luôn hiển thị
                if (endPage < totalPages) {
                    pages.push(totalPages);
                }
            }

            setPages(pages);
            console.log("current page: ", currentPage)
        };
        getPageNumber()
    }, [currentPage])
    // Hàm để tính số trang




    //render
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {currentPage > 1 && (
                    <li className="page-item" onClick={goToFirstPage}>
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                )}
                {currentPage > 1 && (
                    <li className="page-item" onClick={goToPreviousPage}>
                        <a className="page-link" href="#">
                            <IoChevronBack className="icChevron"/>
                        </a>
                    </li>
                )}

                {pages?.map((page) => (
                        <li key={page}
                            className={`page-item ${page === currentPage ? "active" : ""}`}>
                            {page === '...' ? (
                                <span className="page-link">...</span> // Dấu `...`
                            ) : (
                                <a className="page-link" onClick={() => goToPage(Number(page))}>
                                    {page}
                                </a>
                            )}
                        </li>
                ))}

                {currentPage < totalPages && (
                    <li className="page-item" onClick={goToNextPage}>
                        <a className="page-link" href="#">
                            <IoChevronForward className="icChevron"/>
                        </a>
                    </li>
                )}
                {currentPage < totalPages && (
                    <li className="page-item" onClick={goToLastPage}>
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    );
}