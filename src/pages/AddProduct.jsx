import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button, Input, Select } from "@material-tailwind/react";
import {Select as ANTDSelect} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../features/brands/brandsSlice";
import { getAllProductsCategory } from "../features/productCategory/productCategorySlice";
import { getAllColors } from "../features/color/colorSlice";
import { createProduct } from "../features/products/productSlice";



function AddProduct({ placeholder }) {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState([]);

  console.log(title, description, price, quantity, brand, category, color);

  const dispatch = useDispatch();

  const { brands } = useSelector((state) => state.brands);
  const { productsCategory } = useSelector((state) => state.productCategory);
  const { colors } = useSelector((state) => state.colors);

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllProductsCategory());
    dispatch(getAllColors());
  }, [dispatch]);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  const handleChange = (value) => {
    setColor([...value]);
  };

  const handleAddProduct = () => {
    dispatch(
      createProduct({
        title,
        description,
        price,
        quantity,
        brand,
        category,
        color,
      })
    );
  };

  /* upload */

  const colorOptions = colors.map((color) => ({
    label: color.color,
    value: color._id,
    render: () => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: color.color,
            marginRight: "8px",
            borderRadius: "50%",
          }}
        ></div>
        <span style={{ color: "black" }}>{color.color}</span>
      </div>
    ),
  }));

  return (
    <div>
      <h1 className="text-4xl font-semibold">Add Product</h1>
      <form className="grid gap-8 mt-8">
        <div className="w-full grid gap-6">
          <Input
            label="Enter Product Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <JoditEditor
            ref={editor}
            value={description}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onChange={(value) => setDescription(value)}
          />
          <Input
            label="Enter Product Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Enter Product Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="w-full">
            <Select
              label="Select Brand"
              value={brand}
              onChange={(value) => setBrand(value)}
            >
              {brands &&
                brands.map((brand) => (
                  <Select.Option key={brand._id} value={brand.title}>
                    {brand.title}
                  </Select.Option>
                ))}
            </Select>
          </div>
          <div className="w-full">
            <Select
              label="Select Category"
              value={category}
              onChange={(value) => setCategory(value)}
            >
              {productsCategory &&
                productsCategory.map((category) => (
                  <Select.Option key={category._id} value={category.title}>
                    {category.title}
                  </Select.Option>
                ))}
            </Select>
          </div>
          <div className="w-full">
            <ANTDSelect
              mode="multiple"
              style={{
                width: "100%",
                height: "2.6rem",
                backgroundColor: "#F5F5F5",
              }}
              placeholder="Select Colors"
              onChange={handleChange}
              options={colorOptions.map((option) => ({
                value: option.value,
                label: option.render(),
              }))}
            />
          </div>
          {/* upload */}
          <div>
            
          </div>
        </div>
        <div>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
