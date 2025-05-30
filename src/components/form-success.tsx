import { CircleCheckBig } from "lucide-react";

interface FormSuccessProps {
    message?: string;
}

export const FormSuccess = ({
    message
}: FormSuccessProps) => {
    if(!message) return null;
    return(
        <div className="bg-emerald-500/15 p-2.5 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CircleCheckBig className="h-5 w-5"/>
            <p >{message}</p>
        </div>
    )
}