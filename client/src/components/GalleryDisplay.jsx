import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const GalleryDisplay = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  // ... rest of your component
}
