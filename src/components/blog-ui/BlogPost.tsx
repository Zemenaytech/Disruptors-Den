import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface BlogPostProps {
  title: string;
  summary?: string;
  author: string;
  content: string;
  imageUrl: string;
  updatedAt: string;
  showFullContent?: boolean;
  onReadMore?: () => void;
}

export function BlogPost({
  title,
  summary,
  content,
  author,
  imageUrl,
  updatedAt,
  showFullContent = false,
  onReadMore,
}: BlogPostProps) {
  // Format date
  const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="space-y-6">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        width={800}
        height={400}
        className="w-full h-auto rounded-lg object-cover"
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#00144b] dark:text-white">
          {title}
        </h2>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span>By {author}</span>
          <span className="mx-2">•</span>
          <time dateTime={updatedAt}>{formattedDate}</time>
        </div>

        {showFullContent ? (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="prose max-w-none dark:prose-invert"
          />
        ) : (
          <div>
            <p className="text-gray-700 dark:text-gray-300">{summary}</p>
            <Button
              onClick={onReadMore}
              className="mt-4 bg-[#00144b] hover:bg-[#002580] text-white"
            >
              Read More
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
