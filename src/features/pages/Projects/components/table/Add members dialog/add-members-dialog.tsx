import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import { axios } from "@/hooks/use-axios";
import { getMemOfAProjEndp } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ErrorHandler from "@/components/error/ErrorHandler";
import { OwnerT } from "@/lib/types";
import MembersList from "./members-list";

export default function AddMembersDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const emailRef = useRef<HTMLInputElement>(null);
  const [loadingToSendEmail, setLoadingToSendEmail] = useState(false);
  const submitEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef.current) {
      console.log(emailRef.current.value);
      setLoadingToSendEmail(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            Add new mwmbers to this project via email.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitEmail}>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="email" className="sr-only">
                Member Email
              </Label>
              <Input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="Member Email..."
              />
            </div>
            <Button type="submit" loading={loadingToSendEmail}>
              Add
            </Button>
          </div>
        </form>
        <MembersList />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
