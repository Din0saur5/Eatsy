import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const testimonials = [
    {
        quote: "This site transformed the way I cook for my family. The recipes are easy to follow and always delicious!",
        name: "Jamie L.",
      },
      {
        quote: "I've found recipes here that I've never seen anywhere else. It's like a culinary adventure every time I visit!",
        name: "Rashid S.",
      },
      {
        quote: "Whenever I need dinner inspiration, I know where to come. Thanks for making cooking fun again!",
        name: "Samantha B.",
      },
      {
        quote: "The diversity of recipes is incredible. I've learned so much about other cultures through their cuisine.",
        name: "Daniel K.",
      },
      {
        quote: "As a beginner in the kitchen, the step-by-step recipes have been a lifesaver. I'm gaining confidence with each dish!",
        name: "Maria G.",
      },
      {
        quote: "The user reviews help me choose recipes that are sure to please. It's like having a community of foodie friends!",
        name: "Annette W.",
      },
      {
        quote: "The focus on healthy recipes that taste amazing has helped me keep my family's diet on track.",
        name: "Olivia R.",
      },
      {
        quote: "Every recipe I've tried has been a hit. This site is my go-to for entertaining guests!",
        name: "Chen L.",
      },
      {
        quote: "I used to be intimidated by cooking, but these recipes have made it so accessible and fun!",
        name: "Patricia N."
      },
      {
        quote: "The step-by-step photos are a game-changer for a visual learner like me. I've nailed every dish I've attempted.",
        name: "Avery T."
      },
      {
        quote: "The weekly meal plans have taken the stress out of my meal prep. So grateful for this resource!",
        name: "Jordan K."
      },
      {
        quote: "Who knew vegetarian dishes could be so rich and satisfying? I've found my go-to site for meatless Mondays.",
        name: "Chris D."
      },
      {
        quote: "Every time I host a dinner party, I turn to this site for impressive yet manageable recipes. It's never let me down!",
        name: "Morgan P."
      },
      {
        quote: "The desserts section is heavenly. I've become quite the baker thanks to these foolproof recipes!",
        name: "Leslie Q."
      },
      {
        quote: "As a busy parent, I appreciate the quick and easy recipes that still taste like I spent hours in the kitchen.",
        name: "Sam J."
      },
      {
        quote: "This site is a treasure trove for anyone looking to expand their cooking repertoire with international dishes.",
        name: "Devon C."
      },
      {
        quote: "Every single recipe I've tried has been a hit. My family thinks I've taken secret cooking classes!",
        name: "Alexis R."
      },
      {
        quote: "I'm constantly amazed by the variety of recipes and the depth of flavors in each dish.",
        name: "Taylor M."
      },
      {
        quote: "Finding this website has made cooking at home an experience we look forward to as a couple.",
        name: "Dana B."
      },
      {
        quote: "The recipes are not only delicious but also beautifully presented. It's like reading a high-end cooking magazine!",
        name: "Elliott W."
      },
      {
        quote: "I appreciate the focus on healthy eating without compromising on flavor. This site really gets it right.",
        name: "Casey F."
      },
      {
        quote: "The user comments and tips on each recipe are incredibly helpful. It's like having a community of chefs in my kitchen!",
        name: "Bailey S."
      },
      {
        quote: "I've discovered so many new favorite spices and ingredients thanks to these innovative recipes.",
        name: "Riley K."
      },
      {
        quote: "Cooking used to be a chore, but now it's my favorite part of the day thanks to these inspiring recipes.",
        name: "Drew A."
      },
      {
        quote: "I love how the recipes cater to different skill levels. There's something for everyone here.",
        name: "Cameron T."
      },
      {
        quote: "The fusion recipes are incredible – I love experimenting with different cuisine styles!",
        name: "Parker O."
      },
];

const TestimonialsCarousel = () => {
  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      interval={6100}
      transitionTime={1000}
    >
      {testimonials.map((testimonial, index) => (
        <div key={index} className="my-4 text-center">
          <blockquote className="mx-auto mb-4 max-w-2xl text-lg italic">
            “{testimonial.quote}”
          </blockquote>
          <p className="text-md font-bold">{testimonial.name}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default TestimonialsCarousel;
