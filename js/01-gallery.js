import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const list = document.querySelector(".gallery");

function createMarkup(arr) {
    return arr
        .map(({ preview, original, description }) => `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>
        `)
        .join("");
}

list.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
list.addEventListener("click", onImgClick);

function onImgClick(event) {
    event.preventDefault();
    if (event.target === event.currentTarget) {
        return;
    }

    const currentItem = event.target.closest(".gallery__item");

    const instance = basicLightbox.create(
        `<div class="modal">
            <img src="${event.target.dataset.source}" width="800" height="600">
        </div>`,
    
        {
            onShow: (instance) => {
                document.addEventListener('keydown', closeModalOnEsc);
            },

            onClose: (instance) => {
                document.removeEventListener('keydown', closeModalOnEsc);
            },
        },
    );
    
const closeModalOnEsc = event => {
    if (event.code === 'Escape') {
        instance.close();
    }
}       
    
instance.show()
}