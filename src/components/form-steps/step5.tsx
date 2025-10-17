"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Step5Schema = z.object({
  Q_5_1: z.string({ required_error: "Required" }),
  Q_5_2: z.string({ required_error: "Required" }),
  Q_5_2_a: z.string().optional(),
  Q_5_3: z.string({ required_error: "Required" }),
  // Q_5_3_a: z.string().optional(),
  Q_5_4: z.string({ required_error: "Required" }),
  Q_5_5: z.string({ required_error: "Required" }),
});

export type Step5Data = z.infer<typeof Step5Schema>;

interface Step5Props {
  defaultValues?: Step5Data;
  onNext: (data: Step5Data) => void;
  onBack: () => void;
}

export default function Step5Stakeholders({
  defaultValues,
  onNext,
  onBack,
}: Step5Props) {
  const form = useForm<Step5Data>({
    resolver: zodResolver(Step5Schema),
    defaultValues: defaultValues || {},
  });

  const onSubmit = (data: Step5Data) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Q_5_1 */}
        <FormField
          control={form.control}
          name="Q_5_1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>5.1 - Mechanism for consulting data users?</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.5.1.f">
                    No mechanism [Foundational]
                  </SelectItem>
                  <SelectItem value="a.5.1.e">
                    Consultation on case-by-case basis [Emerging]
                  </SelectItem>
                  <SelectItem value="a.5.1.i">
                    Ad hoc working groups [Intermediate]
                  </SelectItem>
                  <SelectItem value="a.5.1.a">
                    Established consultative body [Advanced]
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_5_2 */}
        <FormField
          control={form.control}
          name="Q_5_2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                5.2 - Stakeholder engagement in data planning?
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.5.2.f">
                    No stakeholder engagement [Foundational]
                  </SelectItem>
                  <SelectItem value="a.5.2.e">
                    Limited/occasional engagement [Emerging]
                  </SelectItem>
                  <SelectItem value="a.5.2.i">
                    Regular engagement with some stakeholders [Intermediate]
                  </SelectItem>
                  <SelectItem value="a.5.2.a">
                    Regular engagement with a range of stakeholders [Advanced]
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_5_2_a */}
        <FormField
          control={form.control}
          name="Q_5_2_a"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                5.2.a - Stakeholder types or details (optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g. Civil society, academia, media..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_5_3 */}
        <FormField
          control={form.control}
          name="Q_5_3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>5.3 - Engagement in statistical activities?</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.5.3.f">
                    No engagement [Foundational]
                  </SelectItem>
                  <SelectItem value="a.5.3.e">
                    Stakeholders provide feedback only [Emerging]
                  </SelectItem>
                  <SelectItem value="a.5.3.i">
                    Occasional collaboration in activities [Intermediate]
                  </SelectItem>
                  <SelectItem value="a.5.3.a">
                    Active collaboration in collection/analysis [Advanced]
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_5_3_a */}
        {/* <FormField */}
        {/*   control={form.control} */}
        {/*   name="Q_5_3_a" */}
        {/*   render={({ field }) => ( */}
        {/*     <FormItem> */}
        {/*       <FormLabel> */}
        {/*         5.3.a - Additional notes on engagement (optional) */}
        {/*       </FormLabel> */}
        {/*       <FormControl> */}
        {/*         <Textarea {...field} placeholder="Describe involvement..." /> */}
        {/*       </FormControl> */}
        {/*       <FormMessage /> */}
        {/*     </FormItem> */}
        {/*   )} */}
        {/* /> */}

        {/* Q_5_4 */}
        <FormField
          control={form.control}
          name="Q_5_4"
          render={({ field }) => (
            <FormItem>
              <FormLabel>5.4 - Gender-related CSO involvement?</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.5.4.f">
                    Not involved [Foundational]
                  </SelectItem>
                  <SelectItem value="a.5.4.e">
                    Occasionally consulted [Emerging]
                  </SelectItem>
                  <SelectItem value="a.5.4.i">
                    Consulted for some activities [Intermediate]
                  </SelectItem>
                  <SelectItem value="a.5.4.a">
                    Active involvement in planning/use [Advanced]
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_5_5 */}
        <FormField
          control={form.control}
          name="Q_5_5"
          render={({ field }) => (
            <FormItem>
              <FormLabel>5.5 - Inclusivity of engagement approach?</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.5.5.f">
                    Not inclusive [Foundational]
                  </SelectItem>
                  <SelectItem value="a.5.5.e">
                    Inclusive in intent [Emerging]
                  </SelectItem>
                  <SelectItem value="a.5.5.i">
                    Inclusive in practice for some [Intermediate]
                  </SelectItem>
                  <SelectItem value="a.5.5.a">
                    Inclusive in practice for many [Advanced]
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button size={"lg"} variant="outline" type="button" onClick={onBack}>
            Back
          </Button>
          <Button size={"lg"} type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
