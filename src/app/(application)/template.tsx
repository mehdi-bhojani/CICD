"use client";

import AdminHeader from "@/components/Admin/Header/AdminHeader";
import SideNavBar from "@/components/Admin/SideNavbar/SideNavBar";
import UserProfileLogo from "@/components/Admin/UserProfile/UserProfileLogo";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import "../globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import UseNormalLinks from "@/shared/hooks/useNormalLinks";
import UseSocialLinks from "@/shared/hooks/useSocialLinks";
import useAppearanceData from "@/shared/hooks/useAppearenceData";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/store";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import UserProfile from "@/components/Admin/UserProfile/UserProfile";
import Loading from "@/components/Loading";
import UseVideoLinks from "@/shared/hooks/useVideoLinks";
import useSettingData from "@/shared/hooks/useSetting";
import { ThemeProvider } from "next-themes";
import UseProductLinks from "@/shared/hooks/useProductLinks";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userProfile, setUserProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [user, setUser] = useAtom(userAtom);
  const { data: session, status } = useSession();

  function toggleUserProfile() {
    setUserProfile((prevUserProfile) => !prevUserProfile);
    setShowSidebar(userProfile); // Toggle sidebar visibility based on userProfile state
    setShowHeader(userProfile); // Toggle header visibility based on userProfile state
  }

  const userid = session?.user?.email;
  const { data: normalLinksData, loading: normalLinksLoading } =
    UseNormalLinks(userid);
  const { data: socialLinksData, loading: socialLinksLoading } =
    UseSocialLinks(userid);
  const { data: appearanceData, loading: appearanceLoading } =
    useAppearanceData(userid);
  const { data: videoLinksData, loading: videoLinkLoading } =
    UseVideoLinks(userid);
  const { data: productLinksData, loading: productLinkLoading } =
    UseProductLinks(userid);
  const { data: settingData, loading: settingLoading } =
    useSettingData(userid);

  const currentUser = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(
      normalLinksLoading ||
      socialLinksLoading ||
      appearanceLoading ||
      videoLinkLoading ||
      settingLoading ||
      productLinkLoading
    );
  }, [
    normalLinksLoading,
    socialLinksLoading,
    appearanceLoading,
    videoLinkLoading,
    settingLoading,
    productLinkLoading,
  ]);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Toaster />
          {loading ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div className="min-h-screen flex flex-col">
              <header className=" adminheadercontainer hidden md:block  border-b ">
                <AdminHeader />
              </header>

              {showHeader && (
                <header className="adminheadercontainer block md:hidden border-b">
                  <AdminHeader />
                </header>
              )}

              <div className="flex flex-1 overflow-hidden admincontainer">
                <aside className="border-r hidden md:block">
                  <SideNavBar />
                </aside>

                {showSidebar && (
                  <aside className="border-r md:hidden">
                    <SideNavBar />
                  </aside>
                )}

                {/* Large screen */}
                <main className="flex-1 p-6 hidden md:flex">
                  <section className="flex-1 p-2">{children}</section>

                  <section className="flex-1 md:border-l md:block w-full m-h-screen">
                    <UserProfile
                      appearance={appearanceData}
                      normalLinks={normalLinksData}
                      socialLinks={socialLinksData}
                      videoLinks={videoLinksData}
                      productLinks={productLinksData}
                    />
                  </section>
                </main>

                {/* Small screen */}
                <main className="flex-1 flex overflow-hidden   md:hidden">
                  {userProfile ? (
                    <section className="flex-1 md:border-l md:block pt-6">
                      <UserProfile
                        appearance={appearanceData}
                        normalLinks={normalLinksData}
                        socialLinks={socialLinksData}
                        videoLinks={videoLinksData}
                        productLinks={productLinksData}
                      />
                      <UserProfileLogo />
                    </section>
                  ) : (
                    <section className="flex-1 p-2">{children}</section>
                  )}

                  <Button
                    onClick={toggleUserProfile}
                    className="fixed bottom-5 left-1/2 block md:hidden transform -translate-x-1/2"
                  >
                    {userProfile ? "Close" : "Preview"}
                  </Button>
                </main>
              </div>
            </div>
          )}
        </body>
      </html>
    </ThemeProvider>
  );
}
