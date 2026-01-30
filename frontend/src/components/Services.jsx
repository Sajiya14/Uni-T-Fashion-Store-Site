import S1 from "../assets/Services Images/delivery.png"
import S2 from "../assets/Services Images/high-quality.png"
import S3 from "../assets/Services Images/best-price.png"

const ServiceHighlights = () => {
  const services = [
    {
      img: S1,
      title: "ISLAND WIDE",
      description: "You can enjoy products from anywhere in the country",
    },
    {
      img: S2,
      title: "HIGH QUALITY",
      description: "We sell high quality items to give you the best experience",
    },
    {
      img: S3,
      title: "BEST PRICE",
      description: "We offer very competitive pricing for our customer",
    },
  ];

  return (
    <div className="bg-black text-white py-10">
      <div className="max-w-6xl mx-44 grid grid-cols-1 sm:grid-cols-3 gap-60 text-center px-4">
        {services.map((item, index) => (
          <div key={index}>
            <img
              src={item.img}
              alt={item.title}
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="font-extrabold font-PoppinsFont text-lg mb-2">{item.title}</h3>
            <p className="text-base">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHighlights;
