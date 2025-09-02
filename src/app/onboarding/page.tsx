'use client';

import { useActionState, useState } from 'react';
import { toast } from 'sonner';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PhoneInput } from '@/components/ui/phone-input';
import { CloudUpload, Paperclip } from 'lucide-react';
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/ui/file-upload';
import { onboard } from '@/actions/auth';
// import {File} from 'buffer';

export const onboardingFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  sex: z.string().min(1, 'Sex is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  nationalId: z.string().min(1, 'National ID is required'),
  county: z.string().min(1, 'County is required'),
  position: z.string().min(2, 'Position is required'),
  department: z.string().min(1, 'Department is required'),
});

export default function MyForm() {
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };
  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
  });

  async function onSubmit(form: FormData) {
    try {
      const response = await onboard(form);
      if (response.success === false) {
        toast.error(response.error || 'Failed to onboard. Please try again.');
        return;
      } else {
        // Gate success page via cookie; middleware checks `ldriSuccess`
        document.cookie = 'ldriSuccess=true; path=/; max-age=' + 60 * 10;
        window.location.href = '/onboarding/success';
      }
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form action={onSubmit} className="space-y-8 max-w-3xl mx-auto py-10">
        <h1 className="text-2xl font-bold text-center mb-6"> Create Account</h1>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel></FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name." type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                {...field}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="intersex">Intersex</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address."
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder="Enter your phone number."
                      {...field}
                      defaultCountry="KE"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your national Id number."
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>County</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your county." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="embu">Embu</SelectItem>
                      <SelectItem value="homabay">Homa Bay</SelectItem>
                      <SelectItem value="machakos">Machakos</SelectItem>
                      <SelectItem value="muranga">Murang&apos;a</SelectItem>
                      <SelectItem value="nairobi">Nairobi</SelectItem>
                      <SelectItem value="tharakanithi">
                        Tharaka Nithi
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your position."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Chief Officer, Director, Deputy Director etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department / Sector</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Department / Sector."
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/**/}
        {/* <Controller */}
        {/*   control={form.control} */}
        {/*   name="authorizationFile" */}
        {/*   render={({ field, fieldState }) => ( */}
        {/*     <FormItem> */}
        {/*       <FormLabel>Upload Official Authorization</FormLabel> */}
        {/*       <FormControl> */}
        {/*         <FileUploader */}
        {/*           {...field} */}
        {/*           onValueChange={(files) => */}
        {/*             field.onChange(files != null && files[0] ? files[0] : null) */}
        {/*           } */}
        {/*           dropzoneOptions={dropZoneConfig} */}
        {/*           className="relative bg-background rounded-lg p-2" */}
        {/*         > */}
        {/*           <FileInput */}
        {/*             id="fileInput" */}
        {/*             className="outline-dashed outline-1 outline-slate-500" */}
        {/*           > */}
        {/*             <div className="flex items-center justify-center flex-col p-8 w-full "> */}
        {/*               <CloudUpload className="text-gray-500 w-10 h-10" /> */}
        {/*               <p className="mb-1 text-sm text-gray-500 dark:text-gray-400"> */}
        {/*                 <span className="font-semibold">Click to upload</span> */}
        {/*                 &nbsp; or drag and drop */}
        {/*               </p> */}
        {/*               <p className="text-xs text-gray-500 dark:text-gray-400"> */}
        {/*                 SVG, PNG, JPG or GIF */}
        {/*               </p> */}
        {/*             </div> */}
        {/*           </FileInput> */}
        {/*           <FileUploaderContent> */}
        {/*             {field.value && ( */}
        {/*               <FileUploaderItem index={0}> */}
        {/*                 <Paperclip className="h-4 w-4 stroke-current" /> */}
        {/*                 <span>{field.value.name}</span> */}
        {/*               </FileUploaderItem> */}
        {/*             )} */}
        {/*           </FileUploaderContent> */}
        {/*         </FileUploader> */}
        {/*       </FormControl> */}
        {/**/}
        {/*       <FormMessage /> */}
        {/*     </FormItem> */}
        {/*   )} */}
        {/* /> */}
        <Button type="submit" className="float-end">
          Submit
        </Button>
      </form>
    </Form>
  );
}
