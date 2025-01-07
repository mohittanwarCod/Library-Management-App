import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Automatically registers the chart.js components
import axios from "axios";
import { BASE_URL } from "../constant";

function Dashboard({ user }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [transactions, setTransactions] = useState([]); // Transactions state
  const [bookData, setBookData] = useState({
    labels: ["Total Books", "Available Books", "Borrowed Books"],
    datasets: [
      {
        label: "Books Statistics",
        data: [0, 0, 0], // Placeholder data
        backgroundColor: ["#3b82f6", "#10b981", "#f97316"],
        borderColor: ["#2563eb", "#059669", "#ea580c"],
        borderWidth: 1,
      },
    ],
  });

  // Calculate book statistics
  const getBookDataNumbers = (books) => {
    const total = books.length;
    const availableBooks = books.reduce(
      (acc, book) => acc + (book.availability ? 1 : 0),
      0
    );
    const borrowedBooks = total - availableBooks;

    return { total, availableBooks, borrowedBooks };
  };

  useEffect(() => {
    // Redirect logic
    const authenticated = user?._id;
    if (!authenticated) {
      return navigate("/login");
    }

    const userRole = user.role;
    if (userRole !== "admin") {
      return navigate("/");
    }

    // Fetch book data
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/books`);
        if (response.data.success) {
          const books = response.data.books;
          const { total, availableBooks, borrowedBooks } =
            getBookDataNumbers(books);

          // Update chart data dynamically
          setBookData((prev) => ({
            ...prev,
            datasets: [
              {
                ...prev.datasets[0],
                data: [total, availableBooks, borrowedBooks],
              },
            ],
          }));
        } else {
          console.error("Error fetching books");
        }
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };

    fetchBooks();
  }, [navigate, user]);

  // Handle date input
  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    setSelectedDate(e.target.value);
    setFormattedDate(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(`${BASE_URL}/api/v1/transaction/date`, {
        date: formattedDate,
      });
      // console.log(response.data.transactions);
      if (response.data.success) {
        setTransactions(response.data.transactions);
      } else {
        setTransactions([]);
        console.error("No transactions found for the selected date");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Left Panel - Statistics and Chart */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {bookData.datasets[0].data[0]}
            </h2>
            <p className="text-gray-500">Total Books</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {bookData.datasets[0].data[1]}
            </h2>
            <p className="text-gray-500">Available Books</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {bookData.datasets[0].data[2]}
            </h2>
            <p className="text-gray-500">Borrowed Books</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Books Statistics
          </h3>
          <Bar data={bookData} />
        </div>
      </div>

      {/* Right Panel - Date and Transactions */}
      <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Transactions
        </h3>
        <p className="text-gray-600 mb-6">
          Select a date to view transactions for that day.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-2"
            >
              Select Date:
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {formattedDate && (
            <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-lg">
              <p>
                Transactions for:{" "}
                <span className="font-bold">{formattedDate}</span>
              </p>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
          >
            Fetch Transactions
          </button>
        </form>

        {/* Transactions List */}
        <div className="mt-6 h-64 overflow-y-auto bg-gray-50 border rounded-lg p-4">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div
                key={transaction._id}
                className="mb-4 p-4 bg-white shadow rounded-lg"
              >
                <p>
                  <span className="font-semibold">Borrower:</span>{" "}
                  {transaction.user.name}
                </p>
                <p>
                  <span className="font-semibold">ContactInfo:</span>{" "}
                  {transaction.user.contactNumber}
                </p>
                <p>
                  <span className="font-semibold">Book:</span>{" "}
                  {transaction.book?.title}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {transaction.borrowDate || transaction.returnedDate}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
