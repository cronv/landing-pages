const imageIndexes = [
    "LS5A4548.jpg",
    "LS5A4553.jpg",
    "LS5A4562.jpg",
    "LS5A4564.jpg",
    "LS5A4583.jpg",
    "LS5A4596.jpg",
    "LS5A4600.jpg",
    "LS5A4603.jpg",
    "LS5A4624.jpg",
    "LS5A4630.jpg",
    "LS5A4634.jpg",
    "LS5A4638.jpg",
    "LS5A4640.jpg",
    "LS5A4642.jpg",
    "LS5A4655.jpg",
    "LS5A4666.jpg",
    "LS5A4693.jpg",
    "LS5A4694.jpg",
    "LS5A4708.jpg",
    "LS5A4716.jpg",
    "LS5A4751.jpg",
    "LS5A4763.jpg",
    "LS5A4770.jpg",
    "LS5A4784.jpg",
    "LS5A4785.jpg",
    "LS5A4787.jpg",
    "LS5A4789.jpg",
    "LS5A4803.jpg"
];

document.getElementById("loading").style.display = "flex";
window.addEventListener("load", function() {
    document.getElementById("loading").style.display = "none";

    // ultra img
    document.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', function() {
            const cardParent = this.closest('.card');

            if (!cardParent) {
                return;
            }

            const modalImage = document.getElementById('modalImage');
            const imageHref = document.getElementById('imageHref');
            const hrefUri = this.src.replace(/\/little/g, '');
            modalImage.src = hrefUri;
            imageHref.href = hrefUri;
            const modal = new bootstrap.Modal(document.getElementById('imageModal'));
            modal.show();
        });
    });
});

// gen items
function addItems() {
    var container = document.querySelector('.js-items-add');

    for (var i = 0; i < imageIndexes.length; i++) {
        // Создание элементов
        var colDiv = document.createElement('div');
        colDiv.className = 'col-md-4 mb-3';

        var cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        var img = document.createElement('img');
        img.src = '/image/items/little/' + imageIndexes[i];
        img.className = 'card-img-top hover-brightness';
        img.alt = 'Товар ' + (i + 1);

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.innerText = 'Товар ' + (i + 1);

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
        priceContainer.appendChild(priceSpan);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(priceContainer);
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);

        container.appendChild(colDiv);
    }
}

addItems();
