
import CarouselHome from "../components/Carousel/CarouselHome";
import FeaturedProducts from "../components/featuredProducts/FeaturedProducts";
import OfferBanner from "../components/offerBanner/OfferBanner";
import OnlinePurchase from "../components/onlinePurchase/OnlinePurchase";
import Footer from "../Footer/footer";
import Header from "../Header/Header";

export default function HomePage(){
    return(
        <>
        <Header />
        <CarouselHome />
        <FeaturedProducts />
        <OfferBanner />
        <OnlinePurchase />
        <Footer />
        </>
        
    )
}