function getDayUrls() {
  const now = new Date();
  const urls = [];
  for (let i = 0; i < 14; i++) {
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0');
    const url = `https://kelesys.opera.hu/ugyfel/opera/dokumentumok/${year}/probatablak/${year}${month}${day}.html`;
    urls.push(url);
    now.setDate(now.getDate() + 1);
  }
  return urls;
}

async function getPage(url) {
  const fetchOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache"
  }
  try {
    const response = await fetch(url, fetchOptions);
    const page = await response.text();
    console.log(page)
  } catch (error) {
    console.log("error", error)
  }
}

function main() {
  const urls = getDayUrls();
  for (const url of urls) {
    const iframe = document.createElement("iframe");
    iframe.setAttribute('src', url);
    document.body.appendChild(iframe);
  }
}

async function setHeight(element) {

}

main()