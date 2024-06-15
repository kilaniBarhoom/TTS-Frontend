import { useCallback, useMemo, useRef } from "react";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "react-quill/dist/quill.snow.css";

const RichEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  // Editor ref
  const quill = useRef<QuillEditor | null>(null);

  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      if (input.files) {
        const file = input.files[0];
        const reader = new FileReader();

        // Read the selected file as a data URL
        reader.onload = () => {
          const imageUrl = reader.result;
          if (quill.current) {
            const quillEditor = quill.current.getEditor();

            // Get the current selection range and insert the image at that index
            const range = quillEditor.getSelection(true);
            quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
          }
        };

        reader.readAsDataURL(file);
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <QuillEditor
      ref={(el) => {
        quill.current = el;
      }}
      theme="snow"
      className="text-secondary-foreground"
      value={value}
      formats={formats}
      modules={modules}
      onChange={onChange}
    />
  );
};

export default RichEditor;
