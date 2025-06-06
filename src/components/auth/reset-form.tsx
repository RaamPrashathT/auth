"use client"

import { useState, useTransition } from "react"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import  {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ResetSchema } from "@/schemas"
import { reset } from "@/actions/reset"

export const ResetForm = ()  => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        console.log(values)
        startTransition(() => {
            reset(values)
                .then((data) => {
                    if ("error" in data && data.error) {
                        setError(data.error);
                    } else {
                        setError("");
                    }
                    if ("success" in data && data.success) {
                        setSuccess(data.success);
                    } else {
                        setSuccess("");
                    }
                });
        });
    }

    return(
        <CardWrapper
            headerLabel="Forgot your password?"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel> 
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="ellen.joe@gmail.com"
                                            type="email"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button 
                            className="w-full mt-2"
                            disabled={isPending}
                        >
                            Send reset email
                        </Button>

                    </div>
                </form>
            </Form>
        </CardWrapper>
    )
}