import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import AboutUsSection from '../../components/AboutUsSection/AboutUsSection';
import AboutUsSection1 from '../../components/AboutUsSection1/AboutUsSection1';


export default function Aboutus() {
    const newsData = [
        {
          id: 1,
          date: "12 February 2023",
          title: "What Curling Irons Are The Best Ones",
          image: "https://i.postimg.cc/2y6wbZCm/news1.jpg",
          link: "https://www.vogue.com/article/best-curling-irons",
        },
        {
          id: 2,
          date: "17 February 2023",
          title: "The Health Benefits Of Sunglasses",
          image: "https://i.postimg.cc/9MXPK7RT/news2.jpg",
          link: "https://www.rivieraopticare.com/blog/314864-the-health-benefits-of-wearing-sunglasses_2/",
        },
        {
          id: 3,
          date: "26 February 2023",
          title: "Eternity Bands Do Last Forever",
          image: "https://i.postimg.cc/x1KKdRLM/news3.jpg",
          link: "https://www.briangavindiamonds.com/news/eternity-bands-symbolize-love-that-lasts-forever/",
        },
      ];
  return (
    <>
    <Header/>
    <AboutUsSection1/>
    <AboutUsSection/>
    <section id="news" className="py-12 bg-gray-50">
      <div className="text-center mb-12">
        <p className="text-pink-600 font-semibold text-sm uppercase">LATEST NEWS</p>
        <h2 className="text-3xl font-bold text-gray-900">Fashion New Trends</h2>
      </div>
      <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
        {newsData.map((news) => (
          <div 
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
              <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline text-sm">read more</a>
            </div>
          </div>
        ))}
      </div>
    </section>
    <Footer/>
    </>
  )
}

