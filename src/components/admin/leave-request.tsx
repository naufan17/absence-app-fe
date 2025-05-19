import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface LeaveRequestTableProps {
  data: {
    leaveRequests: {
      id: string;
      user: {
        name: string
      },
      title: string;
      description: string;
      start_date: string;
      end_date: string;
      leave_type: {
        name: string;
      },
      status: string
    }[];
  };
}

export function LeaveRequestTable({ data }: LeaveRequestTableProps) {
  const formatDateTime = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(date).toLocaleString(undefined, options);
  }

  return (
    <div className="rounded-md border w-full mt-4">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Leave Type</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.leaveRequests.map((leaveReq) => (
          <TableRow key={leaveReq.id} className="py-2">
            <TableCell>{leaveReq.user.name}</TableCell>
            <TableCell>{leaveReq.title}</TableCell>
            <TableCell>{leaveReq.description}</TableCell>
            <TableCell>{formatDateTime(leaveReq.start_date)}</TableCell>
            <TableCell>{formatDateTime(leaveReq.end_date)}</TableCell>
            <TableCell>{leaveReq.leave_type.name}</TableCell>
            <TableCell>
              {leaveReq.status === "pending" ? (
                <Badge className="bg-yellow-500">Pending</Badge>
              ) : leaveReq.status === "cancel" ? (
                <Badge className="bg-red-500">Cancel</Badge>
              ) : leaveReq.status === "revoked" ? (
                <Badge className="bg-red-500">Revoked</Badge>
              ) : leaveReq.status === "approved" ? (
                <Badge className="bg-green-500">Approved</Badge>
              ) : leaveReq.status === "rejected" ? (
                <Badge className="bg-red-500">Rejected</Badge>
              ) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  )
}