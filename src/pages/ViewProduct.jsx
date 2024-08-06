import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../features/products/productSlice";
import { ProductCarousal } from "../components/ProductCarousal";

function ViewProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  console.log({ product, isLoading, isError, message });

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
    <div className="grid gap-6 py-8">
      <h1 className="text-2xl font-semibold">{product.title}</h1>
      <div className="grid grid-cols-2 place-items-center">
        <div className="flex justify-center">
          <ProductCarousal images={product.images} />
        </div>
        <div className="text-base grid gap-4">
          <div className="flex items-center gap-4">
            <div className="w-24 text-left font-semibold">Brand:</div>
            <div className="flex-1 text-left">{product.brand}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-left font-semibold">Category:</div>
            <div className="flex-1 text-left">{product.category}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-left font-semibold">Color:</div>
            <div className="flex-1 flex gap-2">
              {product && product.color && product.color.length > 0 ? (
                product.color.map((ele) => (
                  <div
                    key={ele._id}
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: ele.color }}
                  ></div>
                ))
              ) : (
                <div>No colors available</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-left font-semibold">Price:</div>
            <div className="flex-1 text-left">${product.price}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-left font-semibold">Quantity:</div>
            <div className="flex-1 text-left">{product.quantity}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-left font-semibold">Created At:</div>
            <div className="flex-1 text-left">{new Date(product.createdAt).toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-left font-semibold">Updated At:</div>
            <div className="flex-1 text-left">{new Date(product.updatedAt).toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div
        className="bg-white p-4 mt-6"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
    </div>
  );
}

export default ViewProduct;
