const products = [
  {
    name: "Kierownica LOGITECH G29",
    image: "/images/kierownica.jpg",
    description:
      "Unleash the thrill of racing with the Logitech G29 Steering Wheel. Precision meets performance in this dual-motor force feedback wheel, designed for PlayStation and PC. With responsive pedals and a hand-stitched leather wheel, every race becomes an immersive experience. Take control and elevate your gaming setup with the Logitech G29.",
    brand: "Logitech",
    category: "Electronics",
    price: 395.0,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Mouse Logitech G502 X Plus",
    image: "/images/mysz.jpg",
    description:
      "Introducing the Logitech G502 X Plus Mouse a gaming essential for the ultimate precision and control. Dominate your competition with this high-performance mouse featuring the HERO sensor for accurate tracking and 16K DPI. Customizable weights, 11 programmable buttons, and a sleek design make it the perfect tool for gamers. Elevate your gameplay to new heights with the Logitech G502 X Plus Mouse.",
    brand: "Logitech",
    category: "Electronics",
    price: 125.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: "Headphones Steelseries Arctis Prime",
    image: "/images/sluchawki.jpg",
    description:
      "CImmerse yourself in superior audio quality with the SteelSeries Arctis Prime Headphones. Designed for gamers seeking pristine sound, these headphones deliver a premium audio experience. Featuring high-fidelity drivers and a Discord-certified ClearCast microphone, communication is crystal clear. The lightweight and comfortable design ensures long gaming sessions with ease. Elevate your gaming audio with the SteelSeries Arctis Prime – where performance meets comfort.",
    brand: "Steelseries",
    category: "Electronics",
    price: 73.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: `Monitor SAMSUNG Odyssey G5 4" 165Hz`,
    image: "/images/monitor.jpg",
    description:
      "Experience gaming like never before with the Samsung Odyssey G5 34 Monitor. This 34-inch ultra-wide QHD curved display immerses you in stunning visuals, bringing games to life with vibrant colors and sharp details. The 165Hz refresh rate and 1ms response time ensure smooth and responsive gameplay, while AMD FreeSync technology eliminates screen tearing for a seamless experience. The Odyssey G5 34 is not just a monitor; it's your portal to a new dimension of gaming. Elevate your setup with the Samsung Odyssey G5 34 and enter the next level of immersive gaming.",
    brand: "Samsung",
    category: "Electronics",
    price: 599.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Computer ACER Predator Orion 3000",
    image: "/images/komputer.jpg",
    description:
      "Unleash the power of gaming with the Acer Predator Orion 3000. This compact gaming beast is fueled by high-performance components, including the latest processors and graphics cards. With customizable RGB lighting and a transparent side panel, the Orion 3000 not only delivers incredible gaming performance but also looks the part. The advanced cooling system ensures optimal performance during intense gaming sessions. Dominate the virtual battlefield and experience cutting-edge technology with the Acer Predator Orion 3000 – where power meets style in a compact form factor.",
    brand: "Acer",
    category: "Electronics",
    price: 999.99,
    countInStock: 7,
    rating: 4.5,
    numReviews: 10,
  },
  {
    name: "Laptop ACER Predator Helios 300",
    image: "/images/laptop.jpg",
    description:
      "Introducing the Acer Predator Helios 300 Laptop your portal to elite gaming on the go. This powerhouse is equipped with a high-refresh-rate display, powered by a potent NVIDIA GeForce GPU and the latest Intel Core processor. Unleash lag-free gaming with advanced cooling technology, and customize your experience with RGB keyboard backlighting. With a sleek metal design, the Helios 300 is not just a laptop; it's a statement. Elevate your gaming experience with the Acer Predator Helios 300 – where performance and portability converge for the ultimate gaming on-the-go.",
    brand: "Acer",
    category: "Electronics",
    price: 629.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "Console ASUS ROG Ally",
    image: "/images/konsola-rog.jpg",
    description:
      "Introducing the Acer Predator Helios 300 Laptop your portal to elite gaming on the go. This powerhouse is equipped with a high-refresh-rate display, powered by a potent NVIDIA GeForce GPU and the latest Intel Core processor. Unleash lag-free gaming with advanced cooling technology, and customize your experience with RGB keyboard backlighting. With a sleek metal design, the Helios 300 is not just a laptop; it's a statement. Elevate your gaming experience with the Acer Predator Helios 300 – where performance and portability converge for the ultimate gaming on-the-go.",
    brand: "Asus",
    category: "Electronics",
    price: 759.99,
    countInStock: 0,
    rating: 4,
    numReviews: 7,
  },
  {
    name: "Console SONY PlayStation 5",
    image: "/images/playstation5.jpg",
    description:
      "Experience the next level of gaming with the Sony PlayStation 5. This console redefines immersive entertainment, offering stunning 4K graphics, ultra-fast SSD storage, and an innovative DualSense controller for tactile feedback. With a vast library of exclusive titles and backward compatibility, the PS5 delivers a gaming experience like never before. Elevate your gaming setup and enter a new era of play with the Sony PlayStation 5 – where power, speed, and cutting-edge technology come together for the ultimate gaming adventure.",
    brand: "Sony",
    category: "Electronics",
    price: 509.99,
    countInStock: 3,
    rating: 4,
    numReviews: 8,
  },
  {
    name: "Console MICROSOFT XBOX Series X",
    image: "/images/xbox.jpg",
    description:
      "Embark on a gaming revolution with the Microsoft Xbox Series X. This console is a powerhouse, boasting 4K gaming, ultra-fast load times, and a sleek design. With the expansive Game Pass library and backward compatibility, the Series X offers a diverse gaming experience. The innovative Xbox Wireless Controller enhances gameplay with precision and comfort. Elevate your gaming setup with the Microsoft Xbox Series X – where cutting-edge technology and a world of gaming possibilities await.",
    brand: "Microsoft",
    category: "Electronics",
    price: 600.0,
    countInStock: 0,
    rating: 3.2,
    numReviews: 12,
  },
  {
    name: "Console NINTENDO Switch Oled",
    image: "/images/nintendo.jpg",
    description:
      "Introducing the Nintendo Switch OLED – where versatility meets vibrant entertainment. Immerse yourself in a gaming experience like no other with the stunning 7-inch OLED screen, providing rich colors and sharp contrasts. The handheld and docked modes seamlessly adapt to your gaming preferences, offering flexibility on the go or at home. With the iconic Joy-Con controllers and an ever-expanding library of games, the Nintendo Switch OLED is your gateway to endless fun. Elevate your gaming lifestyle with the enhanced visuals and versatility of the Nintendo Switch OLED – where innovation meets playfulness.",
    brand: "Nintendo",
    category: "Electronics",
    price: 429.99,
    countInStock: 15,
    rating: 5,
    numReviews: 5,
  },
];

export default products;
