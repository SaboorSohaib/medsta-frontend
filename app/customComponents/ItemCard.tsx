'use client';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import React, { useState } from 'react';
import Select from 'react-select';
import { useToast } from '@/hooks/use-toast';
import { useUpdateOrderMutation } from '@/redux/api/orderApi';

const ItemCard = ({
  isCategories,
  categories,
  isProduct,
  products,
  isUser,
  users,
  isProductReview,
  productsReview,
  isBlog,
  blogs,
  isOrder,
  orders,
}: {
  isCategories?: boolean;
  categories?: { id: string; category_name: string; category_handle: string }[];
  isProduct?: boolean;
  products?: {
    id: string;
    product_title: string;
    product_handle: string;
    product_price: string;
    product_type: string;
    manufacturing: string;
  }[];
  isUser?: boolean;
  users?: {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    role: string;
  }[];
  isProductReview?: boolean;
  productsReview?: {
    id: string;
    reviewer_name: string;
    reviewer_email: string;
    product_title: string;
  }[];
  isBlog?: boolean;
  blogs?: {
    id: string;
    blog_title: string;
    blog_author: string;
    category: string;
  }[];
  isOrder?: boolean;
  orders?: {
    id: string;
    fullName: string;
    total_price: number;
    total_product: number;
    order_status: string;
  }[];
}) => {
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
    <main className="flex flex-col gap-y-4 p-5 w-full md:hidden">
      {isCategories &&
        categories?.map((category: any, index: number) => (
          <section
            className="border border-gray-400 rounded-md w-full p-5"
            key={index}
          >
            <Link href={`/admin/categories/${category?.id}`}>
              <article className="flex gap-x-2">
                <p>Id:</p>
                <p>{category?.id?.slice(0, -10)}</p>
              </article>
              <article className="flex gap-x-2">
                <p>Title:</p>
                <p>{category?.category_name}</p>
              </article>
              <article className="flex gap-x-2">
                <p>Handle:</p>
                <p>{category?.category_handle}</p>
              </article>
            </Link>
            <Button type="button" className="max-w-max">
              Delete
            </Button>
          </section>
        ))}
      {isProduct &&
        products?.map((product: any, index: number) => (
          <section
            className="border border-gray-400 rounded-md w-full p-5"
            key={index}
          >
            <Link href={`/admin/products/${product?.id}`}>
              <article className="flex gap-x-2">
                <p>Id:</p>
                <p>{product?.id?.slice(0, -10)}</p>
              </article>
              <article className="flex gap-x-2">
                <p>Title:</p>
                <p>{product?.product_title}</p>
              </article>
              <article className="flex gap-x-2">
                <p>Handle:</p>
                <p>{product?.product_handle}</p>
              </article>
              <article className="flex gap-x-2">
                <p>Price:</p>
                <p>{product?.product_price}</p>
              </article>
              <article className="flex gap-x-2">
                <p>Type:</p>
                <p>{product?.product_type}</p>
              </article>
              <article className="flex gap-x-2">
                <p>Manufacturing:</p>
                <p>{product?.manufacturing}</p>
              </article>
            </Link>
            <Button type="button" className="max-w-max">
              Delete
            </Button>
          </section>
        ))}
      {isUser &&
        users?.map((user: any, index: number) => (
          <section
            className="border border-gray-400 rounded-md w-full p-5"
            key={index}
          >
            <article className="flex gap-x-2">
              <p>Id:</p>
              <p>{user?.id?.slice(0, -10)}</p>
            </article>
            <article className="flex gap-x-2">
              <p>First Name:</p>
              <p>{user?.first_name}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Last Name:</p>
              <p>{user?.last_name}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Phone Number:</p>
              <p>{user?.phone_number}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Email:</p>
              <p>{user?.email}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Role:</p>
              <p>{user?.role}</p>
            </article>
          </section>
        ))}
      {isProductReview &&
        productsReview?.map((review: any, index: number) => (
          <section
            className="border border-gray-400 rounded-md w-full p-5"
            key={index}
          >
            <article className="flex gap-x-2">
              <p>Id:</p>
              <p>{review?.id?.slice(0, -10)}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Reviewer Name:</p>
              <p>{review?.reviewer_name}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Reviewer Name:</p>
              <p>{review?.reviewer_email}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Product Title:</p>
              <p>{review?.product_title}</p>
            </article>
          </section>
        ))}
      {isBlog &&
        blogs?.map((blog: any, index: number) => (
          <section
            className="border border-gray-400 rounded-md w-full p-5"
            key={index}
          >
            <article className="flex gap-x-2">
              <p>Id:</p>
              <p>{blog?.id?.slice(0, -10)}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Blog Title:</p>
              <p>{blog?.blog_title}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Blog Author:</p>
              <p>{blog?.blog_author}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Blog Category:</p>
              <p>{blog?.category}</p>
            </article>
          </section>
        ))}
      {isOrder &&
        orders?.map((order: any, index: number) => (
          <section
            className="border border-gray-400 rounded-md w-full p-5"
            key={index}
          >
            <article className="flex gap-x-2">
              <p>Id:</p>
              <p>{order?.id?.slice(0, -10)}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Full Name:</p>
              <p>{order.fullName}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Total Price:</p>
              <p>{order?.total_price}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Total Product:</p>
              <p>{order.total_product}</p>
            </article>
            <article className="flex gap-x-2">
              <p>Order Status:</p>
              <p>{order.order_status}</p>
            </article>
            <Dialog>
              <DialogTrigger
                onClick={() => setSelectedOrderId(order.id)}
                className="bg-black text-white p-2 rounded-md mt-2"
              >
                Update
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col items-start gap-y-[6px] w-full">
                        <Label htmlFor="category" className="text-right">
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
                                      String(order?.order_status).slice(1)
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
                          <Button type="button" onClick={() => reset()}>
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
          </section>
        ))}
    </main>
  );
};

export default ItemCard;
