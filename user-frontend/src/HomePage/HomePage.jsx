
import CarouselHome from "../components/Carousel/CarouselHome";
import OnlinePurchase from "../components/onlinePurchase/OnlinePurchase";
import Footer from "../Footer/footer";
import Header from "../Header/Header";

export default function HomePage(){
    return(
        <>
        <Header />
        <CarouselHome />
        <OnlinePurchase />
        <Footer />
        </>
        
    )
}