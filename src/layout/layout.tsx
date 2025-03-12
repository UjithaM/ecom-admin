import {AppSidebar} from "@/components/app-sidebar.tsx";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <div className="ml-auto">
                            <ModeToggle />
                        </div>
                    </header>
                    <Outlet />

                </SidebarInset>
            </SidebarProvider>
        </>
    );
}

export default Layout;