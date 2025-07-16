"use client";
import React, { useState } from "react";
import HomePageBanner from "../customComponents/HomePageBanner";
import { Button } from "@/components/ui/button";
import UserProfileForm from "../customComponents/UserProfileForm";
import { useGetCurrentUserQuery } from "@/redux/api/userApi";
import { useSignoutMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useGetOrderCountByEmailQuery } from "@/redux/api/orderApi";
import UserOrder from "../customComponents/UserOrder";

const UserProfile = () => {
  const { data: userData, isLoading } = useGetCurrentUserQuery(null);
  const { data: orderData } = useGetOrderCountByEmailQuery(
    userData?.data?.email
  );

  const [activeTab, setActiveTab] = useState("dashboard");
  const [signout] = useSignoutMutation();
  const router = useRouter();
  const { toast } = useToast();
  const handleSignout = async () => {
    try {
      await signout(null).unwrap();
      router.push("/", { scroll: false });
      window.location.reload();
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Error",
        description: error.data.message,
      });
    }
  };
  const orderStatuses = [
    { status: "pending", label: "Pending" },
    { status: "processing", label: "Processing" },
    { status: "picked", label: "Picked" },
    { status: "complete", label: "Complete" },
  ];
  return (
    <main className="flex flex-col items-center">
      <section className="w-full">
        <HomePageBanner
          isHome={false}
          title="My Account"
          from="Home"
          to="My Account"
        />
      </section>
      <section className="flex flex-col md:flex-row md:gap-x-5 gap-y-5 py-20 px-10 w-full md:w-[90%] lg:w-3/4 xl:w-1/2">
        <section className="grid grid-cols-2 md:flex md:flex-col gap-4">
          <Button
            className={` shadow-md ${
              activeTab === "dashboard"
                ? "bg-orange-500 hover:bg-orange-500"
                : "bg-white hover:bg-white text-black"
            } `}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </Button>
          <Button
            className={`shadow-md ${
              activeTab === "profile"
                ? "bg-orange-500 hover:bg-orange-500"
                : "bg-white hover:bg-white text-black"
            } `}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </Button>
          <Button
            className={`shadow-md ${
              activeTab === "order"
                ? "bg-orange-500 hover:bg-orange-500"
                : "bg-white hover:bg-white text-black"
            } `}
            onClick={() => setActiveTab("order")}
          >
            My Order
          </Button>
          <Button
            className={`shadow-md ${
              activeTab === "setting"
                ? "bg-orange-500 hover:bg-orange-500"
                : "bg-white hover:bg-white text-black"
            } `}
            onClick={() => setActiveTab("setting")}
          >
            Account Setting
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="shadow-md bg-white hover:bg-white text-black">
                Sign out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[300px] sm:w-full">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to sign out?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-orange-500 hover:bg-orange-500"
                  onClick={handleSignout}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
        <section className="w-full shadow-md p-5 sm:p-10 bg-white">
          {activeTab === "dashboard" ? (
            <section className="flex flex-col gap-y-8 items-center">
              <p className="text-lg sm:text-2xl font-semibold">
                Hi {userData?.data?.first_name} {userData?.data?.last_name}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                {orderData?.data && (
                  <>
                    {orderStatuses.map((statusItem, index) => {
                      const statusObj = orderData.data.find((obj: any) =>
                        obj.hasOwnProperty(statusItem.status)
                      );
                      const count = statusObj
                        ? statusObj[statusItem.status]
                        : 0;

                      return (
                        <article
                          key={index}
                          className="border border-gray-200 p-6 flex flex-col items-center justify-center"
                        >
                          <p className="text-4xl font-semibold text-gray-400">
                            {count}
                          </p>
                          <p className="text-1xl font-semibold text-gray-400">
                            {statusItem.label}
                          </p>
                        </article>
                      );
                    })}
                  </>
                )}
              </div>
            </section>
          ) : activeTab === "profile" ? (
            <UserProfileForm />
          ) : activeTab === "order" ? (
            <UserOrder userEmail={userData?.data?.email} />
          ) : (
            activeTab === "setting" && (
              <section className="text-gray-400">
                <h2 className="text-2xl font-semibold text-black pb-5">
                  Shipping Address
                </h2>
                <article className="flex gap-x-2">
                  <p>First Name:</p>
                  <p>{userData?.data?.first_name}</p>
                </article>
                <article className="flex gap-x-2">
                  <p>Last Name:</p>
                  <p>{userData?.data?.last_name}</p>
                </article>
                <article className="flex gap-x-2">
                  <p>Country:</p>
                  <p>{userData?.data?.address?.country}</p>
                </article>
                <article className="flex gap-x-2">
                  <p>City:</p>
                  <p>{userData?.data?.address?.city}</p>
                </article>
                <article className="flex gap-x-2">
                  <p>State:</p>
                  <p>{userData?.data?.address?.state}</p>
                </article>
                <article className="flex gap-x-2">
                  <p>Zip Code:</p>
                  <p>{userData?.data?.address?.zip_code}</p>
                </article>
              </section>
            )
          )}
        </section>
      </section>
    </main>
  );
};

export default UserProfile;
