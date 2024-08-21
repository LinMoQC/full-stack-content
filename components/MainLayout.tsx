import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SideNavigation from "./SideNavigation";
import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons"
import Link from "next/link";

interface MainLayoutProps {
  children: ReactNode
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  if (!user) {
    return redirect("/login");
  }
  // return user ? (
  //   <div className="flex items-center gap-4">
  //     Hey, {user.email}!
  //     <form action={signOut}>
  //       <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
  //         Logout
  //       </button>
  //     </form>
  //   </div>
  // ) : (
  //   <Link
  //     href="/login"
  //     className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
  //   >
  //     Login
  //   </Link>
  // );

  return <main className="flex">
    <SideNavigation />
    <section className="w-8/12 p-6">
      <header className="p-5 border-b bore">
        <div className="container flex justify-between">
          <div>

          </div>
          <div className="flex gap-6 justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button><PlusIcon className="mr-2" />Create</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="end">
                <Link href='/admin/projects/create'>
                  <DropdownMenuItem className="text-gray-500 cursor-pointer">
                    Projects
                  </DropdownMenuItem>
                </Link>
                <Link href='/admin/blogs/create'>
                  <DropdownMenuItem className="text-gray-500 cursor-pointer">
                    Blog
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              </DropdownMenuTrigger>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>{user?.email && user.email[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="px-5 py-2">
        {children}
      </div>
    </section>
  </main>
}
