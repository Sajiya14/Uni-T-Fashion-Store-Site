import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import SizeChartImage from "../assets/Product Images/size chart.png";
import Footer from "./Footer";
import { useSingleProduct } from "../hooks/ProductsHook/useSingleProduct";
import { useAddToCart } from "../hooks/Cart Hook/useAddToCart";

const ProductDetailsPage = () => {

  const { id } = useParams();
  const { product, isLoading, error } = useSingleProduct(id);

  const { addToCart, loading: addingToCart, error: cartError } = useAddToCart();

  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState("");

  const [quantity, setQuantity] = useState(1);

  const effectiveSelectedSize = selectedSize || product?.sizes?.[0] || "";

  const priceFormatter = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formatPrice = (amount) => `Rs. ${priceFormatter.format(amount)}`;

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (isLoading) return <p className="p-6 text-lg">Loading product...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!product) return <p className="p-6 text-lg">Product not found</p>;

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    if (!effectiveSelectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(
      product._id, 
      quantity, 
      effectiveSelectedSize, 
      product.colorName[0],
    {
      title: product.title,
      images: product.images, // can be array or first image
      price: product.price
    });
  };

  return (
    <div className="mx-auto pt-40">
      <div className="ml-5 mt-5">
        <button
          onClick={() => navigate(-1)}
          className="text-black inline-flex items-center justify-center hover:underline"
        >
          <IoIosArrowBack />
          <span className="ml-1 text-base font-bold">Back Previous Page</span>
        </button>
      </div>

      <div className="mt-10 flex flex-col md:flex-row max-w-8xl mx-auto gap-8">
        {/* --- Thumbnail --- */}
        <div className="ml-7 mt-3 px-3 w-30 justify-center items-center h-28.75 border-black border-2">
          <img
            src={`http://localhost:9000${product.images}`}
            alt={product.title || "Product"}
            className="h-27.5 object-cover"
          />
        </div>

        {/* --- Main Image --- */}
        <div className="md:w-2/5 w-full p-8 md:p-3 h-full">
          <img
            src={`http://localhost:9000${product.images}`}
            alt={product.title || "Product"}
            className="w-full object-cover"
          />
        </div>

        {/* --- Product Info --- */}
        <div className="md:w-2/4 mr-10 w-full md:h-screen md:sticky md:top-40">
          <h2 className="text-3xl font-semibold">{product.title}</h2>

          <p className="font-medium text-gray-600 mt-5">
            Brand: <span className="text-gray-600 pl-1">{product.brand}</span>
          </p>

          <p className="font-medium text-gray-600 mt-3">
            SKU: <span className="text-gray-600 pl-1">{product.sku}</span>
          </p>

          <p className="text-gray-600 mt-3 font-medium">
            Availability:
            <span className="text-green-600 pl-1">{product.availability}</span>
          </p>

          <p className="text-3xl mt-5 font-bold">{formatPrice(product.price)}</p>
          <p className="text-gray-500 mt-5 text-base">{product.description}</p>

          <p className="font-medium mt-5">
            Color:
            <span className="text-gray-700 pl-1">{product.colorName}</span>
          </p>

          <div className="mt-3 flex group items-center gap-3">
            <div className="relative group">
              <div className="w-9 h-9 border border-gray-800 rounded flex bg-white items-center justify-center">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: product.color }}
                ></div>
              </div>
            </div>
          </div>

          {/* --- Size Guide --- */}
          <div className="flex mt-5 items-center">
            <img
              src={SizeChartImage}
              alt="Size chart"
              className="w-7.5 object-cover"
            />
            <span className="ml-2 text-gray-600 cursor-pointer hover:underline hover:text-black">
              Size Guide
            </span>
          </div>

          {effectiveSelectedSize && (
            <p className="font-medium mb-1 mt-5">
              Size: <span className="text-gray-700">{selectedSize}</span>
            </p>
          )}

          {/* --- Size Buttons --- */}
          <div className="flex mt-5 gap-2">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border ${
                  effectiveSelectedSize === size
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          

          <p className="font-medium text-gray-600 mt-5">
            Subtotal:{" "}
            <span className="text-gray-600">
              {formatPrice(totalPrice)}
            </span>
          </p>

          {/* --- Quantity + Add to Cart --- */}
          <div className="flex items-center mt-5 gap-4">
            <div className="relative">
              <span>Quantity: </span>
              <div className="flex mt-2 items-center border w-fit rounded-lg">
                <button
                  className="px-4 py-2 text-xl rounded-l-lg hover:bg-gray-100"
                  onClick={decreaseQty}
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  className="px-4 py-2 text-xl rounded-r-lg hover:bg-gray-100"
                  onClick={increaseQty}
                >
                  +
                </button>
              </div>
            </div>

            <button 
              className="bg-black w-1/2 text-white ml-14 px-4 py-3 mt-5 rounded-full font-semibold"
              onClick={handleAddToCart}>
                {addingToCart ? "Adding..." : "Add to Cart"}
            </button>
            {cartError && <p className="text-red-600 mt-2">{cartError}</p>}
          </div>
        </div>
      </div>

      <section className="mt-10">
        <Footer />
      </section>
    </div>
  );
};

export default ProductDetailsPage;

