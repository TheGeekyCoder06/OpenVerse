import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function BlogPostCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create a Blog Post</CardTitle>
        <CardDescription>
          Share your thoughts with the world by writing a new blog post.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6">
          {/* Blog Title */}
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter your blog title"
              required
            />
          </div>

          {/* Blog Content */}
          <div className="grid gap-2">
            <Label htmlFor="content">Blog Content</Label>
            <Textarea
              id="content"
              placeholder="Write your blog here..."
              rows={6}
              required
            />
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button type="submit">Publish</Button>
      </CardFooter>
    </Card>
  )
}
