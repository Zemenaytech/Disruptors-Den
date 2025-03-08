"use client";

import type React from "react";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  Highlighter,
  Quote,
  Minus,
  Code,
  Strikethrough,
  UnderlineIcon,
  LinkIcon,
  Link2OffIcon as LinkOff,
} from "lucide-react";

import "./rich-text-editor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  className,
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [showLinkMenu, setShowLinkMenu] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const linkInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-300 pl-4",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: "bg-gray-100 p-4 rounded font-mono text-sm",
          },
        },
        horizontalRule: {
          HTMLAttributes: {
            class: "my-4 border-t border-gray-300",
          },
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-200",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Underline.configure(),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-primary underline",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        validate: (url) => /^https?:\/\//.test(url),
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none",
      },
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  // Handler to prevent default behavior and stop propagation
  const handleBubbleButtonClick = (
    e: React.MouseEvent,
    callback: () => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
    // Keep focus in the editor
    editor?.chain().focus().run();
  };

  const setLink = useCallback(() => {
    if (!editor) return;

    // If no URL is provided, remove the link
    if (!linkUrl) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setShowLinkMenu(false);
      return;
    }

    // Check if the URL has a protocol, if not add https://
    const url =
      linkUrl.startsWith("http://") || linkUrl.startsWith("https://")
        ? linkUrl
        : `https://${linkUrl}`;

    // Update or add the link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setShowLinkMenu(false);
    setLinkUrl("");
  }, [editor, linkUrl]);

  const handleLinkKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLink();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setShowLinkMenu(false);
      setLinkUrl("");
    }
  };

  // Focus the input when the link menu is shown
  useEffect(() => {
    if (showLinkMenu && linkInputRef.current) {
      // Get the current link URL if there is one
      if (editor?.isActive("link")) {
        const attrs = editor.getAttributes("link");
        setLinkUrl(attrs.href || "");
      }

      setTimeout(() => {
        linkInputRef.current?.focus();
      }, 50);
    }
  }, [showLinkMenu, editor]);

  // Add a custom handler for link clicks
  useEffect(() => {
    if (editor) {
      // Add a click handler to all links in the editor
      const handleLinkClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const anchor = target.closest("a");

        if (anchor) {
          // Only handle clicks if we're not in editing mode or if the user is holding the Ctrl/Cmd key
          if (event.metaKey || event.ctrlKey) {
            event.stopPropagation();
            // Let the browser handle Ctrl/Cmd+click
            return;
          }

          event.preventDefault();
          event.stopPropagation();

          // Open the link in a new tab
          window.open(anchor.href, "_blank", "noopener,noreferrer");
        }
      };

      // Get the editor element
      const editorElement = document.querySelector(".ProseMirror");
      if (editorElement) {
        editorElement.addEventListener("click", handleLinkClick);

        return () => {
          editorElement.removeEventListener("click", handleLinkClick);
        };
      }
    }
  }, [editor]);

  if (!isMounted) {
    return null;
  }

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("rounded-md overflow-hidden", className)}>
      <div className="flex flex-wrap gap-1 p-2 border border-gray-200 rounded-t-md bg-gray-50">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("heading", { level: 1 }) &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Heading1 className="w-4 h-4" />
          <span className="sr-only">Heading 1</span>
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("heading", { level: 2 }) &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Heading2 className="w-4 h-4" />
          <span className="sr-only">Heading 2</span>
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("heading", { level: 3 }) &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Heading3 className="w-4 h-4" />
          <span className="sr-only">Heading 3</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("paragraph") &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Pilcrow className="w-4 h-4" />
          <span className="sr-only">Paragraph</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("bold") &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Bold className="w-4 h-4" />
          <span className="sr-only">Bold</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("italic") &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Italic className="w-4 h-4" />
          <span className="sr-only">Italic</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("underline") &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <UnderlineIcon className="w-4 h-4" />
          <span className="sr-only">Underline</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("strike") &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Strikethrough className="w-4 h-4" />
          <span className="sr-only">Strike</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("highlight") &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Highlighter className="w-4 h-4" />
          <span className="sr-only">Highlight</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <button
          type="button"
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
            } else {
              setShowLinkMenu(true);
            }
          }}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("link") &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {editor.isActive("link") ? (
            <LinkOff className="w-4 h-4" />
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}
          <span className="sr-only">
            {editor.isActive("link") ? "Remove Link" : "Add Link"}
          </span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive({ textAlign: "left" }) &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <AlignLeft className="w-4 h-4" />
          <span className="sr-only">Align left</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive({ textAlign: "center" }) &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <AlignCenter className="w-4 h-4" />
          <span className="sr-only">Align center</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive({ textAlign: "right" }) && "bg-gray-200"
          )}
        >
          <AlignRight className="w-4 h-4" />
          <span className="sr-only">Align right</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive({ textAlign: "justify" }) &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <AlignJustify className="w-4 h-4" />
          <span className="sr-only">Justify</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("blockquote") &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Quote className="w-4 h-4" />
          <span className="sr-only">Blockquote</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("bulletList") &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <List className="w-4 h-4" />
          <span className="sr-only">Bullet list</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("orderedList") &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <ListOrdered className="w-4 h-4" />
          <span className="sr-only">Ordered list</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("horizontalRule") &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Minus className="w-4 h-4" />
          <span className="sr-only">Horizontal rule</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(
            "px-2 py-1 rounded hover:bg-gray-200",
            editor.isActive("codeBlock") &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Code className="w-4 h-4" />
          <span className="sr-only">Code block</span>
        </button>
      </div>

      {/* Link Menu */}
      {showLinkMenu && (
        <div className="flex items-center gap-2 p-2 bg-gray-50 border-x border-b border-gray-200">
          <input
            ref={linkInputRef}
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={handleLinkKeyDown}
            placeholder="Enter URL"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            type="button"
            onClick={setLink}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setShowLinkMenu(false);
              setLinkUrl("");
            }}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          >
            Cancel
          </button>
        </div>
      )}

      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px] max-w-none focus-within:outline-none"
        style={{ outline: "none", border: "none" }}
      />

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex bg-white shadow-lg rounded-md border overflow-hidden">
            <button
              type="button"
              onMouseDown={(e) =>
                handleBubbleButtonClick(e, () =>
                  editor.chain().toggleBold().run()
                )
              }
              className={cn(
                "p-2 hover:bg-gray-100",
                editor.isActive("bold") &&
                  "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) =>
                handleBubbleButtonClick(e, () =>
                  editor.chain().toggleItalic().run()
                )
              }
              className={cn(
                "p-2 hover:bg-gray-100",
                editor.isActive("italic") &&
                  "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) =>
                handleBubbleButtonClick(e, () =>
                  editor.chain().toggleUnderline().run()
                )
              }
              className={cn(
                "p-2 hover:bg-gray-100",
                editor.isActive("underline") && "bg-gray-200"
              )}
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) =>
                handleBubbleButtonClick(e, () =>
                  editor.chain().toggleStrike().run()
                )
              }
              className={cn(
                "p-2 hover:bg-gray-100",
                editor.isActive("strike") &&
                  "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Strikethrough className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) =>
                handleBubbleButtonClick(e, () =>
                  editor.chain().toggleHighlight().run()
                )
              }
              className={cn(
                "p-2 hover:bg-gray-100",
                editor.isActive("highlight") &&
                  "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Highlighter className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (editor.isActive("link")) {
                  editor.chain().focus().unsetLink().run();
                } else {
                  setShowLinkMenu(true);
                }
              }}
              className={cn(
                "p-2 hover:bg-gray-100",
                editor.isActive("link") && "bg-gray-200"
              )}
            >
              {editor.isActive("link") ? (
                <LinkOff className="w-4 h-4" />
              ) : (
                <LinkIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </BubbleMenu>
      )}
    </div>
  );
}
