import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menubar";

export default function TiptapEditor({
  content,
  onChange,
  error,
}: {
  content: string;
  onChange: (richText: string) => void;
  error?: boolean;
}) {
  const editor = useEditor({
    extensions: [StarterKit.configure({})],
    content: content,
    editorProps: {
      attributes: {
        class: `rounded-md rounded-t-none outline-none ring-0  min-h-[200px] p-2 text-foreground ${
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
