import { Sidebar } from "@/components/ui/sidebar";
import { Appbar } from "@/components/ui/Appbar"

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Appbar />
            <div className="flex">
                <Sidebar />
                <div className="bg-zinc-950 w-full p-4 text-zinc-200" >{children}</div>
            </div>
        </div>
    );
}
