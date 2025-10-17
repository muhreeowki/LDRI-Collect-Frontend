"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import { onboard } from "@/actions/auth";
import { Navbar } from "@/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const onboardingFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  sex: z.string().min(1, "Sex is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  nationalId: z.string().min(1, "National ID is required"),
  county: z.string().min(1, "County is required"),
  position: z.string().min(2, "Position is required"),
  department: z.string().min(1, "Department is required"),
  authorizationFormLink: z
    .string({ required_error: "Link to authorization form is required" })
    .url("Invalid URL format"),
});

export default function MyForm() {
  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
  });

  async function onSubmit(form: FormData) {
    try {
      const response = await onboard(form);
      if (response.success === false) {
        toast.error(response.error || "Failed to onboard. Please try again.");
        return;
      } else {
        // Gate success page via cookie; middleware checks `ldriSuccess`
        document.cookie = "ldriSuccess=true; path=/; max-age=" + 60 * 10;
        window.location.href = "/onboarding/success";
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="min-h-max flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Fill in the form below to create your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form action={onSubmit} className="space-y-8 max-w-3xl">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name."
                          type="text"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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

                <div className="grid grid-cols-6 xl:grid-cols-12 space-y-8 xl:space-y-0 xl:gap-8">
                  <div className="col-span-6">
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
                              <SelectTrigger className="w-full">
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
                  </div>
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone number</FormLabel>
                          <FormControl>
                            <PhoneInput
                              className="w-full"
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

                <div className="grid grid-cols-6 xl:grid-cols-12 space-y-8 xl:space-y-0 xl:gap-8">
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
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select your county." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="embu">Embu</SelectItem>
                              <SelectItem value="homabay">Homa Bay</SelectItem>
                              <SelectItem value="machakos">Machakos</SelectItem>
                              <SelectItem value="muranga">
                                Murang&apos;a
                              </SelectItem>
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

                <div className="grid grid-cols-6 xl:grid-cols-12 space-y-8 xl:space-y-0 xl:gap-8">
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

                <FormField
                  control={form.control}
                  name="authorizationFormLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Authorization Form</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter link to authorization form."
                          type="url"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a link to an authorization form from your
                        superior. Make sure the link is publicly accessible.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <Button
                  size={"lg"}
                  type="submit"
                  className="float-end text-base"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
