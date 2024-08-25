import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../features/products/productSlice";
import { ProductCarousal } from "../components/ProductCarousal";
import RatingMUI from "../components/RatingMUI";
import pay from "../assets/pay.png";
import profileFallback from "../assets/profile-fallback.svg";
import { Rating, Progress } from "@material-tailwind/react";

function ViewProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  console.log({ product, isLoading, isError, message });

  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, "0"); // Get day and pad with '0' if necessary
    const month = newDate.toLocaleString("en-US", { month: "long" }); // Get full month name
    const year = newDate.getFullYear(); // Get full year

    return `${day} ${month} ${year}`;
  };
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
    <div className="grid gap-6 py-8">
      {/* <h1 className="text-2xl font-semibold">{product.title}</h1> */}
      <div className="grid grid-cols-2 place-items-center">
        <div className="flex justify-center">
          <ProductCarousal images={product.images} />
        </div>
        <div className="text-base grid gap-4 px-10">
          

          {/* add new */}
          <div className="tiles">
            <h1 className="font-semibold lg:text-2xl md:text-2xl text-xl">
              {product?.title}
            </h1>
          </div>

          <div className="tiles grid gap-2">
            <p className="font-semibold text-xl">${product?.price}</p>
            <div className="flex gap-2">
              {product && product.totalrating && (
                <RatingMUI rating={product?.totalrating} />
              )}
              <p className="text-gray-500">
                ({product?.ratings?.length}) Reviews
              </p>
            </div>
          </div>

          <div className="tiles flex flex-col gap-1">
            <div className="flex gap-12 text-lg">
              <div className="font-semibold  capitalize w-32">category:</div>
              <div className="capitalize w-full text-left font-semibold text-gray-700">
                {product.category}
              </div>
            </div>
            <div className="flex gap-12 text-lg">
              <div className="font-semibold  capitalize w-32">brand:</div>
              <div className="capitalize w-full text-left font-semibold text-gray-700">
                {product.brand}
              </div>
            </div>
            <div className="flex gap-12 text-lg">
              <div className="font-semibold  capitalize w-32">qt. left:</div>
              <div className="capitalize w-full text-left font-semibold text-gray-700">
                {product.quantity}
              </div>
            </div>

            {/* color */}
            <div className="flex gap-12 text-lg my-3">
              <div className="font-semibold capitalize w-32">colors:</div>
              <div className="capitalize w-full text-left font-semibold text-gray-700 flex gap-1 flex-wrap">
                {product?.color?.map((ele) => (
                  <div
                    key={ele._id}
                    className="w-7 h-7 rounded-full cursor-pointer "
                    style={{ backgroundColor: `${ele.color}` }}
                  ></div>
                ))}
              </div>
            </div>
            {/* tags */}
            <div className="flex gap-12 text-lg my-3">
              <div className="font-semibold  capitalize w-32">tags:</div>
              <div className="flex flex-wrap gap-4 items-center w-full text-left font-semibold text-gray-700">
                {product.tags?.map((ele) => (
                  <span className="bg-[#FF9199] text-white px-4 rounded-full text-center">
                    {ele + " "}
                  </span>
                ))}
              </div>
            </div>

            {/* availability */}
            <div className="flex gap-12 text-lg">
              <div className="font-semibold  capitalize w-32">
                availability:
              </div>
              <div className="capitalize w-full text-left font-semibold text-gray-700">
                {product.quantity > 0 ? "instock" : "out of stock"}
              </div>
            </div>

            {/* listing date */}
            <div className="flex gap-12 text-lg">
              <div className="font-semibold  capitalize w-32">listed on:</div>
              <div className="capitalize w-full text-left font-semibold text-gray-700">
                {new Date(product?.createdAt).toLocaleString()}
              </div>
            </div>
            {/* updated date */}
            <div className="flex gap-12 text-lg">
              <div className="font-semibold  capitalize w-32">Updated on:</div>
              <div className="capitalize w-full text-left font-semibold text-gray-700">
                {new Date(product?.updatedAt).toLocaleString()}
              </div>
            </div>

            <div className="py-[1rem] grid place-items-center gap-4">
              <h1 className=" font-semibold capitalize">payment methods</h1>
              <img src={pay} />
            </div>
          </div>
        </div>
      </div>
      
      {/* discription section */}
      {product?.description ? (
          <section className="lg:mx-10 md:mx-4 sm:mx-2 mt-6">
            <h1 className="font-semibold text-2xl my-2">Description</h1>
            <div className="bg-white rounded-md p-5 text-sm text-justify grid gap-5">
              <p dangerouslySetInnerHTML={{ __html: product.description }} />
              <p>
                Waiting and watching. It was all she had done for the past
                weeks. When you’re locked in a room with nothing but food and
                drink, that’s about all you can do anyway. She watched as birds
                flew past the window bolted shut. She couldn’t reach it if she
                wanted too, with that hole in the floor. She thought she could
                escape through it but three stories is a bit far down. He read
                about a hike called the incline in the guidebook. It said it was
                a strenuous hike and to bring plenty of water. “A beautiful hike
                to the clouds” described one review. “Not for the
                faint-hearted,” said another. “Not too bad of a workout”,
                bragged a third review. I thought I’d hike it when I fly in from
                Maryland on my day off from the senior citizen's wellness
                conference. I hiked 2 miles a day around the neighborhood so I
                could handle a 1.1-mile hike. What a foolish mistake that was
                for a 70-year-old low-lander.
              </p>
            </div>
          </section>
        ) : (
          ""
        )}

      {/* product - ratings */}
      <div className="lg:mx-10 md:mx-4 sm:mx-2 mt-6">
        {product &&
          product?.ratings?.map((ele) => (
            <div
              className="grid gap-5 py-6"
              style={{ borderBottom: "1px solid #ccc" }}
            >
              <div>
                <Rating value={ele.star} readonly />
              </div>
              <p>{ele.comment}</p>
              <div className="flex items-center gap-4">
                <div
                  style={{ border: "1px solid orange" }}
                  className="rounded-lg p-[1px]"
                >
                  <img
                    src={ele?.postedby?.imgpath?.url || profileFallback}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </div>
                <div className="">
                  <p className="font-semibold">{ele?.postedby?.name}</p>
                  <p className="text-gray-600">{formatDate(ele?.date)}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ViewProduct;
