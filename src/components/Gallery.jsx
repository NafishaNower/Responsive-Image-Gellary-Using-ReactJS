//Import Statements
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';
import './gellary.css';



//Component Defination (It takes an object galleryImages as a prop.)
const Gallery = ({ galleryImages }) => {
  //Initialize all state values.
  const [selectedImages, setSelectedImages] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [localGalleryImages, setLocalGalleryImages] = useState(galleryImages);
  const [isUploadMode, setUploadMode] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);



  //Handle the selection of images.
  const ImageSelection = (index) => {
    //If img is already selected than remove it otherwise add in in the list of selected image.
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((item) => item !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };



//Handle deletion section.
  const deleteSelectedImages = () => {
    const updatedImages = localGalleryImages.filter((_, index) => !selectedImages.includes(index));
    setSelectedImages([]);
    setSlideNumber(0);//After deletion set the selected img empty.
    setLocalGalleryImages(updatedImages);//Update gellary images with existant images.
  };



  //Handle Upload Image Section.
  const handleImageUpload = (event) => {
    const newImages = Array.from(event.target.files).map((file) => ({
      img: URL.createObjectURL(file),
    }));//Convert uploaded img to object with URL.
    setUploadedImages(uploadedImages.concat(newImages));
    setLocalGalleryImages(localGalleryImages.concat(newImages));//Update local gellary with uploaded image.
    setUploadMode(false);
  };

  

  //Model Open and Close.
  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };



//Nevigate to previous and next image in the model.
  const prevSlide = () => {
    setSlideNumber((prevSlideNumber) => prevSlideNumber === 0 ? localGalleryImages.length - 1 : prevSlideNumber - 1);
  };
  const nextSlide = () => {
    setSlideNumber((prevSlideNumber) => (prevSlideNumber + 1) % localGalleryImages.length);
  };




  //Toohle upload mode after clicking upload button.
  const toggleUploadMode = () => {
    fileInputRef.current.click();
  };




  return (
    <div>
      <div className='selectedImagesCount'>
        {selectedImages.length > 0 && (
          <div>
            <span>{`${selectedImages.length} image(s) selected      `}</span>
            <button className='btnDelete' onClick={deleteSelectedImages}>Delete</button>
          </div>
        )}  
      </div>

      {openModal && (
        <div className='sliderWrap'>
          <FontAwesomeIcon icon={faTimes} className='btnClose' onClick={handleCloseModal} />
          <FontAwesomeIcon icon={faArrowLeft} className='btnPrev' onClick={prevSlide} />
          <FontAwesomeIcon icon={faArrowRight} className='btnNext' onClick={nextSlide} />
          
          <div className='fullScreenImage'>
            <img
              src={localGalleryImages[slideNumber].img}
              alt=''
              style={{
                maxWidth: '100vw',
                maxHeight: '100vh',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      )}

      <div className='galleryWrap'>
        {localGalleryImages &&
          localGalleryImages.map((slide, index) => {
            const gridStyles = index === 0 ? { gridColumn: 'span 2', gridRow: 'span 2' } : {};
            return (
              <div className='galleryItem' key={index} style={gridStyles}>
                <input
                  type='checkbox'
                  checked={selectedImages.includes(index)}
                  onChange={() => ImageSelection(index)}
                  className='selectionCheckbox'
                />
                <img
                  src={slide.img}
                  alt=''
                  onClick={() => handleOpenModal(index)}
                  className='imageHoverEffect'
                />
              </div>
            );
          })}
       {!isUploadMode && (
                <div className='galleryItem upload-button' onClick={toggleUploadMode}>
                  <label className='uploadImageLabel'>
                    <FontAwesomeIcon icon={faImage} />
                    Upload Image
                  </label>
                </div>
        )}
      </div>

      <input
        id='fileInput'
        type='file'
        accept='image/*'
        multiple
        onChange={handleImageUpload}
        style={{ display: 'none' }}
        ref={fileInputRef} 
      />
      
    </div>
  );
};

export default Gallery;
                  