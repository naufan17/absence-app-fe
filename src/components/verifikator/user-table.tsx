/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { Check, Ellipsis, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useVerifyUser } from "@/hooks/use-verify-user";

interface UserTableProps {
  data: {
    users: {
      id: string;
      name: string;
      email: string;
      is_verified: boolean;
   }[],
    meta: {
      page: number;
      limit: number;
      total: number;
      totalData: number;
      totalPage: number;
    }
  };
}

export function UserTable({ data }: UserTableProps) {
  const verifyUser = useVerifyUser();

  const handleVerify = async (id: string) => {
    verifyUser.mutate({ id }, {
      onSuccess: (response) => {
        toast.success(response.data.message, {
          style: { 
            color: 'green' 
          },
        })
      },
      onError: (error: any) => {
        toast.error(error.response?.data.message, {
          style: { 
            color: 'red' 
          },
        })
      },
    })
  }

  return (
    <div className="rounded-md border w-full mt-4">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Verified</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.users.map((user) => (
          <TableRow key={user.id} className="py-2">
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
                      <Button variant={"ghost"} className="p-1 h-auto" aria-label="Show user actions">
                        <Ellipsis className="size-4" aria-hidden="true" />
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