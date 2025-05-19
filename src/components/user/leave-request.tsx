import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select } from "../ui/select";

interface LeaveRequestTableProps {
  data: {
    leaveRequests: {
      id: string;
      title: string;
      description: string;
      start_date: string;
      end_date: string;
      leave_type: {
        id: string;
        name: string;
      },
      status: string
    }[];
    leaveTypes: {
      id: string;
      name: string;
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
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Leave Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.leaveRequests.map((leaveReq) => (
          <TableRow key={leaveReq.id} className="py-2">
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
            <TableCell>
              {leaveReq.status === "pending" && ( 
                <Dialog>
                  <DialogTrigger>
                    <Button variant="ghost" className="p-1.5 h-auto">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form>
                      <DialogHeader>
                        <DialogTitle>
                          Update Leave Request
                        </DialogTitle>
                        <DialogDescription>
                          Make your changes here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-6 mt-6">
                        <div className="grid gap-2">
                          <Input 
                            type="hidden"
                            name="id"
                            value={leaveReq.id}
                          />
                          <Label htmlFor="title">Title</Label>
                          <Input 
                            id="title"
                            type="text"
                            name="title"
                            value={leaveReq.title}
                          /> 
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Input 
                            id="description"
                            type="text"
                            name="description"
                            value={leaveReq.description}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="start_date">Start Date</Label>
                          <Input 
                            id="start_date"
                            type="date"
                            name="start_date"
                            value={leaveReq.start_date}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="end_date">End Date</Label>
                          <Input 
                            id="end_date"
                            type="date"
                            name="end_date"
                            value={leaveReq.end_date}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="leaveReq_id">Leave Type</Label>
                          <Select name="leaveReq_id">
                            {data.leaveTypes.map((leaveType) => (
                              <option
                                value={leaveType.id}
                                selected={leaveType.id === leaveReq.leave_type.id}
                              >
                                {leaveType.name}
                              </option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose>
                          <Button type="submit" className="mt-6">
                            Save changes
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  )
}