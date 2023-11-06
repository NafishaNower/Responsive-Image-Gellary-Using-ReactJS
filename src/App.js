import WSPGallery from './components/Gallery';
import './App.css';

function App() {

  const galleryImages = [
    {
      img: '/images/image-1.webp'
    },
    {
      img: "/images/image-2.webp"
    },
    {
      img: "/images/image-3.webp"
    },
    {
      img: "/images/image-4.webp"
    },
    {
      img: "/images/image-5.webp"
    },
    {
      img: "/images/image-6.webp"
    },
    {
      img: "/images/image-7.webp"
    },
    {
      img: "/images/image-8.webp"
    },
    {
      img: "/images/image-9.webp"
    },
    {
      img: "/images/image-10.JPEG"
    },
    {
      img: "/images/image-11.JPEG"
    }
  ]

  return (
    <div className="App">
      <br />
      <div>
        <strong>Image Gellary</strong>
      </div>
      <br /><br />

      <WSPGallery
        galleryImages={galleryImages}
      />

      <br /><br />
     
    </div>                   
  );
}

export default App;