import axios from "axios";
import { Layout } from "../components/Layout";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

function Home({ products }) {
  const renderProduct = () => {

    if (products.length > 0) {
      return products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))
    }else{
      return <h1 className=" text-center text-2x1 font-bold">No products yet</h1>
    }
    

  }


  return (
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderProduct()}
      </div>
    </Layout>
  );
}
export const getServerSideProps = async (contex) => {
  const { data: products } = await axios.get(
    "http://localhost:3000/api/products"
  );
  return {
    props: {
      products,
    },
  };
};

export default Home;
