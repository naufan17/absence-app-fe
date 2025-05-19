import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PrivateGuard from "@/components/guard/private"
import VerifikatorLayout from "@/components/layout/verifikator"
import UpdateProfileForm from "@/components/update-profile-form"
import UpdatePasswordForm from "@/components/update-password-form"

export default function AccountPage() {
  return (
    <PrivateGuard allowedRole="verifikator">
      <VerifikatorLayout>
        <div className="flex flex-col p-4 pt-0">
          <div className="flex flex-col w-full p-2 md:p-4 gap-1">
            <h1 className="text-xl md:text-2xl font-bold">
              Settings
            </h1>
            <h5 className="text-md">
              Manage your account settings
            </h5>
          </div>
          {/* <Separator/> */}
          <div className="p-2 md:p-4">
            <Tabs defaultValue="profile" className="max-w-screen-md">
              <TabsList className="grid w-60 grid-cols-2 mb-6">
                <TabsTrigger value="profile" className="font-semibold">Profile</TabsTrigger>
                <TabsTrigger value="password" className="font-semibold">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <UpdateProfileForm/>
              </TabsContent>
              <TabsContent value="password">
                <UpdatePasswordForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </VerifikatorLayout>
    </PrivateGuard>
  )
}