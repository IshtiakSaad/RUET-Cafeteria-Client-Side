import { useNavigate } from "react-router-dom";
import MealsList from "../../components/MealsList";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Meals = () => {
  const navigate = useNavigate();
  const [mealsData, setMealsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("ascending");

  const fetchData = async () => {
    try {
      const params = {
        searchQuery,
        category,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        page,
        limit: 10,
      };

      const mealsResponse = await axios.get("https://ruet-hostel.vercel.app/meals", { params });
      let availableMeals = mealsResponse.data.filter(meal => meal.status === "Available");

      if (availableMeals.length < 10) {
        setHasMore(false);
      }

      setMealsData((prevData) => {
        const uniqueMeals = [...prevData];
        availableMeals.forEach(meal => {
          if (!uniqueMeals.some(existingMeal => existingMeal._id === meal._id)) {
            uniqueMeals.push(meal);
          }
        });
        return uniqueMeals;
      });
    } catch (error) {
      console.error("Error fetching meals data:", error);
      setError("Failed to load meals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMealsData([]);
    setHasMore(true);
    setPage(1);
  }, [searchQuery, category, priceRange, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [page, searchQuery, category, priceRange]);

  const handleDetails = (id) => {
    navigate(`/meals/${id}`);
  };

  const sortedMeals = [...mealsData].sort((a, b) => {
    return sortOrder === "ascending" ? a.price - b.price : b.price - a.price;
  });

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading meals...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-11/12 min-h-screen md:w-3/4 mx-auto py-8">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        View All Meals
      </h1>

      {/* Search, Filter, and Sorting Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search meals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
        >
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <div className="w-full md:w-1/3">
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
            className="w-full"
          />
          <span>
            Price: ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
        >
          <option value="ascending">Sort by Price: Low to High</option>
          <option value="descending">Sort by Price: High to Low</option>
        </select>
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={sortedMeals.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
        endMessage={<div className="text-center my-10">You've Reached the End of Collection</div>}
        scrollThreshold={0.9}
      >
        <MealsList meals={sortedMeals} onMealDetails={handleDetails} />
      </InfiniteScroll>
    </div>
  );
};

export default Meals;
