"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/button";

function TheDialog(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const router = useRouter();
  
  const handleSubmit = async () => {
    // Delete account logic here
    await console.log("Deleted account");
    // Redirect
    router.push("/");
    closeDialog();
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={openDialog} className="mt-4 bg-destructive hover:bg-destructive-dark text-white rounded-md px-4 py-2 transition-colors">
            Delete Account
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] rounded">
          <DialogHeader>
            <DialogTitle>Delete your account</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p className="color-slate-400 text-sm text-justify">
              This action is irreversible. Once you delete your account, all
              of your data, including your profile, and user data will be
              permanently removed and cannot be recovered.
            </p>
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={closeDialog} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleSubmit}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

TheDialog.propTypes = {};

export default TheDialog;