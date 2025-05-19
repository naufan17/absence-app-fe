import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils/formatTimeDate";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import type { AxiosResponse } from "axios";

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
  fetchLeaveRequest: () => Promise<void>;
}

export function LeaveRequestTable({ data, fetchLeaveRequest }: LeaveRequestTableProps) {
  const [statusOptions] = useState<{ 
    value: string; 
    label: string 
  }[]>([
    { 
      value: 'approved', 
      label: 'Approved' 
    }, { 
      value: 'rejected', 
      label: 'Rejected' 
    }, { 
      value: 'revoked', 
      label: 'Revoked' 
    }]);
    const [reply, setReply] = useState<{
      id: string,
      comment: string,
      status: string
    }>({
      id: '',
      comment: '',
      status: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      switch (name) {
        case 'id':
          setReply({ ...reply, id: value });
          break;
        case 'comment':
          setReply({ ...reply, comment: value });
          break;
        case 'status':
          setReply({ ...reply, status: value });
          break;
        default:
          break;
      }
    }
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      try {
        const response: AxiosResponse = await axiosInstance.put(`/verifikator/leave-requests/${reply.id}/reply`, { 
          comment: reply.comment, 
          status: reply.status 
        });

        toast.success("Success", {
          description: response.data.message,
          style: { 
            color: 'green' 
          },
        })
      } catch (error) {
        console.error(error);
        toast.error("Error", {
          description: "Failed to reply leave request",
          style: { 
            color: 'red' 
          },
        })
      } finally {
        fetchLeaveRequest();
      }
    }

  return (
    <div className="rounded-md border w-full mt-4">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Title</TableHead>
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
            <TableCell>{leaveReq.user.name}</TableCell>
            <TableCell>{leaveReq.title}</TableCell>
            <TableCell>{formatDateTime(leaveReq.start_date)}</TableCell>
            <TableCell>{formatDateTime(leaveReq.end_date)}</TableCell>
            <TableCell>{leaveReq.leave_type.name}</TableCell>
            <TableCell>
              {leaveReq.status === "pending" ? (
                <Badge className="bg-yellow-500">Pending</Badge>
              ) : leaveReq.status === "cancel" ? (
                <Badge className="bg-red-500">Cancel</Badge>
              ) : leaveReq.status === "revoked" ? (
                <Badge className="bg-orange-500">Revoked</Badge>
              ) : leaveReq.status === "approved" ? (
                <Badge className="bg-green-500">Approved</Badge>
              ) : leaveReq.status === "rejected" ? (
                <Badge className="bg-red-500">Rejected</Badge>
              ) : null}
            </TableCell>
            <TableCell>
              {leaveReq.status === "pending" && ( 
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-1 h-auto cursor-pointer"
                      onClick={() => setReply({ id: leaveReq.id, comment: '', status: '' })}
                    >
                      <SendHorizontal className="h-4 w-4"/>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form onSubmit={handleSubmit}>
                      <DialogHeader>
                        <DialogTitle>
                          Reply Leave Request
                        </DialogTitle>
                        <DialogDescription>
                          Make your changes here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-6 mt-6">
                        <div className="grid gap-2">
                          <Input
                            id="id"
                            type="hidden"
                            name="id"
                            value={reply.id}
                            readOnly
                          />
                          <Label htmlFor="comment">Comment</Label>
                          <Input 
                            id="comment"
                            type="text"
                            name="comment"
                            value={reply.comment}
                            onChange={handleInputChange}
                            required
                          /> 
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            name="status"
                            value={reply.status}
                            onValueChange={(value) => setReply({ ...reply, status: value })}
                            required
                          >
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
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