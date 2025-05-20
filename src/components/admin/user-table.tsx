import type { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axios";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserTableProps {
  data: {
   users: {
    id: string;
    name: string;
    email: string;
    role: string
   }[] 
  };
  fetchUsers: () => Promise<void>
}

export function UserTable({ data, fetchUsers }: UserTableProps) {
  const handleChangeRole = async (id: string) => {
    try {
      const response: AxiosResponse = await axiosInstance.put(`/admin/users/${id}/role`, { 
        role: "verifikator"
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
        description: "Failed to change role",
        style: { 
          color: 'red' 
        },
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
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.users.map((user) => (
          <TableRow key={user.id} className="py-2">
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.role === 'verifikator' ? (
                <Badge>
                  {user.role}
                </Badge>
              ):(
                <Badge variant="secondary">
                  {user.role}
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {user.role === 'verifikator' ? (
                ''
              ):(
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant={"ghost"} className="p-1 h-auto">
                      <Ellipsis className="size-4"/>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Change Role
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to change the role of this user?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleChangeRole(user.id)}>
                        Change
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