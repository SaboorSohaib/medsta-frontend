import AllProducts from "./customComponents/AllProducts";
import Blogs from "./customComponents/Blogs";
import Categories from "./customComponents/Categories";
import HomePageBanner from "./customComponents/HomePageBanner";
import Service from "./customComponents/Service";

const Home = () => {
  return (
    <main className="bg-gray-100">
      <HomePageBanner isHome={true} />
      <Categories />
      <AllProducts
        title="Bes Deals This Week!"
        subtitle="A virtual assistant collects the product from your list"
        isHomePage={true}
      />
      <Blogs />
      <Service />
    </main>
  );
};
export default Home;
