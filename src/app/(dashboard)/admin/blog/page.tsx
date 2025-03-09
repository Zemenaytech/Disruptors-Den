// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { format } from "date-fns";
// import { Edit, Trash, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Badge } from "@/components/ui/badge";
// import { blogs as allBlogs } from "@/lib/data";

// export default function BlogsPage() {
//   const [blogs, setBlogs] = useState(allBlogs);
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 10;

//   // Calculate pagination
//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
//   const totalPages = Math.ceil(blogs.length / blogsPerPage);

//   // Handle delete blog
//   const handleDeleteBlog = (id: string) => {
//     setBlogs(blogs.filter((blog) => blog.id !== id));
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
//           <p className="text-muted-foreground">Manage your blog posts here</p>
//         </div>
//         <Button asChild>
//           <Link href="/create-blog">
//             <Plus className="mr-2 h-4 w-4" />
//             Create Blog
//           </Link>
//         </Button>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Title</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Created</TableHead>
//               <TableHead>Updated</TableHead>
//               <TableHead className="w-[100px]">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentBlogs.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center">
//                   No blogs found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               currentBlogs.map((blog) => (
//                 <TableRow key={blog.id}>
//                   <TableCell className="font-medium">{blog.title}</TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={
//                         blog.status === "published" ? "default" : "secondary"
//                       }
//                     >
//                       {blog.status === "published" ? "Published" : "Draft"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     {format(blog.createdAt, "MMM dd, yyyy")}
//                   </TableCell>
//                   <TableCell>
//                     {format(blog.updatedAt, "MMM dd, yyyy")}
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Button variant="ghost" size="icon" asChild>
//                         <Link href={`/edit-blog/${blog.id}`}>
//                           <Edit className="h-4 w-4" />
//                           <span className="sr-only">Edit</span>
//                         </Link>
//                       </Button>
//                       <AlertDialog>
//                         <AlertDialogTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <Trash className="h-4 w-4" />
//                             <span className="sr-only">Delete</span>
//                           </Button>
//                         </AlertDialogTrigger>
//                         <AlertDialogContent>
//                           <AlertDialogHeader>
//                             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                             <AlertDialogDescription>
//                               This action cannot be undone. This will
//                               permanently delete the blog post.
//                             </AlertDialogDescription>
//                           </AlertDialogHeader>
//                           <AlertDialogFooter>
//                             <AlertDialogCancel>Cancel</AlertDialogCancel>
//                             <AlertDialogAction
//                               onClick={() => handleDeleteBlog(blog.id)}
//                               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                             >
//                               Delete
//                             </AlertDialogAction>
//                           </AlertDialogFooter>
//                         </AlertDialogContent>
//                       </AlertDialog>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {totalPages > 1 && (
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 className={
//                   currentPage === 1 ? "pointer-events-none opacity-50" : ""
//                 }
//               />
//             </PaginationItem>

//             {Array.from({ length: totalPages }).map((_, index) => (
//               <PaginationItem key={index}>
//                 <PaginationLink
//                   isActive={currentPage === index + 1}
//                   onClick={() => setCurrentPage(index + 1)}
//                 >
//                   {index + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}

//             <PaginationItem>
//               <PaginationNext
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 className={
//                   currentPage === totalPages
//                     ? "pointer-events-none opacity-50"
//                     : ""
//                 }
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       )}
//     </div>
//   );
// }
