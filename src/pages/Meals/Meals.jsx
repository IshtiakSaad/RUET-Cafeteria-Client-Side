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
  const [hasMore, setHasMore] = useState(true); // Flag to check if there are more meals to load
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [page, setPage] = useState(1); // Track the current page

  const fetchData = async () => {
    try {
        const params = {
            searchQuery,           // Send the search query
            category,              // Send the category filter
            minPrice: priceRange[0], // Send the minPrice from the price range
            maxPrice: priceRange[1], // Send the maxPrice from the price range
            page,                  // Send the current page for pagination
            limit: 10,             // Limit the number of results per page
        };

        const mealsResponse = await axios.get("http://localhost:3000/meals", { params });
        const availableMeals = mealsResponse.data.filter(
            (meal) => meal.status === "Available"
        );

        if (availableMeals.length < 10) {
            setHasMore(false); // No more meals to load
        }

        // Filter out duplicates from existing mealsData
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


  // Trigger data fetch when page or filters change
  useEffect(() => {
    setMealsData([]); // Reset the meals data when filters change
    setHasMore(true);  // Reset the hasMore flag when filters change
    setPage(1);        // Reset page to 1 when filters change
  }, [searchQuery, category, priceRange]); // Dependency array includes filters

  useEffect(() => {
    fetchData();
  }, [page, searchQuery, category, priceRange]); // Trigger fetchData when filters or page change

  const handleDetails = (id) => {
    navigate(`/meals/${id}`);
  };

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

      {/* Search and Filter Controls */}
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
          {/* Add more categories as needed */}
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
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={mealsData.length}
        next={() => setPage((prevPage) => prevPage + 1)} // Increment page to load next set of meals
        hasMore={hasMore}
        loader={<div>Loading...</div>}
        endMessage={<div className="text-center my-10">You've Reached the End of Collection</div>}
        scrollThreshold={0.9} // Load more when 90% of the page is scrolled
      >
        <MealsList meals={mealsData} onMealDetails={handleDetails} />
      </InfiniteScroll>
    </div>
  );
};

export default Meals;
