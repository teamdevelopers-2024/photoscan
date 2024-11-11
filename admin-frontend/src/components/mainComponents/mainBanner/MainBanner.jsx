import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainBanner.css";
import api from "../../../services/api";
import Swal from "sweetalert2";

function MainBanner() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.getBanners();
        setBanners(response);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    
    if (!selectedFile) {
      return Toast.fire({
        icon: "error",
        title: "Image not selected",
      });
    }
    
    if(banners.length == 3 ){
      Toast.fire({
        icon: "error",
        title: "You can Add Only 3 Banners , if You want add Please delete One added",
      });
      return
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "cloud_name");
    formData.append("cloud_name", "dpjzt7zwf");

    try {
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dpjzt7zwf/image/upload`,
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;
      const publicId = cloudinaryResponse.data.public_id;

      const bannerData = {
        imageUrl,
        publicId,
      };

      const response = await api.addBanner(bannerData);
      if (response) {
        setBanners((prevBanners) => [
          ...prevBanners,
          { image: imageUrl, publicId },
        ]);
        Toast.fire({
          icon: "success",
          title: "Banner uploaded successfully",
        });
        setFileName(""); // Reset filename
        setSelectedFile(null);
      } else {
        Toast.fire({
          icon: "error",
          title: "Error uploading banner",
        });
      }
    } catch (error) {
      console.error("Error uploading banner:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (publicId) => {
    try {
      await api.deleteBanner(publicId);
      setBanners((prevBanners) =>
        prevBanners.filter((banner) => banner.publicId !== publicId)
      );
      Toast.fire({
        icon: "success",
        title: "Banner deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting banner:", error);
      Toast.fire({
        icon: "error",
        title: "Error deleting banner",
      });
    }
  };

  return (
    <section id="content" className="user-main p-6 rounded-lg shadow-md">
      <main className="space-y-6 w-full">
        <div className="table-data space-y-6 w-full">
          <div className="order bg-white p-6 rounded-lg shadow-md w-full">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="custom-file flex flex-col space-y-2">
                <label
                  className="w-[10%] custom-file-label cursor-pointer bg-blue-600 text-white rounded-md font-medium px-4 py-2 hover:bg-blue-700 transition-all text-center"
                  htmlFor="image"
                >
                  Choose file
                </label>
                <input
                  type="file"
                  className="custom-file-input hidden"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {fileName && (
                  <span className="text-gray-600 text-sm mt-1">
                    Selected file: {fileName}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gray-100 text-black font-semibold py-2 rounded shadow-md hover:bg-gray-200"
                disabled={loading}
              >
                {loading ? "Uploading..." : "ADD Banner"}
              </button>
            </form>
          </div>

          <section>
            <div className="container my-10">
              <header className="flex justify-center mb-4">
                <h3 className="text-2xl font-semibold">Images</h3>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[200px]">
                {banners.slice(-3).map((banner, index) => (
                  <div
                    key={index}
                    className="card w-full my-2 shadow-lg rounded-lg overflow-hidden h-[220px]"
                  >
                    <div className="h-[180px] w-full">
                      <img
                        src={banner.image}
                        alt={`Banner ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <button
                      onClick={() => handleDelete(banner.publicId)}
                      className="w-full bg-red-500 text-white font-semibold py-1 mt-2 rounded-b"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </section>
  );
}

export default MainBanner;
