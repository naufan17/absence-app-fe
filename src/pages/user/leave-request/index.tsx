/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import type { AxiosResponse } from "axios"
import axiosInstance from "@/lib/axios"
import { toast } from "sonner"
import PrivateGuard from "@/components/guard/private"
import UserLayout from "@/components/layout/user"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LeaveRequestTable } from "@/components/user/leave-request-table"
import { PaginationTable } from "@/components/pagination-table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LeaveRequestPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [leaveRequestsData, setLeaveRequestsData] = useState<{
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
    }[],
    meta: {
      page: number
      limit: number
      total: number
      totalData: number
      totalPage: number
    }
  }>({
    leaveRequests: [],
    meta: {
      page: 1,
      limit: 20,
      total: 0,
      totalData: 0,
      totalPage: 0
    }
  })
  const [leaveTypes, setLeaveTypes] = useState<Array<{
    id: string
    name: string
  }>>([])
  const [leaveRequestsForm, setLeaveRequestsForm] = useState<{
    title: string
    description: string
    startDate: string
    startTime: string
    endDate: string
    endTime: string
    leaveTypeId: string
  }>({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    leaveTypeId: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeaveRequestsForm({
      ...leaveRequestsForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response: AxiosResponse = await axiosInstance.post('/user/leave-requests', {
        title: leaveRequestsForm.title,
        description: leaveRequestsForm.description,
        startDate: leaveRequestsForm.startDate + 'T' + leaveRequestsForm.startTime + ':00.000Z',
        endDate: leaveRequestsForm.endDate + 'T' + leaveRequestsForm.endTime + ':00.000Z',
        leaveTypeId: leaveRequestsForm.leaveTypeId
      })

      toast.success(response.data.message, {
        style: {
          color: 'green'
        },
      })
    } catch (error: any) {
      console.error(error)
      
      toast.error(error.response?.data.message, {
        style: {
          color: 'red'
        },
      })
    } finally {
      fetchLeaveRequest()
    }
  }

  const fetchLeaveRequest = async (page?: number) => {
    setLoading(true)
    
    try {
      const response: AxiosResponse = await axiosInstance.get('/user/leave-requests', {
        params: {
          page: page ? page : leaveRequestsData.meta.page,
        }
      })

      setLeaveRequestsData(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchLeaveType = async () => {
    try {
      const response = await axiosInstance.get('/leave-types')
      setLeaveTypes(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaveRequest()
    fetchLeaveType()
  }, [])

  return (
    <PrivateGuard allowedRole="user">
      <UserLayout>
        <div className="flex flex-col p-4 pt-0 w-full">
          <div className="flex flex-row justify-between">
            <div></div>
            <div className="space-x-2">
              <Dialog>
                <DialogTrigger>
                  <Button variant="default">
                    Add Leave Request
                  </Button>
                </DialogTrigger>
                <DialogContent className="overflow-auto max-h-[90vh]">
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>
                        Create Leave Request
                      </DialogTitle>
                      <DialogDescription>
                        Make your changes here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-6 mt-6">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input 
                          id="title"
                          type="text"
                          name="title"
                          onChange={handleChange}
                        /> 
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input 
                          id="description"
                          type="text"
                          name="description"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input 
                          id="startDate"
                          type="date"
                          name="startDate"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input 
                          id="startTime"
                          type="time"
                          name="startTime"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input 
                          id="endDate"
                          type="date"
                          name="endDate"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="endTime">End Time</Label>
                        <Input 
                          id="endTime"
                          type="time"
                          name="endTime"
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
                            {leaveTypes.map((leaveType) => (
                              <SelectItem key={leaveType.id} value={leaveType.id}>
                                {leaveType.name}
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
            </div>
          </div>
          {loading ? (
            <div className="flex h-96 bg-secondary rounded-md w-full mt-4 animate-pulse"></div>
          ) : leaveRequestsData.leaveRequests.length === 0 ? (
            <div className="flex h-32 items-center justify-center bg-secondary rounded-md w-full mt-4 text-destructive font-semibold">
              No Leave Request Found
            </div>
          ) : (
            <>
              <LeaveRequestTable
                data={{ leaveRequests: leaveRequestsData.leaveRequests, 
                  meta: leaveRequestsData.meta, 
                  leaveTypes 
                }}
                fetchLeaveRequest={fetchLeaveRequest}
              />
              <PaginationTable data={leaveRequestsData.meta} fetchData={fetchLeaveRequest} />
            </>
          )}
        </div>  
      </UserLayout>
    </PrivateGuard>
  )
}
