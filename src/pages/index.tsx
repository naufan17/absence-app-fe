import { Navbar } from "@/components/navbar";
import { Heroes } from "@/components/heroes";

export default function IndexPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <Heroes />
    </div>
  )
}