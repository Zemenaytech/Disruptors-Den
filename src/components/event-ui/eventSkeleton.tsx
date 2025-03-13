import { Skeleton } from "@/components/ui/skeleton";

export default function EventSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden border bg-card text-card-foreground shadow h-full">
      <Skeleton className="h-60 w-full" />
      <div className="p-4 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex justify-between">
          <div className="space-y-2 w-1/2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="space-y-2 w-1/3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
