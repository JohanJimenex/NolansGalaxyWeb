function detectDevicePlatform() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  const ANDROID_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.jopamstudio.nolansgalaxy";
  const APPLE_STORE_URL =
    "https://apps.apple.com/us/app/nolans-galaxy/id6503222887";

  setTimeout(() => {
    if (/android/i.test(userAgent)) {
      window.location.href = ANDROID_STORE_URL;
      return;
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = APPLE_STORE_URL;
      return;
    }
  }, 2000);

  console.warn("Unsupported platform");
}

function createContactInfo() {
  const h6 = document.createElement("h6");
  const emailText = document.createTextNode("johan.jimenez.23@gmail.com");
  h6.appendChild(emailText);
  const contactElement = document.getElementById("contact");
  contactElement.appendChild(h6);
}

async function visitsCounter() {
  const response = await fetch(
    "https://unity-nolan-s-galaxy-default-rtdb.firebaseio.com/visits.json"
  );
  const data = await response.json();

  const counter = Object.keys(data).length;

  await fetch(
    "https://unity-nolan-s-galaxy-default-rtdb.firebaseio.com/visits.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ counter: counter + 1 }),
    }
  );
}

window.onload = function () {
  detectDevicePlatform();
  createContactInfo();
  visitsCounter();
};
