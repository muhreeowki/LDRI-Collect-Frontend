"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createDelegates } from "@/actions/delegate-actions";
import {
  delegateListSchema,
  DelegateListFormData,
} from "@/lib/validation-schemas";
import { PhoneInput } from "@/components/ui/phone-input";
import { Separator } from "@/components/ui/separator";

export interface Delegate {
  name: string;
  email: string;
  department: string;
}

export default function CreateDelegateDialog({
  triggerVariant = "default",
}: {
  triggerVariant?: "default" | "outline";
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const form = useForm<DelegateListFormData>({
    resolver: zodResolver(delegateListSchema),
    defaultValues: {
      delegates: [{ name: "", email: "", department: "", phone: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "delegates",
  });

  const onSubmit = async (data: DelegateListFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const formData = new FormData();
      formData.append("delegates", JSON.stringify(data.delegates));

      const result = await createDelegates(formData);

      if (result.success) {
        setSubmitMessage({
          type: "success",
          message: result.message ?? "success",
        });
        form.reset();
      } else {
        setSubmitMessage({
          type: "error",
          message: result.error ?? "an error occurred",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addDelegate = () => {
    append({ name: "", email: "", department: "", phone: "" });
  };

  const removeDelegate = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" variant={triggerVariant}>
          <Plus className="h-4 w-4" />
          Add Delegate{fields.length > 1 ? "s" : ""}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>
                Create New Delegate{fields.length > 1 ? "s" : ""}
              </DialogTitle>
              <DialogDescription>
                Add{" "}
                {fields.length > 1 ? "multiple delegates" : "a new delegate"} to
                your supervision. Fill in all the required information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {fields.map((field, index) => (
                <Card key={field.id} className="border-border p-4">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Delegate {index + 1}</CardTitle>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDelegate(index)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="grid space-y-4">
                    <FormField
                      control={form.control}
                      name={`delegates.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`delegates.${index}.department`}
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter department" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`delegates.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`delegates.${index}.phone`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <PhoneInput
                              placeholder="Enter your phone number."
                              defaultCountry="KE"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addDelegate}
                className="w-full gap-2 bg-transparent"
              >
                <UserPlus className="h-4 w-4" />
                Add Another Delegate
              </Button>
            </div>

            <Separator className="my-4" />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Creating..."
                  : `Create ${fields.length} Delegate${fields.length > 1 ? "s" : ""}`}
              </Button>
            </DialogFooter>
            {submitMessage && (
              <div
                className={`p-4 rounded-md ${
                  submitMessage.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitMessage.message}
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
