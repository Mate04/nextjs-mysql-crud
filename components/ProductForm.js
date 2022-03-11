import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function ProductForm() {
  /*step 2:
   *ALREADY HAVING THE VALUES OF THESE PROPERTIES,
   *WE STORE IT IN OBJECT TYPE {name:"", description:"", price:0}
   */
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const router = useRouter();

  const handleSubit = async (e) => {
    e.preventDefault();
    /*step 3:
     *WE PASS THIS PROPERTY TO THE FORM TAG AND WITH IT THE FORM
     *SENDS THE OBJECTS TO THE SERVER AND THEN TO THE DATABASE.
     */
    try {
      if (router.query.id) {
        await axios.put(`/api/products/${router.query.id}`, product);
        toast.success("Product updated successfully");
      } else {
        await axios.post("/api/products", product);
        toast.success("Product created successfully");
      }
      router.push("/");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  /* Step 1:
   *THIS FUNCTION IS TO GET THE VALUE OF THE FORM,
   *THEN USING the useEffect WITH THE PROPERTY
   *setProduct I PASS THE VALUES TO const product
   */
  const handleChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
  };
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`/api/products/${router.query.id}`);
      setProduct({
        name: data.name,
        description: data.description,
        price: data.price,
      });
    };

    if (router.query.id) {
      getProduct(router.query.id);
    }
  }, []);

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name:
        </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={product.name}
        />

        <label
          htmlFor="price"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          price
        </label>
        <input
          type="text"
          name="price"
          id="price"
          onChange={handleChange}
          className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={product.price}
        />

        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description:
        </label>
        <textarea
          name="description"
          rows="2"
          onChange={handleChange}
          className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={product.description}
        ></textarea>

        <button
          className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none 
        focus:shadow-outline font-bold text-white"
        >
          {router.query.id ? "Update" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
