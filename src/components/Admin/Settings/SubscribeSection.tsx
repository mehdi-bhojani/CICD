"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import GoogleSheetsButton from "./GoogleSheetsButton";
import PremiumCard from "@/components/premium/premium.card";

const FormSchema = z.object({
  subscribe: z.string().min(2, {
    message: "subscribe title  must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  webhookurl: z.string().min(2, {
    message: "url must be added",
  }),
  enabled: z.boolean(),
  collectPhoneNumber: z.boolean(),
});

interface myProps {
  setting: any;
  onUpdate: (setting:any) => void;
}

const SubscribeSection:React.FC<myProps> = (props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subscribe: props.setting?.subscription?.subscribe || "",
      description: props.setting?.subscription?.description || "",
      webhookurl: props.setting?.subscription?.webhookurl || "",
      enabled: props.setting?.subscription?.enabled || false,
      collectPhoneNumber: props.setting?.subscription?.collectPhoneNumber || false,
    },
    mode: "onChange", // validate on change
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);


  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("form submitted", data);
    const newSetting = {
      ...props.setting,
      subscription: {
        ...props.setting.subscription,
        subscribe: data.subscribe,
        description: data.description,
        webhookurl: data.webhookurl,
        enabled: data.enabled,
        collectPhoneNumber: data.collectPhoneNumber,
      },
    };
    props.onUpdate(newSetting);
    setButtonDisabled(true);
  }

  useEffect(() => {
    form.reset({
      subscribe: props.setting?.subscription?.subscribe || "",
      description: props.setting?.subscription?.description || "",
      webhookurl: props.setting?.subscription?.webhookurl || "",
      enabled: props.setting?.subscription?.enabled || false,
      collectPhoneNumber: props.setting?.subscription?.collectPhoneNumber || false,
    });
  }, [props.setting]);

  return (
    <div className="border rounded-md p-4 mt-4 relative">
      {/* <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between">
        <PremiumCard />
      </div> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 "
          onChange={() => setButtonDisabled(false)}
        >
          <FormLabel className="font-bold">Subscribe</FormLabel>
          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Subscribe</FormLabel>
                <FormControl>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collectPhoneNumber"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Collect Phone Number</FormLabel>
                <FormControl>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subscribe"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Subscribe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="webhookurl"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col mb-1">
                  <FormLabel>Webhook Url</FormLabel>
                </div>
                <FormControl>
                  <Input placeholder="webhookurl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="" disabled={buttonDisabled} type="submit">
            Update
          </Button>
        </form>
      </Form>

      <div className="border-t mt-2">
        <div className="font-semibold py-2">Google Sheets</div>
        <GoogleSheetsButton>Connect to Google Sheets</GoogleSheetsButton>
      </div>
    </div>
  );
}

export default SubscribeSection;
