import { Carousel } from "@material-tailwind/react";

export function ProductCarousal({ images }) {
  return (
    <Carousel className="rounded-sm overflow-hidden w-full" autoplay loop>
      {images && images.map((image) => (
        <img
          key={image._id}
          src={image.url}
          alt="Product"
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
}