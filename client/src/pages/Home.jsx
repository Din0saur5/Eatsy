import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-background1 bg-cover text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Explore the World Through Flavors</h1>
        <p className="text-xl mb-6">Discover new recipes and culinary inspirations daily.</p>
        <Link to="/search" className="btn btn-primary">Find Recipes</Link>
      </section>

      {/* Featured Recipes */}
      <section className="featured-recipes py-20">
        <h2 className="text-3xl text-center font-bold mb-6">Featured Recipes</h2>
        {/* Recipes grid or carousel goes here */}
      </section>

      {/* Categories Section */}
      <section className="categories py-20 bg-gray-100">
        <h2 className="text-3xl text-center font-bold mb-6">Browse by Category</h2>
        {/* Category cards go here */}
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-20">
        <h2 className="text-3xl text-center font-bold mb-6">What Our Users Say</h2>
        {/* Testimonials carousel goes here */}
      </section>

      {/* Blog Highlights */}
      <section className="blog-highlights py-20 bg-gray-100">
        <h2 className="text-3xl text-center font-bold mb-6">From Our Blog</h2>
        {/* Blog post previews go here */}
      </section>

      {/* Call to Action */}
      <section className="cta py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Foodie Family</h2>
          <p className="mb-6">Get the latest recipes and tips directly to your inbox.</p>
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
