
import CarouselHome from "../../components/Carousel/CarouselHome";
import FeaturedProducts from "../../components/featuredProducts/FeaturedProducts";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import OfferBanner from "../../components/offerBanner/OfferBanner";
import OnlinePurchase from "../../components/onlinePurchase/OnlinePurchase";


export default function HomePage(){
    return(
        <>
        <Header />
        <CarouselHome />
        <FeaturedProducts />
        <OfferBanner />
        {/* <OnlinePurchase /> */}
        <Footer />
        </>
        
    )
}