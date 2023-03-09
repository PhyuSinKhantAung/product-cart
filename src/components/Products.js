import { useGlobalContext } from "../assets/context";
import ProductItem from "./ProductItem";

const Products = ({ products }) => {
  return (
    <>
      {products.map((product, index) => (
        <ProductItem
          products={products}
          product={product}
          index={index}
          key={product.id}
        ></ProductItem>
      ))}
    </>
  );
};

export default Products;
