/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react"
import axiosInstance from "@/lib/axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { setLogout } from "@/lib/store/slices/auth.slice"
import type { AppDispatch, RootState } from "@/lib/store/store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { setProfile } from "@/lib/store/slices/profile.slice"

export function NavUser() {
  const [loading, setLoading] = useState<boolean>(true)
  const [avatar] = useState<string>("/images/avatar.png")
  const role = useSelector((state: RootState) => state.auth.role)
  const profile = useSelector((state: RootState) => state.profile.profile)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isMobile } = useSidebar()

  const handleLogout = () => {
    dispatch(setLogout())
    localStorage.removeItem("accessToken")
    navigate("/login")
  }

  const getProfile = async () => {
    try {
      const response = await axiosInstance.get("/account/profile")
      dispatch(setProfile(response.data.data))
    } catch (error: any) {
      console.error("Fetch profile failed: ", error.response?.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {loading ? (
            <div className="flex w-full h-12 bg-secondary animate-pulse rounded-lg"></div>
          ) : (
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={profile?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{profile?.name}</span>
                  <span className="truncate text-xs">{profile?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          )}
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={profile?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{profile?.name}</span>
                  <span className="truncate text-xs">{profile?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={`/${role}/account`}>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </Link>
              <div onClick={handleLogout}>
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </div>            
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
