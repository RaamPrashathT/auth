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
import { NewPasswordSchema } from "@/schemas"
import { newPassword } from "@/actions/new-password"
import { useSearchParams } from "next/navigation"

export const NewPasswordForm = ()  => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");

        console.log(values)
        startTransition(() => {
            newPassword(values, token)
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
            headerLabel="Enter a new password"
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
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel> 
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
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
                            Reset Password
                        </Button>

                    </div>
                </form>
            </Form>
        </CardWrapper>
    )
}