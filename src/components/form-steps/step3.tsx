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

const Step3Schema = z.object({
  Q_3_1: z.string({ required_error: "Required" }),
  Q_3_1_a: z.string().optional(),
  Q_3_2: z.string({ required_error: "Required" }),
  Q_3_2_a: z.string().optional(),
  Q_3_3: z.string({ required_error: "Required" }),
  Q_3_3_a: z.string().optional(),
});

export type Step3Data = z.infer<typeof Step3Schema>;

interface Step3Props {
  defaultValues?: Step3Data;
  onNext: (data: Step3Data) => void;
  onBack: () => void;
}

export default function Step3Technical({
  defaultValues,
  onNext,
  onBack,
}: Step3Props) {
  const form = useForm<Step3Data>({
    resolver: zodResolver(Step3Schema),
    defaultValues: defaultValues || {},
  });

  const onSubmit = (data: Step3Data) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Q_3_1 */}
        <FormField
          control={form.control}
          name="Q_3_1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                3.1 - Technical capacity of staff on gender data
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.3.1.f">
                    Insufficient capacity [Foundational]
                  </SelectItem>
                  <SelectItem value="a.3.1.e_1">
                    Adequate, but not focused on gender [Emerging]
                  </SelectItem>
                  <SelectItem value="a.3.1.i_1">
                    Can collect/analyze gender data [Intermediate]
                  </SelectItem>
                  <SelectItem value="a.3.1.a">
                    Advanced capacity in gender data [Advanced]
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_3_1_a */}
        <FormField
          control={form.control}
          name="Q_3_1_a"
          render={({ field }) => (
            <FormItem>
              <FormLabel>3.1.a - Commentary (optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Additional commentary..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_3_2 */}
        <FormField
          control={form.control}
          name="Q_3_2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                3.2 - Awareness of gender bias in statistics
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.3.2.f">
                    Bias not acknowledged [Foundational]
                  </SelectItem>
                  <SelectItem value="a.3.2.e">
                    Bias acknowledged but not addressed [Emerging]
                  </SelectItem>
                  <SelectItem value="a.3.2.i">
                    Steps taken to address bias [Intermediate]
                  </SelectItem>
                  <SelectItem value="a.3.2.a">
                    Systematic action/training [Advanced]
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_3_2_a */}
        <FormField
          control={form.control}
          name="Q_3_2_a"
          render={({ field }) => (
            <FormItem>
              <FormLabel>3.2.a - Commentary (optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Add explanation..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_3_3 */}
        <FormField
          control={form.control}
          name="Q_3_3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                3.3 - Methodological innovations for gender data
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.3.3.f">
                    Only traditional methods [Foundational]
                  </SelectItem>
                  <SelectItem value="a.3.3.e">
                    Traditional methods applied to gender data [Emerging]
                  </SelectItem>
                  <SelectItem value="a.3.3.i">
                    Exploring new sources/methods [Intermediate]
                  </SelectItem>
                  <SelectItem value="a.3.3.f_3">
                    Capable of using innovative methods [Advanced]
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_3_3_a */}
        <FormField
          control={form.control}
          name="Q_3_3_a"
          render={({ field }) => (
            <FormItem>
              <FormLabel>3.3.a - Commentary (optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Explain innovations..." />
              </FormControl>
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
