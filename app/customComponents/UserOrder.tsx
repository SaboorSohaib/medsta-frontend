"use client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Spinner from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatDate from "@/lib/formatDate";
import { useGetOrdersByEmailQuery } from "@/redux/api/orderApi";
import React, { useState } from "react";

const UserOrder = ({ userEmail }: { userEmail: string }) => {
  const [page, setPage] = useState(1);
  const size = 5;
  const { data: orders, isLoading } = useGetOrdersByEmailQuery({
    email: userEmail,
    size: size,
    page: page,
  });
  const totalItems = orders?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / size);
  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * size, totalItems);
  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <main>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.data?.length < 1 ? (
            <section className="flex justify-center py-10 px-10 w-full">
              <p>No orders available</p>
            </section>
          ) : isLoading ? (
            <section className="flex justify-center py-10 px-10 w-full">
              <Spinner size="medium" />
            </section>
          ) : (
            <>
              {orders?.data.map((order: any, index: number) => (
                <TableRow key={index} className="cursor-pointer">
                  <TableCell>{order?.id?.slice(0, -10)}</TableCell>
                  <TableCell>{formatDate(order?.createdAt)}</TableCell>
                  <TableCell>{order?.order_status}</TableCell>
                  <TableCell>
                    ${order?.total_price} for {order?.total_product} items
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
      <section className="flex justify-between items-center border-t pt-2 pb-20">
        {orders?.data?.length < 1 ? (
          <></>
        ) : (
          <>
            <div className="w-full hidden md:block text-sm text-nowrap">
              <p>
                Showing items {startItem} to {endItem}
              </p>
            </div>
            <Pagination>
              <PaginationContent>
                <Button
                  className="bg-gray-100 hover:bg-gray-100 text-black"
                  disabled={page === 1}
                >
                  <PaginationPrevious
                    className="cursor-pointer"
                    onClick={() => handlePageClick(page - 1)}
                    isActive={page >= 1}
                  />
                </Button>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className={`cursor-pointer ${
                        page === index + 1 ? `is-active` : ""
                      }`}
                      isActive={page === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <Button
                  className="bg-gray-100 hover:bg-gray-100 text-black"
                  disabled={page === totalPages}
                >
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() => handlePageClick(page + 1)}
                    isActive={page <= totalPages}
                  />
                </Button>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </section>
    </main>
  );
};

export default UserOrder;
