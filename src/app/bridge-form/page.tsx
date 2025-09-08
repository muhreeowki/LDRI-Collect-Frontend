'use client';

import MultiStepForm from '@/components/multi-step-form';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { verifyDelegate } from '@/actions/delegate-actions';
import { toast } from 'sonner';

const codeSchema = z.object({
  formSubmissionCode: z.string().min(6, 'Code must be at least 6 characters'),
});

const BridgeFormPage = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const form = useForm({
    resolver: zodResolver(codeSchema),
    defaultValues: { formSubmissionCode: '' },
  });

  const onSubmit = async (data: FormData) => {
    // Replace with your code verification logic
    const resp = await verifyDelegate(data);
    console.log('Response:', resp);
    if (resp.success) {
      toast.success('Access granted! You can now submit the form.');
      setAccessGranted(true);
    } else {
      form.setError('formSubmissionCode', {
        message: resp.error || 'Invalid code',
      });
    }
  };

  if (!accessGranted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login to submit the form</CardTitle>
            <CardDescription>
              Enter the code sent to your email to gain access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form action={onSubmit} className="w-full space-y-6 py-4">
                <FormField
                  control={form.control}
                  name="formSubmissionCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter the code sent to your email</FormLabel>
                      <Input {...field} type="text" autoFocus />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <MultiStepForm formSubmissionCode={form.getValues('formSubmissionCode')} />
  );
};

export default BridgeFormPage;
