'use client';
import React, { useState } from 'react';
import ItemCard from '@/app/customComponents/ItemCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Spinner from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from '@/redux/api/orderApi';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

const Orders = () => {
  const [page, setPage] = useState(1);
  const size = 10;
  const { data, isLoading } = useGetAllOrdersQuery({
    size: size,
    page: page,
  });
  const allOrders = data?.data || [];
  const totalItems = data?.totalItems;
  const totalPages = Math.ceil(totalItems / size);
  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * size, totalItems);
  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const statuses = [
    { label: 'Pending', value: 'pending' },
    { label: 'Processed', value: 'processed' },
    { label: 'Picked', value: 'picked' },
    { label: 'Complete', value: 'complete' },
  ];
  const orders = allOrders.map((order: any) => ({
    id: order?.id,
    fullName: order?.first_name + order?.last_name,
    total_price: order?.total_price,
    total_product: order?.total_product,
    order_status: order?.order_status,
  }));
  const { toast } = useToast();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [updateOrder] = useUpdateOrderMutation();
  const onSubmit = async (data: any) => {
    try {
      const orderData = {
        order_status: data.order_status.value,
      };
      const updatedOrder = await updateOrder({
        id: selectedOrderId,
        ...orderData,
      }).unwrap();
      if (updatedOrder.success) {
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Order updated successfully',
        });
      }
    } catch (error: any) {
      toast({
        variant: 'error',
        title: 'Error',
        description: error?.data?.message,
      });
    }
  };
  return (
    <main className="h-full">
      {isLoading ? (
        <div className="h-full flex justify-center">
          <Spinner size={'medium'} />
        </div>
      ) : (
        <section className="flex flex-col justify-between h-full">
          <section className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Total Products</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allOrders?.map((order: any, index: number) => (
                  <TableRow key={index} className="cursor-pointer">
                    <TableCell className="w-6">{order?.id}</TableCell>
                    <TableCell>
                      {order?.first_name} {order?.last_name}
                    </TableCell>
                    <TableCell>${order?.total_price}</TableCell>
                    <TableCell>{order?.total_product}</TableCell>
                    <TableCell>{order?.order_status}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger
                          onClick={() => setSelectedOrderId(order.id)}
                          className="bg-black text-white p-2 rounded-md"
                        >
                          Update
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col items-start gap-y-[6px] w-full">
                                  <Label
                                    htmlFor="category"
                                    className="text-right"
                                  >
                                    Category
                                  </Label>
                                  <div className="w-full">
                                    <Controller
                                      control={control}
                                      name="order_status"
                                      defaultValue={
                                        order
                                          ? {
                                              label: `${
                                                String(order?.order_status)
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                String(
                                                  order?.order_status
                                                ).slice(1)
                                              }`,
                                              value: `${order?.order_status}`,
                                            }
                                          : ''
                                      }
                                      rules={{ required: 'Status is required' }}
                                      render={({ field }) => (
                                        <Select
                                          id="order_status"
                                          styles={{
                                            placeholder: (base) => ({
                                              ...base,
                                              color: '#ccc',
                                              fontSize: '14px',
                                            }),
                                            control: (base, state) => ({
                                              ...base,
                                              border: state.isFocused
                                                ? '1px solid #ccc'
                                                : '1px solid #ccc',
                                              boxShadow: state.isFocused
                                                ? '0 0 0 1px #ccc'
                                                : '0',
                                              '&:hover': {
                                                border: state.isFocused
                                                  ? '1px solid #ccc'
                                                  : '1px solid #ccc',
                                              },
                                              fontSize: '15px',
                                              height: '43px',
                                              fontWeight: '500',
                                              borderRadius: '6px',
                                            }),
                                            option: (
                                              base,
                                              { isFocused, isSelected }
                                            ) => ({
                                              ...base,
                                              backgroundColor: isSelected
                                                ? 'rgb(0,150,149)'
                                                : isFocused
                                                ? ' rgb(209 250 229)'
                                                : 'transparent',
                                              cursor: 'pointer',
                                            }),
                                            menu: (base) => ({
                                              ...base,
                                              fontSize: '15px',
                                              fontWeight: '500',
                                            }),
                                            indicatorSeparator: (base) => ({
                                              ...base,
                                              display: 'none',
                                            }),
                                          }}
                                          {...field}
                                          isSearchable={false}
                                          placeholder="Category"
                                          options={statuses}
                                          onChange={(selectedOption) => {
                                            field.onChange(selectedOption);
                                          }}
                                          value={field.value}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="mt-4 flex gap-x-4 w-full justify-end gap-y-2">
                                  <DialogTrigger asChild>
                                    <Button
                                      type="button"
                                      onClick={() => reset()}
                                    >
                                      Cancel
                                    </Button>
                                  </DialogTrigger>
                                  <Button>Update</Button>
                                </div>
                              </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
          <section className="flex flex-col items-center pt-10 gap-y-4 md:hidden">
            <ItemCard isOrder={true} orders={orders} />
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
                        page === index + 1 ? `is-active` : ''
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

export default Orders;
