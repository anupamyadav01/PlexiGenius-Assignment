import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../../../axiosConfig";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllCustomers = async () => {
      try {
        const { data } = await axiosInstance.get("/customer/getCustomers");
        const formattedData = data.map((customer) => ({
          id: customer._id,
          name: customer.name,
          email: customer.email,
          contact: customer.contact || "N/A",
          products: customer.productsPurchased
            .map((item) => `Product ID: ${item.productId}`)
            .join(", "),
        }));
        setCustomers(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setLoading(false);
      }
    };

    getAllCustomers();
  }, []);

  const handleSearchChange = (e) => {
    setFilterText(e.target.value.toLowerCase());
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(filterText) ||
      customer.email.toLowerCase().includes(filterText)
  );

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Customer Management
      </h1>

      <div className="flex justify-center mb-6">
        <div className="relative w-full sm:w-1/2 md:w-1/3">
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={filterText}
            onChange={handleSearchChange}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-3 text-gray-500">
            <SearchIcon />
          </div>
        </div>
      </div>

      <div className="overflow-hidden shadow-md rounded-lg bg-white max-w-screen-lg mx-auto relative">
        {loading && (
          <div className="absolute inset-0 bg-gray-500 opacity-10 backdrop-blur-md z-10"></div>
        )}

        {loading ? (
          <table className="table-auto w-full">
            <thead className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white">
              <tr className="border-b py-6">
                <th className="px-4 py-4 text-base text-left font-semibold">
                  Customer Name
                </th>
                <th className="px-4 py-4 text-base text-left font-semibold">
                  Email Address
                </th>
                <th className="px-4 py-4 text-base text-left font-semibold">
                  Contact Number
                </th>
                <th className="px-4 py-4 text-base text-left font-semibold">
                  Products Purchased
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <tr
                    key={index}
                    className="border-b odd:bg-gray-100 even:bg-gray-200"
                  >
                    <td className="px-4 py-4 text-sm sm:text-base">
                      <div className="w-32 h-5 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-4 text-sm sm:text-base">
                      <div className="w-48 h-5 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-4 text-sm sm:text-base">
                      <div className="w-32 h-5 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-4 text-sm sm:text-base">
                      <div className="w-48 h-5 bg-gray-300 rounded"></div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : filteredCustomers.length > 0 ? (
          <table className="table-auto w-full">
            <thead className="w-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white">
              <tr className="border-b py-6 w-full">
                <th className="px-4 py-4  text-base font-semibold">
                  Customer Name
                </th>
                <th className="px-4 py-4 text-base  font-semibold">
                  Email Address
                </th>
                <th className=" py-4 text-base  font-semibold">
                  Contact Number
                </th>
                <th className="px-4 py-4 text-base font-semibold">
                  Products Purchased
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer._id}
                  className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-50 border "
                >
                  <td className="px-4 py-2 text-sm sm:text-base">
                    {customer.name}
                  </td>
                  <td className="px-4 py-2 text-sm sm:text-base">
                    {customer.email}
                  </td>
                  <td className="px-4 py-2 text-sm sm:text-base">
                    {customer.contact}
                  </td>
                  <td className="px-4 py-2 text-sm sm:text-base">
                    {customer.products}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">
            No customers found. Please refine your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Customer;
