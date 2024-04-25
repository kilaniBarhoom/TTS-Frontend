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
import MembersList from "./members-list";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AddMemberSchemaType, addMemberSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemberMutation } from "../../../api";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export default function AddMembersDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const emailRef = useRef<HTMLInputElement>(null);

  const form = useForm<AddMemberSchemaType>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      projectId: "",
      email: "",
    },
  });

  const { mutateAsync } = useMemberMutation();
  async function onSubmit(data: AddMemberSchemaType) {
    try {
      await mutateAsync({ data });
      form.reset();
    } catch (error: any) {
      console.log(error);

      //  toast({
      //    variant: "destructive",
      //    title: t("Error"),
      //    description:
      //      t(error?.response?.data?.message) || t("Something went wrong"),
      //  });
    }
  }
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId") || "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            Add new mwmbers to this project via email.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center space-x-2">
              <div className="grid gap-0">
                <div className="flex-1 gap-2 hidden">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete="projectId"
                            value={projectId}
                            readOnly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid flex-1 gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete="email"
                            error={!!form.formState.errors.email?.message}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit">Add</Button>
            </div>
          </form>
        </Form>
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
