import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';
import TestimonialsCarousel from '../components/TestimonialsCarousel';

const HomePage = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const server = import.meta.env.VITE_BACK_END_SERVE;

  useEffect(() => {
    fetch(`${server}/recipes/random`)
      .then(response => response.json())
      .then(data => setRandomRecipes(data))
      .catch(error => console.error('Error fetching random recipes:', error));
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="hero bg-background1 bg-cover text-center py-20">
      <section className="hero text-center py-20 bg-opacity-100">
        <div className="text-content">
          <h1 className="text-4xl font-bold mb-4">Explore the World Through Flavors</h1>
          <p className="text-xl mb-6">Discover new recipes and culinary inspirations daily.</p>
          <Link to="/meals" className="btn btn-primary">Find Recipes</Link>
        </div>
      </section>
      <section className="featured-recipes py-20">
        <h2 className="text-3xl text-center font-bold mb-6">Featured Recipes</h2>
        <div className="sm:ml-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {randomRecipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </section>
      <section className="testimonials py-20">
        <h2 className="text-3xl text-center font-bold mb-6">What Our Users Say</h2>
        <TestimonialsCarousel />
      </section>
      <section className="cta py-20 section-bg">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Foodie Family</h2>
          <p className="mb-6">Get the latest recipes and tips directly to your inbox.</p>
          <Link to="/login" className="btn btn-primary">Sign Up</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
