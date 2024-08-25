import React from "react";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MomentosFilter from "../../components/Momentos/Filter/MomentosFilter";


export default function MomentoListing() {
    return (
        <>
        <Header />
        <MomentosFilter />
        <Footer />
        </>
    )
    
}