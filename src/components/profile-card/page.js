import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ProfileCard() {
  // Example user data — you can replace this with actual data from next-auth or your backend
  const user = {
    username: "thegeekycoder",
    email: "m@example.com",
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Your personal account details</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Username</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.username}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.email}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">Edit Profile</Button>
        <Button>Logout</Button>
      </CardFooter>
    </Card>
  )
}
