import axios from "axios";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";

function ProducPage({ product }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    const res = await axios.delete("/api/products/" + id);
    router.push("/");
  };

  return (
    <Layout>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>

      <button
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded"
        onClick={() => handleDelete(product.id)}
      >
        DELETE
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 ml-2 text-white px-3 py-2  rounded"
        onClick={() => router.push("/products/edit/" + product.id)}
      >
        EDIT
      </button>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { data: product } = await axios.get(
    "http://localhost:3000/api/products/" + context.query.id
  );

  return {
    props: {
      product,
    },
  };
};

export default ProducPage;
