import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-blue-500">
      <div className="space-y-6  text-center">
        <h1>Auth</h1>
        <p>hello</p>
        <LoginButton>
          <Button variant="secondary">
            CLick me!
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
