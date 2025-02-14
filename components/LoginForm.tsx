import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/(admin)/login/submit-button";

export default async function LoginForm() {

    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const signIn = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/admin");
    };

    if (user) {
        return redirect("/admin");
    }

    return (
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
            <label className="text-md" htmlFor="email">
                Email
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="you@example.com"
                required
            />
            <label className="text-md" htmlFor="password">
                Password
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="password"
                placeholder="••••••••"
                required
            />
            <SubmitButton
                formAction={signIn}
                className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="Signing In..."
            >
                Sign In
            </SubmitButton>
        </form>
    );
}
