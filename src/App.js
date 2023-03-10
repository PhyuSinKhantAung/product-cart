import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import Products from "./components/Products";
import CompaniesButton from "./components/CompaniesButton";
import CartContainerSideBar from "./components/CartContainerSideBar";
import AlertMessageModal from "./components/AlertMessageModal";

function App() {
  const [maintainedProducts, setMaintainedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpErrorMessage, setHttpErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://react-http-43832-default-rtdb.firebaseio.com/products.json"
      );
      if (!response.ok) {
        throw new Error("Oops, Something went wrong!");
      }

      const data = await response.json();

      let loadedProductsData = [];
      for (const key in data) {
        loadedProductsData.push({
          id: key,
          name: data[key].name,
          price: data[key].price,
          image: data[key].image,
          company: data[key].company,
        });
      }

      setProducts(loadedProductsData);
      setMaintainedProducts(loadedProductsData);

      const loadedCompaniesData = [
        "all",
        ...new Set(loadedProductsData.map((item) => item.company)),
      ];
      setCompanies(loadedCompaniesData);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHttpErrorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const itemsFilteredHandler = (companyname) => {
    if (companyname === "all") {
      setProducts(maintainedProducts);
      return;
    }
    const filteredProducts = maintainedProducts.filter(
      (item) => item.company === companyname
    );
    setProducts(filteredProducts);
  };

  if (isLoading) {
    return (
      <main className="App">
        <NavBar></NavBar>
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-6xl font-bold">Loading .....</h1>
        </div>
      </main>
    );
  }
  if (httpErrorMessage) {
    return (
      <main className="App">
        <NavBar></NavBar>
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-4xl font-bold">{httpErrorMessage}</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <AlertMessageModal></AlertMessageModal>
      <CartContainerSideBar></CartContainerSideBar>
      <NavBar></NavBar>\
      <section className=" grid md:grid-cols-5 py-2">
        <div className="  md:col-span-1 ">
          {/* CompaniesButtons */}
          <CompaniesButton
            companies={companies}
            filteredItems={itemsFilteredHandler}
          ></CompaniesButton>
        </div>
        <div className="  md:col-span-4 md:grid md:grid-cols-3 gap-5 md:p-10 p-4">
          {/* Products */}
          <Products products={products}></Products>
        </div>
      </section>
    </main>
  );
}

export default App;
