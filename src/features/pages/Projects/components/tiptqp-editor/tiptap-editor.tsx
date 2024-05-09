import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menubar";

export default function TiptapEditor({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit.configure({})],
    content: description,
    editorProps: {
      attributes: {
        class:
          "rounded-md border border-border min-h-[200px] p-2 focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-foreground",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
