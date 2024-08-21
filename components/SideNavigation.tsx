import Link from "next/link";
import { RocketIcon,ReaderIcon } from '@radix-ui/react-icons'

export default function SideNavigation(){
    return (
        <aside className="w-4/12 border-gray-300 h-screen p-5 border-r-2">
            <div className="">
                <h1 className="font-bold text-lg">Profoliio Admin</h1>
            </div>
            
            <div className="mt-4">
                <ul>
                    <li>
                        <Link href={"/admin/projects"} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded text-gray-600 hover:text-gray-800 ">
                            <RocketIcon />
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link href={"/admin/projects"} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded text-gray-600 hover:text-gray-800 ">
                            <ReaderIcon />
                            Blogs
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}