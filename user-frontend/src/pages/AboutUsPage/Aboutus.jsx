import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import AboutUsSection from '../../components/AboutUsSection/AboutUsSection';
import AboutUsSection1 from '../../components/AboutUsSection1/AboutUsSection1';
import img3 from "../../assets/aboutus/image3.png"
import img4 from "../../assets/aboutus/image4.png"
import img5 from "../../assets/aboutus/image5.png"



export default function Aboutus() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation
      easing: 'ease-out', // Easing function
      offset: 400, // Distance from the viewport when animation triggers
      once: true, // If true, animation happens only once
      // Add more options as needed
    });
  }, []);
    const newsData = [
        {
          id: 1,
          date: "",
          title: "momentos collection",
          image: img3,
          link: "https://www.vogue.com/article/best-curling-irons",
          delay:0
        },
        {
          id: 2,
          date: "",
          title: "Customised Frame Collections",
          image: img4,
          link: "https://www.rivieraopticare.com/blog/314864-the-health-benefits-of-wearing-sunglasses_2/",
          delay:400
        },
        {
          id: 3,
          date: "",
          title: "Customised Gift Collections",
          image: img5,
          link: "https://www.briangavindiamonds.com/news/eternity-bands-symbolize-love-that-lasts-forever/",
          delay:800
        },
      ];
  return (
    <>
    <Header/>
    <AboutUsSection1/>
    <AboutUsSection/>
    <section id="news" className="py-12 bg-gray-50">
      <div data-aos="fade-up" className="text-center mb-12">
        <p className="text-pink-600 font-semibold text-sm uppercase"></p>
        <h2 className="text-3xl font-bold text-gray-900">Our Collections</h2>
      </div>
      <div data-aos="fade-up" className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
        {newsData.map((news) => (
          <div
          data-aos="fade-up"
          data-aos-delay={news.delay} 
            key={news.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
            </div>
            <div className="p-6">
              <div className="text-gray-500 flex items-center mb-4">
                <i className="bx bxs-calendar text-xl mr-2"></i>
                <p className="text-sm">{news.date}</p>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{news.title}</h4>
              <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline text-sm">Go to collection</a>
            </div>
          </div>
        ))}
      </div>
    </section>
    <Footer/>
    </>
  )
}

