'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import useSWR from "swr"
import { ChevronRightIcon, ChevronLeftIcon  } from "@radix-ui/react-icons"
import { Skeleton } from "@/components/ui/skeleton"

const getData = async (url: string) => {
  await new Promise((r) => setTimeout(r, 300));
  const response = await fetch(url);
  if (!response.ok) {
      throw new Error('Failed to fetch data');
  }
  return response.json();
}

interface Item {
  itemID: number;
  name: string;
  rarity: number;
}

interface ApiResponse {
  items: Item[];
  totalItems: number;
}

const ItemListContent = ({ currentPage, itemsPerPage }: { currentPage: number, itemsPerPage: number }) => {
  const search = useSearchParams();
  const searchQuery = search.get('q');
  const idQuery = search.get('id');
  const queryType = searchQuery ? 'q' : 'id';
  const queryValue = searchQuery || idQuery || '';
  const encodedQueryValue = encodeURI(queryValue);

  const { data } = useSWR<ApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/itemlist?${queryType}=${encodedQueryValue}&page=${currentPage}&itemsPerPage=${itemsPerPage}`,
    getData
  );

  const totalPages = Math.ceil((data?.totalItems || 0) / itemsPerPage);

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Item List</CardTitle>
        <CardDescription>
          List of all items in the game.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Rarity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items?.map((item) => (
              <TableRow key={item.itemID}>
                <TableCell>{item.itemID}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.rarity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong>{Math.min(currentPage * itemsPerPage, data?.items?.length || 0)}</strong> of <strong>{data?.totalItems}</strong> items
        </div>
      </CardFooter>
    </Card>
  );
};

export default function ItemListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const search = useSearchParams();
  const searchQuery = search.get('q');
  const idQuery = search.get('id');
  const queryType = searchQuery ? 'q' : 'id';
  const queryValue = searchQuery || idQuery || '';
  const encodedQueryValue = encodeURI(queryValue);

  const { data } = useSWR<ApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/itemlist?${queryType}=${encodedQueryValue}&page=${currentPage}&itemsPerPage=${itemsPerPage}`,
    getData
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil((data?.totalItems || 0) / itemsPerPage)));
  }

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  const totalPages = Math.ceil((data?.totalItems || 0) / itemsPerPage);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Suspense fallback={<div>Loading...</div>}>
        <Tabs defaultValue="all">
          <TabsContent value="all">
            <ItemListContent currentPage={currentPage} itemsPerPage={itemsPerPage} />
            <div className="flex justify-between mt-4">
              <div className={currentPage === 1 ? 'cursor-not-allowed' : ''}>
              <Button onClick={previousPage} disabled={currentPage === 1}>
                Previous
              </Button>
              </div>
              <div className="text-muted-foreground text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <Button onClick={nextPage} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Suspense>
    </main>
  );
}
