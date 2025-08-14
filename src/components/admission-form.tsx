
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  applicantName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "You need to select a gender.",
  }),
  parentName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  parentEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  parentPhone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  appliedClass: z.string({
    required_error: "Please select a class.",
  }),
  previousSchool: z.string().optional(),
  comments: z.string().optional(),
});

interface DateInputProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  const [day, setDay] = useState(value ? String(value.getDate()) : "");
  const [month, setMonth] = useState(value ? String(value.getMonth() + 1) : "");
  const [year, setYear] = useState(value ? String(value.getFullYear()) : "");

  const dayRef = React.useRef<HTMLInputElement>(null);
  const monthRef = React.useRef<HTMLInputElement>(null);
  const yearRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const numDay = parseInt(day, 10);
    const numMonth = parseInt(month, 10);
    const numYear = parseInt(year, 10);

    if (
      !isNaN(numDay) && !isNaN(numMonth) && !isNaN(numYear) &&
      String(numYear).length === 4 && numMonth >= 1 && numMonth <= 12 && numDay >= 1 && numDay <= 31
    ) {
      onChange(new Date(numYear, numMonth - 1, numDay));
    }
  }, [day, month, year, onChange]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    maxLength: number,
    nextRef?: React.RefObject<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (value.length <= maxLength) {
      setter(value);
      if (value.length === maxLength && nextRef?.current) {
        nextRef.current.focus();
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <Input
        ref={dayRef}
        placeholder="DD"
        value={day}
        onChange={(e) => handleInputChange(e, setDay, 2, monthRef)}
        className="w-1/3 text-center bg-background"
      />
      <Input
        ref={monthRef}
        placeholder="MM"
        value={month}
        onChange={(e) => handleInputChange(e, setMonth, 2, yearRef)}
        className="w-1/3 text-center bg-background"
      />
      <Input
        ref={yearRef}
        placeholder="YYYY"
        value={year}
        onChange={(e) => handleInputChange(e, setYear, 4)}
        className="w-1/3 text-center bg-background"
      />
    </div>
  );
};

export function AdmissionForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      previousSchool: "",
      comments: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const admissionsRef = ref(db, 'admissionSubmissions');
      const newAdmissionRef = push(admissionsRef);
      await set(newAdmissionRef, {
        ...values,
        dob: format(values.dob, "yyyy-MM-dd"),
        status: 'pending',
        submittedAt: new Date().toISOString(),
      });

      // Redirect to thank you page
      router.push('/admissions/thank-you');

    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="max-w-4xl mx-auto bg-secondary/30 border-border/20">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold font-headline">
          Admission Application Form
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Please fill out the form carefully. All fields marked with * are
          required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold font-headline border-b pb-2">
                Applicant Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="applicantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., John Doe"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth *</FormLabel>
                      <FormControl>
                        <DateInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center space-x-6"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold font-headline border-b pb-2">
                Parent/Guardian Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="parentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Jane Doe"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parentEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., jane.doe@email.com"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="parentPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., +1 555 123 4567"
                        {...field}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold font-headline border-b pb-2">
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="appliedClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Applying for Class *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select a class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="playgroup">Playgroup</SelectItem>
                          <SelectItem value="nursery">Nursery</SelectItem>
                          <SelectItem value="prep">Prep</SelectItem>
                          <SelectItem value="class1">Class 1</SelectItem>
                          <SelectItem value="class2">Class 2</SelectItem>
                          <SelectItem value="class3">Class 3</SelectItem>
                          <SelectItem value="class4">Class 4</SelectItem>
                          <SelectItem value="class5">Class 5</SelectItem>
                          <SelectItem value="class6">Class 6</SelectItem>
                          <SelectItem value="class7">Class 7</SelectItem>
                          <SelectItem value="class8">Class 8</SelectItem>
                          <SelectItem value="class9">Class 9</SelectItem>
                          <SelectItem value="class10">Class 10</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previousSchool"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous School (if any)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., ABC School"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold font-headline border-b pb-2">
                Additional Information
              </h3>
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Comments (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please share any other information you think is relevant."
                        className="bg-background"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-center pt-6">
              <Button type="submit" size="lg" className="w-full max-w-xs">
                Submit Application
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
