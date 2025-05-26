
const images = [
  'hinh-nen-may-tinh-1.jpg',
  'hinh-nen-may-tinh-2.jpg',
  'hinh-nen-may-tinh-3.jpg',
  'hinh-nen-may-tinh-4.jpg',
  'hinh-nen-may-tinh-5.jpg',
];

let currentIndex = 0;
const slideImage = document.getElementById('slideImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
function showImage(index) {
  slideImage.src = images[index];
}
showImage(currentIndex);
prevBtn.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  showImage(currentIndex);
});
nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  showImage(currentIndex);
});
