import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { t } from "@/utils/t";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <span className="text-lg font-semibold tracking-tight text-foreground">
        {t("home.title")}
      </span>
      <div className="flex items-center gap-2">
        <Show when="signed-out">
          <SignInButton>
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button size="sm">Sign up</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </header>
  );
}