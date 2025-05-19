import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Check, Ellipsis, X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import type { AxiosResponse } from "axios";

interface UserTableProps {
  data: {
   users: {
    id: string;
    name: string;
    email: string;
    is_verified: string;
   }[];
  };
  fetchUsers: () => Promise<void>; 
}

export function UserTable({ data, fetchUsers }: UserTableProps) {
  const handleVerify = async (id: string) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(`/verifikator/users/${id}/verify`);

      toast.success("Success", {
        description: response.data.message,
        style: { color: 'green' },
      })
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Failed to verify user",
        style: { color: 'red' },
      })
    } finally {
      fetchUsers();
    }
  }


  return (
    <div className="rounded-md border w-full mt-4">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Is Verified</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.users.map((user) => (
          <TableRow key={user.id} className="py-2">
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.is_verified ? (
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500">
                    <Check />
                  </Badge>
                </div>
              ):(
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-500">
                    <X />
                  </Badge>
                </div>
              )}
            </TableCell>
            <TableCell>
              {user.is_verified ? (
                ''
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant={"ghost"} className="p-1 h-auto">
                      <Ellipsis className="size-4"/>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Verify User
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to verify this user?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleVerify(user.id)}>
                        Verify
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  )
}