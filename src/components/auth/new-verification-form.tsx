"use client"

import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token")
    const onSubmit = useCallback(() => {
        if(!token){
            setError("Missing Token!")
            return
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch( () => {
                setError("Something went wrong")
            })
    }, [token])

    useEffect(() => {
        onSubmit();
    }, [onSubmit])
    return(
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonHref="/auth/login"
            backButtonLabel="back to Login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader/>
                )}
                <FormSuccess message={success}/>
                <FormError message={error}/>
            </div>
        </CardWrapper>
    )
}

export default NewVerificationForm