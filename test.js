const accessKey = "eb771894bc0941ea81f1e98f4707fee2"; // Replace with your actual access key
let ip = "";

async function getUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    console.log("Your IP address is:", data.ip);
    ip = data.ip;
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP:", error);
  }
}

getUserIP().then(() => {
  console.log(ip);
  const url = `http://api.ipstack.com/${ip}?access_key=${accessKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("IP Data:", data);
      // Handle the response data here
    })
    .catch((error) => {
      console.error("Error fetching IP data:", error);
    });
});
