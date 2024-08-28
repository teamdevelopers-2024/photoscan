
import CarouselHome from "../../components/Carousel/CarouselHome";
import FeaturedProducts from "../../components/featuredProducts/FeaturedProducts";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import OfferBanner from "../../components/offerBanner/OfferBanner";
import OnlinePurchase from "../../components/onlinePurchase/OnlinePurchase";
import { useDispatch ,useSelector } from "react-redux";


export default function HomePage(){
    const user = useSelector((state)=> state.user.user)
    console.log('this is user data : ', user)
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