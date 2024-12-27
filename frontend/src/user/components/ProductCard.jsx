/* eslint-disable react/prop-types */

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-yellow-500">
          ⭐ {product.rating} ({product.reviews} reviews)
        </span>
        <button
          onClick={() => onAddToCart(product?._id)}
          className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
