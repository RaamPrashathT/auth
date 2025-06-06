"use client"

import { logout } from "@/actions/logout"
import { Button } from "@/components/ui/button";
// import { useCurrentUser } from "@/hooks/use-current-user"

const SettingsPage = () => {
    // const user = useCurrentUser();
    const onCLick = () => {
       logout();
    }
    return(
        <div className=" ">
            <Button onClick={onCLick} variant={"secondary"}  >
                Sign out
            </Button>
        </div>
    )
}

export default SettingsPage