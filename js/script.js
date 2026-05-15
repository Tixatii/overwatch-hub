// Target the container in heroes.html
const galleryContainer = document.getElementById('hero-gallery-container');

// Only run if the gallery container exists.
if (galleryContainer) {
    // Fetch the data from separate JSON file.
    fetch('js/heroes.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(heroesData) {
            // Loop through each hero in JSON array.
            heroesData.forEach(function(hero) {
                
                // Create div to hold the individual item.
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';

                // Create hyperlink for full size image.
                const imageLink = document.createElement('a');
                imageLink.href = hero.image;
                imageLink.target = "_blank"; // Opens the image in a new tab.

                // Create image element.
                const imgElement = document.createElement('img');
                imgElement.src = hero.image;
                imgElement.alt = "Overwatch Hero";

                // Create description paragraph.
                const description = document.createElement('p');
                description.innerText = hero.description;

                // Assemble elements together.
                imageLink.appendChild(imgElement);
                galleryItem.appendChild(imageLink);
                galleryItem.appendChild(description);

                // Add the finished item to the main container.
                galleryContainer.appendChild(galleryItem);
            });
        })
        .catch(function(error) {
            console.error("Error loading the JSON gallery:", error);
        });
}

// Target the container in maps.html
const carouselContainer = document.getElementById('map-carousel-container');

// Only run if the carousel container exists.
if (carouselContainer) {
    fetch('js/maps.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(mapsData) {
            let currentIndex = 0;

            // Create standard carousel elements.
            const carouselWrapper = document.createElement('div');
            carouselWrapper.className = 'carousel';

            const imgElement = document.createElement('img');
            imgElement.className = 'carousel-image';
            imgElement.alt = "Overwatch Map";

            const descriptionElement = document.createElement('p');
            descriptionElement.className = 'carousel-description';

            const btnContainer = document.createElement('div');
            btnContainer.className = 'carousel-buttons';

            const prevBtn = document.createElement('button');
            prevBtn.innerText = 'Previous';
            
            const nextBtn = document.createElement('button');
            nextBtn.innerText = 'Next';

            // Function to update the image and text based on current index.
            function updateCarousel() {
                imgElement.src = mapsData[currentIndex].image;
                descriptionElement.innerText = mapsData[currentIndex].description;
            }

            // Click listener for moving forwards.
            nextBtn.addEventListener('click', function() {
                if (currentIndex === mapsData.length - 1) {
                    currentIndex = 0; // Loop back to the start
                } else {
                    currentIndex++;
                }
                updateCarousel();
            });

            // Click listener for moving backwards.
            prevBtn.addEventListener('click', function() {
                if (currentIndex === 0) {
                    currentIndex = mapsData.length - 1; // Loop to the end
                } else {
                    currentIndex--;
                }
                updateCarousel();
            });

            // Assemble elements together.
            btnContainer.appendChild(prevBtn);
            btnContainer.appendChild(nextBtn);

            carouselWrapper.appendChild(imgElement);
            carouselWrapper.appendChild(descriptionElement);
            carouselWrapper.appendChild(btnContainer);

            carouselContainer.appendChild(carouselWrapper);

            // Run once on load to display first image.
            updateCarousel();

            // Task 6: Auto-play feature
            // Automatically click the "Next" button every 5 seconds to auto-play the carousel.
            setInterval(function() {nextBtn.click();}, 5000);
        })

        .catch(function(error) {
            console.error("Error loading the JSON carousel:", error);
        });
}