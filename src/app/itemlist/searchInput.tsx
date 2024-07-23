'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ListFilter, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('q');
    const router = useRouter();

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery) {
                const encodedSearchQuery = encodeURI(searchQuery);
                router.push(`/itemlist?${searchType}=${encodedSearchQuery}`);
            } else {
                router.push('/itemlist');
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery, searchType, router]);

    return (
        <header className="items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="lg:flex lg:items-center">
                <div className="ml-auto flex items-center gap-2 py-5 justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-7 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Filter
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={searchType} onValueChange={(value) => setSearchType(value)}>
                                <DropdownMenuRadioItem value="q">Name</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="id">Item ID</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default SearchInput;
