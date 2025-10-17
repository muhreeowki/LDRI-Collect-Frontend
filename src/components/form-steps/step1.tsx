"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// --- SCHEMA ---
const Step1Schema = z.object({
  Q_1_1: z.string({ required_error: "Please select an option." }),
  Q_1_2: z.string().optional(),
  Q_1_3: z.string().optional(),
  Q_1_4: z.string({
    required_error: "This field is required.",
  }),
  Q_1_5: z.string({ required_error: "This field is required." }),
  Q_1_5_a: z.string().optional(),
  Q_1_6: z.string().optional(),
  Q_1_7: z.string({ required_error: "This field is required." }),
});

export type Step1Data = z.infer<typeof Step1Schema>;

interface Step1Props {
  defaultValues?: Step1Data;
  onNext: (data: Step1Data) => void;
  //onBack: () => void;
}

export default function Step1Governance({
  defaultValues,
  onNext,
}: // onBack,
Step1Props) {
  const form = useForm<Step1Data>({
    resolver: zodResolver(Step1Schema),
    defaultValues: defaultValues || {},
  });

  const watchQ1_1 = form.watch("Q_1_1");
  const watchQ1_5 = form.watch("Q_1_5");

  const onSubmit = (data: Step1Data) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Q_1_1 */}
        <FormField
          control={form.control}
          name="Q_1_1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                1.1 - Does the county have a data strategy/policy/framework?
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.1.1.f">
                    No current county data strategy, policy, or framework
                    exists. [Foundational]
                  </SelectItem>
                  <SelectItem value="a.1.1.e">
                    A strategy exists but it is in draft [Emerging]
                  </SelectItem>
                  <SelectItem value="a.1.1.i">
                    A strategy exists and supports data use. [Intermediate]
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_1_2 - conditional */}
        {watchQ1_1 === "a.1.1.i" && (
          <FormField
            control={form.control}
            name="Q_1_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  1.2 - Describe the scenario in your county
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="a.1.2.1.f">
                      Recognizes importance of sex-disaggregated data [Emerging]
                    </SelectItem>
                    <SelectItem value="a.1.2.2.e">
                      Emphasizes collection & use of sex-disaggregated data
                      [Intermediate]
                    </SelectItem>
                    <SelectItem value="a.1.2.3.i">
                      Includes detailed gender data systems [Advanced]
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Q_1_3 */}
        <FormField
          control={form.control}
          name="Q_1_3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>1.3 - Additional commentary (optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Add your comments here..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 1.4 */}
        <FormField
          control={form.control}
          name="Q_1_4"
          render={({ field }) => (
            <FormItem>
              <FormLabel>1.4 - CIDP priority for data/gender data</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.1.4.1.f">
                    CIDP does not mention data. [Foundational]
                  </SelectItem>
                  <SelectItem value="a.1.4.2.e">
                    Mentions data in some programs. [Emerging]
                  </SelectItem>
                  <SelectItem value="a.1.4.3.i">
                    Mentions data in most programs. [Intermediate]
                  </SelectItem>
                  <SelectItem value="a.1.4.4.a">
                    Mentions data including gender data across programs.
                    [Advanced]
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_1_5 */}
        <FormField
          control={form.control}
          name="Q_1_5"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                1.5 - Does the county have a gender equality policy?
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0_1">No policy exists</SelectItem>
                  <SelectItem value="1">A policy exists</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_1_5_a - optional text */}
        {watchQ1_5 === "1" && (
          <FormField
            control={form.control}
            name="Q_1_5_a"
            render={({ field }) => (
              <FormItem>
                <FormLabel>1.5.a - Title of gender policy document</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. Gender Equality Policy 2022"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Q_1_6 - conditional */}
        {watchQ1_5 === "1" && (
          <FormField
            control={form.control}
            name="Q_1_6"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  1.6 - To what extent does it recognize gender data?
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="a.1.6.1.e">
                      Does not recognize gender data. [Emerging]
                    </SelectItem>
                    <SelectItem value="a.1.6.2.i">
                      Recognizes importance of gender data. [Intermediate]
                    </SelectItem>
                    <SelectItem value="a.1.6.3.a">
                      Includes gender-data strategy. [Advanced]
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Q_1_7 */}
        <FormField
          control={form.control}
          name="Q_1_7"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                1.7 - Is there political support for gender data?
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.1.7.f">
                    No high-level support. [Foundational]
                  </SelectItem>
                  <SelectItem value="a.1.7.e">
                    Some discussions, no policy impact. [Emerging]
                  </SelectItem>
                  <SelectItem value="a.1.7.i">
                    Moderate support, limited impact. [Intermediate]
                  </SelectItem>
                  <SelectItem value="a.1.7.a">
                    Substantial support, meaningful impact. [Advanced]
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button size={"lg"} type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
