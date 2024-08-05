import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import JoditEditor from "jodit-react";
import { Button, Input, Select } from "@material-tailwind/react";
import { Select as ANTDSelect } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../features/brands/brandsSlice";
import { getAllProductsCategory } from "../features/productCategory/productCategorySlice";
import { getAllColors } from "../features/color/colorSlice";
import { createProduct } from "../features/products/productSlice";
import { useDropzone } from "react-dropzone";
import { deleteImages, uploadImages } from "../features/upload/uploadSlice";
import { RxCross2 } from "react-icons/rx";
import { toast ,Bounce} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";

function AddProduct({ placeholder }) {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState([]);

  // console.log(title, description, price, quantity, brand, category, color);
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const { brands } = useSelector((state) => state.brands);
  const { productsCategory } = useSelector((state) => state.productCategory);
  const { colors } = useSelector((state) => state.colors);
  const { uploads, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.imageUpload
  );
  
  const [images , setImages] = useState([])
  // console.log({ images, isLoading, isError, isSuccess, message });

  useEffect(
    ()=>{
      setImages(uploads)
    },[uploads]
  )
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
    const uploadPromise =  dispatch(
      createProduct({
        title,
        description,
        price,
        quantity,
        brand,
        category,
        color,
        images
      })
    ).unwrap();

    toast.promise(
      uploadPromise,
      {
        pending: 'Uploading product...',
        success: 'Upload product successful!',
        error: `Upload product failed!`
      },
      {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );

    uploadPromise.then(()=>{
      setTimeout(() => {
        navigate('/admin/products')
      }, 2500);
    })


  };

  /* upload */
  const onDrop = useCallback((acceptedFiles) => {
    const uploadPromise = dispatch(uploadImages(acceptedFiles)).unwrap();
    toast.promise(
      uploadPromise,
      {
        pending: 'Uploading...',
        success: 'Upload successful!',
        error: `Upload failed!`
      },
      {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );
  }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
    <div className="relative">
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
          <div className="w-full border-2 border-gray-400 text-gray-600 border-dashed min-h-32 flex justify-center items-center cursor-pointer text-2xl">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </div>

          {/* upload preview */}
          <div className="relative flex gap-5 flex-wrap">
            {uploads &&
              uploads.length !== 0 &&
              uploads.map((image) => (
                <div key={image.asset_id} className="object-contain relative">
                  <img src={image.url} alt="Uploaded" width={400} height={400} />
                  <div className="absolute -top-2 -right-2 bg-black rounded-full p-[2px] cursor-pointer" onClick={()=>dispatch(deleteImages(image.public_id))}><RxCross2 color="red" size={18}/></div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <Button onClick={handleAddProduct} className="min-w-32 flex justify-center" disabled={isLoading ? true : false}>{isLoading ? <ButtonLoader/> :  "Add Product"}</Button>
        </div>
      </form>

      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-50">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default AddProduct;
