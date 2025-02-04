import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { UnitType } from "@/data/buildingData";
import CostSheetDetails from "./CostSheetDetails";

interface CostSheetFormProps {
  unit: UnitType;
}

interface CustomerFormData {
  customerName: string;
  email: string;
  mobile: string;
}

const CostSheetForm = ({ unit }: CostSheetFormProps) => {
  const [showCostSheet, setShowCostSheet] = useState(false);
  const form = useForm<CustomerFormData>();

  const onSubmit = (data: CustomerFormData) => {
    setShowCostSheet(true);
  };

  if (showCostSheet) {
    return <CostSheetDetails unit={unit} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter customer name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter mobile number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter email address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Next</Button>
      </form>
    </Form>
  );
};

export default CostSheetForm;