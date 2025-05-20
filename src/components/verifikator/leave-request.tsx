import { useState } from "react";
import type { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Eye, SendHorizontal } from "lucide-react";
import { formatDateTime } from "@/lib/utils/formatTimeDate";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      status: string,
      comment: string | null
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
    const [replyForm, setReplyForm] = useState<{
      id: string,
      comment: string,
      status: string
    }>({
      id: '',
      comment: '',
      status: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setReplyForm({
        ...replyForm,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      try {
        const response: AxiosResponse = await axiosInstance.put(`/verifikator/leave-requests/${replyForm.id}/reply`, { 
          comment: replyForm.comment, 
          status: replyForm.status 
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
                  <Button variant="ghost" className="p-1 h-auto">
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
              {leaveReq.status === "pending" && ( 
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-1 h-auto cursor-pointer"
                      onClick={() => setReplyForm({ id: leaveReq.id, comment: '', status: '' })}
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
                            value={replyForm.id}
                            readOnly
                          />
                          <Label htmlFor="comment">Comment</Label>
                          <Input 
                            id="comment"
                            type="text"
                            name="comment"
                            value={replyForm.comment}
                            onChange={handleInputChange}
                            required
                          /> 
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            name="status"
                            value={replyForm.status}
                            onValueChange={(value) => setReplyForm({ ...replyForm, status: value })}
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