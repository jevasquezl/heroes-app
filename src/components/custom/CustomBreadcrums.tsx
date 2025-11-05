import { SlashIcon } from "lucide-react"
import { Link, useLocation } from "react-router"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../ui/breadcrumb"
import { cn } from "@/lib/utils";

interface Breadcrumbs {
    label: string;
    to: string;
}

interface Props {
    currentPage?: string;
    breadcrumbs?: Breadcrumbs[];
}

export const CustomBreadcrums = ({ currentPage, breadcrumbs = [] }: Props) => {

    const { pathname } = useLocation();
    const actual = pathname.split("/")[1];

    const isActive = (path: string) => {
        return pathname === path;
    }


    return (
        <Breadcrumb className="my-2 mx-2">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild className={cn(isActive('/') && "font-bold", "text-1xl")}>
                        <Link to="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {isActive('/search') ?
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator> : ''
                }

                <BreadcrumbItem>
                    <BreadcrumbLink asChild className={cn(isActive('/search') && "font-bold", "text-1xl")}>
                        <Link to={pathname}>{actual}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {
                    breadcrumbs.map(crumb => (
                        <div key={crumb.label} className="flex">
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>

                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to={crumb.to}>{crumb.label}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </div>
                    ))
                }

                {/* <BreadcrumbSeparator>
                    <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                </BreadcrumbItem> */}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
