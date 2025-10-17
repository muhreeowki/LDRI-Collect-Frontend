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

const Step4Schema = z.object({
  Q_4_1: z.string({ required_error: "Required" }),
  Q_4_1_a: z.string({ required_error: "Required" }),
  Q_4_2: z.string({ required_error: "Required" }),
  Q_4_2_a: z.string().optional(),
  Q_4_3: z.string({ required_error: "Required" }),
  Q_4_4: z.string({ required_error: "Required" }),
  Q_4_4_a: z.string().optional(),
  Q_4_5: z.string({ required_error: "Required" }),
  Q_4_5_a: z.string().optional(),
  Q_4_6: z.string({ required_error: "Required" }),
  Q_4_6_a: z.string().optional(),
  Q_4_7: z.string({ required_error: "Required" }),
  Q_4_7_a: z.string().optional(),
  Q_4_8: z.string({ required_error: "Required" }),
  Q_4_8_a: z.string().optional(),
  Q_4_9: z.string({ required_error: "Required" }),
  Q_4_9_a: z.string().optional(),
  Q_4_10: z.string({ required_error: "Required" }),
  Q_4_10_a: z.string().optional(),
});

export type Step4Data = z.infer<typeof Step4Schema>;

interface Step4Props {
  defaultValues?: Step4Data;
  onNext: (data: Step4Data) => void;
  onBack: () => void;
}

export default function Step4Infrastructure({
  defaultValues,
  onNext,
  onBack,
}: Step4Props) {
  const form = useForm<Step4Data>({
    resolver: zodResolver(Step4Schema),
    defaultValues: defaultValues || {},
  });

  const onSubmit = (data: Step4Data) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {[
          {
            name: "Q_4_1",
            label:
              "4.1 - What is the most important data your department produces?",
          },
          {
            name: "Q_4_1_a",
            label: "4.1.a - Frequency of production",
            options: [
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
              { value: "quarterly", label: "Quarterly" },
              { value: "annually", label: "Annually" },
              { value: "adhoc", label: "Ad hoc" },
            ],
          },
          {
            name: "Q_4_2",
            label: "4.2 - Type of disaggregation",
            options: [
              {
                value: "a.4.2.f",
                label: "Broad categories only [Foundational]",
              },
              { value: "a.4.2.e", label: "Includes sex/age [Emerging]" },
              {
                value: "a.4.2.i",
                label: "Multiple disaggregations [Intermediate]",
              },
              {
                value: "a.4.2.a",
                label: "Wide range with intersectional factors [Advanced]",
              },
            ],
          },
          { name: "Q_4_2_a", label: "4.2.a - Additional commentary" },
          {
            name: "Q_4_3",
            label:
              "4.3 - Frequency of producing data at desired disaggregation",
            options: [
              { value: "a.4.3.f", label: "Rarely [Foundational]" },
              { value: "a.4.3.e", label: "Some of the time [Emerging]" },
              { value: "a.4.3.i", label: "Most of the time [Intermediate]" },
              { value: "a.4.3.a", label: "Always [Advanced]" },
            ],
          },
          {
            name: "Q_4_4",
            label: "4.4 - Use of software for data",
            options: [
              { value: "a.4.4.f", label: "No special software [Foundational]" },
              {
                value: "a.4.4.e",
                label: "Not integrated, not funded [Emerging]",
              },
              {
                value: "a.4.4.i",
                label: "Integrated but donor funded [Intermediate]",
              },
              {
                value: "a.4.4.a",
                label: "Fully integrated and funded [Advanced]",
              },
            ],
          },
          { name: "Q_4_4_a", label: "4.4.a - Commentary on software" },
          {
            name: "Q_4_5",
            label: "4.5 - Usage of computers by staff",
            options: [
              { value: "a.4.5.f", label: "Personal computers [Foundational]" },
              { value: "a.4.5.e", label: "<50% government owned [Emerging]" },
              {
                value: "a.4.5.i",
                label: ">50% government owned [Intermediate]",
              },
              { value: "a.4.5.a", label: "All government owned [Advanced]" },
            ],
          },
          {
            name: "Q_4_5_a",
            label: "4.5.a - Commentary on computer ownership",
          },
          {
            name: "Q_4_6",
            label: "4.6 - Storage of produced data",
            options: [
              { value: "a.4.6.f", label: "USB/removable drive" },
              { value: "a.4.6.e", label: "Cloud service" },
              { value: "a.4.6.i", label: "Gov file server" },
              { value: "a.4.6.a", label: "File server + portal" },
              { value: "a.4.6.x", label: "Other" },
            ],
          },
          {
            name: "Q_4_6_a",
            label: "4.6.a - Commentary on storage of produced data",
          },
          {
            name: "Q_4_7",
            label: "4.7 - Storage of received data",
            options: [
              { value: "a.4.6.f.1", label: "Printed" },
              { value: "a.4.6.f.2", label: "Email/staff computer" },
              { value: "a.4.6.f.3", label: "USB/removable" },
              { value: "a.4.6.e", label: "Cloud" },
              { value: "a.4.6.i", label: "Gov file server" },
              { value: "a.4.6.a", label: "File server + portal" },
              { value: "a.4.6.x", label: "Other" },
            ],
          },
          {
            name: "Q_4_7_a",
            label: "4.7.a - Commentary on received data storage",
          },
          {
            name: "Q_4_8",
            label: "4.8 - Sharing data with other departments",
            options: [
              { value: "a.4.7.f", label: "Manual/basic ICT [Foundational]" },
              { value: "a.4.7.e", label: "Standardized formats [Emerging]" },
              { value: "a.4.7.i", label: "APIs/cloud tools [Intermediate]" },
              {
                value: "a.4.7.a",
                label: "Real-time dashboards/APIs [Advanced]",
              },
            ],
          },
          { name: "Q_4_8_a", label: "4.8.a - Commentary on data sharing" },
          {
            name: "Q_4_9",
            label: "4.9 - Ease of sharing data",
            options: [
              { value: "a.4.8.f", label: "1 - No sharing" },
              { value: "a.4.8.f.1", label: "2 - Manual only [Foundational]" },
              { value: "a.4.8.e", label: "3 - Basic digital tools [Emerging]" },
              {
                value: "a.4.8.i",
                label: "4 - Structured but not real-time [Intermediate]",
              },
              { value: "a.4.8.a", label: "5 - Fully integrated [Advanced]" },
            ],
          },
          {
            name: "Q_4_9_a",
            label: "4.9.a - Commentary on data sharing capacity",
          },
          {
            name: "Q_4_10",
            label: "4.10 - Public data sharing method",
            options: [
              {
                value: "a.4.9.f",
                label: "Printed/PDFs on request [Foundational]",
              },
              { value: "a.4.9.e", label: "Gov website PDFs [Emerging]" },
              {
                value: "a.4.9.i",
                label: "Open formats + dashboards [Intermediate]",
              },
              {
                value: "a.4.9.a",
                label: "Open portals, APIs, feedback [Advanced]",
              },
            ],
          },
          { name: "Q_4_10_a", label: "4.10.a - Commentary on public sharing" },
        ].map(({ name, label, options }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as keyof Step4Data}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                {options ? (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <FormControl>
                    <Textarea {...field} placeholder="Add comments..." />
                  </FormControl>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

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
