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
import { RegisterSchema } from "@/schemas"
import { register } from "@/actions/register"


export const RegisterForm = ()  => {

    const [isPending, startTrasition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTrasition(() => {
            register(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                });
        });
    }

    return(
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel> 
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="John Doe"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel> 
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="example@email.com"
                                            type="email"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel> 
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="password"
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
                            Register
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    )
}