import { TableCell, TableRow } from "@/components/ui/table";

const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <div className="animate-pulse h-5 bg-primary/10 rounded w-10"></div>
      </TableCell>
      <TableCell>
        <div className="animate-pulse h-5 bg-primary/10 rounded w-36"></div>
      </TableCell>
      <TableCell>
        <div className="animate-pulse h-5 bg-primary/10 rounded w-10"></div>
      </TableCell>
    </TableRow>
  );
  
  export default SkeletonRow;