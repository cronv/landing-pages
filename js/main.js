import { imageIndexes } from './data/imageData.js';

var main = {
    imageIndexes: imageIndexes,

    init: function() {
        this.showLoading();
        this.setupImageModals();
        this.setupSearch();
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
            image.addEventListener('click', (event) => {
                const cardParent = event.target.closest('.card');

                if (!cardParent) {
                    return;
                }

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
