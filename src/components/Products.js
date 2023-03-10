import ProductItem from "./ProductItem";

const Products = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <ProductItem product={product} key={product.id}></ProductItem>
      ))}
    </>
  );
};

export default Products;
