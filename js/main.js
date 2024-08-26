// ultra img
document.querySelectorAll('#carouselFeaturedItems img').forEach(image => {
    image.addEventListener('click', function() {
        const modalImage = document.getElementById('modalImage');
        modalImage.src = this.src; // Устанавливаем src для изображения в модальном окне
        const modal = new bootstrap.Modal(document.getElementById('imageModal'));
        modal.show(); // Открываем модальное окно
    });
});


// carousel
/*document.addEventListener("DOMContentLoaded", function() {
    const imageIndexes = [
        'LS5A4564.jpg',
        'LS5A4583.jpg',
        'LS5A4596.jpg',
        'LS5A4600.jpg',
        'LS5A4603.jpg',
        'LS5A4624.jpg',
        'LS5A4630.jpg',
        'LS5A4634.jpg',
        'LS5A4638.jpg',
        'LS5A4640.jpg',
        'LS5A4642.jpg',
        'LS5A4655.jpg',
        'LS5A4666.jpg',
        'LS5A4693.jpg',
        'LS5A4694.jpg',
        'LS5A4708.jpg',
        'LS5A4716.jpg',
        'LS5A4751.jpg',
        'LS5A4763.jpg',
        'LS5A4770.jpg',
        'LS5A4784.jpg',
        'LS5A4785.jpg',
        'LS5A4787.jpg',
        'LS5A4789.jpg',
        'LS5A4803.jpg',
    ];

    const imageContainer = document.getElementById("image-items");

    for (let i = 0; i < imageIndexes.length; i += 3) {
        const carouselItemDiv = document.createElement("div");
        carouselItemDiv.className = "carousel-item" + (i === 0 ? " active" : "");

        const rowDiv = document.createElement("div");
        rowDiv.className = "row g-3";

        for (let j = 0; j < 3; j++) {
            if (i + j < imageIndexes.length) {
                const colDiv = document.createElement("div");
                colDiv.className = "col-4";

                const imgElement = document.createElement("img");
                imgElement.src = `image/items/${imageIndexes[i + j]}`;
                imgElement.className = "d-block w-100";
                imgElement.alt = `Antique Item ${imageIndexes[i + j]}`;

                const captionDiv = document.createElement("div");
                captionDiv.className = "carousel-caption";
                captionDiv.textContent = `Описание товара ${imageIndexes[i + j]}`;

                colDiv.appendChild(imgElement);
                colDiv.appendChild(captionDiv);
                rowDiv.appendChild(colDiv);
            }
        }

        carouselItemDiv.appendChild(rowDiv);
        imageContainer.appendChild(carouselItemDiv);
    }
});*/
