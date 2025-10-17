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

const Step2Schema = z.object({
  Q_2_1: z.string({ required_error: "Required" }),
  Q_2_2: z.string().optional(),
  Q_2_2_a: z.string().optional(),
  Q_2_3: z.string({ required_error: "Required" }),
  Q_2_3_a: z.string().optional(),
  Q_2_4: z.string({ required_error: "Required" }),
  Q_2_4_a: z.string().optional(),
});

export type Step2Data = z.infer<typeof Step2Schema>;

interface Step2Props {
  defaultValues?: Step2Data;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

export default function Step2Finance({
  defaultValues,
  onNext,
  onBack,
}: Step2Props) {
  const form = useForm<Step2Data>({
    resolver: zodResolver(Step2Schema),
    defaultValues: defaultValues || {},
  });

  const watchQ21 = form.watch("Q_2_1");

  const onSubmit = (data: Step2Data) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Q_2_1 */}
        <FormField
          control={form.control}
          name="Q_2_1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                2.1 - Is there a proposed budget for statistical activities?
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0_1">No proposed budget</SelectItem>
                  <SelectItem value="1">
                    Budget exists but no funds for gender data
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_2_2 - conditional */}
        {watchQ21 === "1" && (
          <FormField
            control={form.control}
            name="Q_2_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  2.2 - To what extent does the budget integrate gender data
                  activities?
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="a.2.2.e_1">
                      Limited funding for strengthening gender data [Emerging]
                    </SelectItem>
                    <SelectItem value="a.2.2.i_1">
                      Funding for specific gender data programs [Intermediate]
                    </SelectItem>
                    <SelectItem value="a.2.2.a">
                      Gender data integrated throughout [Advanced]
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Q_2_2_a - optional */}
        {watchQ21 === "1" && (
          <FormField
            control={form.control}
            name="Q_2_2_a"
            render={({ field }) => (
              <FormItem>
                <FormLabel>2.2.a - Additional commentary (optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Add comments or links..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Q_2_3 */}
        <FormField
          control={form.control}
          name="Q_2_3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                2.3 - Are gender data program needs met by funding?
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.2.3.f">
                    No funds allocated [Foundational]
                  </SelectItem>
                  <SelectItem value="a.2.3.e">
                    Some needs met [Emerging]
                  </SelectItem>
                  <SelectItem value="a.2.3.i">
                    More than half of needs met [Intermediate]
                  </SelectItem>
                  <SelectItem value="a.2.3.a">
                    Full scope of needs met [Advanced]
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_2_3_a */}
        <FormField
          control={form.control}
          name="Q_2_3_a"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                2.3.a - Commentary on budget provisions (optional)
              </FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Explain budget adequacy..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_2_4 */}
        <FormField
          control={form.control}
          name="Q_2_4"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                2.4 - Sources of financing for gender-data programs?
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="a.2.4.f">No funds allocated</SelectItem>
                  <SelectItem value="a.2.4.e">
                    Mostly external support (70–100%)
                  </SelectItem>
                  <SelectItem value="a.2.4.i">
                    Mix of domestic & external (30–70%)
                  </SelectItem>
                  <SelectItem value="a.2.4.a">
                    Primarily domestic (0–30% external)
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q_2_4_a */}
        <FormField
          control={form.control}
          name="Q_2_4_a"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                2.4.a - Commentary on financing sources (optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Domestic vs donor support..."
                />
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
