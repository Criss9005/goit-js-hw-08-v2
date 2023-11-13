import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';

// Change code below this line

const gallery = document.querySelector('.gallery')

galleryItems.forEach(element => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    const image = document.createElement('img');
    item.classList.add('gallery__item')
    link.classList.add('gallery__link');
    image.classList.add('gallery__image');
    gallery.append(item);
    item.append(link);
    link.append(image);
    link.href = element.original;
    image.src = element.preview
    image.alt = element.description
    image.title = element.description

});

let newGallery = new SimpleLightbox('.gallery a'); 
    

