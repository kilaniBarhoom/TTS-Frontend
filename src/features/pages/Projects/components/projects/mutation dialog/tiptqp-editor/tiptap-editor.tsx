import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menubar";
import Heading from "@tiptap/extension-heading";

export default function TiptapEditor({
  discription,
  onChange,
}: {
  discription: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "text-2xl font-bold",
        },
      }),
    ],
    content: discription,
    editorProps: {
      attributes: {
        class:
          "rounded-md border border-border min-h-[100px] p-2 focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-foreground",
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
