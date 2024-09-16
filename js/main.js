import { imageIndexes } from './data/imageData.js';
import { formattedImages } from './data/imageObjectData.js';

var main = {
    imageIndexes: imageIndexes,

    init: function() {
        this.showLoading();
        this.setupImageModals();
        this.setupSearch();
        this.setupCatalog();
        // this.addItems();
    },

    showLoading: function() {
        document.getElementById("loading").style.display = "flex";

        window.addEventListener("load", () => {
            document.getElementById("loading").style.display = "none";
        });
    },

    setupImageModals: function() {
        document.querySelectorAll('img').forEach(image => {
            const check = image.closest('.product');
            if (!check) return;

            image.addEventListener('click', (event) => {
                const cardParent = event.target.closest('.product');

                if (!cardParent) return;

                const modalImage = document.getElementById('modalImage');
                const imageHref = document.getElementById('imageHref');
                const hrefUri = event.target.src.replace(/\/little/g, '');
                modalImage.src = hrefUri;
                imageHref.href = hrefUri;

                const modal = new bootstrap.Modal(document.getElementById('imageModal'));
                modal.show();
            });
        });
    },

    setupSearch: function() {
        document.getElementById('searchInput').addEventListener('click', function() {
            this.value = '';
            var myModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
            myModal.show();
        });
    },

    setupCatalog: function() {
        var self = this;
        document.querySelectorAll('.js-load-products').forEach(button => {
            button.addEventListener('click', function () {
                const catalogId = parseInt(this.getAttribute('data-catalog-id'));

                document.querySelector('.js-rows').innerHTML = '';

                const filteredImages = formattedImages.filter(item => item.catalog_id === catalogId);
                var carouselHTML = '<div class="row-background"></div>';

                const groupedImages = filteredImages.reduce((acc, item) => {
                    if (!acc[item.id]) {
                        acc[item.id] = [];
                    }
                    acc[item.id].push(item);
                    return acc;
                }, {});

                for (const group in groupedImages) {
                    const images = groupedImages[group];
                    const carouselId = `carouselProduct${group}`;

                    carouselHTML += `
                <div class="col-md-4 product">
                    <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            ${images.map((img, index) => `
                                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                    <img src="/image/items/little/${img.src}" class="d-block w-100 size-p hover-brightness" alt="Товар">
                                </div>
                            `).join('')}
                        </div>
                        <div class="carousel-indicators">
                            ${images.map((img, index) => `
                                <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Изображение ${index + 1}"></button>
                            `).join('')}
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="star-rating mb-4">
                            <span>⭐⭐⭐⭐⭐</span>
                            <img class="hover-brightness" src="/image/heart_full.png" alt="Сердечко" style="width: 20px;">
                        </div>
                    </div>
                </div>`;

                    document.querySelector('.js-rows').insertAdjacentHTML('beforeend', carouselHTML);
                }

                self.setupImageModals();
            });
        });
    },

    addItems: function() {
        var container = document.querySelector('.js-items-add');

        for (var i = 0; i < this.imageIndexes.length; i++) {
            // Создание элементов
            var colDiv = document.createElement('div');
            colDiv.className = 'col-md-4 mb-3';

            var cardDiv = document.createElement('div');
            cardDiv.className = 'card';

            var img = document.createElement('img');
            img.src = '/image/items/little/' + this.imageIndexes[i];
            img.className = 'card-img-top hover-brightness';
            img.alt = 'Товар ' + (i + 1);

            var cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            var cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            // cardTitle.innerText = 'Товар ' + (i + 1);

            var priceContainer = document.createElement('div');
            priceContainer.className = 'price-container';

            var priceOutline = document.createElement('img');
            priceOutline.src = '/image/contur.png';
            priceOutline.alt = 'Контур цены';
            priceOutline.className = 'price-outline hover-brightness';

            var priceSpan = document.createElement('span');
            priceSpan.className = 'price';
            priceSpan.innerText = (1000 * (i + 1)) + ' ₽';  // Пример формирования цены

            // Сборка элементов вместе
            priceContainer.appendChild(priceOutline);
            // priceContainer.appendChild(priceSpan);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(priceContainer);
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBody);
            colDiv.appendChild(cardDiv);

            container.appendChild(colDiv);
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    main.init();
});

