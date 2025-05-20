import { useState } from "react";
import type { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Edit, Eye, Trash, X } from "lucide-react";
import { formatDateTime } from "@/lib/utils/formatTimeDate";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      status: string,
      comment: string | null
    }[];
    leaveTypes: {
      id: string;
      name: string;
    }[];
  };
  fetchLeaveRequest: () => Promise<void>
}

export function LeaveRequestTable({ data, fetchLeaveRequest }: LeaveRequestTableProps) {
  const [leaveRequestsForm, setLeaveRequestsForm] = useState<{
    id: string
    title: string
    description: string
    startDate: string
    endDate: string
    leaveTypeId: string
  }>({
    id: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    leaveTypeId: ''
  })

  const handleCancel = async (id: string) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(`/user/leave-requests/${id}/cancel`)

      toast.success("Success", {
        description: response.data.message,
        style: { 
          color: 'green' 
        },
      })
    } catch (error) {
      console.error(error)

      toast.error("Error", {
        description: "Failed to cancel leave request",
        style: { 
          color: 'red' 
        },
      })
    } finally {
      fetchLeaveRequest();
    }
  }

    const handleDelete = async (id: string) => {
    try {
      const response: AxiosResponse = await axiosInstance.delete(`/user/leave-requests/${id}`)

      toast.success("Success", {
        description: response.data.message,
        style: { color: 'green' },
      })
    } catch (error) {
      console.error(error)

      toast.error("Error", {
        description: "Failed to delete leave request",
        style: { color: 'red' },
      })
    } finally {
      fetchLeaveRequest();
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeaveRequestsForm({
      ...leaveRequestsForm,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response: AxiosResponse = await axiosInstance.put(`/user/leave-requests/${leaveRequestsForm.id}`, {
        title: leaveRequestsForm.title,
        description: leaveRequestsForm.description,
        startDate: leaveRequestsForm.startDate + 'T00:00:00.000Z',
        endDate: leaveRequestsForm.endDate + 'T23:59:00.000Z',
        leaveTypeId: leaveRequestsForm.leaveTypeId
      })

      toast.success("Success", {
        description: response.data.message,
        style: { 
          color: 'green' 
        },
      })
    } catch (error) {
      console.error(error)
      
      toast.error("Error", {
        description: "Failed to create leave request",
        style: { 
          color: 'red' 
        },
      })
    } finally {
      fetchLeaveRequest()
    }
  }

  return (
    <div className="rounded-md border w-full mt-4">
    <Table>
      <TableHeader>
        <TableRow>
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
                      Leave request detail 
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
              {(leaveReq.status === "pending" || leaveReq.status === "revoked") && (      
                <Dialog>
                  <DialogTrigger
                    onClick={() =>
                      setLeaveRequestsForm({
                        id: leaveReq.id,
                        title: leaveReq.title,
                        description: leaveReq.description,
                        startDate: leaveReq.start_date,
                        endDate: leaveReq.end_date,
                        leaveTypeId: leaveReq.leave_type.id,
                      })
                    }
                  >
                    <Button variant="ghost" className="p-1 h-auto">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Leave Request</DialogTitle>
                      <DialogDescription>
                        Update your leave request details below.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        type="hidden"
                        name="id"
                        value={leaveRequestsForm.id}
                        onChange={handleChange}
                      />
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          type="text"
                          name="title"
                          value={leaveRequestsForm.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          type="text"
                          name="description"
                          value={leaveRequestsForm.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="start_date">Start Date</Label>
                        <Input
                          id="start_date"
                          type="date"
                          name="startDate"
                          value={leaveRequestsForm.startDate.slice(0, 10)}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="end_date">End Date</Label>
                        <Input
                          id="end_date"
                          type="date"
                          name="endDate"
                          value={leaveRequestsForm.endDate.slice(0, 10)}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="leaveTypeId">Leave Type</Label>
                        <Select
                          name="leaveTypeId"
                          onValueChange={(value: string) =>
                            setLeaveRequestsForm({
                              ...leaveRequestsForm,
                              leaveTypeId: value,
                            })
                          }
                          value={leaveRequestsForm.leaveTypeId}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Leave Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {data.leaveTypes.map((leaveType) => (
                              <SelectItem key={leaveType.id} value={leaveType.id}>
                                {leaveType.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="submit" className="mt-6">
                            Save changes
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
              {leaveReq.status === "pending" && (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant={"ghost"} className="p-1 h-auto">
                      <X className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Cancel Leave Request
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this leave request?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleCancel(leaveReq.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant={"ghost"} className="p-1 h-auto">
                    <Trash className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete Leave Request
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this leave request?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(leaveReq.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  )
}