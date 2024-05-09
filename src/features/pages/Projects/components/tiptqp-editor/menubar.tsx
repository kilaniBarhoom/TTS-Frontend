import { type Editor } from "@tiptap/react";
import { Bold, Code, Strikethrough, Heading, Italic, List } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

type MenuBarProps = {
  editor: Editor | null;
};

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold size={20}></Bold>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic size={20}></Italic>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => {
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough size={20}></Strikethrough>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("code")}
        onPressedChange={() => {
          editor.chain().focus().toggleCode().run();
        }}
      >
        <Code size={20}></Code>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
      >
        <Heading size={20}></Heading>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List size={20}></List>
      </Toggle>
    </div>
  );
};

export default MenuBar;
