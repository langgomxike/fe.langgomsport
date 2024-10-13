import React, {useEffect, useState} from "react";
import {IoChevronBack, IoChevronForward} from "react-icons/io5";
import './pagination.css'

type PaginationProps = {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

const maxPagesToShow = 4; // Số lượng trang tối đa hiển thị


export default function ({currentPage, totalPages, onPageChange}: PaginationProps) {
    //state
    const [currentPage1, setCurrentPage1] = useState<number>(currentPage);
    const [pages, setPages] = useState<(string|number)[]>()

    console.log(totalPages);

    //handle
    const goToNextPage = () => {
        if (currentPage1 < totalPages) {
            // onPageChange(currentPage + 1); // Gọi hàm onPageChange để cập nhật trang
            goToPage(currentPage1 + 1);
        }
    }

    const goToPreviousPage = () => {
        if (currentPage1 > 1) {
            // onPageChange(currentPage - 1);
            goToPage(currentPage1 - 1);
        }
    };

    const goToPage = (page: number) => {
        onPageChange(page);
        setCurrentPage1(page);
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
                const startPage = Math.max(1, currentPage1 - 2);
                const endPage = Math.min(totalPages, currentPage1 + 2);

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
        };
        getPageNumber()
    }, [currentPage1])
    // Hàm để tính số trang




    //render
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${currentPage1 === 1 ? 'disabled' : ''}`}
                    onClick={currentPage1 > 1 ? goToFirstPage : undefined}>
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>

                <li className={`page-item ${currentPage1 === 1 ? 'disabled' : ''}`}
                    onClick={currentPage1 > 1 ? goToPreviousPage : undefined}>
                    <a className="page-link" href="#">
                        <IoChevronBack className="icChevron"/>
                    </a>
                </li>

                {pages?.map((page) => (
                    <li key={page}
                        className={`page-item ${page === currentPage1 ? "active" : ""}`}>
                        {page === '...' ? (
                            <span className="page-link">...</span> // Dấu `...`
                        ) : (
                            <a className="page-link" onClick={() => goToPage(Number(page))}>
                                {page}
                            </a>
                        )}
                    </li>
                ))}

                <li className={`page-item ${currentPage1 === totalPages ? 'disabled' : ''}`}
                    onClick={currentPage1 < totalPages ? goToNextPage : undefined}>
                    <a className="page-link" href="#">
                        <IoChevronForward className="icChevron"/>
                    </a>
                </li>

                <li className={`page-item ${currentPage1 === totalPages ? 'disabled' : ''}`}
                    onClick={currentPage1 < totalPages ? goToLastPage : undefined}>
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}