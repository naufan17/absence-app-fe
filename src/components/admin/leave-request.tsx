import { Eye } from "lucide-react";
import { formatDateTime } from "@/lib/utils/formatTimeDate";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
      status: string,
      comment: string | null
    }[];
  };
}

export function LeaveRequestTable({ data }: LeaveRequestTableProps) {
  return (
    <div className="rounded-md border w-full mt-4">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.leaveRequests.map((leaveReq) => (
          <TableRow key={leaveReq.id} className="py-2">
            <TableCell>{leaveReq.user.name}</TableCell>
            <TableCell>{leaveReq.title}</TableCell>
            <TableCell>{formatDateTime(leaveReq.start_date)}</TableCell>
            <TableCell>{formatDateTime(leaveReq.end_date)}</TableCell>
            <TableCell>{leaveReq.leave_type.name}</TableCell>
            <TableCell>
              {leaveReq.status === "pending" ? (
                <Badge className="bg-yellow-500">Pending</Badge>
              ) : leaveReq.status === "canceled" ? (
                <Badge className="bg-red-500">Canceled</Badge>
              ) : leaveReq.status === "revoked" ? (
                <Badge className="bg-orange-500">Revoked</Badge>
              ) : leaveReq.status === "approved" ? (
                <Badge className="bg-green-500">Approved</Badge>
              ) : leaveReq.status === "rejected" ? (
                <Badge className="bg-red-500">Rejected</Badge>
              ) : null}
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger>
                  <Button variant="ghost" className="p-1.5 h-auto">
                    <Eye className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Detail Leave Request
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <p className="text-base font-medium">
                      Leave request detail user {leaveReq.user.name}  
                    </p>
                  </DialogDescription>
                  <DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <div className="font-medium">Title:</div>
                          <div className="col-span-3">{leaveReq.title}</div>
                          <div className="font-medium">Description:</div>
                          <div className="col-span-3">{leaveReq.description}</div>
                          <div className="font-medium">Start Date:</div>
                          <div className="col-span-3">{formatDateTime(leaveReq.start_date)}</div>
                          <div className="font-medium">End Date:</div>
                          <div className="col-span-3">{formatDateTime(leaveReq.end_date)}</div>
                          <div className="font-medium">Type:</div>
                          <div className="col-span-3">{leaveReq.leave_type.name}</div>
                          <div className="font-medium">Status:</div>
                          <div className="col-span-3 capitalize">
                            {leaveReq.status === "pending" ? (
                              <Badge className="bg-yellow-500 text-sm">Pending</Badge>
                            ) : leaveReq.status === "canceled" ? (
                              <Badge className="bg-red-500 text-sm">Canceled</Badge>
                            ) : leaveReq.status === "revoked" ? (
                              <Badge className="bg-orange-500 text-sm">Revoked</Badge>
                            ) : leaveReq.status === "approved" ? (
                              <Badge className="bg-green-500 text-sm">Approved</Badge>
                            ) : leaveReq.status === "rejected" ? (
                              <Badge className="bg-red-500 text-sm">Rejected</Badge>
                            ) : null}
                          </div>
                          {leaveReq.comment && (
                            <>
                              <div className="font-medium">Comment:</div>
                              <div className="col-span-3">{leaveReq.comment}</div>
                            </>
                          )}
                        </div>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  )
}