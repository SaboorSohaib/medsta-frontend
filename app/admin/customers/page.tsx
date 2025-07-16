"use client";
import React, { useState } from "react";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/ui/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ItemCard from "@/app/customComponents/ItemCard";

const Customers = () => {
  const [page, setPage] = useState(1);
  const size = 10;
  const { data, isLoading } = useGetUsersQuery({ size: size, page: page });
  const allUsers = data?.data || [];
  const totalItems = data?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / size);
  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * size, totalItems);
  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };
  const users = allUsers.map((user: any) => ({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    email: user.email,
    role: user.role,
  }));
  return (
    <main className="h-full">
      <h1 className="text-xl font-semibold py-4">Customers</h1>
      {isLoading ? (
        <div className="h-full flex justify-center">
          <Spinner size={"medium"} />
        </div>
      ) : (
        <section className="flex flex-col justify-between h-full">
          <section className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers.map((user: any, idx: number) => (
                  <TableRow key={idx} className="cursor-pointer">
                    <TableCell className="w-6">{user?.id}</TableCell>
                    <TableCell className="flex items-center gap-x-2">
                      <Image
                        src={user?.photo}
                        width={40}
                        height={40}
                        alt="user imge"
                      />
                      <p>{user?.first_name}</p>
                    </TableCell>
                    <TableCell>{user?.last_name}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>{user?.phone_number}</TableCell>
                    <TableCell>{user?.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
          <section className="flex flex-col items-center pt-10 gap-y-4 md:hidden">
            <ItemCard isUser={true} users={users} />
          </section>
          <section className="flex justify-between items-center border-t pt-2 pb-20">
            <div className="w-full hidden md:block">
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
          </section>
        </section>
      )}
    </main>
  );
};

export default Customers;
