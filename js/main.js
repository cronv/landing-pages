import { imageIndexes } from './data/imageData.js';
import { formattedImages } from './data/imageObjectData.js';

var main = {
    imageIndexes: imageIndexes,
    pagination: {
        productsPerPage: 3,
        currentPage: 1,
        totalPages: 0,
    },

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
                const cardParent = event.target.closest('.carousel');

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

        // Updated renderProducts to accept all products and apply currentCategory when filtering
        const renderProducts = function(catalogId = null, page = 1) {
            document.querySelector('.js-rows').innerHTML = '';

            // Динамически фильтруем товары исходя из выбранного каталога или всех товаров
            const filteredImages = catalogId
                ? formattedImages.filter(function(item) {
                    return item.catalog_id === catalogId;
                })
                : formattedImages;

            // Группируем изображения по id товара
            const groupedImages = filteredImages.reduce(function(acc, item) {
                const key = item.id;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(item);
                return acc;
            }, {});

            // Получаем массив группированных товаров
            const groupedArray = Object.values(groupedImages);
            self.pagination.totalPages = Math.ceil(groupedArray.length / self.pagination.productsPerPage);

            // Индексы для текущей страницы
            const start = (page - 1) * self.pagination.productsPerPage;
            const end = start + self.pagination.productsPerPage;
            const currentProducts = groupedArray.slice(start, end);

            let carouselHTML = '<div class="row-background"></div>';

            currentProducts.forEach(function(images) {
                const carouselId = `carouselProduct${images[0].id}`;
                carouselHTML += `
            <div class="col-md-4 product">
                <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${images.map(function(img, index) {
                            return `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img src="/image/items/little/${img.src}" class="d-block w-100 size-p hover-brightness" alt="Товар">
                            </div>`;
                        }).join('')}
                    </div>
                    <div class="carousel-indicators">
                        ${images.map(function(img, index) {
                            return `<button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Изображение ${index + 1}"></button>`;
                        }).join('')}
                    </div>
                </div>
                <div class="text-center">
                    <div class="star-rating mb-4">
                        <span>⭐⭐⭐⭐⭐</span>
                        <img class="hover-brightness" src="/image/heart_full.png" alt="Сердечко" style="width: 20px;">
                    </div>
                </div>
            </div>`;
            });

            document.querySelector('.js-rows').insertAdjacentHTML('beforeend', carouselHTML);
            self.setupImageModals();
            self.setupPaginationButtons(catalogId);
        };

        self.setupPaginationButtons = function(catalogId) {
            const paginationContainer = document.querySelector('.js-pagination');
            paginationContainer.innerHTML = '';

            // Создаем кнопки пагинации
            if (self.pagination.totalPages > 1) {
                const currentPageIndex = self.pagination.currentPage - 1;

                // Добавляем первую страницу
                const firstPageItem = document.createElement('li');
                firstPageItem.className = 'page-item';
                firstPageItem.innerHTML = `<a href="#" class="page-link btn-none rounded-circle d-flex justify-content-center align-items-center icon-small mt-link ${self.pagination.currentPage === 1 ? 'page-active' : ''}">1</a>`;
                firstPageItem.querySelector('a').addEventListener('click', function(e) {
                    e.preventDefault();
                    if (self.pagination.currentPage > 1) {
                        self.pagination.currentPage = 1;
                        renderProducts(catalogId, self.pagination.currentPage);
                    }
                });
                paginationContainer.appendChild(firstPageItem);

                // Добавляем многоточие между первой страницей и текущей
                if (self.pagination.currentPage > 3 && self.pagination.totalPages > 4) {
                    const ellipsisItem = document.createElement('li');
                    ellipsisItem.className = 'page-item';
                    ellipsisItem.innerHTML = '<a href="javascript:void(0)" class="page-link btn-none rounded-circle d-flex justify-content-center align-items-center icon-small mt-link">...</a>';
                    paginationContainer.appendChild(ellipsisItem);
                }

                // Добавляем страницы с номерами
                const startPage = Math.max(2, self.pagination.currentPage - 1);
                const endPage = Math.min(self.pagination.totalPages - 1, self.pagination.currentPage + 1);

                for (let i = startPage; i <= endPage; i++) {
                    const pageItem = document.createElement('li');
                    pageItem.className = 'page-item';
                    pageItem.innerHTML = `<a href="#" class="page-link btn-none rounded-circle d-flex justify-content-center align-items-center icon-small mt-link ${i === self.pagination.currentPage ? 'page-active' : ''}">${i}</a>`;
                    pageItem.querySelector('a').addEventListener('click', function(e) {
                        e.preventDefault();
                        if (i !== self.pagination.currentPage) {
                            self.pagination.currentPage = i;
                            renderProducts(catalogId, self.pagination.currentPage);
                        }
                    });
                    paginationContainer.appendChild(pageItem);
                }

                // Добавляем многоточие между текущей и последней страницей
                if (self.pagination.currentPage < self.pagination.totalPages - 2 && self.pagination.totalPages > 4) {
                    const ellipsisItem = document.createElement('li');
                    ellipsisItem.className = 'page-item';
                    ellipsisItem.innerHTML = '<a href="javascript:void(0)" class="page-link btn-none rounded-circle d-flex justify-content-center align-items-center icon-small mt-link">...</a>';
                    paginationContainer.appendChild(ellipsisItem);
                }

                // Добавляем последнюю страницу
                if (self.pagination.totalPages > 1) {
                    const lastPageItem = document.createElement('li');
                    lastPageItem.className = 'page-item';
                    lastPageItem.innerHTML = `<a href="#" class="page-link btn-none rounded-circle d-flex justify-content-center align-items-center icon-small mt-link ${self.pagination.currentPage === self.pagination.totalPages ? 'page-active' : ''}">${self.pagination.totalPages}</a>`;
                    lastPageItem.querySelector('a').addEventListener('click', function(e) {
                        e.preventDefault();
                        if (self.pagination.currentPage < self.pagination.totalPages) {
                            self.pagination.currentPage = self.pagination.totalPages;
                            renderProducts(catalogId, self.pagination.currentPage);
                        }
                    });
                    paginationContainer.appendChild(lastPageItem);
                }
            }
        };

        document.querySelectorAll('.js-load-products').forEach(function(button) {
            button.addEventListener('click', function () {
                const catalogId = parseInt(this.getAttribute('data-catalog-id'));
                self.pagination.currentPage = 1; // Сброс на первую страницу
                renderProducts(catalogId, self.pagination.currentPage);
            });
        });

        // Initial load to render all products
        renderProducts();
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

