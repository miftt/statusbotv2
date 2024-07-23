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
import SkeletonRow from "./skeleton"

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

const ItemListContent = ({ currentPage, itemsPerPage }: { currentPage: number, itemsPerPage: number }) => {
  const search = useSearchParams();
  const searchQuery = search.get('q');
  const idQuery = search.get('id');
  const queryType = searchQuery ? 'q' : 'id';
  const queryValue = searchQuery || idQuery || '';
  const encodedQueryValue = encodeURI(queryValue);

  const { data, isLoading } = useSWR<{ items: Item[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/itemlist?${queryType}=${encodedQueryValue}&page=${currentPage}&itemsPerPage=${itemsPerPage}`,
    getData
  );

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
          {isLoading
              ? Array.from({ length: 10 }).map((_, idx) => <SkeletonRow key={idx} />)
              : data?.items?.map((item) => (
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
          Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong>{Math.min(currentPage * itemsPerPage, data?.items?.length || 0)}</strong> of <strong>{data?.items?.length}</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};

export default function ItemListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Suspense fallback={<div>Loading...</div>}>
        <Tabs defaultValue="all">
          <TabsContent value="all">
            <ItemListContent currentPage={currentPage} itemsPerPage={itemsPerPage} />
            <div className="flex justify-between mt-4">
              <Button onClick={previousPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <Button onClick={nextPage}>
                Next
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Suspense>
    </main>
  );
}
