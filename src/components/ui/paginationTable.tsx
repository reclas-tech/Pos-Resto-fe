import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationTableProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const PaginationTable: React.FC<PaginationTableProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page)
        }
    }

    // Number of pages to show around the current page
    const windowSize = 3
    const startPage = Math.max(1, currentPage - Math.floor(windowSize / 2))
    const endPage = Math.min(totalPages, currentPage + Math.floor(windowSize / 2))

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (currentPage > 1) handlePageChange(currentPage - 1)
                            }}
                            className={currentPage === 1 ? 'disabled' : ''}
                        />
                    </PaginationItem>
                    {startPage > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationLink href="#" onClick={(e) => {
                                    e.preventDefault()
                                    handlePageChange(1)
                                }}>
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            {startPage > 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                        </>
                    )}
                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(page => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={page === currentPage}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePageChange(page)
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {endPage < totalPages && (
                        <>
                            {endPage < totalPages - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                            <PaginationItem>
                                <PaginationLink href="#" onClick={(e) => {
                                    e.preventDefault()
                                    handlePageChange(totalPages)
                                }}>
                                    {totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (currentPage < totalPages) handlePageChange(currentPage + 1)
                            }}
                            className={currentPage === totalPages ? 'disabled' : ''}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default PaginationTable
