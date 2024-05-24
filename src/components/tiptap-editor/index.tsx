import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import MenuBar from "./menubar";

export default function TiptapEditor({
  content,
  onChange,
  error,
  placeholder,
}: {
  content: string;
  onChange: (richText: string) => void;
  error?: boolean;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Placeholder.configure({
        placeholder,
        emptyNodeClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-2 before:left-2 before:text-mauve-11 before:opacity-50 before-pointer-events-none",
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: `rounded-md rounded-t-none outline-0 focus:ring-2 focus:ring-ring  min-h-[200px] p-2 text-foreground ${
          error && "ring-2 ring-destructive/50"
        }`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="grid border border-border rounded-md">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
