import { Skeleton } from "@/components/ui/skeleton";

export function BlogPostSkeleton() {
  return (
    <article className="space-y-6">
      <Skeleton className="w-full h-[400px] rounded-lg" />

      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />

        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-24" />
          <div className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </article>
  );
}
