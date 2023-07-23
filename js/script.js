
// hamburger toggle 
var menuToggle = document.querySelector('#menu-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  var menuIcon = document.querySelector('.menu-icon');
  var closeBtn = document.querySelector('.click-li');

  closeBtn.addEventListener('click', function() {
    toggleNavPanel();
  });

  function toggleNavPanel() {
    if (menuToggle.checked) {
      mobileNav.style.display = 'none';
      menuToggle.checked = false;
    } else {
      mobileNav.style.display = 'block';
      menuToggle.checked = true;
    }
  }



// slider section
const slider = document.querySelector('.slider');
let isDown = false;
let startX;
let scrollLeft;
let preventClick = false;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  preventClick = false;
});

slider.addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  preventClick = false;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  if (preventClick) {
    event.preventDefault();
    event.stopPropagation();
  }
});

slider.addEventListener('touchend', () => {
  isDown = false;
  if (preventClick) {
    event.preventDefault();
    event.stopPropagation();
  }
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
  preventClick = true;
});

slider.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
  preventClick = true;
});

slider.addEventListener('click', (event) => {
  if (preventClick) {
    event.preventDefault();
    event.stopPropagation();
  }
  preventClick = false;
});

// inspiration section
const areas = document.getElementsByTagName("area");

for (let i = 0; i < areas.length; i++) {
  const area = areas[i];
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = "<h4>" + area.dataset.title + "</h4><p><a href='" + area.dataset.url + "'>View on website</a></p>";
  area.parentNode.insertBefore(popup, area.nextSibling);
}


// newsletter

const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("newsletter-email");
const message = document.getElementById("newsletter-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const response = await fetch("https://example.com/newsletter/signup", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.ok) {
    message.textContent = data.message;
    message.style.color = "#4CAF50";
    emailInput.value = "";
  } else {
    message.textContent = data.message;
    message.style.color = "red";
  }
});
