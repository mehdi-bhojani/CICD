"use client"
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const FormSchema = z.object({

    fullname: z.string().min(1, "fullname required"),
    username: z.string().min(1, "username required"),
    hearaboutlinklush: z.string().min(1, "this field required"),
    category: z.string().min(1, "category field required"),
    foodbeverage: z.string().min(1, "this field required"),
})

function WellcomeForm() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: "",
            username: "",
            hearaboutlinklush: "",
            category: "",
            foodbeverage: ""

        }
    })



    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values)
    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <h1 className="text-[26px] xs:text-[32px] lg:text-4xl font-bold mb-[10px] md:mb-4">Welcome back</h1>
                <p className="text-gray-700 mb-6 md:mb-8">Please share some basic details with us.
                    This may personalize your Linklush experience.</p>
                <div className="space-y-4">

                    <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Alice capsy" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select a category that best describes your Linklush</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Business">Business</SelectItem>
                                        <SelectItem value="Influencers & Digital Creators">Influencers & Digital Creators</SelectItem>
                                        <SelectItem value="Personal">Personal</SelectItem>
                                        <SelectItem value="Entertainment">Entertainment</SelectItem>
                                        <SelectItem value="Fashion & Beauty">Fashion & Beauty</SelectItem>
                                        <SelectItem value="Government & Politics">Government & Politics</SelectItem>
                                        <SelectItem value="Tech">Tech</SelectItem>
                                        <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                                        <SelectItem value="Travel & Tourism">Travel & Tourism</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="foodbeverage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select your Food & Beverage category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Home Cooking">Home Cooking</SelectItem>
                                        <SelectItem value="Groceries">Groceries</SelectItem>
                                        <SelectItem value="Desserts">Desserts</SelectItem>
                                        <SelectItem value="Coffee & Tea">Coffee & Tea</SelectItem>
                                        <SelectItem value="Chef">Chef</SelectItem>
                                        <SelectItem value="Bars & Restaurants">Bars & Restaurants</SelectItem>
                                        <SelectItem value="Alcohol">Alcohol</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="hearaboutlinklush"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Where Did You Hear About LinkLush?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Social Media">Social Media</SelectItem>
                                        <SelectItem value="Content">Content (Blogs)</SelectItem>
                                        <SelectItem value="Search">Search (Google, Bing)</SelectItem>
                                        <SelectItem value="Marketing (Email, Ads)">Marketing (Email, Ads)</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username (linklu.sh/yourusername)</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="username" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <Button className="w-full mt-6" type="submit">Continue</Button>
            </form>
        </Form>
    );
}

export default WellcomeForm;