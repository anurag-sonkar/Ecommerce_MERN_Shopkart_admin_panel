import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

function AddProduct({ placeholder }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  const props = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <div>
      <h1 className="text-4xl font-semibold">Add Product</h1>
      <form className="grid gap-8 mt-8">
        <div className="w-full grid gap-6">
          <Input label="Enter Product Title" type="text"/>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
          <Input label="Enter Product Price" />
          <Input label="Enter Product Quantity" type="number"/>
          <div className="w-full">
            <Select label="Select Brand">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
            </Select>
          </div>
          <div className="w-full">
            <Select label="Select Category">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
            </Select>
          </div>
          <div className="w-full">
            <Select label="Select Color">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
            </Select>
          </div>
          {/* upload */}
      <div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </div>
        </div>
        <div>
          <Button>Add Product</Button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
